import { PrismaClient } from '@prisma/client'
import { SendMsgArgs } from '../../bot/base-bot-controller'
import { WordList } from './index'
import { capitalize } from '../../../helpers/capitalize'
import { UserWordListMeta } from './types'
import { User } from '../../../types'

export class WordListBotAdapter extends WordList {
  onGameEnd: (playerId: number) => Promise<void>

  constructor(
    prisma: PrismaClient,
    getUser: (telegramId: User['telegramId']) => Promise<User>,
    onGameEnd: (playerId: number) => Promise<void>,
  ) {
    super(prisma, getUser)
    this.onGameEnd = onGameEnd
  }

  public async startGame(playerId: number): Promise<Omit<SendMsgArgs, 'msg'>> {
    const node = await this.setWordList(playerId)
    return this.composeResponse(node, playerId)
  }

  public async getGameNextStep(playerId: number): Promise<Omit<SendMsgArgs, 'msg'>> {
    const node = await this.getNext(playerId)
    return this.composeResponse(node, playerId)
  }

  public async processAnswer(playerId: number, answer?: string): Promise<string> {
    const [, option] = answer?.split(':') || []
    const { correctAnswer, isCorrect } = await this.verifyAnswer(playerId, option)
    if (isCorrect) {
      return WordListBotAdapter.getCorrectMsgTemplate(option)
    }
    return WordListBotAdapter.getIncorrectMsgTemplate(correctAnswer, option)
  }

  private static getCorrectMsgTemplate(correctAnswer?: string): string {
    return `✅ That's correct, ${correctAnswer} - right answer!`
  }

  private static getIncorrectMsgTemplate(correctAnswer: string, answer?: string): string {
    return `🌚 ouch, '${answer}' that's not correct. Right Answer: '${correctAnswer}'`
  }

  private static getEndMsgTemplate(score: string) {
    return `That's all :C\nScore: ${score}`
  }

  private async composeResponse(
    node: UserWordListMeta['node'] | null,
    playerId: number,
  ): Promise<Omit<SendMsgArgs, 'msg'>> {
    if (!node) {
      const score = await this.getScore(playerId)

      // ignore this promise because it's only gather analytics and not necessary
      // TODO: move somewhere so user can get score before analytics update
      this.onGameEnd(playerId)

      return {
        text: WordListBotAdapter.getEndMsgTemplate(score),
      }
    }
    if (!node?.value.translation?.translationDef) {
      return {
        text: 'упс',
      }
    }
    const { wordDef, options } = node.value

    return {
      text: capitalize(wordDef),
      options: {
        reply_markup: {
          inline_keyboard:
            options?.map(({ text }) => [
              {
                text,
                callback_data: `${this.name}:${text}`,
              },
            ]) || [],
        },
      },
    }
  }
}

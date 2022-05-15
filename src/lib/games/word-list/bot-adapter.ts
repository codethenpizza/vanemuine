import {SendMsgArgs} from "../../bot/base-bot-controller";
import {WordList} from "./index";
import {PrismaClient} from "@prisma/client";
import {capitalize} from "../../../helpers/capitalize";
import {BotController} from "../../bot/bot-controller";
import {UserWordListMeta} from "./types";


export class WordListBotAdapter extends WordList{
  correctMsgTemplate = (correctAnswer?: string): string => `✅ Все верно, ${correctAnswer} это правильный ответ!`
  incorrectMsgTemplate = (correctAnswer: string, answer?: string, ): string => `🌚 Упс, '${answer}' это не верно. Правильный ответ: '${correctAnswer}'`
  endMsgTemplate = (score: string) => `Слова закончились :C\nСкор: ${score}`

  constructor(prisma: PrismaClient, getUser: BotController['getOrCreateUser']) {
    super(prisma, getUser)
  }

  public async startGame(playerId: number): Promise<Omit<SendMsgArgs, 'msg'>> {
    const node = await this.setWordList(playerId);
    return this.composeResponse(node, playerId)
  }

  public async getGameNextStep(playerId: number): Promise<Omit<SendMsgArgs, 'msg'>> {
    const node = await this.getNext(playerId);
    return this.composeResponse(node, playerId)
  }

  public async processAnswer(playerId: number, answer?: string): Promise<string> {
    const [, option] = answer?.split(':') || []
    const {correctAnswer, isCorrect } = await this.verifyAnswer(playerId, option)
    return isCorrect ? this.correctMsgTemplate(option) : this.incorrectMsgTemplate(correctAnswer, option)
  }

  private async composeResponse(node: UserWordListMeta['node'] | null, playerId: number): Promise<Omit<SendMsgArgs, 'msg'>> {
    if (!node) {
      const score = await this.getScore(playerId)
      return {
        text: this.endMsgTemplate(score)
      }
    }
    if (!node?.value.translation?.translationDef) {
      return {
        text: 'упс'
      }
    }
    const {wordDef, options} = node.value

    return {
      text: capitalize(wordDef),
      options:  {
        reply_markup: {
          inline_keyboard: options?.map(({text}) => [
            {
              text,
              callback_data: `${this.name}:${text}`
            }]
          ) || [],
        },
      }
    }
  }
}

import { PrismaClient } from '@prisma/client'
import { InlineKeyboardButton, Message } from 'node-telegram-bot-api'
import { capitalize } from '../../../lib/helpers/capitalize'
import { User } from '../../../types'
import { ProcessErrorArgs, SendMsgArgs } from '../../bot/base-bot-controller'
import { WordList } from './index'
import { UserWordListMeta } from './types'
import { CategoryFriendlyNames } from '../../dictionary/types'

export class WordListBotAdapter extends WordList {
  onGameEnd: (playerId: number) => Promise<void>

  sendMsg: (args: SendMsgArgs) => Promise<void>

  processError: (args: ProcessErrorArgs) => Promise<void>

  constructor(
    prisma: PrismaClient,
    getUser: (telegramId: User['telegramId']) => Promise<User>,
    onGameEnd: (playerId: number) => Promise<void>,
    sendMsg: (args: SendMsgArgs) => Promise<void>,
    processError: (args: ProcessErrorArgs) => Promise<void>,
  ) {
    super(prisma, getUser)
    this.onGameEnd = onGameEnd
    this.sendMsg = sendMsg
    this.processError = processError
  }

  public async startGame(msg: Message): Promise<void> {
    const msgCats = await this.getCategories()
    await this.sendMsg({ msg, ...msgCats })

  }

  public async handleAnswer(msg: Message, data?: string): Promise<void> {
    if (!msg.from?.id) {
      await this.processError({ msg, e: 'listGameHandleAnswer: msg.from?.id empty' })
      return
    }

    /*
    * here used chat id, bc when user clicks on the option
    * bot sends callback with his own id, so for user identifications
    * I use chat id here
    * NOTE: this bot will not be able to work in chat with multiple users
    * // fixme: send userid in query to indefinite user clicked on menu option?
    * */
    const playerId = msg.chat?.id

    if (data?.match(':cat:')) {
      const category = data?.split(':').pop() || ''
      await this.getFirstStep(playerId, category, msg)
      return
    }

    await this.processAnswer(playerId, msg, data)
    await this.getGameNextStep(playerId, msg)
  }

  private async getCategories(): Promise<Omit<SendMsgArgs, 'msg'>> {
    const categories = await this.dictionary.getCategories()

    const options: InlineKeyboardButton[][] = categories?.map((category) => [
      {
        text: CategoryFriendlyNames[category],
        callback_data: `${this.name}:cat:${category}`,
      },
    ]) || []
    options.push([{
      text: 'Random',
      callback_data: `${this.name}:cat:`,
    }])

    return {
      text: capitalize('Please, pick category'),
      options: {
        reply_markup: {
          inline_keyboard: options,
        },
      },
    }
  }

  private async getFirstStep(playerId: number, category: string, msg: Message): Promise<void> {
    const node = await this.setWordList(playerId, category)
    const answer = await this.composeResponse(node, playerId)
    return this.sendMsg({ msg, ...answer })
  }

  private async getGameNextStep(playerId: number, msg: Message): Promise<void> {
    const node = await this.getNext(playerId)
    const nextStep = await this.composeResponse(node, playerId)
    await this.sendMsg({ msg, ...nextStep })
  }

  private async processAnswer(playerId: number, msg: Message, answer?: string): Promise<void> {
    const [, option] = answer?.split(':') || []
    const { correctAnswer, isCorrect } = await this.verifyAnswer(playerId, option)
    if (isCorrect) {
      return this.sendMsg({ msg, text: WordListBotAdapter.getCorrectMsgTemplate(option) })
    }
    return this.sendMsg({ msg, text: WordListBotAdapter.getIncorrectMsgTemplate(correctAnswer, option) })
  }

  private static getCorrectMsgTemplate(correctAnswer?: string): string {
    return `✅ That's correct, ${correctAnswer} - right answer!`
  }

  private static getIncorrectMsgTemplate(correctAnswer: string, answer?: string): string {
    return `🌚 ouch, '${answer}' that's not correct. Right Answer: '${correctAnswer}'`
  }

  private static getEndMsgTemplate(score: string) {
    return `That's all :C Thank you for playing! \nScore: ${score}`
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
    if (!node?.value.trans?.trans) {
      return {
        text: 'ouch',
      }
    }
    const { word, options } = node.value

    return {
      text: capitalize(word),
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

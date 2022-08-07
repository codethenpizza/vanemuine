import { InlineKeyboardButton, Message } from 'node-telegram-bot-api'
import { capitalize } from '../../../lib/helpers/capitalize'
import { TelegramId } from '../../../types'
import { ProcessErrorArgs, SendMsgArgs } from '../../bot/base-bot-controller'
import { WordList } from './index'
import { UserWordListMeta } from './types'
import { Context } from '../../../context/types'

export class WordListBotAdapter extends WordList {
  onGameEnd: (playerId: number) => Promise<void>

  sendMsg: (args: SendMsgArgs) => Promise<void>

  processError: (args: ProcessErrorArgs) => Promise<void>

  ut: Context['ut']

  userStorage: Context['userStorage']

  constructor(
    ctx: Context,
    onGameEnd: (playerId: number) => Promise<void>,
    sendMsg: (args: SendMsgArgs) => Promise<void>,
    processError: (args: ProcessErrorArgs) => Promise<void>,
  ) {
    super(ctx)
    this.onGameEnd = onGameEnd
    this.sendMsg = sendMsg
    this.processError = processError
    this.ut = ctx.ut
    this.userStorage = ctx.userStorage
  }

  public async startGame(msg: Message): Promise<void> {
    const msgCats = await this.getCategories(msg.chat?.id)
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

  // todo: add multilingual support
  private async getCategories(telegramId: TelegramId): Promise<Omit<SendMsgArgs, 'msg'>> {
    const categories = await this.dictionary.getCategories()
    const lng = await this.userStorage.getUserLocale(telegramId)
    const options: InlineKeyboardButton[][] = categories?.map(({categoryName, trans}) => [
      {
        text: trans[lng] || '',
        callback_data: `${this.name}:cat:${categoryName}`,
      },
    ]) || []

    const randomCatName = await this.ut({key: 'quiz:random', telegramId })
    options.push([{
      text: randomCatName,
      callback_data: `${this.name}:cat:`,
    }])

    const text = capitalize(await this.ut({key: 'quiz:pickCategory', telegramId }))

    return {
      text,
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
      const text = await this.getCorrectMsgTemplate(msg.chat.id, option)
      return this.sendMsg({ msg, text })
    }
    const text = await this.getIncorrectMsgTemplate(msg.chat.id, correctAnswer, option)
    return this.sendMsg({ msg, text })
  }

  private async getCorrectMsgTemplate(telegramId: TelegramId, correctAnswer?: string): Promise<string> {
    const msg = await this.ut({key: 'quiz:correct',options: { correctAnswer }, telegramId})
    return `✅ ${msg}`
  }

  private async getIncorrectMsgTemplate(telegramId: TelegramId, correctAnswer: string, answer?: string): Promise<string> {
    const msg = await this.ut({key: 'quiz:incorrect',options: { correctAnswer, answer }, telegramId})
    return `🌚 ${msg}`
  }

  private async getEndMsgTemplate(telegramId: TelegramId, score: string): Promise<string> {
    const msg = await this.ut({key: 'quiz:incorrect', options: { score }, telegramId})
    return `${msg}`
  }

  private async composeResponse(
    node: UserWordListMeta['node'] | null,
    telegramId: TelegramId,
  ): Promise<Omit<SendMsgArgs, 'msg'>> {
    if (!node) {
      const score = await this.getScore(telegramId)

      // ignore this promise because it's only gather analytics and not necessary
      // TODO: move somewhere so user can get score before analytics update
      await this.onGameEnd(telegramId)

      return {
        text: await this.getEndMsgTemplate(telegramId, score),
      }
    }

    const lng = await this.userStorage.getUserLocale(telegramId)
    if (!node?.value.trans?.[lng]) {
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

  // todo: add logger service
  public async logPlayerData(msg: Message): Promise<void> {
    const playerId = msg.from?.id
    if (!playerId) {
      // eslint-disable-next-line no-console
      console.log('logPlayerData: no id', msg)
      return
    }

    const user = await this.userStorage.getOrCreateUser(playerId)
    // eslint-disable-next-line no-console
    console.log('logPlayerData', JSON.stringify({from: msg, user} || {}, undefined, 2))
    // I know, I know, but this is for users fun
    const text = `(ﾉ◕ヮ◕)ﾉ*:･ﾟ Data logged for your id: ${playerId}`
    await this.sendMsg({msg, text})
  }
}

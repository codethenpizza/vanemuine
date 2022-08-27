import { InlineKeyboardButton, Message } from 'node-telegram-bot-api'
import { BaseBotController } from './base-bot-controller'
import { capitalize } from '../../lib/helpers/capitalize'
import { Context } from '../../context/types'

export class BotAuth extends BaseBotController {
  /* update commands callback prefixes */
  public readonly lngUpdate = `${this.name}:lng:`

  public readonly userStorage: Context['userStorage']

  private readonly ut: Context['ut']

  constructor(ctx: Context) {
    super(ctx)
    this.userStorage = ctx.userStorage
    this.ut = ctx.ut
  }

  /*
   * message action available only for admin user (with id from env)
   * */
  public onAdminText(
    regexp: RegExp,
    callback: (msg: Message, match: RegExpExecArray | null) => Promise<any>,
  ): void {
    this.onText(regexp, (msg, match) => {
      if (!BotAuth.isAdmin(msg.from?.id)) {
        this.processError({ msg, e: `User is not admin. Id: ${msg.from?.id}` })
        return
      }
      // eslint-disable-next-line consistent-return
      return callback(msg, match)
    })
  }

  /*
   * message action which tris to authenticate user, but complete action even if can't.
   * use to gather statistics
   * */
  public onAuthText(
    regexp: RegExp,
    callback: (msg: Message, match: RegExpExecArray | null) => Promise<any>,
  ): void {
    this.onText(regexp, async (msg, match) => {
      if (msg.chat?.id) {
        await this.userStorage.getOrCreateUser(msg.chat?.id)
      }
      return callback(msg, match)
    })
  }


  public async requestLangUpdate(msg: Message): Promise<void> {
    const userLocale = await this.userStorage.getUserLocale(msg.chat.id)
    const options: InlineKeyboardButton[][] = ['en', 'ru'].filter(l => l !== userLocale).map((lng) => [
      {
        text: capitalize(lng),
        callback_data: `${this.lngUpdate}${lng}`,
      },
    ]) || []

    const text = await this.ut({key: 'common:updateLng', telegramId: msg.chat.id})
    await this.sendMsg({
      msg,
      text: capitalize(text),
      options: {
        reply_markup: {
          inline_keyboard: options,
        },
      },
    })
  }

  public async updateUserLanguage(msg: Message, data: string): Promise<void> {
    const lng = data.split(':').pop() || ''
    try {
      await this.userStorage.updateUserLng(msg.chat.id, lng)
      const text = await this.ut({key: 'common:done', telegramId: msg.chat.id})
      await this.sendMsg({ msg, text })
    } catch (e) {
      await this.processError({ msg, e })
    }
  }
}

import TelegramBot, {Message, SendMessageOptions} from 'node-telegram-bot-api'
import {Dictionary} from "../dictionary";
import {PrismaClient} from "@prisma/client";
import {config} from "../config";

export type SendMsgArgs = {
  msg: Message, text: string, options?: SendMessageOptions
}

export type ProcessErrorArgs = {
  msg: Message,
  textToSend?: string
  e?: any // error e.g. from catch
}

export class BaseBotController {
  bot: TelegramBot
  dictionary: Dictionary
  errorMsgTemplate = 'Чет не ок'

  constructor(bot: TelegramBot, prisma: PrismaClient) {
    this.bot = bot
    this.dictionary = new Dictionary(prisma)
  }

  protected isAdmin(msg: Optional<number>): boolean {
    return config.bot.adminId === msg
  }

  /* General commands */
  public async sendMsg({msg, text, options}: SendMsgArgs) {
    const chatId = msg.chat.id;
    await this.bot.sendMessage(chatId, text, options)
  }

  public async removeInlineMarkup(chatId: number, msgId: number) {
    try {
      await this.bot.editMessageReplyMarkup({inline_keyboard: []}, {message_id: msgId, chat_id: chatId})
    } catch (e) {
      console.error('removeInlineMarkup err:', e)
    }
  }

  public async ping(msg: Message) {
    try {
      await this.sendMsg({msg, text: `Polo`})
    } catch (e) {
      await this.processError({msg, e})
    }
  }

  public async processError({msg, textToSend, e}: ProcessErrorArgs): Promise<void> {
    console.error(e)
    await this.sendMsg({msg, text: textToSend || this.errorMsgTemplate})
  }

  /* on receive events */
  public onText(regexp: RegExp, callback: (msg: Message, match: RegExpExecArray | null) => Promise<any> | any): void {
    this.bot.onText(regexp, callback)
  }

}

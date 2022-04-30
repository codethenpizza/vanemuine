import TelegramBot, {Message, SendMessageOptions} from 'node-telegram-bot-api'
import {Dictionary} from "../dictionary";
import {PrismaClient} from "@prisma/client";
import {config} from "../config";

export type SendMsgArgs = {
  msg: Message, text: string, options?: SendMessageOptions
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

  public async ping(msg: Message) {
    try {
      await this.sendMsg({msg, text: `Polo`})
    } catch (e) {
      console.error(e)
      await this.sendMsg( {msg, text: this.errorMsgTemplate})
    }
  }
}

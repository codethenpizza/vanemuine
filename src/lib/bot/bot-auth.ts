import {BaseBotController} from "./base-bot-controller";
import TelegramBot, {Message} from "node-telegram-bot-api";
import {PrismaClient} from "@prisma/client";
import {Language} from "../../types";
import {minsToMs} from "../../helpers/mins-to-ms";

export type User = { id: number, telegramId: number, lng: Language }

export class BotAuth extends BaseBotController {
  prisma: PrismaClient
  usersMap: Record<number, User>

  constructor(bot: TelegramBot, prisma: PrismaClient) {
    super(bot, prisma);
    this.prisma = prisma
    this.usersMap = {}
  }

  public async getUserListCount(msg: Message): Promise<void> {
    if (!this.isAdmin(msg.from?.id)) {
      await this.sendMsg({msg, text: this.errorMsgTemplate})
      return
    }
    await this.sendMsg({msg, text: `${Object.keys(this.usersMap)?.length || 0}`})
  }

  public async getOrCreateUser(telegramId: number): Promise<User> {
    if (this.usersMap[telegramId]) {
      return this.usersMap[telegramId]
    }
    const user = await this.prisma.user.upsert({
      where: {
        telegramId
      },
      update: {},
      create: {
        telegramId,
        lng: Language.RU
      }
    })
    this.usersMap[user.telegramId] = user as User
    this.removeUser(telegramId)
    return user as User
  }

  public removeUser(userId: number, force = false) {
    if (force) {
      delete this.usersMap[userId]
      return
    }
    setTimeout(() => delete this.usersMap[userId], minsToMs(30))
  }

}
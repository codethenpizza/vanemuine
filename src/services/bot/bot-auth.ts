import TelegramBot, { Message } from 'node-telegram-bot-api'
import { PrismaClient } from '@prisma/client'
import { Language, User } from '../../types'
import { minsToMs } from '../../lib/helpers/mins-to-ms'
import { BaseBotController } from './base-bot-controller'

export class BotAuth extends BaseBotController {
  prisma: PrismaClient

  private readonly usersMap: Record<number, User>

  constructor(bot: TelegramBot, prisma: PrismaClient) {
    super(bot, prisma)
    this.prisma = prisma
    this.usersMap = {}
  }

  public async getUserListCount(msg: Message): Promise<void> {
    await this.sendMsg({ msg, text: `active users: ${Object.keys(this.usersMap)?.length || 0}` })
  }

  //
  public async getOrCreateUser(telegramId: User['telegramId']): Promise<User> {
    if (this.usersMap[telegramId]) {
      return this.usersMap[telegramId]
    }
    const user = await this.prisma.user.upsert({
      where: {
        telegramId,
      },
      update: {},
      create: {
        telegramId,
        lng: Language.RU,
        gamesPlayed: 0,
      },
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
    setTimeout(() => delete this.usersMap[userId], minsToMs(180))
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
      if (msg.from?.id) {
        await this.getOrCreateUser(msg.from?.id)
      }
      return callback(msg, match)
    })
  }

  // TODO: move somewhere to more related place
  public async updateUserGamesCount(telegramId: number) {
    try {
      const user = await this.getOrCreateUser(telegramId)
      await this.prisma.user.update({
        where: {
          telegramId,
        },
        data: {
          gamesPlayed: user.gamesPlayed + 1,
        },
      })
    } catch (e) {
      console.error('unable to update gamesPlayed', e)
    }
  }
}

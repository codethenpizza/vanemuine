import { PrismaClient } from '@prisma/client'
import { Language, TelegramId, TransLanguage, User } from '../../types'
import { minsToMs } from '../../lib/helpers/mins-to-ms'
import { config } from '../../config'

export class UserStorage {
  /*
  * client of ORM
  * */
  private readonly prisma: PrismaClient


  /*
  * the amount of minute user should be kept in the memory
  * */
  private readonly userInMemoryLifeTime = config.auth.userInMemoryLifeTime

  /*
  * keeps user in memory for N minutes
  * */
  private readonly usersMap: Map<TelegramId, User> = new Map()

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  /*
  * takes a user form database or create new
  * */
  public getOrCreateUser = async (telegramId: TelegramId): Promise<User> => {
    if (this.usersMap.has(telegramId)) {
      return this.usersMap.get(telegramId) as User
    }
    const user = await this.prisma.user.upsert({
      where: {
        telegramId,
      },
      update: {},
      create: {
        telegramId,
        lng: {
          connect: {
            name: Language.EN, // default language
          },
        },
        gamesPlayed: 0,
      },
      include: {
        lng: true,
      },
    })
    this.usersMap.set(user.telegramId, user)
    // eslint-disable-next-line no-console
    console.log(`set in memory user with id ${telegramId}. Date: ${new Date()}`, this.usersMap.get(user.telegramId))

    this.removeUserFromMemory(telegramId)
    return user
  }

  /*
  * return number of users stored in memory
  * */
  public getUsersInMemoryCount = (): number => Object.keys(this.usersMap).length

  /*
  * return users language
  * */
  public getUserLocale = async (telegramId: TelegramId): Promise<TransLanguage> => {
    try {
      const user = await this.getOrCreateUser(telegramId)
      return user.lng.name as TransLanguage || Language.EN
    } catch (e) {
      return Language.EN
    }
  }

  /*
  * remove user from memory after "userInMemoryLifeTime" minutes
  * */
  private removeUserFromMemory = (telegramId: TelegramId, force?: boolean): void => {
    if (force) {
      this.usersMap.delete(telegramId)
      return
    }
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log(`remove user with id ${telegramId} because of AFK. Date: ${new Date()}`, this.usersMap.get(telegramId))
      this.usersMap.delete(telegramId)
    }, minsToMs(this.userInMemoryLifeTime))
  }

  /*
  * updates user data in a database then in memory
  * */
  public updateUserLng = async (telegramId: TelegramId, lng: string): Promise<User> => {
    const user = await this.getOrCreateUser(telegramId)
    if (user.lng.name === lng) {
      throw new Error('updateUserLng: same language')
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { telegramId },
        data: {
          lng: {
            connect: {
              name: lng,
            },
          },
        },
        include: {
          lng: true,
        },
      })
      this.usersMap.set(telegramId, updatedUser)
      return updatedUser
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('unable to update language')
      throw e
    }
  }

  /*
  * set number of games user played
  * */
  public updateUserGamesCount = async (telegramId: number) => {
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

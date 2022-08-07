import { PrismaClient } from '@prisma/client'
import { Context } from './types'
import { UserStorage } from '../data-source/user-storage/user-storage'
import { Translation } from '../data-source/translation/translation'
import { initBot } from '../data-source/telegram-bot/telegram-bot'
import { config } from '../config'

export const createContext = async (): Promise<Context> => {
  const prisma = new PrismaClient()
  const bot = await initBot()
  const userStorage = new UserStorage(prisma)
  const translation = new Translation(userStorage)

  return {
    bot,
    config,
    prisma,
    userStorage: new UserStorage(prisma),
    ut: translation.ut
  }
}

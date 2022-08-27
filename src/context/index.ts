import { PrismaClient } from '@prisma/client'
import { Context } from './types'
import { UserStorage, Translation, initBot } from "./data-source"
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

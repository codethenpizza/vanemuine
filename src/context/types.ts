import { PrismaClient } from '@prisma/client'
import TelegramBot from 'node-telegram-bot-api'
import { UserStorage } from './data-source'
import { UTArgs } from './data-source/translation/types'
import { Config } from '../config/types'

export type Context = {
  bot: TelegramBot
  config: Config
  prisma: PrismaClient
  userStorage: UserStorage
  ut: (args: UTArgs) => Promise<string>
}

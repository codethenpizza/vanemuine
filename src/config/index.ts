import { envFromNodeEnv, numberFromEnv, stringFromEnv } from '../lib/helpers/config'
import { Config } from './types'

require('dotenv').config()

export const config: Config = {
  env: envFromNodeEnv(process.env.NODE_ENV),
  bot: {
    token: stringFromEnv(process.env.BOT_TOKEN),
    url: stringFromEnv(process.env.BOT_URL),
    port: numberFromEnv(process.env.BOT_PORT) || 433,
    adminId: numberFromEnv(process.env.ADMIN_TELEGRAM_ID),
  },
  auth: {
    userInMemoryLifeTimeMinutes: 300
  },
  quiz: {
    maxQuizLength: 8,
    maxAnswerOptionsLength: 4
  }
}

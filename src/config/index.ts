import { Env } from '../types'
import { envFromNodeEnv, numberFromEnv, stringFromEnv } from '../lib/helpers/config'

export type Config = {
  env: Env
  bot: {
    token: string
    port: number
    url: string
    adminId: number
  }
  auth: {
    timeBeforeAfk: number
  }
}

export const config: Config = {
  env: envFromNodeEnv(process.env.NODE_ENV),
  bot: {
    token: stringFromEnv(process.env.BOT_TOKEN),
    url: stringFromEnv(process.env.BOT_URL),
    port: numberFromEnv(process.env.BOT_PORT) || 433,
    adminId: numberFromEnv(process.env.ADMIN_TELEGRAM_ID),
  },
  auth: {
    timeBeforeAfk: 300
  }
}

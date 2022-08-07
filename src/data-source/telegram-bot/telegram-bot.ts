import TelegramBot from 'node-telegram-bot-api'
import { config } from '../../config'

const { url, port, token } = config.bot

type BotOptionsType = {
  polling: boolean
  port?: number | string
}

export const initBot = async (): Promise<TelegramBot> => {
  try {
  // general options
  const botOptions: BotOptionsType = {
    polling: true,
  }

  if (config.env !== 'production') {
    return new TelegramBot(token, botOptions)
  }
  botOptions.port = port
  const bot: TelegramBot = new TelegramBot(token, botOptions)
  await bot.setWebHook(`${url}/bot${token}`, { allowed_updates: ['poll_answer'] })
  return bot
  } catch (e) {
    console.error(e)
    throw process.exit(1)
  }
}

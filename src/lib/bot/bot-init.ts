import TelegramBot from 'node-telegram-bot-api';
import {config} from "../config";

const {url, port, token} = config.bot

type botOptions = {
  polling: boolean,
  port?: number | string
}

const initBot = async () => {
  // general options
  const botOptions: botOptions = {
    polling: true,
  }

  if (config.env !== 'production') {
    return new TelegramBot(token, botOptions);
  }
  botOptions.port = port;
  const bot: TelegramBot = new TelegramBot(token, botOptions);
  await bot.setWebHook(`${url}/bot${token}`, {allowed_updates: ['poll_answer']});
  return bot;
}


const getBot = async (): Promise<TelegramBot> => {
  try {
    return  initBot();
  } catch (e) {
    console.error(e)
    process.exit(1);
  }
}

export default getBot;

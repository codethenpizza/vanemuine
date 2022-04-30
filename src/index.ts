import { PrismaClient } from '@prisma/client'
import TelegramBot from "node-telegram-bot-api";
import getBot from "./lib/bot/bot-init";
import {BotController} from "./lib/bot/bot-controller";

const prisma = new PrismaClient()

async function main() {
  const bot: TelegramBot = await getBot();
  const botController = new BotController(bot, prisma);

  /* General commands */
  bot.onText(/\/marco/, async (msg) => {
    await botController.ping(msg)
  });

  bot.onText(/\/add/, async (msg) => {
    await botController.attemptAddWords(msg)
  });

  /* Walk through dictionary */
  bot.onText(/\/start/, async (msg) => {
    await botController.showDictionary(msg)
  });

  /* Games - Word List */
  bot.onText(/\/list/, async (msg) => {
    console.log(msg)
    await botController.handleWodListGame(msg)
  });

  bot.on("callback_query", async ({message, data}) => {
    if (message) {
      if (data?.match(botController.wordListGame.name)) {
        await botController.listGameNextStep(message, data)
      }
      if (data?.match(botController.dictionary.addAction)) {
        await botController.addAction(message, data)
      }
    }
  });



}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

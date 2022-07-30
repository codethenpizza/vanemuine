import { PrismaClient } from '@prisma/client'
import TelegramBot from 'node-telegram-bot-api'
import { BotController } from './services/bot/bot-controller'
import getBot from './services/bot/bot-init'

const prisma = new PrismaClient()

async function main() {
  const bot: TelegramBot = await getBot()
  const botController = new BotController(bot, prisma)

  /* General commands */
  botController.onAdminText(/\/marco/, async (msg) => {
    await botController.showDictionary(msg)
    await botController.showCategories(msg)
    await botController.ping(msg)
  })

  botController.onAdminText(/\/updateSource/, async (msg) => {
    await botController.updateSource(msg)
  })

  botController.onAdminText(/\/count/, async (msg) => {
    // used to debug active users
    await botController.getUserListCount(msg)
    await botController.sendMsg({ msg, text: `words: ${botController.dictionary.words.length}` })
  })

  /* Walk through dictionary */
  botController.onAuthText(/\/start/, async (msg) => {
    await botController.sendMsg({ msg, text: 'Hi! type /list to start the quiz' })
  })

  /* Games - Word List */
  botController.onAuthText(/\/list/, async (msg) => {
    await botController.wordListGame.startGame(msg)
  })

  bot.on('callback_query', async ({ message, data }) => {
    if (message) {
      if (data?.match(botController.wordListGame.name)) {
        await botController.wordListGame.handleAnswer(message, data)
      }

      await botController.removeInlineMarkup(message.chat.id, message.message_id)
    }
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { BotController } from './services/bot/bot-controller'
import { createContext } from './context'

// todo: fix multiply calls of user storage set

async function main() {
  const ctx = await createContext()
  const botController = new BotController(ctx)

  try {
    /* General commands */
    botController.onAdminText(/\/marco/, async (msg) => {
      await botController.showDictionary(msg)
      await botController.showCategories(msg)
      await botController.ping(msg)
    })

    botController.onAdminText(/\/count/, async (msg) => {
      // used to debug active users
      const activeUsers = botController.userStorage.getUsersInMemoryCount()
      await botController.sendMsg({ msg, text: `active users: ${activeUsers}` })
    })

    /* Walk through dictionary */
    botController.onAuthText(/\/start/, async (msg) => {
      const { id: telegramId } = msg.chat
      const values = await Promise.all([
        ctx.ut({ key: 'common:greeting', telegramId }),
        ctx.ut({ key: 'commands:listDesk', telegramId }),
        ctx.ut({ key: 'commands:lngUpdate', telegramId }),
        ctx.ut({ key: 'common:betaNote', telegramId }),
      ])
      const text = values.join('\n')
      await botController.sendMsg({
        msg,
        text,
      })
    })

    /* Games - Word List */
    botController.onAuthText(/\/list/, async (msg) => {
      await botController.wordListGame.startGame(msg)
    })

    botController.onAuthText(/\/log/, async (msg) => {
      await botController.wordListGame.logPlayerData(msg)
    })

    botController.onAuthText(/\/lng/, async (msg) => {
      await botController.requestLangUpdate(msg)
    })

    ctx.bot.on('callback_query', async ({ message, data }) => {
      if (message) {
        if (data?.match(botController.wordListGame.name)) {
          await botController.wordListGame.handleAnswer(message, data)
        }

        if (data?.match(`${botController.lngUpdate}`)) {
          await botController.updateUserLanguage(message, data)
        }

        await botController.removeInlineMarkup(message.chat.id, message.message_id)
      }
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('global catch', e)
    ctx.prisma.$disconnect()
  } finally {
    ctx.prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    throw e
  })

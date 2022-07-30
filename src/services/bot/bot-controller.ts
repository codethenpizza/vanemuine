import TelegramBot, { Message } from 'node-telegram-bot-api'
import { PrismaClient } from '@prisma/client'
import { BotAuth } from './bot-auth'
import { WordListBotAdapter } from '../games/word-list/bot-adapter'

// todo: add global error catch
export class BotController extends BotAuth {
  wordListGame: WordListBotAdapter

  constructor(bot: TelegramBot, prisma: PrismaClient) {
    super(bot, prisma)
    this.wordListGame = new WordListBotAdapter(
      prisma,
      this.getOrCreateUser.bind(this),
      this.updateUserGamesCount.bind(this),
    )
  }

  public async updateSource(msg: Message) {
    try {
      if (!BotAuth.isAdmin(msg.chat?.id)) {
        await this.sendMsg({ msg, text: 'You are not admin, liar' })
        return
      }

      await this.dictionary.updateSource()
      await this.sendMsg({ msg, text: 'Done' })
    } catch (e) {
      await this.processError({ msg, e })
    }
  }

  /* Show all words from dictionary */
  public async showDictionary(msg: Message) {
    try {
      const words = await this.dictionary.getWords()
      const text = words
        .map(
          ({ word, trans, wordCategory }) =>
            `${word} - ${trans?.trans} (${wordCategory.categoryName})`,
        )
        .join('\n')
      await this.sendMsg({ msg, text: `${words.length} ${text}` })
    } catch (e) {
      console.error(e)
    }
  }

  public async showCategories(msg: Message) {
    try {
      const categories = this.dictionary.getCategoryNames()
      const text = categories.join('\n')
      await this.sendMsg({ msg, text })
    } catch (e) {
      console.error(e)
    }
  }

  /* Word list game */
  public async handleWordListGame(msg: Message) {
    try {
      if (msg.text?.match('/list')) {
        const resp = await this.wordListGame.startGame(msg.chat.id)
        await this.sendMsg({ msg, ...resp })
      }
    } catch (e) {
      await this.processError({ msg, e })
    }
  }

  public async listGameHandleAnswer(msg: Message, answer?: string): Promise<void> {
    if (!msg.from?.id) {
      await this.processError({ msg, e: 'listGameHandleAnswer: msg.from?.id empty' })
      return
    }

    const text = await this.wordListGame.processAnswer(msg.chat?.id, answer)
    await this.sendMsg({ msg, text })
    const nextStep = await this.wordListGame.getGameNextStep(msg.chat.id)
    await this.sendMsg({ msg, ...nextStep })
  }
}

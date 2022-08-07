import { Message } from 'node-telegram-bot-api'
import { BotAuth } from './bot-auth'
import { WordListBotAdapter } from '../games/word-list/bot-adapter'
import { Context } from '../../context/types'

// todo: add global error catch
export class BotController extends BotAuth {
  wordListGame: WordListBotAdapter

  constructor(ctx: Context) {
    super(ctx)
    this.wordListGame = new WordListBotAdapter(
      ctx,
      this.userStorage.updateUserGamesCount.bind(this),
      this.sendMsg.bind(this),
      this.processError.bind(this),
    )
  }

  /* Show all words from dictionary */
  public async showDictionary(msg: Message) {
    try {
      const words = await this.dictionary.getWords()
      const text = words
        .map(
          ({ word, trans, wordCategory }) =>
            `${word}. translations count: ${trans?.length || 0} (${wordCategory.categoryName})`,
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
}

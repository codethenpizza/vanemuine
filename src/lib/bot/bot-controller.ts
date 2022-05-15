import TelegramBot, {Message} from 'node-telegram-bot-api'
import {PrismaClient} from "@prisma/client";
import {BotAuth} from "./bot-auth";
import {WordListBotAdapter} from "../games/word-list/bot-adapter";

export class BotController extends BotAuth {
  wordListGame: WordListBotAdapter

  constructor(bot: TelegramBot, prisma: PrismaClient) {
    super(bot, prisma)
    this.wordListGame = new WordListBotAdapter(prisma, this.getOrCreateUser.bind(this))
  }

  /* Add words */
  public async attemptAddWords(msg: Message) {
    if (!this.isAdmin(msg.from?.id)) {
      await this.processError({msg, e: `User is not admin. Id: ${msg.from?.id}`})
      return
    }
    const [word, translation] = msg.text?.replace('/add', '').trim().split(':') || []
    const text = `Это правильно? ${word} - ${translation}`
    await this.sendMsg({msg, text, options: {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Дa', callback_data: `${this.dictionary.addAction}(${word}:${translation})`}],
            [{text: 'Нет', callback_data: `${this.dictionary.addAction}:false`}]
          ]
        }
      }})
  }

  public async addAction(msg: Message, data: string) {
    try {
      if (!this.isAdmin(msg.chat?.id)) {
        await this.sendMsg({msg, text: 'You are not admin, liar'})
        return
      }
      if (!data || data.match(/false/)) {
        await this.sendMsg({msg, text: 'нет так нет'})
        return
      }
      const match = data.match(/\((.*)\)/)?.pop()
      const [word, translation] = match?.split(':') || []
      await this.dictionary.addWord(word, translation)
      await this.sendMsg({msg, text: 'Done'})
    } catch (e) {
      await this.processError({msg, e})
    }
  }

  /* Show all dictionary */
  public async showDictionary(msg: Message) {
    try {
      const words = await this.dictionary.getWords()
      const text = words.map(({wordDef, translation}) => `${wordDef} - ${translation?.translationDef}`).join('\n')
      await this.sendMsg({msg, text})
    } catch (e) {
      console.error(e)
    }
  }

  /* Word list game */
  public async handleWordListGame(msg: Message) {
    try {
      if (msg.text?.match('\/list')) {
        const resp = await this.wordListGame.startGame(msg.chat.id)
        await this.sendMsg({msg, ...resp});
      }
    } catch (e) {
      await this.processError({msg, e})
    }
  }

  public async listGameHandleAnswer(msg: Message, answer?: string) {
    if (!msg.from?.id) {
      return this.processError({msg, e: 'listGameHandleAnswer: msg.from?.id empty'})
    }

    const text = await this.wordListGame.processAnswer(msg.chat?.id, answer)
    await this.sendMsg({msg, text})
    const nextStep = await this.wordListGame.getGameNextStep(msg.chat.id)
    await this.sendMsg({msg, ...nextStep});
  }
}

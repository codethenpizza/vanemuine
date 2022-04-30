import TelegramBot, {Message} from 'node-telegram-bot-api'
import {PrismaClient} from "@prisma/client";
import {WordList} from "../games/word-list";
import {BotAuth} from "./bot-auth";

export class BotController extends BotAuth {
  wordListGame: WordList

  constructor(bot: TelegramBot, prisma: PrismaClient) {
    super(bot, prisma)
    this.wordListGame = new WordList(prisma)
  }

  /* Add words */
  public async attemptAddWords(msg: Message) {
    if (!this.isAdmin(msg.from?.id)) {
      await this.sendMsg({msg, text: this.errorMsgTemplate})
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
      await this.sendMsg({msg, text: this.errorMsgTemplate})
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
  public async handleWodListGame(msg: Message) {
    try {
      if (msg.text?.match('\/list')) {
        const resp = await this.wordListGame.setWordList(msg.chat.id)
        await this.sendMsg({msg, ...resp});
      }
    } catch (e) {
      await this.sendMsg({msg, text: this.errorMsgTemplate})
    }
  }

  public async listGameNextStep(msg: Message, answer?: string) {
    const text = this.wordListGame.verifyAnswer(answer)
    await this.sendMsg({msg, text})
    const nextStep = await this.wordListGame.getNext(msg.chat.id)
    await this.sendMsg({msg, ...nextStep});
  }
}

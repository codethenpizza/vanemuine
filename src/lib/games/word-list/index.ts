import {PrismaClient} from "@prisma/client";
import {Dictionary} from "../../dictionary";
import {LinkedList, ListNode} from "../../../helpers/linked-list";
import {SendMsgArgs} from "../../bot/base-bot-controller";

type RandomAnswer = {
  text: string
  isCorrect: boolean
}

type PlayerDataWord = Unpacked<Dictionary['words']>

type PlayerData = {
  list: LinkedList<PlayerDataWord>
  node: Nullable<ListNode<PlayerDataWord>>
}

export class WordList {
  listMap: Record<number, PlayerData> // id of player
  dictionary: Dictionary
  translationWords: string[]

  // info
  name = 'word-list-game'
  endMsgTemplate = 'Слова закончились :C'
  correctMsgTemplate = 'Все верно'
  incorrectMsgTemplate = 'Упс, не верно'

  constructor(prisma: PrismaClient) {
    this.dictionary = new Dictionary(prisma)
    this.listMap = {}
    this.translationWords = []
  }



  public async setWordList(playerId: number): Promise<Omit<SendMsgArgs, 'msg'>> {
    const words = await this.dictionary.getWords()
    this.translationWords = words.map(({translation}) => translation?.translationDef).filter(Boolean) as string[]

    const list = new LinkedList(words)
    this.listMap[playerId] = {
      list,
      node: list.firstNode
    }
    return this.composeResponse(list.firstNode)
  }

  public async getNext(playerId: number): Promise<Omit<SendMsgArgs, 'msg'>> {
    const node = this.listMap[playerId].node
    if (node) {
      this.listMap[playerId].node = node.next
    }
    return this.composeResponse(this.listMap[playerId].node)
  }

  public verifyAnswer(answer?: string): string {
    const isCorrect = answer?.match('true')
    return isCorrect ? this.correctMsgTemplate : this.incorrectMsgTemplate
  }

  private composeResponse(node: PlayerData['node'] | null): Omit<SendMsgArgs, 'msg'> {
    if (!node) {
      return {
        text: this.endMsgTemplate
      }
    }
    if (!node?.value.translation?.translationDef) {
      return {
        text: 'упс'
      }
    }

    const text = `${node?.value.wordDef}`
    const answers = this.getAnswers(node?.value.translation?.translationDef)

    return {
      text,
      options:  {
        reply_markup: {
          inline_keyboard: answers.map(({text, isCorrect}) => [{text, callback_data: `${this.name}:${isCorrect}`}])
        }
      }
    }
  }

  private getAnswers(correctAnswer: string): RandomAnswer[] {
    return this.translationWords.map(text => ({text: text.charAt(0).toUpperCase() + text.slice(1), isCorrect: text === correctAnswer }))
  }
}

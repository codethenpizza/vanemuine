import {PrismaClient} from "@prisma/client";
import {Dictionary} from "../../dictionary";
import {LinkedList, ListNode} from "../../../helpers/linked-list";
import {capitalize} from "../../../helpers/capitalize";

export type RandomAnswer = {
  text: string
  isCorrect: boolean
}

export type PlayerDataWord = Unpacked<Dictionary['words']> & { options?: RandomAnswer[] }

export type PlayerData = {
  list: LinkedList<PlayerDataWord>
  node: Nullable<ListNode<PlayerDataWord>>
}

export class WordList {
  listMap: Record<number, PlayerData> // id of player
  dictionary: Dictionary
  translationWords: string[]

  // info
  // TODO: add word length
  name = 'word-list-game'
  endMsgTemplate = 'Слова закончились :C'
  answerOptionsLength = 4

  constructor(prisma: PrismaClient) {
    this.dictionary = new Dictionary(prisma)
    this.listMap = {} // TODO: move user cache to user in bot auth to be able to remove it automatically and avoid memory leak
    this.translationWords = []
  }

  public async setWordList(playerId: number): Promise<ListNode<PlayerDataWord>> {
    const words = await this.dictionary.getWords()
    this.translationWords = words.map(({translation}) => translation?.translationDef).filter(Boolean) as string[]

    const list = new LinkedList(words)
    this.listMap[playerId] = {
      list,
      node: this.composeNodeOptions(list.firstNode)
    }
    return list.firstNode
  }

  public async getNext(playerId: number): Promise<Nullable<ListNode<PlayerDataWord>>> {
    const node = this.listMap[playerId]?.node || null
    if (!node?.next) {
      return null // game is over
    }

    this.listMap[playerId].node = this.composeNodeOptions(node.next)
    return this.listMap[playerId].node
  }

  private composeNodeOptions(node: ListNode<PlayerDataWord>): Nullable<ListNode<PlayerDataWord>> {
    if (!node.value.translation?.translationDef) {
      return node
    }
    node.value.options = this.getOptions(node.value.translation?.translationDef)
    return node
  }

  protected verifyAnswer(playerId: number, answer?: string): { result: boolean, correctAnswer: string } {
    const correctAnswer = this.listMap[playerId]?.node?.value.options?.find(a => a.isCorrect) || null
    return {
      correctAnswer: correctAnswer?.text || '',
      result: correctAnswer?.text === answer
    }
  }

  private getOptions(correctAnswer: string): RandomAnswer[] {
    const shuffled = [...this.translationWords].sort(() => 0.5 - Math.random()).slice(0, this.answerOptionsLength)
    const withCorrectAnswer = Array.from(new Set([...shuffled, correctAnswer]))
    if (withCorrectAnswer.length > this.answerOptionsLength) {
      // remove one element in case if array with answer longer than should
      withCorrectAnswer.shift()
    }
    return withCorrectAnswer.sort(() => 0.5 - Math.random()).map(text => ({
      text: capitalize(text),
      isCorrect: text === correctAnswer
    }))
  }
}

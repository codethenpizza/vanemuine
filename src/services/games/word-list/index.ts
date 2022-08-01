import { PrismaClient } from '@prisma/client'
import { User } from 'types'
import { LinkedList, ListNode } from '../../../lib/helpers/linked-list'
import { capitalize } from '../../../lib/helpers/capitalize'
import { Dictionary } from '../../dictionary'
import { PlayerDataWord, RandomAnswer, UserWordListMeta, VerifyAnswerRes } from './types'

export class WordList {
  dictionary: Dictionary

  translationWords: string[]

  getUser: (telegramId: User['telegramId']) => Promise<User>

  // info
  name = 'word-list-game'

  maxQuizLength = 10

  maxAnswerOptionsLength = 4

  constructor(prisma: PrismaClient, getUser: (telegramId: User['telegramId']) => Promise<User>) {
    this.dictionary = new Dictionary(prisma)
    this.getUser = getUser
    this.translationWords = [] // used to generate random answers
  }

  /*
   * get words and create linked list for future iterations
   * */
  public async setWordList(playerId: number, category: string): Promise<ListNode<PlayerDataWord>> {
    const allWords = await this.dictionary.getWords()
    await this.prepareAnswerWords()

    const gameWords = allWords
      .filter(({wordCategory}) => category ? wordCategory.categoryName === category : true).sort(() => 0.5 - Math.random())
      .slice(0, this.maxQuizLength)

    const list = new LinkedList(gameWords)
    await this.updateUserMetaWithWordsList(playerId, list)
    return list.firstNode
  }

  /*
   * set next step and return it
   * */
  public async getNext(playerId: number): Promise<Nullable<ListNode<PlayerDataWord>>> {
    const node = (await this.getNode(playerId)) || null
    if (!node?.next) {
      return null // game is over
    }

    return this.updateNode(playerId, this.composeNodeOptions(node.next))
  }

  /*
  * map through the dictionary to create random words answers
  * */
  private async prepareAnswerWords() {
    const allWords = await this.dictionary.getWords()

    this.translationWords = allWords
      .map(({ trans }) => trans?.trans)
      .sort(() => 0.5 - Math.random())
  }

  /*
   * populate word node with answers for quiz
   * */
  private composeNodeOptions(node: ListNode<PlayerDataWord>): ListNode<PlayerDataWord> {
    if (!node.value.trans?.trans) {
      return node
    }
    // temporary suppress to update linked list node
    // eslint-disable-next-line no-param-reassign
    node.value.options = this.getOptions(node.value.trans?.trans)
    return node
  }

  /*
   * verify answer and return boolean isCorrect and correct answer
   * */
  protected async verifyAnswer(playerId: number, answer?: string): Promise<VerifyAnswerRes> {
    const node = await this.getNode(playerId)
    const correctAnswer = node?.value.options?.find((a) => a.isCorrect) || null
    const isCorrect = correctAnswer?.text === answer
    if (isCorrect) {
      await this.updateScore(playerId)
    }

    return {
      correctAnswer: correctAnswer?.text || '',
      isCorrect,
    }
  }

  /*
   * return shuffled answer options with correct answer
   * */
  private getOptions(correctAnswer: string): RandomAnswer[] {
    const shuffled = [...this.translationWords]
      .sort(() => 0.5 - Math.random())
      .slice(0, this.maxAnswerOptionsLength)
    const withCorrectAnswer = Array.from(new Set([...shuffled, correctAnswer]))
    if (withCorrectAnswer.length > this.maxAnswerOptionsLength) {
      // remove one element in case if array with answer longer than should
      withCorrectAnswer.shift()
    }
    return withCorrectAnswer
      .sort(() => 0.5 - Math.random())
      .map((text) => ({
        text: capitalize(text),
        isCorrect: text === correctAnswer,
      }))
  }

  /*
   * add game temporary metadata to user which stored in memory
   * todo: move to adapter?
   * */
  private async updateUserMetaWithWordsList(
    playerId: number,
    list: UserWordListMeta['list'],
  ): Promise<void> {
    const user = await this.getUser(playerId)
    const userMeta: UserWordListMeta = {
      list,
      node: this.composeNodeOptions(list.firstNode),
      score: 0,
    }
    user.meta = {
      ...user.meta,
      [this.name]: userMeta,
    }
  }

  /*
   * create metadata if user was removed from memory because of long afk
   * */
  private async getUserMeta(playerId: number): Promise<Nullable<UserWordListMeta>> {
    const user = await this.getUser(playerId)
    if (!user.meta?.[this.name]) {
      // await this.setWordList(playerId, '') // fixme: save category somewhere or drop game?
      return null
    }
    return user.meta?.[this.name] as UserWordListMeta
  }

  /*
   * get current step of the game
   * */
  private async getNode(playerId: number): Promise<Nullable<ListNode<PlayerDataWord>>> {
    const userMeta = await this.getUserMeta(playerId)
    return userMeta?.node || null
  }

  /*
   * used to set next step of the game
   * */
  private async updateNode(
    playerId: number,
    node: ListNode<PlayerDataWord>,
  ): Promise<Nullable<ListNode<PlayerDataWord>>> {
    const userMeta = await this.getUserMeta(playerId)
    if (!userMeta) {
      return null
    }
    userMeta.node = node
    return node
  }

  /*
   * get a user score of current game
   * */
  public async getScore(playerId: number): Promise<string> {
    const userMeta = await this.getUserMeta(playerId)

    if (!userMeta) {
      return `looks like game was dropped because of long timout :C`
    }
    return `${userMeta?.score} / ${userMeta?.list.length}`
  }

  /*
   * update user score of current game
   * */
  private async updateScore(playerId: number): Promise<number> {
    const userMeta = await this.getUserMeta(playerId)
    if (!userMeta) {
      return 0
    }
    userMeta.score = ++userMeta.score
    return userMeta.score
  }
}

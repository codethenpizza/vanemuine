import { LinkedList, ListNode } from '../../../lib/helpers/linked-list'
import { capitalize } from '../../../lib/helpers/capitalize'
import { Dictionary } from '../../dictionary'
import { PlayerDataWord, RandomAnswer, UserWordListMeta, VerifyAnswerRes, WordListTransWordsMap } from './types'
import { Language, TransLanguage } from '../../../types'
import { Context } from '../../../context/types'

// todo: move all player related logic to adapter
export class WordList {
  protected readonly dictionary: Dictionary

  // used to generate random answers
  protected translationWords: WordListTransWordsMap

  protected readonly userStorage: Context['userStorage']

  // info
  public readonly name = 'word-list-game'

  protected readonly maxQuizLength = 10

  protected readonly maxAnswerOptionsLength = 4

  constructor(ctx: Context) {
    this.dictionary = new Dictionary(ctx)
    this.userStorage = ctx.userStorage
    this.translationWords = {
      [Language.EN]: [],
      [Language.RU]: []
    }
  }

  /*
   * get words and create a linked list for future iterations
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
    const lng = await this.userStorage.getUserLocale(playerId)
    return this.updateNode(playerId, this.composeNodeOptions(node.next, lng))
  }

  /*
  * map through the dictionary to create random words answers
  * */
  private async prepareAnswerWords() {
    const allWords = await this.dictionary.getWords()

    this.translationWords = allWords.reduce<WordListTransWordsMap>((map, {trans}) => {
      (Object.entries(trans) as  [TransLanguage, string][]).forEach(([lng , value]) => {
        if (map[lng]) {
          map[lng]?.push(value)
        } else {
          map[lng] = [value]
        }
      })
      return map
    }, {})
  }

  /*
   * populate word node with answers for quiz
   * */
  private composeNodeOptions(node: ListNode<PlayerDataWord>, lng: TransLanguage): ListNode<PlayerDataWord> {
    if (!node.value.trans) {
      return node
    }
    // temporary suppress to update linked list node
    // eslint-disable-next-line no-param-reassign
    node.value.options = this.getOptions(node.value.trans[lng], lng)
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
  private getOptions(correctAnswer: string, lng: TransLanguage): RandomAnswer[] {
    const shuffled = [...(this.translationWords[lng] || [])]
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
    const user = await this.userStorage.getOrCreateUser(playerId)
    const userMeta: UserWordListMeta = {
      list,
      node: this.composeNodeOptions(list.firstNode, user.lng.name as TransLanguage),
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
    const user = await this.userStorage.getOrCreateUser(playerId)
    if (!user.meta?.[this.name]) {
      // await this.setWordList(playerId, '') // fixme: save category somewhere or drop game?
      return null
    }
    return user.meta?.[this.name] as UserWordListMeta
  }

  /*
   * get a current step of the game
   * */
  private async getNode(playerId: number): Promise<Nullable<ListNode<PlayerDataWord>>> {
    const userMeta = await this.getUserMeta(playerId)
    return userMeta?.node || null
  }

  /*
   * used to set the next step of the game
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

import { PrismaClient, Translation, Word, WordCategory } from '@prisma/client'
import { Language } from '../../types'
import { CategoryNames, DictionaryLoadingState } from './types'
import { categorySource } from '../../source'

type DictionaryWord = Pick<Word, 'id' | 'word'> & {
  trans: Pick<Translation, 'trans'>
  wordCategory: Pick<WordCategory, 'categoryName'>
}

export class Dictionary {
  loadingState: DictionaryLoadingState

  prisma: PrismaClient

  words: DictionaryWord[]

  categories: CategoryNames[]

  constructor(prismaClient: PrismaClient) {
    this.loadingState = DictionaryLoadingState.PENDING
    this.prisma = prismaClient
    this.words = []
    this.categories = []
  }

  private setLoadingStatus(status: DictionaryLoadingState): void {
    this.loadingState = status
  }

  /*
   * update words from the source
   * */
  public async updateSource(): Promise<void> {
    // TODO: add bulk create with relations
    for (const [categoryName, words] of Object.entries(categorySource)) {
      await this.prisma.wordCategory.create({
        data: {
          categoryName,
          words: {
            create: words.map(({ word, trans }) => ({
              word,
              trans: {
                create: {
                  trans,
                  lang: Language.RU,
                },
              },
            })),
          },
        },
      })
    }
  }

  private async loadSource(): Promise<void> {
    try {
      this.setLoadingStatus(DictionaryLoadingState.LOADING)
      // todo: make word translation required on db side
      // @ts-ignore
      this.words = await this.prisma.word.findMany({
        select: {
          id: true,
          word: true,
          trans: {
            select: {
              trans: true,
            },
          },
          wordCategory: {
            select: {
              categoryName: true,
            },
          },
        },
      })

      this.categories = Array.from(
        new Set(this.words.map(({ wordCategory }) => wordCategory.categoryName)),
      ) as CategoryNames[]
      this.setLoadingStatus(DictionaryLoadingState.PENDING)
    } catch (e) {
      console.error(e)
      this.setLoadingStatus(DictionaryLoadingState.ERROR)
    }
  }

 /*
 * return array of CategoryNames or try to load them
 * */
  public async getCategories(force = false): Promise<CategoryNames[]> {
    if (this.categories.length && !force) {
      return this.categories
    }
    await this.loadSource()
    return this.categories
  }

  /*
   * return loaded words or tries to load them
   * */
  public async getWords(force = false): Promise<DictionaryWord[]> {
    if (this.words.length && !force) {
      return this.words
    }
    await this.loadSource()
    return this.words
  }

  public getCategoryNames(): string[] {
    return this.categories
  }
}

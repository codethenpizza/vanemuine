import { PrismaClient, Word, Translation, WordCategory } from '@prisma/client'
import { CategoryNames, DictionaryLoadingState } from './types'
import { Language } from '../../types'
import { categorySource } from './source'

type DictionaryWord = Pick<Word, 'id' | 'wordDef'> & {
  translation: Pick<Translation, 'translationDef'> | null
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
   * update words from the source (currently from dictionary/source.ts)
   * */
  public async updateSource(): Promise<void> {
    // TODO: add bulk create with relations
    for (const [categoryName, words] of Object.entries(categorySource)) {
      await this.prisma.wordCategory.create({
        data: {
          categoryName,
          words: {
            create: words.map(({ wordDef, translationDef }) => ({
              wordDef,
              translation: {
                create: {
                  translationDef,
                  lang: Language.RU,
                },
              },
            })),
          },
        },
      })
    }
  }

  /*
   * return loaded words or ties to load them
   * */
  public async getWords(force = false): Promise<DictionaryWord[]> {
    if (this.words.length && !force) {
      return this.words
    }
    try {
      this.setLoadingStatus(DictionaryLoadingState.LOADING)
      this.words = await this.prisma.word.findMany({
        select: {
          id: true,
          wordDef: true,
          translation: {
            select: {
              translationDef: true,
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
      return this.words
    } catch (e) {
      console.error(e)
      this.setLoadingStatus(DictionaryLoadingState.ERROR)
      return this.words
    }
  }

  public getCategoryNames(): string[] {
    return this.categories
  }
}

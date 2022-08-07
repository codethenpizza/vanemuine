import {
  DictionaryCategory,
  DictionaryCategoryTrans,
  DictionaryLoadingState,
  DictionaryWord,
} from './types'
import { Context } from '../../context/types'
import { TransLanguage } from '../../types'

export class Dictionary {
  loadingState: DictionaryLoadingState

  prisma: Context['prisma']

  words: DictionaryWord[]

  categories: DictionaryCategory[]

  constructor({ prisma }: Context) {
    this.loadingState = DictionaryLoadingState.PENDING
    this.prisma = prisma
    this.words = []
    this.categories = []
  }

  private setLoadingStatus(status: DictionaryLoadingState): void {
    this.loadingState = status
  }

  // todo: clean up this
  private async loadSource(): Promise<void> {
    try {
      this.setLoadingStatus(DictionaryLoadingState.LOADING)
      const dbWords = await this.prisma.word.findMany({
        select: {
          id: true,
          word: true,
          trans: {
            select: {
              trans: true,
              lng: {
                select: {
                  name: true,
                },
              },
            },
          },
          wordCategory: {
            select: {
              categoryName: true,
              wordCategoryTrans: {
                select: {
                  name: true,
                  lng: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      this.words = dbWords.map(({ trans, wordCategory, ...rest }) => ({
        ...rest,
        trans: trans.reduce((map, { trans: wordTrans, lng }) => {
          // @ts-ignore
          map[lng.name] = wordTrans
          return map
        }, {}),
        wordCategory: {
          categoryName: wordCategory.categoryName,
          trans: wordCategory.wordCategoryTrans.reduce<DictionaryCategoryTrans>((map, { lng, name }) => {
            const lngName = lng?.name
            if (lngName) {
              // @ts-ignore
              map[lngName as TransLanguage] = name
            }
            return map
          }, {}),
        }
      }))

      this.updateCategories()
      this.setLoadingStatus(DictionaryLoadingState.PENDING)
    } catch (e) {
      console.error(e)
      this.setLoadingStatus(DictionaryLoadingState.ERROR)
    }
  }

  /*
  * update local categories after word update
  * */
  private updateCategories(): void {
    const uniqueCatsMap = this.words.map(({wordCategory}) => wordCategory).reduce<Record<string, any>>((map, cat) => {
      map[cat.categoryName] = cat
      return map
    }, {})
    this.categories = Object.values(uniqueCatsMap)
  }


  /*
  * return array of CategoryNames or try to load them
  * */
  public async getCategories(force = false): Promise<DictionaryCategory[]> {
    if (this.categories.length && !force
    ) {
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

  public getCategoryNames = (): DictionaryCategory[] => this.categories
}

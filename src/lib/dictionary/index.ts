import {PrismaClient} from "@prisma/client";
import {DictionaryLoadingState} from "./types";
import {Language} from "../../types";

type DictionaryWords = { id: number, wordDef: string, translation: { translationDef: string } | null }[]

export class Dictionary {
  addAction = `addAction`
  loadingState: DictionaryLoadingState
  prisma: PrismaClient
  words: DictionaryWords

  constructor(prismaClient: PrismaClient) {
    this.loadingState = DictionaryLoadingState.PENDING
    this.prisma = prismaClient
    this.words = []
  }

  private isLoading(): boolean {
    return this.loadingState === DictionaryLoadingState.LOADING
  }

  private setLoadingStatus(status: DictionaryLoadingState): void {
    this.loadingState = status
  }

  public async addWord(word: string, translation: string): Promise<void> {
    if (!word.length || !translation.length) {
      throw new Error(`addWord error: word and translation are required`)
    }
    await this.prisma.word.create({
      data: {
        wordDef: word,
        translation: {
          create: {
            translationDef: translation,
            lang: Language.RU
          }
        }
      }
    })
    await this.getWords(true)
  }

  public async getWords(force = false): Promise<DictionaryWords> {
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
            }
          }
        }
      })
      this.setLoadingStatus(DictionaryLoadingState.PENDING)
      return this.words
    } catch (e) {
      console.error(e)
      this.setLoadingStatus(DictionaryLoadingState.ERROR)
      return this.words
    }
  }
}

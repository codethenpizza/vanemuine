import { Lang, Translation, Word, WordCategory, WordCategoryTrans } from '@prisma/client'
import { TransLanguage } from '../../../types'

export enum DictionaryLoadingState {
  PENDING = 'pending',
  LOADING = 'loading',
  ERROR = 'error',
}

export enum CategoryNames {
  ANIMALS = 'animals',
  DAYS_OF_WEEK = 'daysOfWeek',
  FOOD = 'food',
  // TIME = 'time',
  MONTH = 'month',
  GENERAL = 'general',
  PRONOUNCE = 'pronouns',
  QUESTIONS = 'questions'
}

export type DictionaryTrans = Record<Lang['name'], Translation['trans']>

export type DBCategory = {
  name: Pick<WordCategory, 'categoryName'>,
  wordCategoryTrans: {
    name: Pick<WordCategoryTrans, 'name'>
    lng: Pick<Lang, 'name'>
  }[]
}

export type DictionaryCategoryTrans = Partial<Record<TransLanguage, Extract<WordCategoryTrans, 'name'>>>

export type DictionaryCategory = Pick<WordCategory, 'categoryName'>
  & {
  trans: DictionaryCategoryTrans
}


export type DictionaryWord = Pick<Word, 'id' | 'word'> & {
  trans: DictionaryTrans
  wordCategory: DictionaryCategory
}


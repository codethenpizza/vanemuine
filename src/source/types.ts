import { Word } from '@prisma/client'
import { TransLanguage } from '../types'
import { CategoryNames } from '../services/dictionary/types'

export type TransSource = { lng: TransLanguage, tword: string }
export type WordSource = { trans: TransSource[] } & Pick<Word, 'word'>
export type WordsSourceMap = Record<CategoryNames, WordSource[]>


export type CategoryTransSource = {lng: TransLanguage, name: string}

export type CategorySourceMap = Partial<Record<CategoryNames, Array<CategoryTransSource>>>

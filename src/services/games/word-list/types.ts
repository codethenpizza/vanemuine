import { LinkedList, ListNode } from '../../../lib/helpers/linked-list'
import { Dictionary } from '../../dictionary'
import { TransLanguage } from '../../../types'

export type RandomAnswer = {
  text: string
  isCorrect: boolean
}

export type PlayerDataWord = Unpacked<Dictionary['words']> & { options?: RandomAnswer[] }

export type UserWordListMeta = {
  list: LinkedList<PlayerDataWord>
  node: Nullable<ListNode<PlayerDataWord>>
  score: number
}

export type VerifyAnswerRes = { isCorrect: boolean; correctAnswer: string }

export type WordListTransWordsMap = Partial<Record<TransLanguage, string[]>>

import { Dictionary } from '../../dictionary'
import { LinkedList, ListNode } from '../../../helpers/linked-list'

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

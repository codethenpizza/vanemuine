import { Word } from '@prisma/client'
import { CategoryNames } from '../services/dictionary/types'

type WordSource = { trans: string } & Pick<Word, 'word'>
type CategorySource = Record<CategoryNames, WordSource[]>

export const categorySource: CategorySource = {
  [CategoryNames.BASIC]: [
    {
      word: 'aitäh',
      trans: 'thank you',
    },
    {
      word: 'palun',
      trans: 'please',
    },
    {
      word: 'tere',
      trans: 'hello',
    },
    {
      word: 'kuidas läheb?',
      trans: 'how are you?',
    },
  ],
  [CategoryNames.FOOD]: [
    {
      word: 'mesi',
      trans: 'honey',
    },
    {
      word: 'leiba',
      trans: 'bread',
    },
    {
      word: 'kana',
      trans: 'chicken',
    },
    {
      word: 'veiseliha',
      trans: 'beef',
    },
    {
      word: 'sealiha',
      trans: 'pork',
    },
    {
      word: 'vorst',
      trans: 'sausage',
    },
  ],
  [CategoryNames.ANIMALS]: [
    {
      word: 'kass',
      trans: 'cat',
    },
    {
      word: 'koer',
      trans: 'dog',
    },
  ],
  [CategoryNames.DAYS_OF_WEEK]: [
    {
      word: 'esmaspäev',
      trans: 'monday',
    },
    {
      word: 'teisipäev',
      trans: 'tuesday',
    },
    {
      word: 'kolmapäev',
      trans: 'Wednesday',
    },
    {
      word: 'neljapäev',
      trans: 'thursday',
    },
    {
      word: 'reedel',
      trans: 'friday',
    },
    {
      word: 'laupäev',
      trans: 'saturday',
    },
    {
      word: 'pühapäev',
      trans: 'sunday',
    },
  ],
  [CategoryNames.MONTH]: [
    {
      word: 'jaanuar',
      trans: 'january',
    },
    {
      word: 'veebruar',
      trans: 'february',
    },
    {
      word: 'märts',
      trans: 'march',
    },
    {
      word: 'aprill',
      trans: 'april',
    },
    {
      word: 'mai',
      trans: 'may',
    },
    {
      word: 'juuni',
      trans: 'june',
    },
    {
      word: 'juuli',
      trans: 'july',
    },
    {
      word: 'august',
      trans: 'august',
    },
    {
      word: 'september',
      trans: 'september',
    },
    {
      word: 'oktoober',
      trans: 'october',
    },
    {
      word: 'november',
      trans: 'november',
    },
    {
      word: 'detsember',
      trans: 'december',
    },
  ],
  [CategoryNames.PRONOUNCE]: [
    {
      word: 'mina',
      trans: 'i'
    },
    {
      word: 'sina',
      trans: 'you (singular)'
    },
    {
      word: 'tema',
      trans: 'he/she'
    },
    {
      word: 'meie',
      trans: 'we'
    },
    {
      word: 'teie',
      trans: 'you (plural)'
    },
    {
      word: 'nemad',
      trans: 'they'
    },
  ],
  [CategoryNames.QUESTIONS]: [
    {
      word: 'kuidas?',
      trans: 'how?',
    },
    {
      word: 'mis/mida?',
      trans: 'what?'
    },
    {
      word: 'kes?',
      trans: 'who?'
    },
    {
      word: 'miks?',
      trans: 'why?'
    },
    {
      word: 'kus?',
      trans: 'where?'
    },
  ]
}


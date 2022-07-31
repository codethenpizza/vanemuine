import { Word } from '@prisma/client'
import { CategoryNames } from '../services/dictionary/types'

type WordSource = { trans: string } & Pick<Word, 'word'>
type CategorySource = Record<CategoryNames, WordSource[]>

export const categorySource: CategorySource = {
  [CategoryNames.GENERAL]: [
    {
      word: 'aitäh',
      trans: 'thank',
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
    {
      word: 'hästi',
      trans: 'well',
    },
    {
      word: 'nii',
      trans: 'so',
    },
    {
      word: 'vaata',
      trans: 'see',
    },
    {
      word: 'ei',
      trans: 'no',
    },
    {
      word: 'jah',
      trans: 'yes',
    },
    {
      word: 'võib-olla',
      trans: 'perhaps',
    },
    {
      word: 'avatud',
      trans: 'open',
    },
    {
      word: 'muusika',
      trans: 'music',
    },
    {
      word: 'kuum',
      trans: 'hot',
    },
    {
      word: 'külm',
      trans: 'cold',
    },
    {
      word: 'oht',
      trans: 'danger',
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
    {
      word: 'kala',
      trans: 'fish',
    },
    {
      word: 'piim',
      trans: 'milk',
    },
    {
      word: 'suhkur',
      trans: 'sugar',
    },
    {
      word: 'soola',
      trans: 'salt',
    },
  ],
  [CategoryNames.ANIMALS]: [
    {
      word: 'loomade',
      trans: 'animal',
    },
    {
      word: 'kass',
      trans: 'cat',
    },
    {
      word: 'koer',
      trans: 'dog',
    },
    {
      word: 'hobune',
      trans: 'horse',
    },
    {
      word: 'rott',
      trans: 'rat',
    },
    {
      word: 'hirved',
      trans: 'deer',
    },
    {
      word: 'hirved',
      trans: 'deer',
    },
    {
      word: 'tuhkur',
      trans: 'ferret',
    },
    {
      word: 'papagoi',
      trans: 'parrot',
    },
    {
      word: 'küülik',
      trans: 'rabbit',
    },
    {
      word: 'kilpkonn',
      trans: 'turtle',
    },
    {
      word: 'ämblik',
      trans: 'spider',
    },
    {
      word: 'madu',
      trans: 'snake',
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
    {
      word: 'nädal',
      trans: 'week',
    },
    {
      word: 'nädalavahetusel',
      trans: 'weekend',
    },
    {
      word: 'nädalapäevad',
      trans: 'weekdays',
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
    {
      word: 'kuu',
      trans: 'month',
    },
    // add seasons
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


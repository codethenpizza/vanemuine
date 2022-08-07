import { CategoryNames } from '../services/dictionary/types'
import { Language } from '../types'
import { CategorySourceMap, WordsSourceMap } from './types'

export const CategoryFriendlyNamesEn: Record<CategoryNames, string> = {
  [CategoryNames.ANIMALS]: 'Animals',
  [CategoryNames.DAYS_OF_WEEK]: 'Days Of Week',
  [CategoryNames.FOOD]: 'Food',
  [CategoryNames.MONTH]: 'Months',
  [CategoryNames.GENERAL]: 'General',
  [CategoryNames.PRONOUNCE]: 'Pronouns',
  [CategoryNames.QUESTIONS]: 'Questions',
  /*
  * family
  * time
  * seasons?
  * */
}

export const CategoryFriendlyNamesRu: Record<CategoryNames, string> = {
  [CategoryNames.ANIMALS]: 'Животные',
  [CategoryNames.DAYS_OF_WEEK]: 'Дни недели',
  [CategoryNames.FOOD]: 'Еда',
  [CategoryNames.MONTH]: 'Месяца',
  [CategoryNames.GENERAL]: 'Общее',
  [CategoryNames.PRONOUNCE]: 'Местоимения',
  [CategoryNames.QUESTIONS]: 'Вопросы',
  /*
  * family
  * time
  * seasons?
  * */
}

export const getCategoryTranslations = (): CategorySourceMap => (Object.values(CategoryNames) as CategoryNames[]).reduce<CategorySourceMap>((m, cat) => {
  // eslint-disable-next-line no-param-reassign
  m[cat] = [
    { lng: Language.EN, name: CategoryFriendlyNamesEn[cat] },
    { lng: Language.RU, name: CategoryFriendlyNamesRu[cat] },
  ]
  return m
}, {})

export const wordsSource: WordsSourceMap = {
  [CategoryNames.GENERAL]: [
    {
      word: 'aitäh',
      trans: [
        {
          tword: 'thank',
          lng: Language.EN,
        },
        {
          tword: 'thank',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'palun',
      trans: [
        {
          tword: 'please',
          lng: Language.EN,
        }, {
          tword: 'please',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'tere',
      trans: [
        {
          tword: 'hello',
          lng: Language.EN,
        }, {
          tword: 'hello',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'kuidas läheb?',
      trans: [
        {
          tword: 'how are you?',
          lng: Language.EN,
        }, {
          tword: 'how are you?',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'hästi',
      trans: [
        {
          tword: 'well',
          lng: Language.EN,
        }, {
          tword: 'well',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'nii',
      trans: [
        {
          tword: 'so',
          lng: Language.EN,
        }, {
          tword: 'so',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'vaata',
      trans: [
        {
          tword: 'see',
          lng: Language.EN,
        }, {
          tword: 'see',
          lng: Language.RU,
        },

      ],
    },
    {
      word: 'ei',
      trans: [
        {
          tword: 'no',
          lng: Language.EN,
        }, {
          tword: 'no',
          lng: Language.RU,
        },

      ],
    },
    {
      word: 'jah',
      trans: [
        {
          tword: 'yes',
          lng: Language.EN,
        }, {
          tword: 'yes',
          lng: Language.RU,
        },

      ],
    },
    {
      word: 'võib-olla',
      trans: [
        {
          tword: 'perhaps',
          lng: Language.EN,
        }, {
          tword: 'perhaps',
          lng: Language.RU,
        },

      ],
    },
    {
      word: 'avatud',
      trans: [
        {
          tword: 'open',
          lng: Language.EN,
        }, {
          tword: 'open',
          lng: Language.RU,
        },

      ],
    },
    {
      word: 'muusika',
      trans: [
        {
          tword: 'music',
          lng: Language.EN,
        }, {
          tword: 'music',
          lng: Language.RU,
        },

      ],
    },
    {
      word: 'kuum',
      trans: [
        {
          tword: 'hot',
          lng: Language.EN,
        }, {
          tword: 'hot',
          lng: Language.RU,
        },

      ],
    },
    {
      word: 'külm',
      trans: [
        {
          tword: 'cold',
          lng: Language.EN,
        }, {
          tword: 'cold',
          lng: Language.RU,
        },

      ],
    },
    {
      word: 'oht',
      trans: [
        {
          tword: 'danger',
          lng: Language.EN,
        }, {
          tword: 'danger',
          lng: Language.RU,
        },

      ],
    },
  ],
  [CategoryNames.FOOD]: [
    {
      word: 'mesi',
      trans: [
        {
          tword: 'honey',
          lng: Language.EN,
        }, {
          tword: 'honey',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'leiba',
      trans: [
        {
          tword: 'bread',
          lng: Language.EN,
        }, {
          tword: 'bread',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'kana',
      trans: [
        {
          tword: 'chicken',
          lng: Language.EN,
        }, {
          tword: 'chicken',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'veiseliha',
      trans: [
        {
          tword: 'beef',
          lng: Language.EN,
        }, {
          tword: 'beef',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'sealiha',
      trans: [
        {
          tword: 'pork',
          lng: Language.EN,
        }, {
          tword: 'pork',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'vorst',
      trans: [
        {
          tword: 'sausage',
          lng: Language.EN,
        }, {
          tword: 'sausage',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'kala',
      trans: [
        {
          tword: 'fish',
          lng: Language.EN,
        }, {
          tword: 'fish',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'piim',
      trans: [
        {
          tword: 'milk',
          lng: Language.EN,
        }, {
          tword: 'milk',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'suhkur',
      trans: [
        {
          tword: 'sugar',
          lng: Language.EN,
        }, {
          tword: 'sugar',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'soola',
      trans: [
        {
          tword: 'salt',
          lng: Language.EN,
        }, {
          tword: 'salt',
          lng: Language.RU,
        },
      ],
    },
  ],
  [CategoryNames.ANIMALS]: [
    {
      word: 'loomade',
      trans: [
        {
          tword: 'animal',
          lng: Language.EN,
        }, {
          tword: 'animal',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'kass',
      trans: [
        {
          tword: 'cat',
          lng: Language.EN,
        }, {
          tword: 'cat',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'koer',
      trans: [
        {
          tword: 'dog',
          lng: Language.EN,
        }, {
          tword: 'dog',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'hobune',
      trans: [
        {
          tword: 'horse',
          lng: Language.EN,
        }, {
          tword: 'horse',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'rott',
      trans: [
        {
          tword: 'rat',
          lng: Language.EN,
        }, {
          tword: 'rat',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'hirved',
      trans: [
        {
          tword: 'deer',
          lng: Language.EN,
        }, {
          tword: 'deer',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'hirved',
      trans: [
        {
          tword: 'deer',
          lng: Language.EN,
        }, {
          tword: 'deer',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'tuhkur',
      trans: [
        {
          tword: 'ferret',
          lng: Language.EN,
        }, {
          tword: 'ferret',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'papagoi',
      trans: [
        {
          tword: 'parrot',
          lng: Language.EN,
        }, {
          tword: 'parrot',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'küülik',
      trans: [
        {
          tword: 'rabbit',
          lng: Language.EN,
        }, {
          tword: 'rabbit',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'kilpkonn',
      trans: [
        {
          tword: 'turtle',
          lng: Language.EN,
        }, {
          tword: 'turtle',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'ämblik',
      trans: [
        {
          tword: 'spider',
          lng: Language.EN,
        }, {
          tword: 'spider',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'madu',
      trans: [
        {
          tword: 'snake',
          lng: Language.EN,
        }, {
          tword: 'snake',
          lng: Language.RU,
        },
      ],
    },
  ],
  [CategoryNames.DAYS_OF_WEEK]: [
    {
      word: 'esmaspäev',
      trans: [
        {
          tword: 'monday',
          lng: Language.EN,
        }, {
          tword: 'monday',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'teisipäev',
      trans: [
        {
          tword: 'tuesday',
          lng: Language.EN,
        }, {
          tword: 'tuesday',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'kolmapäev',
      trans: [
        {
          tword: 'Wednesday',
          lng: Language.EN,
        }, {
          tword: 'Wednesday',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'neljapäev',
      trans: [
        {
          tword: 'thursday',
          lng: Language.EN,
        }, {
          tword: 'thursday',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'reedel',
      trans: [
        {
          tword: 'friday',
          lng: Language.EN,
        }, {
          tword: 'friday',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'laupäev',
      trans: [
        {
          tword: 'saturday',
          lng: Language.EN,
        }, {
          tword: 'saturday',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'pühapäev',
      trans: [
        {
          tword: 'sunday',
          lng: Language.EN,
        }, {
          tword: 'sunday',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'nädal',
      trans: [
        {
          tword: 'week',
          lng: Language.EN,
        }, {
          tword: 'week',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'nädalavahetusel',
      trans: [
        {
          tword: 'weekend',
          lng: Language.EN,
        }, {
          tword: 'weekend',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'nädalapäevad',
      trans: [
        {
          tword: 'weekdays',
          lng: Language.EN,
        }, {
          tword: 'weekdays',
          lng: Language.RU,
        },
      ],
    },
  ],
  [CategoryNames.MONTH]: [
    {
      word: 'jaanuar',
      trans: [
        {
          tword: 'january',
          lng: Language.EN,
        }, {
          tword: 'january',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'veebruar',
      trans: [
        {
          tword: 'february',
          lng: Language.EN,
        }, {
          tword: 'february',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'märts',
      trans: [
        {
          tword: 'march',
          lng: Language.EN,
        }, {
          tword: 'march',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'aprill',
      trans: [
        {
          tword: 'april',
          lng: Language.EN,
        }, {
          tword: 'april',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'mai',
      trans: [
        {
          tword: 'may',
          lng: Language.EN,
        }, {
          tword: 'may',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'juuni',
      trans: [
        {
          tword: 'june',
          lng: Language.EN,
        }, {
          tword: 'june',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'juuli',
      trans: [
        {
          tword: 'july',
          lng: Language.EN,
        }, {
          tword: 'july',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'august',
      trans: [
        {
          tword: 'august',
          lng: Language.EN,
        }, {
          tword: 'august',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'september',
      trans: [
        {
          tword: 'september',
          lng: Language.EN,
        }, {
          tword: 'september',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'oktoober',
      trans: [
        {
          tword: 'october',
          lng: Language.EN,
        }, {
          tword: 'october',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'november',
      trans: [
        {
          tword: 'november',
          lng: Language.EN,
        }, {
          tword: 'november',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'detsember',
      trans: [
        {
          tword: 'december',
          lng: Language.EN,
        }, {
          tword: 'december',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'kuu',
      trans: [
        {
          tword: 'month',
          lng: Language.EN,
        }, {
          tword: 'month',
          lng: Language.RU,
        },
      ],
    },
  ],
  [CategoryNames.PRONOUNCE]: [
    {
      word: 'mina',
      trans: [
        {
          tword: 'i',
          lng: Language.EN,
        }, {
          tword: 'i',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'sina',
      trans: [
        {
          tword: 'you (singular)',
          lng: Language.EN,
        }, {
          tword: 'you (singular)',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'tema',
      trans: [
        {
          tword: 'he/she',
          lng: Language.EN,
        }, {
          tword: 'he/she',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'meie',
      trans: [
        {
          tword: 'we',
          lng: Language.EN,
        }, {
          tword: 'we',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'teie',
      trans: [
        {
          tword: 'you (plural)',
          lng: Language.EN,
        }, {
          tword: 'you (plural)',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'nemad',
      trans: [
        {
          tword: 'they',
          lng: Language.EN,
        }, {
          tword: 'they',
          lng: Language.RU,
        },
      ],
    },
  ],
  [CategoryNames.QUESTIONS]: [
    {
      word: 'kuidas?',
      trans: [
        {
          tword: 'how?',
          lng: Language.EN,
        }, {
          tword: 'how?',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'mis/mida?',
      trans: [
        {
          tword: 'what?',
          lng: Language.EN,
        }, {
          tword: 'what?',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'kes?',
      trans: [
        {
          tword: 'who?',
          lng: Language.EN,
        }, {
          tword: 'who?',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'miks?',
      trans: [
        {
          tword: 'why?',
          lng: Language.EN,
        }, {
          tword: 'why?',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'kus?',
      trans: [
        {
          tword: 'where?',
          lng: Language.EN,
        }, {
          tword: 'where?',
          lng: Language.RU,
        },
      ],
    },
  ],
}

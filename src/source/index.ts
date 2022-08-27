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

export const getCategoryTranslations = (): CategorySourceMap => (Object.values(CategoryNames) as CategoryNames[]).reduce<CategorySourceMap>((map, cat) => {
  map[cat] = [
    { lng: Language.EN, name: CategoryFriendlyNamesEn[cat] },
    { lng: Language.RU, name: CategoryFriendlyNamesRu[cat] },
  ]
  return map
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
          tword: 'спасибо',
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
          tword: 'пожалуйста',
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
          tword: 'привет',
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
          tword: 'как дела?',
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
          tword: 'хорошо',
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
          tword: 'так',
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
          tword: 'смотреть',
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
          tword: 'нет',
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
          tword: 'да',
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
          tword: 'может быть',
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
          tword: 'открытый',
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
          tword: 'музыка',
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
          tword: 'горячее',
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
          tword: 'холод',
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
          tword: 'опасность',
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
          tword: 'мед',
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
          tword: 'хлеб',
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
          tword: 'курица',
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
          tword: 'говядина',
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
          tword: 'свинина',
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
          tword: 'колбаса',
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
          tword: 'рыба',
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
          tword: 'молоко',
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
          tword: 'сахар',
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
          tword: 'соль',
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
          tword: 'животные',
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
          tword: 'кошка',
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
          tword: 'собака',
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
          tword: 'конь',
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
          tword: 'крыса',
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
          tword: 'олень',
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
          tword: 'хорек',
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
          tword: 'попугай',
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
          tword: 'кролик',
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
          tword: 'черепаха',
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
          tword: 'паук',
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
          tword: 'змея',
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
          tword: 'понедельник',
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
          tword: 'вторник',
          lng: Language.RU,
        },
      ],
    },
    {
      word: 'kolmapäev',
      trans: [
        {
          tword: 'wednesday',
          lng: Language.EN,
        }, {
          tword: 'среда',
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
          tword: 'четверг',
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
          tword: 'пятница',
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
          tword: 'cуббота',
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
          tword: 'воскресенье',
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
          tword: 'неделя',
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
          tword: 'выходные',
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
          tword: 'будни',
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
          tword: 'январь',
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
          tword: 'февраль',
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
          tword: 'март',
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
          tword: 'апрель',
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
          tword: 'май',
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
          tword: 'июнь',
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
          tword: 'июль',
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
          tword: 'август',
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
          tword: 'сентябрь',
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
          tword: 'октябрь',
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
          tword: 'ноябрь',
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
          tword: 'декабрь',
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
          tword: 'месяц',
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
          tword: 'я',
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
          tword: 'ты',
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
          tword: 'он/она',
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
          tword: 'мы',
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
          tword: 'вы',
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
          tword: 'они',
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
          tword: 'как?',
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
          tword: 'что?',
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
          tword: 'кто?',
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
          tword: 'почему?',
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
          tword: 'где?',
          lng: Language.RU,
        },
      ],
    },
  ],
}

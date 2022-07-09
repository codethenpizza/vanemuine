import {Word} from "@prisma/client"
import {CategoryNames} from "./types";

type WordSource = { translationDef: string } & Pick<Word, 'wordDef'>
type CategorySource = Record<CategoryNames, WordSource[]>

export const categorySource: CategorySource = {
  [CategoryNames.BASIC]: [
    {
      wordDef: "aitäh",
      translationDef: "спасибо",
    },
    {
      wordDef: "palun",
      translationDef: "пожалуйста",
    },
    {
      wordDef: "tere",
      translationDef: "привет",
    },
    {
      wordDef: "kuidas läheb?",
      translationDef: "как дела?",
    }
  ],
  [CategoryNames.FOOD]: [
    {
      wordDef: "kallis",
      translationDef: "мёд",
    },
    {
      wordDef: "leiba",
      translationDef: "хлеб",
    },
    {
      wordDef: "kana",
      translationDef: "курица",
    },
    {
      wordDef: "veiseliha",
      translationDef: "говядина",
    },
    {
      wordDef: "sealiha",
      translationDef: "свинина",
    },
    {
      wordDef: "vorst",
      translationDef: "колбаса",
    },
  ],
  [CategoryNames.ANIMALS]: [
    {
      wordDef: "kass",
      translationDef: "кот"
    },
    {
      wordDef: "koer",
      translationDef: "собака"
    },
  ],
  [CategoryNames.DAYS_OF_WEEK]: [
    {
      wordDef: "esmaspäev",
      translationDef: "понедельник"
    },
    {
      wordDef: "teisipäev",
      translationDef: "вторник"
    },
    {
      wordDef: "neljapäev",
      translationDef: "четверг"
    },
    {
      wordDef: "kolmapäev",
      translationDef: "среда"
    },
    {
      wordDef: "reedel",
      translationDef: "пятница"
    },
    {
      wordDef: "laupäev",
      translationDef: "суббота"
    },
    {
      wordDef: "pühapäev",
      translationDef: "воскресенье"
    },
  ],
  [CategoryNames.MONTH]: [
    {
      wordDef: "jaanuar",
      translationDef: "январь"
    },
    {
      wordDef: "veebruar",
      translationDef: "февраль"
    },
    {
      wordDef: "märts",
      translationDef: "март"
    },
    {
      wordDef: "aprill",
      translationDef: "апрель"
    },
    {
      wordDef: "mai",
      translationDef: "май"
    },
    {
      wordDef: "juuni",
      translationDef: "июнь"
    },
    {
      wordDef: "juuli",
      translationDef: "июль"
    },
    {
      wordDef: "august",
      translationDef: "август"
    },
    {
      wordDef: "september",
      translationDef: "сентябрь"
    },
    {
      wordDef: "oktoober",
      translationDef: "октябрь"
    },
    {
      wordDef: "november",
      translationDef: "ноябрь"
    },
    {
      wordDef: "detsember",
      translationDef: "декабрь"
    }
  ]
}

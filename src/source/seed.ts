import { PrismaClient } from '@prisma/client'
import { Language, TransLanguage } from '../types'
import { getCategoryTranslations, wordsSource } from './index'
import { CategoryNames } from '../services/dictionary/types'
import { CategorySourceMap } from './types'

const prisma: PrismaClient = new PrismaClient()


type LangIdsMap = Partial<Record<TransLanguage, number>>
type CatsIdsMap = Partial<Record<CategoryNames, number>>

/*
 * add languages
 * (a current version of prisma client createMany does not return id's)
 * */
const seedLangs = async (): Promise<LangIdsMap> => {
  const languages = await prisma.$transaction(
    [Language.RU, Language.EN].map(name => prisma.lang.upsert({
      where: { name },
      update: { name },
      create: { name },
    })),
  )
  return languages.reduce<LangIdsMap>((m, { name, id }) => {
    // eslint-disable-next-line no-param-reassign
    m[name as TransLanguage] = id
    return m
  }, {})
}

/*
* upsert word categories
* */
const seedCats = async (languagesIdMap: LangIdsMap): Promise<CatsIdsMap> => {
  const transMap: CategorySourceMap = getCategoryTranslations()

  /*
  * return db formatted wordCategoryTranslations
  * */
  const getTrans = (cat: CategoryNames) => transMap[cat]?.map(({ name, lng }) => ({ name, lngId: languagesIdMap[lng] as number })) || []

  const categories = await prisma.$transaction(
    (Object.keys(wordsSource) as CategoryNames[]).map((categoryName) => prisma.wordCategory.upsert({
      where: { categoryName },
      update: {
        categoryName,
        wordCategoryTrans: {
          create: getTrans(categoryName)
        },
      },
      create: {
        categoryName,
        wordCategoryTrans: {
          create: getTrans(categoryName)
        },
      },
    })),
  )
  return categories.reduce<CatsIdsMap>((m, { categoryName, id }) => {
    // eslint-disable-next-line no-param-reassign
    m[categoryName as CategoryNames] = id
    return m
  }, {})
}

/*
* upsert words table based on words
* currently I don't have any constrains for translation to be able to upsert them,
* so I have to remove them completely before words update for now
* todo: find a way to upsert translations
* */
const seedWords = async (categoryIdMap: CatsIdsMap, languagesIdMap: LangIdsMap): Promise<void> => {
  /*
  * (prisma do not export PrismaPromiseType)
  * */
  const transactionPromises: any[] = [
    prisma.translation.deleteMany(),
  ]

  for (const [categoryName, words] of Object.entries(wordsSource)) {
    const catId = categoryIdMap[categoryName as CategoryNames]

    for (const { word, trans } of words) {

      const translations = trans.map(({ tword, lng }) => ({ trans: tword, lngId: languagesIdMap[lng] as number }))
      const upsertPromise = prisma.word.upsert({
        where: { word },
        update: {
          wordCategoryId: catId as number,
          trans: {
            create: translations,
          },
        },
        create: {
          word,
          wordCategoryId: catId as number,
          trans: {
            create: translations,
          },
        },
      })
      transactionPromises.push(upsertPromise)
    }
  }

  prisma.$transaction(transactionPromises)
}


const seedData = async () => {
  try {
    const languagesIdMap = await seedLangs()
    const categoryIdMap = await seedCats(languagesIdMap)
    await seedWords(categoryIdMap, languagesIdMap)

  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedData()

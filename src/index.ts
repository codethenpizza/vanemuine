import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const d = await prisma.word.findMany()
  console.log(d)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

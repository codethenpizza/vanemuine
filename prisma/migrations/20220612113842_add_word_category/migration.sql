/*
  Warnings:

  - Added the required column `wordCategoryId` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "wordCategoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "WordCategory" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "WordCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_wordCategoryId_fkey" FOREIGN KEY ("wordCategoryId") REFERENCES "WordCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

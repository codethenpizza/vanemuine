/*
  Warnings:

  - You are about to drop the column `translationDef` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the column `wordDef` on the `Word` table. All the data in the column will be lost.
  - Added the required column `trans` to the `Translation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `word` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "translationDef",
ADD COLUMN     "trans" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "wordDef",
ADD COLUMN     "word" TEXT NOT NULL;

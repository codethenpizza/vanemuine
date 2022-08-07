/*
  Warnings:

  - You are about to drop the column `lang` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `User` table. All the data in the column will be lost.
  - Added the required column `lngId` to the `Translation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lngId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "lang",
ADD COLUMN     "lngId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lng",
ADD COLUMN     "lngId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Lang" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Lang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lang_name_key" ON "Lang"("name");

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_lngId_fkey" FOREIGN KEY ("lngId") REFERENCES "Lang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lngId_fkey" FOREIGN KEY ("lngId") REFERENCES "Lang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

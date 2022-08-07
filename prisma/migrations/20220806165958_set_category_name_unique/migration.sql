/*
  Warnings:

  - A unique constraint covering the columns `[categoryName]` on the table `WordCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WordCategory_categoryName_key" ON "WordCategory"("categoryName");

-- CreateTable
CREATE TABLE "WordCategoryTrans" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lngId" INTEGER NOT NULL,
    "wordCategoryId" INTEGER NOT NULL,

    CONSTRAINT "WordCategoryTrans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WordCategoryTrans_name_key" ON "WordCategoryTrans"("name");

-- AddForeignKey
ALTER TABLE "WordCategoryTrans" ADD CONSTRAINT "WordCategoryTrans_wordCategoryId_fkey" FOREIGN KEY ("wordCategoryId") REFERENCES "WordCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordCategoryTrans" ADD CONSTRAINT "WordCategoryTrans_lngId_fkey" FOREIGN KEY ("lngId") REFERENCES "Lang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "translationDef" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "wordId" INTEGER NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "wordDef" TEXT NOT NULL,
    "desc" TEXT,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Translation_wordId_key" ON "Translation"("wordId");

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

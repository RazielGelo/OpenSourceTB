/*
  Warnings:

  - You are about to drop the column `body` on the `Book` table. All the data in the column will be lost.
  - Added the required column `genre` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Book_title_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "body",
ADD COLUMN     "genre" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "pageNumber" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "bookID" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_bookID_fkey" FOREIGN KEY ("bookID") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

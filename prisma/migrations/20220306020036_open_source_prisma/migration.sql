/*
  Warnings:

  - A unique constraint covering the columns `[authorName]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorName` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "authorName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Book_authorName_key" ON "Book"("authorName");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "Book"("authorName") ON DELETE RESTRICT ON UPDATE CASCADE;

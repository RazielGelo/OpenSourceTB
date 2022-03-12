/*
  Warnings:

  - Added the required column `status` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "status" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_bookID_fkey" FOREIGN KEY ("bookID") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_pageID_fkey" FOREIGN KEY ("pageID") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

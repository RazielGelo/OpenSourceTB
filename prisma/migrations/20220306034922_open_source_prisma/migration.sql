/*
  Warnings:

  - You are about to drop the column `authorName` on the `Request` table. All the data in the column will be lost.
  - Added the required column `bookOwnerID` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_authorName_fkey";

-- DropIndex
DROP INDEX "Book_authorName_key";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "authorName",
ADD COLUMN     "bookOwnerID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_bookOwnerID_fkey" FOREIGN KEY ("bookOwnerID") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `contributorID` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_bookOwnerID_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "contributorID";

-- DropTable
DROP TABLE "Request";

-- CreateTable
CREATE TABLE "Update" (
    "id" SERIAL NOT NULL,
    "bookID" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "bookOwnerID" INTEGER NOT NULL,
    "commit" TEXT NOT NULL,
    "pageID" INTEGER NOT NULL,

    CONSTRAINT "Update_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "message" TEXT,
    "reply" TEXT,
    "updateID" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_bookOwnerID_fkey" FOREIGN KEY ("bookOwnerID") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_pageID_fkey" FOREIGN KEY ("pageID") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_updateID_fkey" FOREIGN KEY ("updateID") REFERENCES "Update"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

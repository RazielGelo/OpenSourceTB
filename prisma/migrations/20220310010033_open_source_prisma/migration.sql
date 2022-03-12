/*
  Warnings:

  - You are about to drop the column `bookUpdates` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `pageUpdates` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the `UpdateHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "bookUpdates";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "pageUpdates";

-- DropTable
DROP TABLE "UpdateHistory";

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "bookID" INTEGER NOT NULL,
    "pageID" INTEGER NOT NULL,
    "prevBody" TEXT NOT NULL,
    "currBody" TEXT NOT NULL,
    "commit" TEXT NOT NULL,
    "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

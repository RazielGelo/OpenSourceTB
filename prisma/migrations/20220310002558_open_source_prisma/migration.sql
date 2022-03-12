/*
  Warnings:

  - You are about to drop the `Update` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_bookID_fkey";

-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_pageID_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "bookUpdates" INTEGER[];

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "pageUpdates" INTEGER[];

-- DropTable
DROP TABLE "Update";

-- CreateTable
CREATE TABLE "UpdateHistory" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "bookID" INTEGER NOT NULL,
    "pageID" INTEGER NOT NULL,
    "prevBody" TEXT NOT NULL,
    "currBody" TEXT NOT NULL,
    "commit" TEXT NOT NULL,

    CONSTRAINT "UpdateHistory_pkey" PRIMARY KEY ("id")
);

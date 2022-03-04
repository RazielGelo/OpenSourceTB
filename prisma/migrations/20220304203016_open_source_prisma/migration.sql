/*
  Warnings:

  - Added the required column `description` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "contributorID" INTEGER[],
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Request" (
    "requestID" SERIAL NOT NULL,
    "bookID" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "reply" TEXT,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("requestID")
);

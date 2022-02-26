/*
  Warnings:

  - Added the required column `chapterName` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "chapterName" TEXT NOT NULL,
ALTER COLUMN "pageNumber" DROP DEFAULT;
DROP SEQUENCE "Page_pageNumber_seq";

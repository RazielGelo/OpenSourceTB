/*
  Warnings:

  - Changed the type of `pageNumber` on the `Page` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "pageNumber",
ADD COLUMN     "pageNumber" INTEGER NOT NULL;

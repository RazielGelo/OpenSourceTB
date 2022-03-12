/*
  Warnings:

  - You are about to drop the column `status` on the `History` table. All the data in the column will be lost.
  - Added the required column `bookRef` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageRef` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "status",
ADD COLUMN     "bookRef" INTEGER NOT NULL,
ADD COLUMN     "pageRef" INTEGER NOT NULL;

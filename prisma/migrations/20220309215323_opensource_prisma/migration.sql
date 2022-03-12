/*
  Warnings:

  - You are about to drop the column `body` on the `Update` table. All the data in the column will be lost.
  - You are about to drop the column `bookOwnerID` on the `Update` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Update` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `link` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdatedBy` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currBody` to the `Update` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prevBody` to the `Update` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_updateID_fkey";

-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_bookOwnerID_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "lastUpdatedBy" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Update" DROP COLUMN "body",
DROP COLUMN "bookOwnerID",
DROP COLUMN "status",
ADD COLUMN     "currBody" TEXT NOT NULL,
ADD COLUMN     "prevBody" TEXT NOT NULL;

-- DropTable
DROP TABLE "Message";

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_bookID_fkey" FOREIGN KEY ("bookID") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

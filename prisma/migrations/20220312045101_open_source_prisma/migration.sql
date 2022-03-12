-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_bookID_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_pageID_fkey";

-- AlterTable
ALTER TABLE "History" ALTER COLUMN "bookID" DROP NOT NULL,
ALTER COLUMN "pageID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_bookID_fkey" FOREIGN KEY ("bookID") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_pageID_fkey" FOREIGN KEY ("pageID") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

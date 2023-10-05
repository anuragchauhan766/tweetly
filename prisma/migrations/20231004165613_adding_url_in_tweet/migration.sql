/*
  Warnings:

  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_tweetId_fkey";

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "media" TEXT;

-- DropTable
DROP TABLE "Media";

-- DropEnum
DROP TYPE "MediaType";

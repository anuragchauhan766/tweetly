/*
  Warnings:

  - You are about to drop the column `userId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Tweet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[LikedByUserId,tweetId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `LikedByUserId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autherId` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_userId_fkey";

-- DropIndex
DROP INDEX "Like_userId_idx";

-- DropIndex
DROP INDEX "Like_userId_tweetId_key";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "userId",
ADD COLUMN     "LikedByUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "userId",
ADD COLUMN     "autherId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Like_LikedByUserId_idx" ON "Like"("LikedByUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_LikedByUserId_tweetId_key" ON "Like"("LikedByUserId", "tweetId");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_LikedByUserId_fkey" FOREIGN KEY ("LikedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

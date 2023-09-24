/*
  Warnings:

  - You are about to drop the column `profilee_picture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilee_picture",
ADD COLUMN     "profile_picture" TEXT;

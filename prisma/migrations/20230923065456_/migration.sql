/*
  Warnings:

  - You are about to drop the column `profile_info` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_info",
ADD COLUMN     "profilee_picture" TEXT;

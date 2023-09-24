/*
  Warnings:

  - Added the required column `active` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Announcement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "active" BOOLEAN NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

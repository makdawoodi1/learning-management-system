/*
  Warnings:

  - The `options` column on the `QuizOption` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "QuizOption" DROP COLUMN "options",
ADD COLUMN     "options" TEXT[];

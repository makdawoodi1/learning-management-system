/*
  Warnings:

  - You are about to drop the column `score` on the `QuizAttempt` table. All the data in the column will be lost.
  - Added the required column `progress` to the `QuizAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizAttempt" DROP COLUMN "score",
ADD COLUMN     "progress" TEXT NOT NULL;

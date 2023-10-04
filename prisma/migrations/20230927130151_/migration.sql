/*
  Warnings:

  - Added the required column `attemptNumber` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passingMarks` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timer` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuizTimerOption" AS ENUM ('MINUTES', 'SECONDS');

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "attemptNumber" INTEGER NOT NULL,
ADD COLUMN     "passingMarks" INTEGER NOT NULL,
ADD COLUMN     "timer" INTEGER NOT NULL,
ADD COLUMN     "timerOption" "QuizTimerOption" NOT NULL DEFAULT 'MINUTES';

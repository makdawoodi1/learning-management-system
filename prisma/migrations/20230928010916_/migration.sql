/*
  Warnings:

  - You are about to drop the `QuizOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuizOption" DROP CONSTRAINT "QuizOption_question_id_fkey";

-- DropTable
DROP TABLE "QuizOption";

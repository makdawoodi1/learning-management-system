/*
  Warnings:

  - The values [CHECKBOXES,RADIO] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `option_text` on the `QuizOption` table. All the data in the column will be lost.
  - You are about to drop the column `question_text` on the `QuizQuestion` table. All the data in the column will be lost.
  - Added the required column `options` to the `QuizOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `QuizQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('TRUE_FALSE', 'SINGLE_CHOICE', 'MULTIPLE_CHOICE');
ALTER TABLE "QuizQuestion" ALTER COLUMN "question_type" DROP DEFAULT;
ALTER TABLE "QuizQuestion" ALTER COLUMN "question_type" TYPE "QuestionType_new" USING ("question_type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
ALTER TABLE "QuizQuestion" ALTER COLUMN "question_type" SET DEFAULT 'SINGLE_CHOICE';
COMMIT;

-- AlterTable
ALTER TABLE "QuizOption" DROP COLUMN "option_text",
ADD COLUMN     "options" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuizQuestion" DROP COLUMN "question_text",
ADD COLUMN     "correct_answer" TEXT[],
ADD COLUMN     "question" TEXT NOT NULL,
ALTER COLUMN "question_type" SET DEFAULT 'SINGLE_CHOICE';

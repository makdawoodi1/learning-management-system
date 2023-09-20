/*
  Warnings:

  - Added the required column `completed` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completed` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "completed" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "completed" BOOLEAN NOT NULL;

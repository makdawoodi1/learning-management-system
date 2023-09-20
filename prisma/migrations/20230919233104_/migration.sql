/*
  Warnings:

  - Added the required column `name` to the `LessonFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "progress" TEXT;

-- AlterTable
ALTER TABLE "LessonFile" ADD COLUMN     "name" TEXT NOT NULL;

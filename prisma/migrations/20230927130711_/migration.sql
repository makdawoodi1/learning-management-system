/*
  Warnings:

  - You are about to drop the column `course_id` on the `Quiz` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_course_id_fkey";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "course_id",
ADD COLUMN     "courseId" INTEGER,
ALTER COLUMN "due_date" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

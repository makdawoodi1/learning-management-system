/*
  Warnings:

  - You are about to drop the column `instructor_id` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `CourseModule` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `CourseModule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[s3_folder_key]` on the table `CourseModule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `introductoryVideo` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "instructor_id",
ADD COLUMN     "introductoryVideo" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CourseModule" DROP COLUMN "content",
DROP COLUMN "order",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "s3_folder_key" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "courseModuleId" INTEGER;

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "s3_folder_key" TEXT NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonFile" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,

    CONSTRAINT "LessonFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseModule_s3_folder_key_key" ON "CourseModule"("s3_folder_key");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "CourseModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonFile" ADD CONSTRAINT "LessonFile_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_courseModuleId_fkey" FOREIGN KEY ("courseModuleId") REFERENCES "CourseModule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

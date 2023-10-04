-- AlterEnum
ALTER TYPE "FILETYPE" ADD VALUE 'AUDIO';

-- CreateTable
CREATE TABLE "LessonContentFile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "fileType" "FILETYPE" NOT NULL DEFAULT 'IMAGE',

    CONSTRAINT "LessonContentFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LessonContentFile" ADD CONSTRAINT "LessonContentFile_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

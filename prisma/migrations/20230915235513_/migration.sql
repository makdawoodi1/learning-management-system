/*
  Warnings:

  - A unique constraint covering the columns `[s3_folder_key]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_s3_folder_key_key" ON "Course"("s3_folder_key");

-- DropIndex
DROP INDEX "CourseModule_s3_folder_key_key";

-- AlterTable
ALTER TABLE "CourseModule" ALTER COLUMN "s3_folder_key" DROP NOT NULL,
ALTER COLUMN "s3_folder_key" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "s3_folder_key" DROP NOT NULL;

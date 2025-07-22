/*
  Warnings:

  - You are about to drop the column `preferred_format` on the `TutorProfile` table. All the data in the column will be lost.
  - Added the required column `delivery_format` to the `TutorProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferred_student_level` to the `TutorProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule_preference` to the `TutorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PreferredStudentLevel" AS ENUM ('beginner', 'intermediate', 'advanced', 'all_levels');

-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "preferred_format",
ADD COLUMN     "delivery_format" "DeliveryFormat" NOT NULL,
ADD COLUMN     "preferred_student_level" "PreferredStudentLevel" NOT NULL,
ADD COLUMN     "schedule_preference" "Schedule" NOT NULL;

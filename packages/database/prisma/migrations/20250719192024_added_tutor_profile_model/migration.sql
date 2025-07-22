-- CreateEnum
CREATE TYPE "TutorEducationLevel" AS ENUM ('diploma', 'bachelors', 'masters', 'phd');

-- CreateEnum
CREATE TYPE "DeliveryFormat" AS ENUM ('live', 'recorded', 'text_base', 'blended');

-- CreateEnum
CREATE TYPE "EvaluationMethod" AS ENUM ('quizzes_and_test', 'assignment_and_projects', 'discussions', 'live_oral_questioning', 'peer_review');

-- CreateEnum
CREATE TYPE "ClassFormat" AS ENUM ('one_on_one', 'small_class', 'medium_class', 'large_class');

-- CreateEnum
CREATE TYPE "OutsideClassInteraction" AS ENUM ('lms_chat', 'email', 'forum', 'video_feedback', 'office_hours');

-- CreateEnum
CREATE TYPE "TeachingLanguage" AS ENUM ('english', 'spanish', 'french', 'arabic', 'other');

-- AlterTable
ALTER TABLE "StudentProfile" ALTER COLUMN "role" SET DEFAULT 'student';

-- CreateTable
CREATE TABLE "TutorProfile" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "phone_number" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'tutor',
    "photo" TEXT,
    "photoId" TEXT,
    "tutor_education_level" "TutorEducationLevel" NOT NULL,
    "years_of_teaching" INTEGER NOT NULL,
    "previous_institution" TEXT NOT NULL,
    "preferred_format" "DeliveryFormat" NOT NULL,
    "student_evaluation_method" "EvaluationMethod" NOT NULL,
    "class_format" "ClassFormat" NOT NULL,
    "outside_class_interaction" "OutsideClassInteraction" NOT NULL,
    "teaching_languages" "TeachingLanguage" NOT NULL,
    "course_preferences" TEXT[],
    "cv" TEXT NOT NULL,
    "cvId" TEXT,
    "has_completed_onboarding" BOOLEAN NOT NULL DEFAULT false,
    "is_account_verified" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TutorProfile_phone_number_key" ON "TutorProfile"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "TutorProfile_user_id_key" ON "TutorProfile"("user_id");

-- AddForeignKey
ALTER TABLE "TutorProfile" ADD CONSTRAINT "TutorProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

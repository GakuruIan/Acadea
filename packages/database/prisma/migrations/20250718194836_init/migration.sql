-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'tutor');

-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('high_school', 'bachelor', 'master', 'phd');

-- CreateEnum
CREATE TYPE "EducationStatus" AS ENUM ('graduated', 'full_time', 'part_time', 'academic_break', 'dropped_out');

-- CreateEnum
CREATE TYPE "AcademicGoal" AS ENUM ('improve_grades', 'exam_preparation', 'skill_development', 'career_advancement', 'personal_interest');

-- CreateEnum
CREATE TYPE "AcademicYear" AS ENUM ('highschool_freshman', 'highschool_sophomore', 'highschool_junior', 'highschool_senior', 'undergraduate_year1', 'undergraduate_year2', 'undergraduate_year3', 'undergraduate_year4', 'postgraduate', 'not_applicable');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('english', 'spanish', 'french', 'arabic', 'other');

-- CreateEnum
CREATE TYPE "LearningStyle" AS ENUM ('visual', 'auditory', 'kinesthetic', 'reading_writing', 'live_classes', 'self_paced', 'group_discussion');

-- CreateEnum
CREATE TYPE "Schedule" AS ENUM ('morning', 'afternoon', 'evening', 'flexible');

-- CreateEnum
CREATE TYPE "Device" AS ENUM ('mobile', 'laptop', 'tablet', 'desktop');

-- CreateEnum
CREATE TYPE "InternetQuality" AS ENUM ('poor', 'moderate', 'reliable');

-- CreateEnum
CREATE TYPE "Pace" AS ENUM ('slow', 'normal', 'fast');

-- CreateEnum
CREATE TYPE "EngagementMode" AS ENUM ('quizzes_and_test', 'assignment_and_projects', 'discussions', 'live_oral_questioning', 'peer_review');

-- CreateEnum
CREATE TYPE "FocusDuration" AS ENUM ('15', '30', '60', '90+');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "photo" TEXT,
    "country" TEXT NOT NULL,
    "student_education_level" "EducationLevel" NOT NULL,
    "field_of_study" TEXT NOT NULL,
    "student_education_status" "EducationStatus" NOT NULL,
    "academic_goals" "AcademicGoal" NOT NULL,
    "name_of_institution" TEXT NOT NULL,
    "academic_year" "AcademicYear" NOT NULL,
    "language_preference" "Language" NOT NULL,
    "learning_style" "LearningStyle" NOT NULL,
    "preferred_schedule" "Schedule" NOT NULL,
    "device_access" "Device" NOT NULL,
    "internet_access_quality" "InternetQuality" NOT NULL,
    "preferred_pace" "Pace" NOT NULL,
    "focus_duration" "FocusDuration" NOT NULL,
    "engagement_preference" "EngagementMode" NOT NULL,
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "has_completed_onboarding" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_user_id_key" ON "StudentProfile"("user_id");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

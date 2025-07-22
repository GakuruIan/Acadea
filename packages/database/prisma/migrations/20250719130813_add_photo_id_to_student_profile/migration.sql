/*
  Warnings:

  - The values [15,30,60,90+] on the enum `FocusDuration` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[photoId]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FocusDuration_new" AS ENUM ('SHORT', 'MEDIUM', 'LONG', 'EXTRA_LONG');
ALTER TABLE "StudentProfile" ALTER COLUMN "focus_duration" TYPE "FocusDuration_new" USING ("focus_duration"::text::"FocusDuration_new");
ALTER TYPE "FocusDuration" RENAME TO "FocusDuration_old";
ALTER TYPE "FocusDuration_new" RENAME TO "FocusDuration";
DROP TYPE "FocusDuration_old";
COMMIT;

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "photoId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_photoId_key" ON "StudentProfile"("photoId");

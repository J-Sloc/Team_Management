-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('AD', 'COACH');

-- CreateEnum
CREATE TYPE "AcademicStanding" AS ENUM ('GOOD', 'NEUTRAL', 'BAD');

-- CreateEnum
CREATE TYPE "MedicalStatus" AS ENUM ('CLEARED', 'LIMITED', 'NOT_CLEARED');

-- CreateEnum
CREATE TYPE "ComplianceStatus" AS ENUM ('COMPLIANT', 'WARNING', 'NON_COMPLIANT');

-- CreateEnum
CREATE TYPE "RiskFlag" AS ENUM ('HIGH', 'MODERATE', 'LOW', 'NONE');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('GAME', 'PRACTICE', 'MEETING', 'MEDICAL', 'ACADEMIC', 'RECRUITING');

-- CreateEnum
CREATE TYPE "EventGroup" AS ENUM ('TEAM', 'PERSONAL');

-- CreateEnum
CREATE TYPE "NoteCategory" AS ENUM ('ACADEMIC', 'MEDICAL', 'GENERAL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "teamId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "institution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "athletes" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jerseyNumber" INTEGER,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "classYear" TEXT,
    "sport" TEXT,
    "events" TEXT[],
    "eventRecords" JSONB,
    "gpa" DOUBLE PRECISION,
    "academicStanding" "AcademicStanding",
    "eligibilityYearsLeft" DOUBLE PRECISION,
    "recruitingStatus" TEXT,
    "contactInfo" TEXT,
    "transferProbability" DOUBLE PRECISION,
    "medicalStatus" "MedicalStatus",
    "complianceStatus" "ComplianceStatus",
    "riskFlag" "RiskFlag",

    CONSTRAINT "athletes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_records" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "finalScore" DOUBLE PRECISION,
    "termGpa" DOUBLE PRECISION,
    "academicStanding" "AcademicStanding",
    "complianceStatus" "ComplianceStatus",
    "attendancePercent" DOUBLE PRECISION,
    "tutoringHours" DOUBLE PRECISION,
    "advisorNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "academic_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_records" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "injuryType" TEXT,
    "injuryDate" TIMESTAMP(3),
    "status" "MedicalStatus",
    "rehabSessions" INTEGER,
    "appointmentAttendance" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "health_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "opponent" TEXT,
    "group" "EventGroup" NOT NULL,
    "createdByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT,
    "userId" TEXT NOT NULL,
    "category" "NoteCategory" NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "athletes_teamId_idx" ON "athletes"("teamId");

-- CreateIndex
CREATE INDEX "academic_records_athleteId_idx" ON "academic_records"("athleteId");

-- CreateIndex
CREATE INDEX "academic_records_semester_academicStanding_idx" ON "academic_records"("semester", "academicStanding");

-- CreateIndex
CREATE INDEX "health_records_athleteId_idx" ON "health_records"("athleteId");

-- CreateIndex
CREATE INDEX "events_teamId_startTime_idx" ON "events"("teamId", "startTime");

-- CreateIndex
CREATE INDEX "notes_athleteId_idx" ON "notes"("athleteId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "athletes" ADD CONSTRAINT "athletes_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_records" ADD CONSTRAINT "academic_records_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_records" ADD CONSTRAINT "health_records_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

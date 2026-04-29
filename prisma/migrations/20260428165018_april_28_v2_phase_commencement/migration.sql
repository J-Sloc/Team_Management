/*
  Warnings:

  - You are about to drop the column `institution` on the `teams` table. All the data in the column will be lost.
  - Changed the type of `sport` on the `teams` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Sport" AS ENUM ('TRACK_AND_FIELD', 'FOOTBALL', 'SOCCER', 'GENERAL');

-- CreateEnum
CREATE TYPE "MeasurementUnit" AS ENUM ('METERS', 'KILOMETERS', 'YARDS', 'SECONDS', 'MINUTES', 'HOURS');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'ATHLETE';

-- DropForeignKey
ALTER TABLE "athlete_performance_snapshots" DROP CONSTRAINT "athlete_performance_snapshots_athleteId_fkey";

-- DropForeignKey
ALTER TABLE "athlete_performance_snapshots" DROP CONSTRAINT "athlete_performance_snapshots_teamId_fkey";

-- DropForeignKey
ALTER TABLE "event_performance_trends" DROP CONSTRAINT "event_performance_trends_athleteId_fkey";

-- DropForeignKey
ALTER TABLE "event_performance_trends" DROP CONSTRAINT "event_performance_trends_teamId_fkey";

-- DropForeignKey
ALTER TABLE "workout_analytics_snapshots" DROP CONSTRAINT "workout_analytics_snapshots_athleteId_fkey";

-- DropForeignKey
ALTER TABLE "workout_analytics_snapshots" DROP CONSTRAINT "workout_analytics_snapshots_teamId_fkey";

-- AlterTable
ALTER TABLE "athletes" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "institution",
ADD COLUMN     "institutionId" TEXT,
ADD COLUMN     "seasonId" TEXT,
DROP COLUMN "sport",
ADD COLUMN     "sport" "Sport" NOT NULL;

-- CreateTable
CREATE TABLE "institutions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "sport" "Sport" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_templates" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdByUserId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sport" "Sport" NOT NULL,
    "params" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_metrics" (
    "id" TEXT NOT NULL,
    "workoutTemplateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "targetValue" DOUBLE PRECISION,
    "unit" "MeasurementUnit",
    "params" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_instances" (
    "id" TEXT NOT NULL,
    "workoutTemplateId" TEXT,
    "athleteId" TEXT NOT NULL,
    "createdByUserId" TEXT,
    "performedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "results" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ranking_sources" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ranking_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_rankings" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "rankingSourceId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "region" TEXT,
    "score" DOUBLE PRECISION,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_rankings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_records" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "result" DOUBLE PRECISION NOT NULL,
    "unit" "MeasurementUnit" NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "personal_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meet_entries" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "heat" TEXT,
    "lane" TEXT,
    "status" TEXT,
    "importedFrom" TEXT,
    "createdByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meet_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "athlete_journals" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "authorRole" "UserRole" NOT NULL,
    "title" TEXT,
    "body" TEXT NOT NULL,
    "visibility" TEXT DEFAULT 'PRIVATE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "athlete_journals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "seasons_institutionId_sport_idx" ON "seasons"("institutionId", "sport");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_institutionId_name_sport_key" ON "seasons"("institutionId", "name", "sport");

-- CreateIndex
CREATE INDEX "workout_templates_teamId_sport_idx" ON "workout_templates"("teamId", "sport");

-- CreateIndex
CREATE INDEX "workout_metrics_workoutTemplateId_idx" ON "workout_metrics"("workoutTemplateId");

-- CreateIndex
CREATE INDEX "workout_instances_athleteId_idx" ON "workout_instances"("athleteId");

-- CreateIndex
CREATE INDEX "workout_instances_workoutTemplateId_idx" ON "workout_instances"("workoutTemplateId");

-- CreateIndex
CREATE INDEX "event_rankings_athleteId_idx" ON "event_rankings"("athleteId");

-- CreateIndex
CREATE INDEX "event_rankings_rankingSourceId_idx" ON "event_rankings"("rankingSourceId");

-- CreateIndex
CREATE INDEX "personal_records_athleteId_idx" ON "personal_records"("athleteId");

-- CreateIndex
CREATE INDEX "meet_entries_teamId_athleteId_idx" ON "meet_entries"("teamId", "athleteId");

-- CreateIndex
CREATE INDEX "athlete_journals_athleteId_authorId_idx" ON "athlete_journals"("athleteId", "authorId");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "athletes" ADD CONSTRAINT "athletes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_templates" ADD CONSTRAINT "workout_templates_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_templates" ADD CONSTRAINT "workout_templates_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_metrics" ADD CONSTRAINT "workout_metrics_workoutTemplateId_fkey" FOREIGN KEY ("workoutTemplateId") REFERENCES "workout_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_instances" ADD CONSTRAINT "workout_instances_workoutTemplateId_fkey" FOREIGN KEY ("workoutTemplateId") REFERENCES "workout_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_instances" ADD CONSTRAINT "workout_instances_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_instances" ADD CONSTRAINT "workout_instances_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_rankings" ADD CONSTRAINT "event_rankings_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_rankings" ADD CONSTRAINT "event_rankings_rankingSourceId_fkey" FOREIGN KEY ("rankingSourceId") REFERENCES "ranking_sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_records" ADD CONSTRAINT "personal_records_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meet_entries" ADD CONSTRAINT "meet_entries_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meet_entries" ADD CONSTRAINT "meet_entries_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meet_entries" ADD CONSTRAINT "meet_entries_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "athlete_journals" ADD CONSTRAINT "athlete_journals_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "athlete_journals" ADD CONSTRAINT "athlete_journals_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "athlete_performance_snapshots" ADD CONSTRAINT "athlete_performance_snapshots_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "athlete_performance_snapshots" ADD CONSTRAINT "athlete_performance_snapshots_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_performance_trends" ADD CONSTRAINT "event_performance_trends_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_performance_trends" ADD CONSTRAINT "event_performance_trends_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_analytics_snapshots" ADD CONSTRAINT "workout_analytics_snapshots_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_analytics_snapshots" ADD CONSTRAINT "workout_analytics_snapshots_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

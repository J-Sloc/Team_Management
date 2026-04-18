-- AlterEnum
ALTER TYPE "NoteCategory" ADD VALUE IF NOT EXISTS 'SPORT_SPECIFIC';

-- AlterTable
ALTER TABLE "events"
ADD COLUMN "athleteId" TEXT;

-- CreateIndex
CREATE INDEX "events_athleteId_startTime_idx" ON "events"("athleteId", "startTime");

-- AddForeignKey
ALTER TABLE "events"
ADD CONSTRAINT "events_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

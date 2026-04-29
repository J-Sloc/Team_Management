CREATE TABLE "athlete_performance_snapshots" (
  "id" TEXT NOT NULL,
  "athleteId" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "trainingStatus" TEXT NOT NULL,
  "readinessScore" DOUBLE PRECISION,
  "readinessLabel" TEXT,
  "riskLevel" "RiskFlag",
  "lastWorkoutAt" TIMESTAMP(3),
  "summaryJson" JSONB,
  "aiSummary" TEXT,
  "refreshedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "athlete_performance_snapshots_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "event_performance_trends" (
  "id" TEXT NOT NULL,
  "athleteId" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "eventName" TEXT NOT NULL,
  "metricType" TEXT NOT NULL,
  "baseline" DOUBLE PRECISION,
  "recentAverage" DOUBLE PRECISION,
  "latestValue" DOUBLE PRECISION,
  "latestRank" INTEGER,
  "recentDelta" DOUBLE PRECISION,
  "slope" DOUBLE PRECISION,
  "confidenceLabel" TEXT NOT NULL,
  "sampleSize" INTEGER NOT NULL DEFAULT 0,
  "summaryJson" JSONB,
  "aiSummary" TEXT,
  "refreshedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "event_performance_trends_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "workout_analytics_snapshots" (
  "id" TEXT NOT NULL,
  "athleteId" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "plannedMetricCount" INTEGER NOT NULL DEFAULT 0,
  "aboveTargetCount" INTEGER NOT NULL DEFAULT 0,
  "onTargetCount" INTEGER NOT NULL DEFAULT 0,
  "belowTargetCount" INTEGER NOT NULL DEFAULT 0,
  "adherencePercent" DOUBLE PRECISION,
  "rolling7" JSONB,
  "rolling14" JSONB,
  "rolling30" JSONB,
  "recentProgression" JSONB,
  "summaryJson" JSONB,
  "aiSummary" TEXT,
  "refreshedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "workout_analytics_snapshots_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "integration_runs" (
  "id" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "triggerType" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "finishedAt" TIMESTAMP(3),
  "triggeredByUserId" TEXT,
  "scopeJson" JSONB,
  "resultSummary" JSONB,
  "errorMessage" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "integration_runs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "athlete_performance_snapshots_athleteId_key" ON "athlete_performance_snapshots"("athleteId");
CREATE INDEX "athlete_performance_snapshots_teamId_refreshedAt_idx" ON "athlete_performance_snapshots"("teamId", "refreshedAt");
CREATE UNIQUE INDEX "event_performance_trends_athleteId_eventName_metricType_key" ON "event_performance_trends"("athleteId", "eventName", "metricType");
CREATE INDEX "event_performance_trends_teamId_eventName_idx" ON "event_performance_trends"("teamId", "eventName");
CREATE UNIQUE INDEX "workout_analytics_snapshots_athleteId_key" ON "workout_analytics_snapshots"("athleteId");
CREATE INDEX "workout_analytics_snapshots_teamId_refreshedAt_idx" ON "workout_analytics_snapshots"("teamId", "refreshedAt");
CREATE INDEX "integration_runs_provider_createdAt_idx" ON "integration_runs"("provider", "createdAt");

ALTER TABLE "athlete_performance_snapshots"
  ADD CONSTRAINT "athlete_performance_snapshots_athleteId_fkey"
  FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "athlete_performance_snapshots"
  ADD CONSTRAINT "athlete_performance_snapshots_teamId_fkey"
  FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "event_performance_trends"
  ADD CONSTRAINT "event_performance_trends_athleteId_fkey"
  FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "event_performance_trends"
  ADD CONSTRAINT "event_performance_trends_teamId_fkey"
  FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "workout_analytics_snapshots"
  ADD CONSTRAINT "workout_analytics_snapshots_athleteId_fkey"
  FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "workout_analytics_snapshots"
  ADD CONSTRAINT "workout_analytics_snapshots_teamId_fkey"
  FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "integration_runs"
  ADD CONSTRAINT "integration_runs_triggeredByUserId_fkey"
  FOREIGN KEY ("triggeredByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

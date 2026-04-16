import prisma from "./prisma";
import { getAthleteEligibility, UserSettings, Athlete } from "./eligibility";
import { getMedicalClearance } from "./medicalStatus";

export interface DashboardMetrics {
  avgGpa: number;
  ineligibleCount: number;
  atRiskCount: number;
  medicalNotClearedCount: number;
  totalAthletes: number;
}

export interface UrgentAthlete {
  id: string;
  name: string;
  riskLevel: 'low' | 'moderate' | 'high';
  eligibilityReason: string;
  medicalReason: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  startTime: Date;
  location?: string;
  opponent?: string;
}

/**
 * Gets dashboard metrics for given teams
 */
export async function getTeamDashboard(
  userRole: 'AD' | 'COACH',
  userTeams: string[],
  userSettings: UserSettings
): Promise<DashboardMetrics> {
  // Get all athletes for the user's teams
  const athletes = await prisma.athlete.findMany({
    where: {
      teamId: { in: userTeams }
    },
    include: {
      academicRecords: true,
      healthRecords: true
    }
  });

  let totalGpa = 0;
  let gpaCount = 0;
  let ineligibleCount = 0;
  let atRiskCount = 0;
  let medicalNotClearedCount = 0;

  for (const athlete of athletes) {
    // GPA calculation
    if (athlete.gpa !== null) {
      totalGpa += athlete.gpa;
      gpaCount++;
    }

    // Eligibility
    const eligibility = getAthleteEligibility(athlete as unknown as Athlete, athlete.academicRecords, userSettings);
    if (!eligibility.isEligible) {
      ineligibleCount++;
    } else if (eligibility.riskLevel === 'moderate') {
      atRiskCount++;
    }

    // Medical clearance
    const medical = getMedicalClearance(athlete.healthRecords, userSettings);
    if (medical.status === 'not_cleared') {
      medicalNotClearedCount++;
    }
  }

  return {
    avgGpa: gpaCount > 0 ? totalGpa / gpaCount : 0,
    ineligibleCount,
    atRiskCount,
    medicalNotClearedCount,
    totalAthletes: athletes.length
  };
}

/**
 * Gets athletes needing attention, sorted by risk
 */
export async function getAthletesNeedingAttention(
  userRole: 'AD' | 'COACH',
  userTeams: string[],
  userSettings: UserSettings,
  limit: number = 5
): Promise<UrgentAthlete[]> {
  const athletes = await prisma.athlete.findMany({
    where: {
      teamId: { in: userTeams }
    },
    include: {
      academicRecords: true,
      healthRecords: true
    }
  });

  const urgentAthletes: UrgentAthlete[] = [];

  for (const athlete of athletes) {
    const eligibility = getAthleteEligibility(athlete as unknown as Athlete, athlete.academicRecords, userSettings);
    const medical = getMedicalClearance(athlete.healthRecords, userSettings);

    const overallRisk = Math.max(
      eligibility.riskLevel === 'high' ? 3 : eligibility.riskLevel === 'moderate' ? 2 : 1,
      medical.riskLevel === 'high' ? 3 : medical.riskLevel === 'moderate' ? 2 : 1
    );

    if (overallRisk >= 2) { // moderate or high risk
      urgentAthletes.push({
        id: athlete.id,
        name: athlete.name,
        riskLevel: overallRisk === 3 ? 'high' : 'moderate',
        eligibilityReason: eligibility.reason,
        medicalReason: medical.reason
      });
    }
  }

  // Sort by risk level (high first), then by name
  urgentAthletes.sort((a, b) => {
    if (a.riskLevel !== b.riskLevel) {
      return a.riskLevel === 'high' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  return urgentAthletes.slice(0, limit);
}

/**
 * Gets upcoming events for user's teams
 */
export async function getUpcomingEvents(
  userRole: 'AD' | 'COACH',
  userTeams: string[],
  nearDays: number = 30
): Promise<UpcomingEvent[]> {
  const now = new Date();
  const futureDate = new Date(now.getTime() + nearDays * 24 * 60 * 60 * 1000);

  const events = await prisma.event.findMany({
    where: {
      teamId: { in: userTeams },
      startTime: {
        gte: now,
        lte: futureDate
      }
    },
    orderBy: {
      startTime: 'asc'
    },
    take: 5
  });

  return events.map(event => ({
    id: event.id,
    title: event.title,
    startTime: event.startTime,
    location: event.location || undefined,
    opponent: event.opponent || undefined
  }));
}
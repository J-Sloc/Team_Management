import { AcademicStanding, ComplianceStatus, RiskFlag } from "../generated/prisma";

export interface UserSettings {
  gpaThresholds?: {
    ineligible: number;
    atRisk: number;
  };
  medicalStatuses?: {
    attendanceThreshold: number;
  };
  defaultFilters?: Record<string, unknown>;
}

export interface AcademicRecord {
  id: string;
  athleteId: string;
  semester: string;
  finalScore?: number | null;
  termGpa?: number | null;
  academicStanding?: AcademicStanding | null;
  complianceStatus?: ComplianceStatus | null;
  attendancePercent?: number | null;
  tutoringHours?: number | null;
  advisorNotes?: string | null;
  createdAt: Date;
}

export interface Athlete {
  id: string;
  name: string;
  teamId: string;
  jerseyNumber?: number | null;
  height?: number | null;
  weight?: number | null;
  classYear?: string | null;
  sport?: string | null;
  events: string[];
  eventRecords?: Record<string, unknown> | null;
  gpa?: number | null;
  academicStanding?: AcademicStanding | null;
  eligibilityYearsLeft?: number | null;
  recruitingStatus?: string | null;
  contactInfo?: string | null;
  transferProbability?: number | null;
  medicalStatus?: string | null;
  complianceStatus?: ComplianceStatus | null;
  riskFlag?: RiskFlag | null;
}

export interface EligibilityResult {
  isEligible: boolean;
  reason: string;
  riskLevel: 'low' | 'moderate' | 'high';
}

/**
 * Computes athlete eligibility based on GPA, academic standing, and user settings
 */
export function getAthleteEligibility(
  athlete: Athlete,
  academicRecords: AcademicRecord[],
  userSettings: UserSettings
): EligibilityResult {
  const ineligibleGpa = userSettings.gpaThresholds?.ineligible ?? 2.0;
  const atRiskGpa = userSettings.gpaThresholds?.atRisk ?? 2.5;

  // Default to eligible
  let isEligible = true;
  let reason = 'Eligible';
  let riskLevel: 'low' | 'moderate' | 'high' = 'low';

  // Check GPA
  if (athlete.gpa !== null && athlete.gpa !== undefined) {
    if (athlete.gpa <= ineligibleGpa) {
      isEligible = false;
      reason = `GPA ${athlete.gpa} at or below minimum ${ineligibleGpa}`;
      riskLevel = 'high';
    } else if (athlete.gpa <= atRiskGpa) {
      reason = `GPA ${athlete.gpa} in at-risk range`;
      riskLevel = 'moderate';
    }
  }

  // Check academic standing
  if (athlete.academicStanding === 'BAD') {
    isEligible = false;
    reason = 'Poor academic standing';
    riskLevel = 'high';
  } else if (athlete.academicStanding === 'NEUTRAL' && riskLevel === 'low') {
    riskLevel = 'moderate';
  }

  // Check compliance
  if (athlete.complianceStatus === 'NON_COMPLIANT') {
    isEligible = false;
    reason = 'Non-compliant status';
    riskLevel = 'high';
  } else if (athlete.complianceStatus === 'WARNING' && riskLevel === 'low') {
    riskLevel = 'moderate';
  }

  // Check risk flag
  if (athlete.riskFlag === 'HIGH') {
    riskLevel = 'high';
  } else if (athlete.riskFlag === 'MODERATE' && riskLevel === 'low') {
    riskLevel = 'moderate';
  }

  return { isEligible, reason, riskLevel };
}
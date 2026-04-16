import { MedicalStatus } from "../generated/prisma";

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

export interface HealthRecord {
  id: string;
  athleteId: string;
  injuryType?: string | null;
  injuryDate?: Date | null;
  status?: MedicalStatus | null;
  rehabSessions?: number | null;
  appointmentAttendance?: number | null;
  notes?: string | null;
  createdAt: Date;
}

export interface MedicalClearanceResult {
  status: 'cleared' | 'limited' | 'not_cleared';
  reason: string;
  riskLevel: 'low' | 'moderate' | 'high';
}

/**
 * Computes medical clearance based on health records and user settings
 */
export function getMedicalClearance(
  healthRecords: HealthRecord[],
  userSettings: UserSettings
): MedicalClearanceResult {
  const attendanceThreshold = userSettings.medicalStatuses?.attendanceThreshold ?? 80;

  // Default to cleared
  let status: 'cleared' | 'limited' | 'not_cleared' = 'cleared';
  let reason = 'No medical issues';
  let riskLevel: 'low' | 'moderate' | 'high' = 'low';

  // Check for any NOT_CLEARED status
  const notClearedRecords = healthRecords.filter(r => r.status === 'NOT_CLEARED');
  if (notClearedRecords.length > 0) {
    status = 'not_cleared';
    reason = `Not cleared: ${notClearedRecords[0].injuryType || 'injury'}`;
    riskLevel = 'high';
    return { status, reason, riskLevel };
  }

  // Check for LIMITED status
  const limitedRecords = healthRecords.filter(r => r.status === 'LIMITED');
  if (limitedRecords.length > 0) {
    status = 'limited';
    reason = `Limited clearance: ${limitedRecords[0].injuryType || 'injury'}`;
    riskLevel = 'moderate';
  }

  // Check appointment attendance for recent injuries
  const recentInjuries = healthRecords.filter(r => {
    if (!r.injuryDate) return false;
    const daysSinceInjury = (Date.now() - r.injuryDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceInjury < 30; // Within last 30 days
  });

  for (const injury of recentInjuries) {
    if (injury.appointmentAttendance !== null && injury.appointmentAttendance !== undefined && injury.appointmentAttendance < attendanceThreshold) {
      if (status === 'cleared') {
        status = 'limited';
        reason = `Low appointment attendance (${injury.appointmentAttendance}%)`;
        riskLevel = 'moderate';
      } else if (status === 'limited') {
        riskLevel = 'high';
      }
    }
  }

  return { status, reason, riskLevel };
}
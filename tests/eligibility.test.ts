import { describe, it, expect, beforeEach } from 'vitest';
import { getAthleteEligibility } from '@/lib/eligibility';
import type { Athlete, AcademicRecord } from '@/lib/eligibility';
import type { UserSettings } from '@/lib/eligibility';

describe('Business Logic: Athlete Eligibility', () => {
  let mockAthlete: Athlete;
  let mockRecords: AcademicRecord[];
  let mockSettings: UserSettings;

  beforeEach(() => {
    mockAthlete = {
      id: 'athlete-1',
      name: 'John Doe',
      teamId: 'team-1',
      gpa: 3.0,
      events: [],
      academicStanding: 'GOOD',
      complianceStatus: 'COMPLIANT',
    };

    mockRecords = [
      {
        id: 'record-1',
        athleteId: 'athlete-1',
        semester: 'Fall 2025',
        termGpa: 3.0,
        createdAt: new Date(),
      },
    ];

    mockSettings = {
      gpaThresholds: {
        ineligible: 2.0,
        atRisk: 2.5,
      },
      medicalStatuses: {
        attendanceThreshold: 80,
      },
    };
  });

  it('should mark athlete as eligible with good GPA', () => {
    const result = getAthleteEligibility(mockAthlete, mockRecords, mockSettings);
    expect(result.isEligible).toBe(true);
    expect(result.riskLevel).toBe('low');
  });

  it('should mark athlete as ineligible with low GPA', () => {
    mockAthlete.gpa = 1.8;
    const result = getAthleteEligibility(mockAthlete, mockRecords, mockSettings);
    expect(result.isEligible).toBe(false);
    expect(result.riskLevel).toBe('high');
    expect(result.reason).toContain('below minimum');
  });

  it('should mark athlete at-risk with borderline GPA', () => {
    mockAthlete.gpa = 2.4;
    const result = getAthleteEligibility(mockAthlete, mockRecords, mockSettings);
    expect(result.isEligible).toBe(true);
    expect(result.riskLevel).toBe('moderate');
  });

  it('should use custom GPA thresholds from settings', () => {
    mockSettings.gpaThresholds = {
      ineligible: 2.5,
      atRisk: 3.0,
    };
    mockAthlete.gpa = 2.7;
    const result = getAthleteEligibility(mockAthlete, mockRecords, mockSettings);
    expect(result.riskLevel).toBe('moderate');
  });

  it('should handle null GPA gracefully', () => {
    mockAthlete.gpa = null;
    const result = getAthleteEligibility(mockAthlete, mockRecords, mockSettings);
    expect(result).toBeDefined();
  });
});

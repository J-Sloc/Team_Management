import { describe, it, expect, beforeEach } from 'vitest';
import { getMedicalClearance } from '@/lib/medicalStatus';
import type { HealthRecord, UserSettings } from '@/lib/medicalStatus';

describe('Business Logic: Medical Clearance', () => {
  let mockRecords: HealthRecord[];
  let mockSettings: UserSettings;

  beforeEach(() => {
    mockRecords = [];
    mockSettings = {
      medicalStatuses: {
        attendanceThreshold: 80,
      },
    };
  });

  it('should mark athlete as cleared with no records', () => {
    const result = getMedicalClearance(mockRecords, mockSettings);
    expect(result.status).toBe('cleared');
    expect(result.riskLevel).toBe('low');
  });

  it('should mark athlete as not cleared with active injury', () => {
    const now = new Date();
    mockRecords = [
      {
        id: 'record-1',
        athleteId: 'athlete-1',
        status: 'NOT_CLEARED',
        injuryType: 'ACL Tear',
        injuryDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        createdAt: now,
      },
    ];

    const result = getMedicalClearance(mockRecords, mockSettings);
    expect(result.status).toBe('not_cleared');
    expect(result.riskLevel).toBe('high');
  });

  it('should use custom attendance threshold from settings', () => {
    mockSettings.medicalStatuses = {
      attendanceThreshold: 90,
    };
    mockRecords = [
      {
        id: 'record-1',
        athleteId: 'athlete-1',
        status: 'LIMITED',
        injuryType: 'Sprain',
        appointmentAttendance: 85,
        injuryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
      },
    ];

    const result = getMedicalClearance(mockRecords, mockSettings);
    // Low attendance (85 < 90) should trigger limited or not cleared
    expect(['limited', 'not_cleared']).toContain(result.status);
  });

  it('should handle null values in records gracefully', () => {
    mockRecords = [
      {
        id: 'record-1',
        athleteId: 'athlete-1',
        status: null,
        injuryType: null,
        injuryDate: null,
        appointmentAttendance: null,
        createdAt: new Date(),
      },
    ];

    const result = getMedicalClearance(mockRecords, mockSettings);
    expect(result).toBeDefined();
    expect(['cleared', 'limited']).toContain(result.status);
  });
});

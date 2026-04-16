import { beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = vi.hoisted(() => ({
  athlete: {
    findMany: vi.fn(),
  },
  event: {
    findMany: vi.fn(),
  },
}));

vi.mock("@/lib/prisma", () => ({
  default: prismaMock,
}));

import { getTeamDashboard, getUpcomingEvents } from "@/lib/dashboardData";

describe("Dashboard data loading", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("aggregates dashboard metrics from scoped athlete data", async () => {
    prismaMock.athlete.findMany.mockResolvedValue([
      {
        id: "athlete-1",
        name: "John Smith",
        gpa: 1.9,
        academicStanding: "BAD",
        complianceStatus: "COMPLIANT",
        riskFlag: "HIGH",
        academicRecords: [],
        healthRecords: [],
      },
      {
        id: "athlete-2",
        name: "Sarah Jones",
        gpa: 3.4,
        academicStanding: "GOOD",
        complianceStatus: "COMPLIANT",
        riskFlag: "NONE",
        academicRecords: [],
        healthRecords: [
          {
            id: "health-1",
            athleteId: "athlete-2",
            status: "NOT_CLEARED",
            injuryType: "Hamstring",
            injuryDate: new Date(),
            createdAt: new Date(),
          },
        ],
      },
    ]);

    const metrics = await getTeamDashboard("COACH", ["team-1"], {
      gpaThresholds: { ineligible: 2, atRisk: 2.5 },
      medicalStatuses: { attendanceThreshold: 80 },
    });

    expect(metrics.totalAthletes).toBe(2);
    expect(metrics.ineligibleCount).toBe(1);
    expect(metrics.medicalNotClearedCount).toBe(1);
  });

  it("loads upcoming events in chronological order", async () => {
    const now = new Date();
    prismaMock.event.findMany.mockResolvedValue([
      {
        id: "event-1",
        title: "Saturday Meet",
        startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        location: "Home Track",
        opponent: "Regional Teams",
      },
    ]);

    const events = await getUpcomingEvents("COACH", ["team-1"], 30);

    expect(events).toHaveLength(1);
    expect(events[0].title).toBe("Saturday Meet");
  });
});

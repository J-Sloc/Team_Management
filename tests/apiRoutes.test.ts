import { beforeEach, describe, expect, it, vi } from "vitest";

const authMock = vi.hoisted(() => vi.fn());
const prismaMock = vi.hoisted(() => ({
  athlete: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
  },
  athleteJournal: {
    findMany: vi.fn(),
  },
  note: {
    findUnique: vi.fn(),
    update: vi.fn(),
  },
  team: {
    findMany: vi.fn(),
  },
  user: {
    findUnique: vi.fn(),
  },
  userSettings: {
    upsert: vi.fn(),
  },
}));

vi.mock("@/app/lib/auth", () => ({
  auth: authMock,
}));

vi.mock("@/lib/prisma", () => ({
  default: prismaMock,
}));

import { GET as getAthletes } from "@/app/api/athletes/route";
import { GET as getJournals } from "@/app/api/journals/route";
import { PUT as putNote } from "@/app/api/notes/route";
import { POST as postRanking } from "@/app/api/rankings/route";
import { POST as postUserSettings } from "@/app/api/user-settings/route";
import { GET as getWorkouts } from "@/app/api/workouts/route";

describe("API route hardening", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 for anonymous athlete roster reads", async () => {
    authMock.mockResolvedValue(null);

    const response = await getAthletes(new Request("http://localhost/api/athletes"));

    expect(response.status).toBe(401);
  });

  it("scopes coach athlete reads to assigned teams", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });
    prismaMock.user.findUnique.mockResolvedValue({ teams: ["team-1"] });
    prismaMock.athlete.findMany.mockResolvedValue([]);

    const response = await getAthletes(new Request("http://localhost/api/athletes"));

    expect(response.status).toBe(200);
    expect(prismaMock.athlete.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { teamId: { in: ["team-1"] } },
      }),
    );
  });

  it("blocks athletes from reading another athlete's workouts", async () => {
    authMock.mockResolvedValue({
      user: { id: "athlete-user-1", role: "ATHLETE" },
    });
    prismaMock.athlete.findUnique.mockResolvedValue({
      id: "athlete-2",
      teamId: "team-1",
      userId: "someone-else",
      name: "Another Athlete",
    });

    const response = await getWorkouts(
      new Request("http://localhost/api/workouts?athleteId=athlete-2"),
    );

    expect(response.status).toBe(403);
  });

  it("allows athletes to read their own journals", async () => {
    authMock.mockResolvedValue({
      user: { id: "athlete-user-1", role: "ATHLETE" },
    });
    prismaMock.athlete.findUnique.mockResolvedValue({
      id: "athlete-1",
      teamId: "team-1",
      userId: "athlete-user-1",
      name: "John Smith",
    });
    prismaMock.athleteJournal.findMany.mockResolvedValue([
      {
        id: "journal-1",
        title: "Recovery",
        body: "Felt strong today",
        createdAt: new Date().toISOString(),
        author: { id: "athlete-user-1", email: "athlete@test.com", role: "ATHLETE" },
      },
    ]);

    const response = await getJournals(
      new Request("http://localhost/api/journals?athleteId=athlete-1"),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(1);
  });

  it("supports note edits for authorized owners", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });
    prismaMock.note.findUnique.mockResolvedValue({
      id: "note-1",
      athleteId: null,
      userId: "coach-1",
    });
    prismaMock.note.update.mockResolvedValue({
      id: "note-1",
      category: "GENERAL",
      body: "Updated note",
    });

    const response = await putNote(
      new Request("http://localhost/api/notes?id=note-1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: "Updated note" }),
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.body).toBe("Updated note");
  });

  it("persists validated user settings", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });
    prismaMock.userSettings.upsert.mockResolvedValue({
      id: "settings-1",
      userId: "coach-1",
      gpaThresholds: { ineligible: 2, atRisk: 2.5 },
    });

    const response = await postUserSettings(
      new Request("http://localhost/api/user-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gpaThresholds: { ineligible: 2, atRisk: 2.5 },
          medicalStatuses: { attendanceThreshold: 85 },
        }),
      }),
    );

    expect(response.status).toBe(201);
    expect(prismaMock.userSettings.upsert).toHaveBeenCalled();
  });

  it("rejects ranking entry payloads without a source", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });

    const response = await postRanking(
      new Request("http://localhost/api/rankings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "entry",
          athleteId: "athlete-1",
          eventName: "200m",
          rank: 3,
        }),
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error.message).toBe("Validation failed");
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";

const authMock = vi.hoisted(() => vi.fn());
const prismaMock = vi.hoisted(() => ({
  $transaction: vi.fn(),
  athlete: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
  },
  athleteJournal: {
    findUnique: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
    findMany: vi.fn(),
  },
  eventRanking: {
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  meetEntry: {
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  rankingSource: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
  team: {
    findMany: vi.fn(),
  },
  user: {
    findUnique: vi.fn(),
  },
  workoutInstance: {
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    updateMany: vi.fn(),
  },
  workoutMetric: {
    deleteMany: vi.fn(),
  },
  workoutTemplate: {
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("@/app/lib/auth", () => ({
  auth: authMock,
}));

vi.mock("@/lib/prisma", () => ({
  default: prismaMock,
}));

import { DELETE as deleteJournal } from "@/app/api/journals/route";
import { DELETE as deleteMeetEntry, PUT as putMeetEntry } from "@/app/api/meet-entries/route";
import { DELETE as deleteRanking, PUT as putRanking } from "@/app/api/rankings/route";
import { DELETE as deleteWorkout, PUT as putWorkout } from "@/app/api/workouts/route";

describe("Track CRUD mutation routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates workout templates for an in-scope coach", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });
    prismaMock.workoutTemplate.findUnique.mockResolvedValue({
      id: "template-1",
      teamId: "team-1",
    });
    prismaMock.user.findUnique.mockResolvedValue({ teams: ["team-1"] });
    prismaMock.workoutTemplate.update.mockResolvedValue({
      id: "template-1",
      teamId: "team-1",
      name: "Speed Endurance",
      description: "Updated plan",
      sport: "TRACK_AND_FIELD",
      metrics: [{ id: "metric-1", name: "400m Split", targetValue: 58, unit: "SECONDS" }],
    });

    const response = await putWorkout(
      new Request("http://localhost/api/workouts?id=template-1&type=template", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId: "team-1",
          name: "Speed Endurance",
          description: "Updated plan",
          sport: "TRACK_AND_FIELD",
          metrics: [{ name: "400m Split", targetValue: 58, unit: "SECONDS" }],
        }),
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.name).toBe("Speed Endurance");
    expect(prismaMock.workoutTemplate.update).toHaveBeenCalled();
  });

  it("blocks workout template deletes outside coach scope", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });
    prismaMock.workoutTemplate.findUnique.mockResolvedValue({
      id: "template-2",
      teamId: "team-2",
    });
    prismaMock.user.findUnique.mockResolvedValue({ teams: ["team-1"] });

    const response = await deleteWorkout(
      new Request("http://localhost/api/workouts?id=template-2&type=template", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(403);
  });

  it("denies athlete workout mutations", async () => {
    authMock.mockResolvedValue({
      user: { id: "athlete-user-1", role: "ATHLETE" },
    });

    const response = await deleteWorkout(
      new Request("http://localhost/api/workouts?id=instance-1&type=instance", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(401);
  });

  it("updates ranking entries for an in-scope coach", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });
    prismaMock.eventRanking.findUnique.mockResolvedValue({ athleteId: "athlete-1" });
    prismaMock.athlete.findUnique.mockResolvedValue({
      id: "athlete-1",
      teamId: "team-1",
      userId: "athlete-user-1",
      name: "Runner One",
    });
    prismaMock.user.findUnique.mockResolvedValue({ teams: ["team-1"] });
    prismaMock.rankingSource.create.mockResolvedValue({ id: "source-1" });
    prismaMock.eventRanking.update.mockResolvedValue({
      id: "ranking-1",
      eventName: "400m",
      rank: 2,
      region: "State",
      score: 49.21,
      recordedAt: new Date().toISOString(),
      athlete: { id: "athlete-1", name: "Runner One", teamId: "team-1" },
      rankingSource: { id: "source-1", name: "State Finals", type: "MEET" },
    });

    const response = await putRanking(
      new Request("http://localhost/api/rankings?id=ranking-1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          athleteId: "athlete-1",
          sourceName: "State Finals",
          sourceType: "MEET",
          eventName: "400m",
          rank: 2,
          region: "State",
          score: 49.21,
        }),
      }),
    );

    expect(response.status).toBe(200);
    expect(prismaMock.eventRanking.update).toHaveBeenCalled();
  });

  it("blocks ranking deletes for athletes outside scope", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });
    prismaMock.eventRanking.findUnique.mockResolvedValue({ athleteId: "athlete-2" });
    prismaMock.athlete.findUnique.mockResolvedValue({
      id: "athlete-2",
      teamId: "team-2",
      userId: "athlete-user-2",
      name: "Runner Two",
    });
    prismaMock.user.findUnique.mockResolvedValue({ teams: ["team-1"] });

    const response = await deleteRanking(
      new Request("http://localhost/api/rankings?id=ranking-2", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(403);
  });

  it("updates meet entries for an AD", async () => {
    authMock.mockResolvedValue({
      user: { id: "ad-1", role: "AD" },
    });
    prismaMock.meetEntry.findUnique.mockResolvedValue({
      id: "entry-1",
      athleteId: "athlete-1",
      teamId: "team-1",
    });
    prismaMock.athlete.findUnique.mockResolvedValue({
      id: "athlete-1",
      teamId: "team-1",
      userId: "athlete-user-1",
      name: "Runner One",
    });
    prismaMock.team.findMany.mockResolvedValue([{ id: "team-1" }, { id: "team-2" }]);
    prismaMock.meetEntry.update.mockResolvedValue({
      id: "entry-1",
      athleteId: "athlete-1",
      teamId: "team-1",
      eventName: "4x400",
      athlete: { id: "athlete-1", name: "Runner One" },
      team: { id: "team-1", name: "Track" },
    });

    const response = await putMeetEntry(
      new Request("http://localhost/api/meet-entries?id=entry-1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          athleteId: "athlete-1",
          teamId: "team-1",
          eventName: "4x400",
          heat: "1",
          lane: "4",
          status: "CONFIRMED",
          importedFrom: "Manual UI",
        }),
      }),
    );

    expect(response.status).toBe(200);
    expect(prismaMock.meetEntry.update).toHaveBeenCalled();
  });

  it("blocks meet entry deletes outside coach scope", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });
    prismaMock.meetEntry.findUnique.mockResolvedValue({
      athleteId: "athlete-2",
    });
    prismaMock.athlete.findUnique.mockResolvedValue({
      id: "athlete-2",
      teamId: "team-2",
      userId: "athlete-user-2",
      name: "Runner Two",
    });
    prismaMock.user.findUnique.mockResolvedValue({ teams: ["team-1"] });

    const response = await deleteMeetEntry(
      new Request("http://localhost/api/meet-entries?id=entry-2", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(403);
  });

  it("allows journal authors to delete their own entry", async () => {
    authMock.mockResolvedValue({
      user: { id: "athlete-user-1", role: "ATHLETE" },
    });
    prismaMock.athleteJournal.findUnique.mockResolvedValue({
      id: "journal-1",
      athleteId: "athlete-1",
      authorId: "athlete-user-1",
    });

    const response = await deleteJournal(
      new Request("http://localhost/api/journals?id=journal-1", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(200);
    expect(prismaMock.athleteJournal.delete).toHaveBeenCalledWith({
      where: { id: "journal-1" },
    });
  });

  it("blocks athletes from deleting journal entries they did not author", async () => {
    authMock.mockResolvedValue({
      user: { id: "athlete-user-1", role: "ATHLETE" },
    });
    prismaMock.athleteJournal.findUnique.mockResolvedValue({
      id: "journal-2",
      athleteId: "athlete-1",
      authorId: "coach-1",
    });

    const response = await deleteJournal(
      new Request("http://localhost/api/journals?id=journal-2", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(403);
  });

  it("allows coaches to moderate journal deletes within scope", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });
    prismaMock.athleteJournal.findUnique.mockResolvedValue({
      id: "journal-3",
      athleteId: "athlete-1",
      authorId: "athlete-user-1",
    });
    prismaMock.athlete.findUnique.mockResolvedValue({
      id: "athlete-1",
      teamId: "team-1",
      userId: "athlete-user-1",
      name: "Runner One",
    });
    prismaMock.user.findUnique.mockResolvedValue({ teams: ["team-1"] });

    const response = await deleteJournal(
      new Request("http://localhost/api/journals?id=journal-3", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(200);
    expect(prismaMock.athleteJournal.delete).toHaveBeenCalledWith({
      where: { id: "journal-3" },
    });
  });
});

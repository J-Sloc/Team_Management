import { beforeEach, describe, expect, it, vi } from "vitest";

const authMock = vi.hoisted(() => vi.fn());
const prismaMock = vi.hoisted(() => ({
  athlete: {
    findFirst: vi.fn(),
    findUnique: vi.fn(),
  },
  event: {
    create: vi.fn(),
    delete: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
  },
  team: {
    findMany: vi.fn(),
  },
  user: {
    findUnique: vi.fn(),
  },
}));

vi.mock("@/app/lib/auth", () => ({
  auth: authMock,
}));

vi.mock("@/lib/prisma", () => ({
  default: prismaMock,
}));

import {
  DELETE as deleteEvent,
  GET as getEvents,
  POST as postEvent,
} from "@/app/api/events/route";

describe("Event calendar ACL", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows a coach to create a team-shared event in scope", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });
    prismaMock.user.findUnique.mockResolvedValue({ teams: ["team-1"] });
    prismaMock.event.create.mockResolvedValue({
      id: "event-1",
      teamId: "team-1",
      athleteId: null,
      title: "Team Practice",
      type: "PRACTICE",
      description: null,
      startTime: new Date("2026-04-20T15:00:00Z").toISOString(),
      endTime: new Date("2026-04-20T17:00:00Z").toISOString(),
      location: "Track",
      opponent: null,
      group: "TEAM",
      team: { id: "team-1", name: "Track" },
      athlete: null,
    });

    const response = await postEvent(
      new Request("http://localhost/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId: "team-1",
          type: "PRACTICE",
          title: "Team Practice",
          startTime: "2026-04-20T15:00:00.000Z",
          endTime: "2026-04-20T17:00:00.000Z",
          location: "Track",
          group: "TEAM",
        }),
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.ownerType).toBe("team");
    expect(data.canEdit).toBe(true);
  });

  it("allows an athlete to create their own personal event", async () => {
    authMock.mockResolvedValue({
      user: { id: "athlete-user-1", role: "ATHLETE" },
    });
    prismaMock.athlete.findFirst.mockResolvedValue({
      id: "athlete-1",
      teamId: "team-1",
      name: "Runner One",
    });
    prismaMock.event.create.mockResolvedValue({
      id: "event-2",
      teamId: "team-1",
      athleteId: "athlete-1",
      title: "Doctor Appointment",
      type: "MEDICAL",
      description: null,
      startTime: new Date("2026-04-22T13:00:00Z").toISOString(),
      endTime: new Date("2026-04-22T14:00:00Z").toISOString(),
      location: "Clinic",
      opponent: null,
      group: "PERSONAL",
      team: { id: "team-1", name: "Track" },
      athlete: {
        id: "athlete-1",
        name: "Runner One",
        userId: "athlete-user-1",
        teamId: "team-1",
      },
    });

    const response = await postEvent(
      new Request("http://localhost/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "MEDICAL",
          title: "Doctor Appointment",
          startTime: "2026-04-22T13:00:00.000Z",
          endTime: "2026-04-22T14:00:00.000Z",
          location: "Clinic",
          group: "PERSONAL",
        }),
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.ownerType).toBe("athlete");
    expect(data.canEdit).toBe(true);
  });

  it("blocks athletes from creating team-shared entries", async () => {
    authMock.mockResolvedValue({
      user: { id: "athlete-user-1", role: "ATHLETE" },
    });

    const response = await postEvent(
      new Request("http://localhost/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId: "team-1",
          type: "PRACTICE",
          title: "Unauthorized team event",
          startTime: "2026-04-22T13:00:00.000Z",
          endTime: "2026-04-22T14:00:00.000Z",
          group: "TEAM",
        }),
      }),
    );

    expect(response.status).toBe(403);
  });

  it("blocks athletes from deleting team-shared entries", async () => {
    authMock.mockResolvedValue({
      user: { id: "athlete-user-1", role: "ATHLETE" },
    });
    prismaMock.event.findUnique.mockResolvedValue({
      id: "event-3",
      teamId: "team-1",
      athleteId: null,
      title: "Team Meeting",
      type: "MEETING",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      group: "TEAM",
      team: { id: "team-1", name: "Track" },
      athlete: null,
    });

    const response = await deleteEvent(
      new Request("http://localhost/api/events?id=event-3", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(403);
  });

  it("lets a coach read in-scope athlete personal entries but not edit them", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });
    prismaMock.athlete.findUnique.mockResolvedValue({
      id: "athlete-1",
      teamId: "team-1",
      userId: "athlete-user-1",
      name: "Runner One",
    });
    prismaMock.user.findUnique.mockResolvedValue({ teams: ["team-1"] });
    prismaMock.event.findMany.mockResolvedValue([
      {
        id: "team-event-1",
        teamId: "team-1",
        athleteId: null,
        title: "Team Practice",
        type: "PRACTICE",
        description: null,
        startTime: new Date("2026-04-20T15:00:00Z").toISOString(),
        endTime: new Date("2026-04-20T17:00:00Z").toISOString(),
        location: "Track",
        opponent: null,
        group: "TEAM",
        team: { id: "team-1", name: "Track" },
        athlete: null,
      },
      {
        id: "personal-event-1",
        teamId: "team-1",
        athleteId: "athlete-1",
        title: "Athlete Appointment",
        type: "MEDICAL",
        description: null,
        startTime: new Date("2026-04-21T09:00:00Z").toISOString(),
        endTime: new Date("2026-04-21T10:00:00Z").toISOString(),
        location: "Clinic",
        opponent: null,
        group: "PERSONAL",
        team: { id: "team-1", name: "Track" },
        athlete: {
          id: "athlete-1",
          name: "Runner One",
          userId: "athlete-user-1",
          teamId: "team-1",
        },
      },
    ]);

    const response = await getEvents(
      new Request("http://localhost/api/events?athleteId=athlete-1"),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data[1].ownerType).toBe("athlete");
    expect(data[1].canEdit).toBe(false);
  });

  it("blocks coaches from deleting athlete-owned personal entries", async () => {
    authMock.mockResolvedValue({
      user: { id: "coach-1", role: "COACH" },
    });
    prismaMock.event.findUnique.mockResolvedValue({
      id: "personal-event-2",
      teamId: "team-1",
      athleteId: "athlete-1",
      title: "Personal note",
      type: "MEDICAL",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      group: "PERSONAL",
      team: { id: "team-1", name: "Track" },
      athlete: {
        id: "athlete-1",
        name: "Runner One",
        userId: "athlete-user-1",
        teamId: "team-1",
      },
    });
    prismaMock.user.findUnique.mockResolvedValue({ teams: ["team-1"] });

    const response = await deleteEvent(
      new Request("http://localhost/api/events?id=personal-event-2", {
        method: "DELETE",
      }),
    );

    expect(response.status).toBe(403);
  });
});

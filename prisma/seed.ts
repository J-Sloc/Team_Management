import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // Clean up existing data (for local development only!)
  await prisma.athleteJournal.deleteMany({});
  await prisma.meetEntry.deleteMany({});
  await prisma.personalRecord.deleteMany({});
  await prisma.eventRanking.deleteMany({});
  await prisma.rankingSource.deleteMany({});
  await prisma.workoutInstance.deleteMany({});
  await prisma.workoutMetric.deleteMany({});
  await prisma.workoutTemplate.deleteMany({});
  await prisma.note.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.healthRecord.deleteMany({});
  await prisma.academicRecord.deleteMany({});
  await prisma.athlete.deleteMany({});
  await prisma.userSettings.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.team.deleteMany({});

  // Create teams
  const trackTeam = await prisma.team.create({
    data: {
      name: "Men's Varsity Track & Field",
      sport: "TRACK_AND_FIELD",
      institution: "Test High School",
    },
  });

  const footballTeam = await prisma.team.create({
    data: {
      name: "Varsity Football",
      sport: "FOOTBALL",
      institution: "Test High School",
    },
  });

  console.log("✅ Teams created:", trackTeam.name, footballTeam.name);

  // Hash passwords (all set to "password123" for testing)
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create AD user (sees all teams)
  const adUser = await prisma.user.create({
    data: {
      email: "ad@test.com",
      passwordHash: hashedPassword,
      role: "AD",
      teams: [trackTeam.id, footballTeam.id], // AD sees all teams
    },
  });

  // Create Coach user (single team)
  const coachUser = await prisma.user.create({
    data: {
      email: "coach@test.com",
      passwordHash: hashedPassword,
      role: "COACH",
      teams: [trackTeam.id],
    },
  });

  // Create Multi-sport Coach user
  const multiCoachUser = await prisma.user.create({
    data: {
      email: "multicoach@test.com",
      passwordHash: hashedPassword,
      role: "COACH",
      teams: [trackTeam.id, footballTeam.id], // Coaches both sports
    },
  });

  const athleteUser = await prisma.user.create({
    data: {
      email: "athlete@test.com",
      passwordHash: hashedPassword,
      role: "ATHLETE",
      teams: [trackTeam.id],
    },
  });

  console.log(
    "✅ Users created:",
    adUser.email,
    coachUser.email,
    multiCoachUser.email,
    athleteUser.email,
  );

  // Create UserSettings for each user
  await prisma.userSettings.create({
    data: {
      userId: adUser.id,
      gpaThresholds: { ineligible: 2.0, atRisk: 2.5 },
      medicalStatuses: { attendanceThreshold: 80 },
      defaultFilters: { riskFlag: ["HIGH"], classYear: ["Senior"] },
    },
  });

  await prisma.userSettings.create({
    data: {
      userId: coachUser.id,
      gpaThresholds: { ineligible: 2.0, atRisk: 2.5 },
      medicalStatuses: { attendanceThreshold: 80 },
      defaultFilters: { riskFlag: ["HIGH"] },
    },
  });

  await prisma.userSettings.create({
    data: {
      userId: multiCoachUser.id,
      gpaThresholds: { ineligible: 2.0, atRisk: 2.5 },
      medicalStatuses: { attendanceThreshold: 80 },
      defaultFilters: { riskFlag: ["HIGH"] },
    },
  });

  console.log("✅ User settings created");

  // Create 10 athletes with varied statuses
  const athleteData = [
    {
      name: "John Smith",
      classYear: "Senior",
      gpa: 3.2,
      academicStanding: "GOOD" as const,
      medicalStatus: "CLEARED" as const,
      complianceStatus: "COMPLIANT" as const,
      riskFlag: "NONE" as const,
      events: ["100m", "200m"],
    },
    {
      name: "Jane Doe",
      classYear: "Junior",
      gpa: 1.8,
      academicStanding: "BAD" as const,
      medicalStatus: "CLEARED" as const,
      complianceStatus: "COMPLIANT" as const,
      riskFlag: "HIGH" as const,
      events: ["400m", "800m"],
    },
    {
      name: "Mike Johnson",
      classYear: "Senior",
      gpa: 2.1,
      academicStanding: "NEUTRAL" as const,
      medicalStatus: "LIMITED" as const,
      complianceStatus: "WARNING" as const,
      riskFlag: "MODERATE" as const,
      events: ["1600m"],
    },
    {
      name: "Sarah Williams",
      classYear: "Freshman",
      gpa: 3.5,
      academicStanding: "GOOD" as const,
      medicalStatus: "CLEARED" as const,
      complianceStatus: "COMPLIANT" as const,
      riskFlag: "NONE" as const,
      events: ["100m", "200m", "Long Jump"],
    },
    {
      name: "Tom Brown",
      classYear: "Sophomore",
      gpa: 1.9,
      academicStanding: "BAD" as const,
      medicalStatus: "NOT_CLEARED" as const,
      complianceStatus: "NON_COMPLIANT" as const,
      riskFlag: "HIGH" as const,
      events: ["400m"],
    },
    {
      name: "Emily Davis",
      classYear: "Senior",
      gpa: 2.4,
      academicStanding: "NEUTRAL" as const,
      medicalStatus: "CLEARED" as const,
      complianceStatus: "COMPLIANT" as const,
      riskFlag: "NONE" as const,
      events: ["3200m", "1600m"],
    },
    {
      name: "Chris Miller",
      classYear: "Junior",
      gpa: 2.2,
      academicStanding: "NEUTRAL" as const,
      medicalStatus: "LIMITED" as const,
      complianceStatus: "WARNING" as const,
      riskFlag: "MODERATE" as const,
      events: ["110m Hurdles", "300m Hurdles"],
    },
    {
      name: "Lisa Anderson",
      classYear: "Freshman",
      gpa: 2.0,
      academicStanding: "NEUTRAL" as const,
      medicalStatus: "CLEARED" as const,
      complianceStatus: "COMPLIANT" as const,
      riskFlag: "NONE" as const,
      events: ["4x100m", "4x400m"],
    },
    {
      name: "David Taylor",
      classYear: "Senior",
      gpa: 1.7,
      academicStanding: "BAD" as const,
      medicalStatus: "CLEARED" as const,
      complianceStatus: "COMPLIANT" as const,
      riskFlag: "HIGH" as const,
      events: ["200m", "400m"],
    },
    {
      name: "Rachel White",
      classYear: "Sophomore",
      gpa: 3.0,
      academicStanding: "GOOD" as const,
      medicalStatus: "LIMITED" as const,
      complianceStatus: "COMPLIANT" as const,
      riskFlag: "MODERATE" as const,
      events: ["High Jump", "Long Jump"],
    },
  ];

  for (const data of athleteData) {
    const { events, ...athleteFields } = data;
    await prisma.athlete.create({
      data: {
        ...athleteFields,
        teamId: trackTeam.id,
        height: 5.9,
        weight: 160,
        sport: "Track & Field",
        events: events,
        jerseyNumber: null,
        userId: data.name === "John Smith" ? athleteUser.id : null,
      },
    });
  }
  console.log("✅ 10 track athletes created");

  // Create football athletes
  const footballAthleteData = [
    {
      name: "Alex Johnson",
      classYear: "Senior",
      gpa: 2.8,
      academicStanding: "GOOD" as const,
      medicalStatus: "CLEARED" as const,
      complianceStatus: "COMPLIANT" as const,
      riskFlag: "NONE" as const,
      position: "Quarterback",
    },
    {
      name: "Ben Smith",
      classYear: "Junior",
      gpa: 1.5,
      academicStanding: "BAD" as const,
      medicalStatus: "LIMITED" as const,
      complianceStatus: "WARNING" as const,
      riskFlag: "HIGH" as const,
      position: "Running Back",
    },
  ];

  for (const data of footballAthleteData) {
    const { position, ...athleteFields } = data;
    await prisma.athlete.create({
      data: {
        ...athleteFields,
        teamId: footballTeam.id,
        height: 6.0,
        weight: 180,
        sport: "Football",
        events: [position], // Use position as event for simplicity
        jerseyNumber: null,
      },
    });
  }
  console.log("✅ 2 football athletes created");

  const johnSmith = await prisma.athlete.findFirst({
    where: { name: "John Smith" },
  });

  // Create some academic records
  const janeDoe = await prisma.athlete.findFirst({ where: { name: "Jane Doe" } });
  if (janeDoe) {
    await prisma.academicRecord.create({
      data: {
        athleteId: janeDoe.id,
        semester: "Fall 2024",
        finalScore: 65,
        termGpa: 1.8,
        academicStanding: "BAD",
        complianceStatus: "COMPLIANT",
        attendancePercent: 75,
        tutoringHours: 5,
      },
    });
  }

  console.log("✅ Academic record created");

  // Create some health records
  const mikeJohnson = await prisma.athlete.findFirst({ where: { name: "Mike Johnson" } });
  if (mikeJohnson) {
    await prisma.healthRecord.create({
      data: {
        athleteId: mikeJohnson.id,
        injuryType: "Ankle Sprain",
        status: "LIMITED",
        rehabSessions: 8,
        appointmentAttendance: 75,
        notes: "Recovering well, cleared for light practice",
      },
    });
  }

  console.log("✅ Health record created");

  if (johnSmith) {
    const workoutTemplate = await prisma.workoutTemplate.create({
      data: {
        teamId: trackTeam.id,
        createdByUserId: coachUser.id,
        name: "Speed Endurance Session",
        description: "300m repeats with 4-minute recovery",
        sport: "TRACK_AND_FIELD",
        metrics: {
          create: [
            {
              name: "Target Time",
              targetValue: 42,
              unit: "SECONDS",
            },
            {
              name: "Recovery",
              targetValue: 4,
              unit: "MINUTES",
            },
          ],
        },
      },
    });

    await prisma.workoutInstance.create({
      data: {
        workoutTemplateId: workoutTemplate.id,
        athleteId: johnSmith.id,
        createdByUserId: coachUser.id,
        notes: "Strong finish on the last rep",
        results: {
          reps: [
            { distance: 300, unit: "METERS", actualSeconds: 41.8 },
            { distance: 300, unit: "METERS", actualSeconds: 42.4 },
          ],
        },
      },
    });

    const rankingSource = await prisma.rankingSource.create({
      data: {
        name: "State Qualifier List",
        type: "MANUAL",
      },
    });

    await prisma.eventRanking.create({
      data: {
        athleteId: johnSmith.id,
        rankingSourceId: rankingSource.id,
        eventName: "200m",
        rank: 8,
        region: "State",
        score: 21.74,
      },
    });

    await prisma.personalRecord.create({
      data: {
        athleteId: johnSmith.id,
        eventName: "200m",
        result: 21.74,
        unit: "SECONDS",
        notes: "Wind legal at invitational finals",
      },
    });

    await prisma.meetEntry.create({
      data: {
        athleteId: johnSmith.id,
        teamId: trackTeam.id,
        eventName: "200m",
        heat: "1",
        lane: "4",
        status: "CONFIRMED",
        importedFrom: "Manual",
        createdByUserId: coachUser.id,
      },
    });

    await prisma.athleteJournal.create({
      data: {
        athleteId: johnSmith.id,
        authorId: athleteUser.id,
        authorRole: "ATHLETE",
        title: "Post-workout reflection",
        body: "Felt smooth through the first rep and tightened up late on the second.",
      },
    });
  }

  console.log("✅ Track & field seed data created");

  // Create some events
  await prisma.event.create({
    data: {
      teamId: trackTeam.id,
      type: "GAME",
      title: "Regional Track Meet",
      startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // +3 hours
      location: "Jefferson High School Stadium",
      opponent: "Regional Teams",
      group: "TEAM",
    },
  });

  await prisma.event.create({
    data: {
      teamId: trackTeam.id,
      type: "PRACTICE",
      title: "Track Practice - Speed Work",
      startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      location: "Track at Test High School",
      group: "TEAM",
    },
  });

  await prisma.event.create({
    data: {
      teamId: footballTeam.id,
      type: "GAME",
      title: "Football Game vs Rivals",
      startTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      location: "Home Stadium",
      opponent: "City Rivals",
      group: "TEAM",
    },
  });

  console.log("✅ Events created");
  console.log("🎉 Seeding complete!");
  console.log("\nTest credentials:");
  console.log("  AD: ad@test.com / password123");
  console.log("  Coach: coach@test.com / password123");
  console.log("  Athlete: athlete@test.com / password123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

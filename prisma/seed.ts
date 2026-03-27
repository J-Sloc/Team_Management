import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // Clean up existing data (for local development only!)
  await prisma.note.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.healthRecord.deleteMany({});
  await prisma.academicRecord.deleteMany({});
  await prisma.athlete.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.team.deleteMany({});

  // Create team
  const team = await prisma.team.create({
    data: {
      name: "Men's Varsity Track & Field",
      sport: "Track & Field",
      institution: "Test High School",
    },
  });
  console.log("✅ Team created:", team.name);

  // Hash passwords (all set to "password123" for testing)
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create AD user
  const adUser = await prisma.user.create({
    data: {
      email: "ad@test.com",
      passwordHash: hashedPassword,
      role: "AD",
      teamId: team.id,
    },
  });
  console.log("✅ AD user created:", adUser.email);

  // Create Coach user
  const coachUser = await prisma.user.create({
    data: {
      email: "coach@test.com",
      passwordHash: hashedPassword,
      role: "COACH",
      teamId: team.id,
    },
  });
  console.log("✅ Coach user created:", coachUser.email);

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
        teamId: team.id,
        height: 5.9,
        weight: 160,
        sport: "Track & Field",
        events: events,
        jerseyNumber: null,
      },
    });
  }
  console.log("✅ 10 athletes created");

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

  // Create some events
  await prisma.event.create({
    data: {
      teamId: team.id,
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
      teamId: team.id,
      type: "PRACTICE",
      title: "Track Practice - Speed Work",
      startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      location: "Track at Test High School",
      group: "TEAM",
    },
  });

  console.log("✅ Events created");
  console.log("🎉 Seeding complete!");
  console.log("\nTest credentials:");
  console.log("  AD: ad@test.com / password123");
  console.log("  Coach: coach@test.com / password123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
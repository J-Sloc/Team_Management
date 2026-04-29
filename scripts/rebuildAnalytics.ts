import prisma from "../lib/prisma";
import { rebuildAnalyticsSnapshots } from "../lib/analytics";

async function main() {
  const athletes = await prisma.athlete.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const results = await rebuildAnalyticsSnapshots(athletes.map((athlete) => athlete.id));
  console.log(`Rebuilt analytics for ${results.length} athletes.`);
}

main()
  .catch((error) => {
    console.error("Failed to rebuild analytics:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

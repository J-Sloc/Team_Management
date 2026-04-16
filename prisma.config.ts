import { config } from "dotenv";
config({ path: ".env.local" });

const prismaConfig = {
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
};

export default prismaConfig;
// lib/prisma.ts
import { PrismaClient } from '../generated/prisma';
import { neon } from '@neondatabase/serverless';

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

export default prisma;
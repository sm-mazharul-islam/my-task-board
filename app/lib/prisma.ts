// app/lib/prisma.ts
import { PrismaClient } from "../generated/prisma";

// 1. We create a global variable that tells TypeScript/Next.js:
// "Look for an existing database connection on the global object."
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 2. We use the existing connection OR create a new one.
// This is the "Singleton" - it ensures only ONE connection exists.
export const prisma = globalForPrisma.prisma || new PrismaClient();

// 3. During development, Next.js 'hot reloads'.
// This code keeps our database connection 'alive' during those reloads.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

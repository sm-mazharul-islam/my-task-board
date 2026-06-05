// app/lib/prisma.ts
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Ensure DATABASE_URL is available
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in your .env file");
}

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// Use a cleaner initialization that handles the pool internally
const pool = new Pool({
  connectionString,
  max: 10, // Limit connections to prevent "Premature close"
  idleTimeoutMillis: 30000,
});

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

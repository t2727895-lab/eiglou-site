import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    // During `next build`, DATABASE_URL is not available.
    // Return a proxy that throws only when a DB method is actually called,
    // not at module load time — so the build can collect page data safely.
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        if (prop === "then") return undefined; // not a Promise
        throw new Error(
          `DATABASE_URL is not set. Cannot call prisma.${String(prop)}()`
        );
      },
    });
  }

  // Supabase's connection pooler uses a self-signed certificate chain.
  // SSL is configured here via Pool options — do NOT add sslmode= to the
  // connection string or pg will emit a deprecation warning about sslmode aliases.
  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false, // required for Supabase's self-signed pooler cert
    },
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Test the database connection and log the result to the server console.
 */
export async function checkDbConnection(): Promise<void> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ [DB] PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ [DB] PostgreSQL connection FAILED:");
    console.error(error);
  }
}

/**
 * Run this script to verify your Supabase/PostgreSQL connection locally.
 * Usage: npx tsx scripts/check-db.ts
 */

import "dotenv/config";
import { Client } from "pg";

const REQUIRED_VARS = [
  "DATABASE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

const SECRET_VARS = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_JWT_SECRET",
  "JWT_SECRET",
];

function checkEnvVars() {
  console.log("\n📋 Checking environment variables...\n");

  let allGood = true;

  for (const key of REQUIRED_VARS) {
    const val = process.env[key];
    if (!val) {
      console.error(`  ❌ MISSING: ${key}`);
      allGood = false;
    } else {
      // Mask the value for security
      const masked =
        val.length > 12 ? val.slice(0, 6) + "..." + val.slice(-4) : "***";
      console.log(`  ✅ ${key} = ${masked}`);
    }
  }

  // Warn about secrets exposed as NEXT_PUBLIC_
  const exposedSecrets = [
    "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_SUPABASE_JWT_SECRET",
    "NEXT_PUBLIC_SUPABASE_SECRET_KEY",
    "NEXT_PUBLIC_POSTGRES_PASSWORD",
    "NEXT_PUBLIC_POSTGRES_URL",
    "NEXT_PUBLIC_POSTGRES_PRISMA_URL",
    "NEXT_PUBLIC_POSTGRES_URL_NON_POOLING",
  ];

  const found = exposedSecrets.filter((k) => process.env[k]);
  if (found.length > 0) {
    console.log(
      "\n  ⚠️  WARNING: These secrets are exposed to the browser via NEXT_PUBLIC_ prefix!"
    );
    console.log("     Rename them to remove NEXT_PUBLIC_ prefix:\n");
    for (const k of found) {
      console.log(`     ${k}  →  ${k.replace("NEXT_PUBLIC_", "")}`);
    }
  }

  return allGood;
}

async function checkDatabaseConnection() {
  console.log("\n🔌 Testing PostgreSQL connection...\n");

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("  ❌ DATABASE_URL is not set — cannot test connection.");
    return false;
  }

  // Parse the URL to extract components, then pass ssl separately
  // (pg ignores ssl option when connectionString contains sslmode=)
  const url = new URL(connectionString.replace("postgres://", "http://").replace("postgresql://", "http://"));
  const client = new Client({
    host: url.hostname,
    port: parseInt(url.port || "5432"),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace("/", ""),
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const result = await client.query("SELECT version()");
    const version = result.rows[0]?.version ?? "unknown";
    console.log(`  ✅ Connected to PostgreSQL!`);
    console.log(`  📦 Server: ${version.split(" ").slice(0, 2).join(" ")}`);
    await client.end();
    return true;
  } catch (err: unknown) {
    const error = err as NodeJS.ErrnoException & { code?: string };
    console.error(`  ❌ Connection FAILED: ${error.message}`);

    if (error.code === "ENOTFOUND") {
      console.error("     → Host not found. Check POSTGRES_HOST / DATABASE_URL.");
    } else if (error.code === "ECONNREFUSED") {
      console.error("     → Connection refused. Is the database running?");
    } else if (error.message?.includes("password") || error.message?.includes("auth")) {
      console.error("     → Authentication failed. Check your password.");
    } else if (error.message?.includes("SSL") || error.message?.includes("certificate")) {
      console.error("     → SSL error. The connection string may need adjusting.");
    }

    await client.end().catch(() => {});
    return false;
  }
}

async function checkSupabaseConnection() {
  console.log("\n🌐 Testing Supabase REST API...\n");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error(
      "  ❌ NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing."
    );
    return false;
  }

  try {
    // Use the health endpoint — works with anon key
    const res = await fetch(`${url}/rest/v1/admins?select=id&limit=1`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });

    // 200 = connected & table exists, 404 = connected but table missing, 401 = bad key
    if (res.status === 200 || res.status === 206) {
      console.log(`  ✅ Supabase REST API reachable and anon key is valid`);
      console.log(`  🔗 Project URL: ${url}`);
      return true;
    } else if (res.status === 401 || res.status === 403) {
      const body = await res.text();
      console.error(`  ❌ Supabase auth failed (${res.status}): ${body}`);
      console.error("     → Check NEXT_PUBLIC_SUPABASE_ANON_KEY matches your project.");
      return false;
    } else {
      // Any other status (e.g. 404 table not found) still means we're connected
      console.log(`  ✅ Supabase REST API reachable (status ${res.status} — DB tables may not be migrated yet)`);
      console.log(`  🔗 Project URL: ${url}`);
      return true;
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`  ❌ Supabase fetch failed: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log("=".repeat(55));
  console.log("  🔍 Supabase + PostgreSQL Connection Checker");
  console.log("=".repeat(55));

  const envOk = checkEnvVars();
  const dbOk = await checkDatabaseConnection();
  const supabaseOk = await checkSupabaseConnection();

  console.log("\n" + "=".repeat(55));
  console.log("  📊 Summary");
  console.log("=".repeat(55));
  console.log(`  Env vars:        ${envOk ? "✅ OK" : "❌ Issues found"}`);
  console.log(`  PostgreSQL:      ${dbOk ? "✅ Connected" : "❌ Failed"}`);
  console.log(`  Supabase API:    ${supabaseOk ? "✅ Reachable" : "❌ Failed"}`);

  if (!envOk || !dbOk || !supabaseOk) {
    console.log("\n  ❗ Fix the issues above before deploying to Vercel.\n");
    process.exit(1);
  } else {
    console.log("\n  🎉 All checks passed! Ready to deploy.\n");
  }
}

main();

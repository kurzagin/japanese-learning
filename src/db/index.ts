import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "";

// For serverless / Edge / Node environments with Supabase connection pooler
// prepare: false is required when using Supabase transaction connection pooler (port 6543)
const client = postgres(connectionString, {
  prepare: false,
});

export const db = drizzle(client, { schema });

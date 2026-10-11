import { NextResponse } from "next/server";
import { db } from "@/db";
import { siteStats } from "@/db/schema";
import { sql, eq } from "drizzle-orm";

const VISITOR_STAT_ID = "visitor_counter";

export async function GET() {
  try {
    // Ensure table exists safely if not yet migrated
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS site_stats (
        id text PRIMARY KEY,
        counter integer NOT NULL DEFAULT 0,
        updated_at timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    // Fetch current counter without incrementing
    const existing = await db
      .select()
      .from(siteStats)
      .where(eq(siteStats.id, VISITOR_STAT_ID));

    if (existing.length === 0) {
      return NextResponse.json({ success: true, count: 1 });
    }

    return NextResponse.json({ success: true, count: existing[0].counter });
  } catch (error: any) {
    console.error("Error reading visitor counter:", error);
    return NextResponse.json({ success: false, count: 1 }, { status: 500 });
  }
}

export async function POST() {
  try {
    // Ensure table exists safely if not yet migrated
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS site_stats (
        id text PRIMARY KEY,
        counter integer NOT NULL DEFAULT 0,
        updated_at timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    // Increment counter atomically on each refresh/visit
    const result = await db
      .insert(siteStats)
      .values({
        id: VISITOR_STAT_ID,
        counter: 1,
      })
      .onConflictDoUpdate({
        target: siteStats.id,
        set: {
          counter: sql`${siteStats.counter} + 1`,
          updatedAt: sql`now()`,
        },
      })
      .returning();

    const count = result[0]?.counter ?? 1;
    return NextResponse.json({ success: true, count });
  } catch (error: any) {
    console.error("Error updating visitor counter:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update visitor count" },
      { status: 500 }
    );
  }
}

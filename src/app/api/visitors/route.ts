import { NextResponse } from "next/server";
import { db } from "@/db";
import { siteStats, users } from "@/db/schema";
import { sql, eq } from "drizzle-orm";

const VISITOR_STAT_ID = "visitor_counter";

async function getStatsData() {
  // Ensure table exists safely if not yet migrated
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS site_stats (
      id text PRIMARY KEY,
      counter integer NOT NULL DEFAULT 0,
      updated_at timestamp with time zone DEFAULT now() NOT NULL
    );
  `);

  // Fetch current visitor counter
  const existing = await db
    .select()
    .from(siteStats)
    .where(eq(siteStats.id, VISITOR_STAT_ID));

  const visitorCount = existing.length > 0 ? existing[0].counter : 1;

  // Real student count (registered users excluding guests)
  const studentResult = await db.execute<{ student_count: number }>(sql`
    SELECT GREATEST(
      (SELECT count(*)::int FROM users WHERE email NOT LIKE '%guest%' AND id NOT LIKE '%guest%'),
      (SELECT count(*)::int FROM auth.users)
    ) as student_count
  `);

  const studentCount = Number(studentResult[0]?.student_count ?? 1);

  return { visitorCount, studentCount };
}

export async function GET() {
  try {
    const { visitorCount, studentCount } = await getStatsData();
    return NextResponse.json({
      success: true,
      count: visitorCount,
      visitorCount,
      studentCount,
    });
  } catch (error: any) {
    console.error("Error reading visitor/student counter:", error);
    return NextResponse.json({ success: false, count: 1, visitorCount: 1, studentCount: 1 }, { status: 500 });
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

    // Increment visitor counter atomically on each refresh/visit (no IP lock required)
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

    const visitorCount = result[0]?.counter ?? 1;

    // Real student count (registered users excluding guests)
    const studentResult = await db.execute<{ student_count: number }>(sql`
      SELECT GREATEST(
        (SELECT count(*)::int FROM users WHERE email NOT LIKE '%guest%' AND id NOT LIKE '%guest%'),
        (SELECT count(*)::int FROM auth.users)
      ) as student_count
    `);

    const studentCount = Number(studentResult[0]?.student_count ?? 1);

    return NextResponse.json({
      success: true,
      count: visitorCount,
      visitorCount,
      studentCount,
    });
  } catch (error: any) {
    console.error("Error updating visitor counter:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update visitor count" },
      { status: 500 }
    );
  }
}

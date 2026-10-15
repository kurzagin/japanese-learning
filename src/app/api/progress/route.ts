import { NextResponse } from "next/server";
import { db } from "@/db";
import { userStageProgress, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "guest@sakanajp.site";

    const rows = await db
      .select()
      .from(userStageProgress)
      .where(eq(userStageProgress.userId, userId));

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error("Error reading stage progress:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load progress" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, stageId, completed, stars, accuracyPercentage, durationMs } = body;

    const effectiveUserId = userId || "guest@sakanajp.site";

    // Ensure the user exists in `users` table so foreign key won't fail
    await db
      .insert(users)
      .values({
        id: effectiveUserId,
        email: effectiveUserId.includes("@") ? effectiveUserId : `${effectiveUserId}@sakanajp.site`,
        displayName: effectiveUserId.split("@")[0],
      })
      .onConflictDoNothing();

    const progressId = `${effectiveUserId}_${stageId}`;

    // Look for existing record to compute best duration and attempt count
    const existing = await db
      .select()
      .from(userStageProgress)
      .where(eq(userStageProgress.id, progressId))
      .limit(1);

    const prevBest = existing[0]?.bestDurationMs;
    const prevAttempts = existing[0]?.attemptsCount || 0;
    const newBest =
      durationMs && typeof durationMs === "number"
        ? prevBest ? Math.min(prevBest, durationMs) : durationMs
        : prevBest ?? null;

    const prevCompleted = existing[0]?.completed ?? false;
    const isCompleted = typeof completed === "boolean" ? (completed || prevCompleted) : prevCompleted;

    await db
      .insert(userStageProgress)
      .values({
        id: progressId,
        userId: effectiveUserId,
        stageId,
        completed: isCompleted,
        bestDurationMs: newBest,
        stars: stars ?? (isCompleted ? 1 : 0),
        accuracyPercentage: accuracyPercentage ?? 0,
        attemptsCount: prevAttempts + 1,
      })
      .onConflictDoUpdate({
        target: userStageProgress.id,
        set: {
          completed: isCompleted,
          bestDurationMs: newBest,
          stars: stars ?? (isCompleted ? 1 : 0),
          accuracyPercentage: accuracyPercentage ?? 0,
          attemptsCount: prevAttempts + 1,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({ success: true, message: "Progress saved to Neon" });
  } catch (error: any) {
    console.error("Error saving stage progress:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save progress" },
      { status: 500 }
    );
  }
}

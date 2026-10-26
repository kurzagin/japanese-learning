import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, userStageProgress, userCardReviews } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

interface GuestStageProgress {
  completed?: boolean;
  stars?: number;
  bestSec?: number;
  bestDurationMs?: number;
  accuracyPercentage?: number;
}

interface GuestSrsCard {
  cardId: string;
  stageId: string;
  repetitionCount?: number;
  intervalDays?: number;
  easeFactor?: number;
  lapses?: number;
  state?: "learning" | "review" | "mastered";
  lastReviewedAt?: string | null;
  nextReviewAt?: string;
}

interface MigrateRequestBody {
  userId: string;
  progress?: Record<string, GuestStageProgress>;
  srsRecords?: Record<string, GuestSrsCard>;
}

export async function POST(request: Request) {
  try {
    const body: MigrateRequestBody = await request.json();
    const { userId, progress = {}, srsRecords = {} } = body;

    if (!userId || userId === "guest@sakanajp.site") {
      return NextResponse.json(
        { success: false, error: "Invalid target user ID" },
        { status: 400 }
      );
    }

    const email = userId.includes("@") ? userId : `${userId}@sakanajp.site`;
    const displayName = email.split("@")[0];

    // 1. Ensure user row exists
    await db
      .insert(users)
      .values({
        id: userId,
        email,
        displayName,
      })
      .onConflictDoNothing();

    let migratedProgressCount = 0;
    let migratedSrsCount = 0;

    // 2. Safely merge stage progress
    const stageEntries = Object.entries(progress);
    if (stageEntries.length > 0) {
      const progressIds = stageEntries.map(([stageId]) => `${userId}_${stageId}`);
      
      // Fetch any existing records for this user to ensure we never downgrade
      const existingRows = await db
        .select()
        .from(userStageProgress)
        .where(inArray(userStageProgress.id, progressIds));

      const existingMap = new Map(existingRows.map((r) => [r.id, r]));

      for (const [stageId, guestData] of stageEntries) {
        if (!guestData) continue;
        const recordId = `${userId}_${stageId}`;
        const existing = existingMap.get(recordId);

        const guestDurationMs =
          guestData.bestDurationMs ??
          (guestData.bestSec !== undefined ? Math.round(guestData.bestSec * 1000) : null);

        // Keep best duration (lower is better, but only when non-null)
        let resolvedBestDurationMs: number | null = null;
        if (existing?.bestDurationMs && guestDurationMs) {
          resolvedBestDurationMs = Math.min(existing.bestDurationMs, guestDurationMs);
        } else {
          resolvedBestDurationMs = existing?.bestDurationMs ?? guestDurationMs ?? null;
        }

        const resolvedCompleted = Boolean(existing?.completed || guestData.completed);
        const resolvedStars = Math.max(existing?.stars ?? 0, guestData.stars ?? (resolvedCompleted ? 1 : 0));
        const resolvedAccuracy = Math.max(existing?.accuracyPercentage ?? 0, guestData.accuracyPercentage ?? 0);
        const resolvedAttempts = (existing?.attemptsCount ?? 0) + (guestData.completed ? 1 : 0);

        await db
          .insert(userStageProgress)
          .values({
            id: recordId,
            userId,
            stageId,
            completed: resolvedCompleted,
            bestDurationMs: resolvedBestDurationMs,
            stars: resolvedStars,
            accuracyPercentage: resolvedAccuracy,
            attemptsCount: Math.max(1, resolvedAttempts),
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: userStageProgress.id,
            set: {
              completed: resolvedCompleted,
              bestDurationMs: resolvedBestDurationMs,
              stars: resolvedStars,
              accuracyPercentage: resolvedAccuracy,
              attemptsCount: Math.max(1, resolvedAttempts),
              updatedAt: new Date(),
            },
          });

        migratedProgressCount++;
      }
    }

    // 3. Safely merge SRS records
    const srsEntries = Object.entries(srsRecords);
    if (srsEntries.length > 0) {
      const reviewIds = srsEntries.map(([cardId]) => `${userId}_${cardId}`);

      const existingRows = await db
        .select()
        .from(userCardReviews)
        .where(inArray(userCardReviews.id, reviewIds));

      const existingMap = new Map(existingRows.map((r) => [r.id, r]));

      for (const [cardId, guestCard] of srsEntries) {
        if (!guestCard || !guestCard.stageId) continue;
        const reviewId = `${userId}_${cardId}`;
        const existing = existingMap.get(reviewId);

        const guestRepCount = guestCard.repetitionCount ?? 0;
        const guestIntervalDays = guestCard.intervalDays ?? 0;
        const guestEaseFactorX100 = Math.round((guestCard.easeFactor ?? 2.5) * 100);
        const guestLapses = guestCard.lapses ?? 0;
        const guestState = guestCard.state ?? "learning";
        const guestLastReviewedAt = guestCard.lastReviewedAt ? new Date(guestCard.lastReviewedAt) : null;
        const guestNextReviewAt = guestCard.nextReviewAt ? new Date(guestCard.nextReviewAt) : new Date();

        if (!existing) {
          // If no existing record on account, safely adopt the guest record
          await db
            .insert(userCardReviews)
            .values({
              id: reviewId,
              userId,
              cardId,
              stageId: guestCard.stageId,
              repetitionCount: guestRepCount,
              intervalDays: guestIntervalDays,
              easeFactorX100: guestEaseFactorX100,
              lapses: guestLapses,
              state: guestState,
              lastReviewedAt: guestLastReviewedAt,
              nextReviewAt: guestNextReviewAt,
              updatedAt: new Date(),
            })
            .onConflictDoNothing();

          migratedSrsCount++;
        } else {
          // If an existing review exists on account, keep the more advanced/recent one
          const existingReviewedTime = existing.lastReviewedAt ? new Date(existing.lastReviewedAt).getTime() : 0;
          const guestReviewedTime = guestLastReviewedAt ? guestLastReviewedAt.getTime() : 0;

          // Prefer guest only if guest has higher repetitions or distinctly newer review
          if (guestRepCount > existing.repetitionCount || guestReviewedTime > existingReviewedTime) {
            await db
              .update(userCardReviews)
              .set({
                stageId: guestCard.stageId,
                repetitionCount: Math.max(existing.repetitionCount, guestRepCount),
                intervalDays: Math.max(existing.intervalDays, guestIntervalDays),
                easeFactorX100: guestEaseFactorX100,
                lapses: Math.max(existing.lapses, guestLapses),
                state: (existing.state === "mastered" || guestState === "mastered") ? "mastered" : guestState,
                lastReviewedAt: guestLastReviewedAt || existing.lastReviewedAt,
                nextReviewAt: guestNextReviewAt,
                updatedAt: new Date(),
              })
              .where(eq(userCardReviews.id, reviewId));

            migratedSrsCount++;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Guest data successfully synchronized to account",
      migrated: {
        stages: migratedProgressCount,
        srs: migratedSrsCount,
      },
    });
  } catch (error: any) {
    console.error("Error migrating guest data:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to migrate guest data" },
      { status: 500 }
    );
  }
}

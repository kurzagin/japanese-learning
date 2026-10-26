import { NextResponse } from "next/server";
import { db } from "@/db";
import { userCardReviews, users } from "@/db/schema";
import { eq, and, lte } from "drizzle-orm";
import { calculateSrsReview, SrsCardRecord, SrsRating, createDefaultSrsCard } from "@/lib/srs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "guest@sakanajp.site";
    const stageId = searchParams.get("stageId");
    const dueOnly = searchParams.get("due") === "true";

    const conditions = [eq(userCardReviews.userId, userId)];

    if (stageId) {
      conditions.push(eq(userCardReviews.stageId, stageId));
    }

    if (dueOnly) {
      conditions.push(lte(userCardReviews.nextReviewAt, new Date()));
    }

    const rows = await db
      .select()
      .from(userCardReviews)
      .where(and(...conditions));

    // Map rows to clean client objects
    const data: SrsCardRecord[] = rows.map((row) => ({
      id: row.id,
      userId: row.userId,
      cardId: row.cardId,
      stageId: row.stageId,
      repetitionCount: row.repetitionCount,
      intervalDays: row.intervalDays,
      easeFactor: (row.easeFactorX100 ?? 250) / 100,
      lapses: row.lapses,
      state: row.state as "learning" | "review" | "mastered",
      lastReviewedAt: row.lastReviewedAt ? row.lastReviewedAt.toISOString() : null,
      nextReviewAt: row.nextReviewAt.toISOString(),
    }));

    // Also get overall counts for dashboard summary
    const allUserRows = await db
      .select({
        id: userCardReviews.id,
        nextReviewAt: userCardReviews.nextReviewAt,
        state: userCardReviews.state,
      })
      .from(userCardReviews)
      .where(eq(userCardReviews.userId, userId));

    const now = new Date();
    const dueCount = allUserRows.filter((r) => new Date(r.nextReviewAt) <= now).length;
    const masteredCount = allUserRows.filter((r) => r.state === "mastered").length;
    const totalStudied = allUserRows.length;

    return NextResponse.json({
      success: true,
      data,
      summary: {
        dueCount,
        masteredCount,
        totalStudied,
      },
    });
  } catch (error: any) {
    console.error("Error fetching SRS reviews:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load SRS cards" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Support both single item and batch updates
    const items: Array<{
      userId?: string;
      cardId: string;
      stageId: string;
      rating: SrsRating;
    }> = Array.isArray(body.reviews)
      ? body.reviews
      : [body];

    if (items.length === 0 || !items[0].cardId || !items[0].stageId || !items[0].rating) {
      return NextResponse.json(
        { success: false, error: "Missing cardId, stageId, or rating" },
        { status: 400 }
      );
    }

    const effectiveUserId = body.userId || items[0].userId || "guest@sakanajp.site";

    // Ensure user row exists for foreign key constraint
    await db
      .insert(users)
      .values({
        id: effectiveUserId,
        email: effectiveUserId.includes("@") ? effectiveUserId : `${effectiveUserId}@sakanajp.site`,
        displayName: effectiveUserId.split("@")[0],
      })
      .onConflictDoNothing();

    const results: Array<{ cardId: string; result: any }> = [];

    for (const item of items) {
      const { cardId, stageId, rating } = item;
      const reviewId = `${effectiveUserId}_${cardId}`;

      // Load existing record or default
      const existingRows = await db
        .select()
        .from(userCardReviews)
        .where(eq(userCardReviews.id, reviewId))
        .limit(1);

      const currentCard: SrsCardRecord = existingRows[0]
        ? {
            id: existingRows[0].id,
            userId: existingRows[0].userId,
            cardId: existingRows[0].cardId,
            stageId: existingRows[0].stageId,
            repetitionCount: existingRows[0].repetitionCount,
            intervalDays: existingRows[0].intervalDays,
            easeFactor: (existingRows[0].easeFactorX100 ?? 250) / 100,
            lapses: existingRows[0].lapses,
            state: existingRows[0].state as "learning" | "review" | "mastered",
            lastReviewedAt: existingRows[0].lastReviewedAt ? existingRows[0].lastReviewedAt.toISOString() : null,
            nextReviewAt: existingRows[0].nextReviewAt.toISOString(),
          }
        : createDefaultSrsCard(cardId, stageId, effectiveUserId);

      // Calculate new SM-2 schedule
      const result = calculateSrsReview(currentCard, rating);
      const easeFactorX100 = Math.round(result.easeFactor * 100);

      await db
        .insert(userCardReviews)
        .values({
          id: reviewId,
          userId: effectiveUserId,
          cardId,
          stageId,
          repetitionCount: result.repetitionCount,
          intervalDays: result.intervalDays,
          easeFactorX100,
          lapses: result.lapses,
          state: result.state,
          lastReviewedAt: new Date(),
          nextReviewAt: result.nextReviewAt,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: userCardReviews.id,
          set: {
            repetitionCount: result.repetitionCount,
            intervalDays: result.intervalDays,
            easeFactorX100,
            lapses: result.lapses,
            state: result.state,
            lastReviewedAt: new Date(),
            nextReviewAt: result.nextReviewAt,
            updatedAt: new Date(),
          },
        });

      results.push({
        cardId,
        result: {
          ...result,
          nextReviewAt: result.nextReviewAt.toISOString(),
        },
      });
    }

    if (Array.isArray(body.reviews)) {
      return NextResponse.json({
        success: true,
        count: results.length,
        results,
      });
    }

    return NextResponse.json({
      success: true,
      cardId: results[0].cardId,
      result: results[0].result,
    });
  } catch (error: any) {
    console.error("Error submitting SRS review:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit SRS review" },
      { status: 500 }
    );
  }
}

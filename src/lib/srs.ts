/**
 * Real Spaced Repetition System (SRS) using the SM-2 algorithmic model.
 * Handles interval expansion, ease factors, lapse penalties, and next review dates.
 */

export type SrsRating = 1 | 2 | 3 | 4;
// 1 = Again (Blackout / Incorrect)
// 2 = Hard (Struggled, correct with effort)
// 3 = Good (Normal recall, optimal spacing)
// 4 = Easy (Instant effortless recall)

export interface SrsCardRecord {
  id?: string;
  userId?: string;
  cardId: string;
  stageId: string;
  repetitionCount: number;
  intervalDays: number;
  easeFactor: number; // 1.3 to 3.0 (stored as x100 in DB)
  lapses: number;
  state: "learning" | "review" | "mastered";
  lastReviewedAt?: string | null;
  nextReviewAt: string;
}

export interface SrsReviewResult {
  repetitionCount: number;
  intervalDays: number;
  easeFactor: number;
  lapses: number;
  state: "learning" | "review" | "mastered";
  nextReviewAt: Date;
  previewInterval: string;
}

/**
 * Returns human-readable preview of interval duration (e.g. "< 10m", "1d", "4d", "2mo")
 */
export function formatIntervalPreview(days: number, isMinutes10 = false): string {
  if (isMinutes10 || days === 0) return "< 10m";
  if (days === 1) return "1d";
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${(days / 365).toFixed(1)}y`;
}

/**
 * Compute the resulting SRS stats when a card is answered with a given rating (1..4)
 */
export function calculateSrsReview(
  current: SrsCardRecord,
  rating: SrsRating
): SrsReviewResult {
  let { repetitionCount, intervalDays, easeFactor, lapses, state } = current;
  const now = new Date();
  let nextReviewAt: Date;

  if (rating === 1) {
    // Again: Failure / Lapse
    repetitionCount = 0;
    lapses += 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    intervalDays = 0;
    state = "learning";
    // 10 minutes from now
    nextReviewAt = new Date(now.getTime() + 10 * 60 * 1000);

    return {
      repetitionCount,
      intervalDays,
      easeFactor: Math.round(easeFactor * 100) / 100,
      lapses,
      state,
      nextReviewAt,
      previewInterval: "< 10m",
    };
  }

  if (rating === 2) {
    // Hard: Recalled with effort
    easeFactor = Math.max(1.3, easeFactor - 0.15);
    if (intervalDays === 0) {
      intervalDays = 1;
    } else {
      intervalDays = Math.max(1, Math.round(intervalDays * 1.2));
    }
    repetitionCount += 1;
    nextReviewAt = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

    return {
      repetitionCount,
      intervalDays,
      easeFactor: Math.round(easeFactor * 100) / 100,
      lapses,
      state: intervalDays >= 21 ? "mastered" : "review",
      nextReviewAt,
      previewInterval: formatIntervalPreview(intervalDays),
    };
  }

  if (rating === 3) {
    // Good: Standard successful recall
    if (repetitionCount === 0 || intervalDays === 0) {
      intervalDays = 1;
    } else if (repetitionCount === 1) {
      intervalDays = 3;
    } else {
      intervalDays = Math.max(2, Math.round(intervalDays * easeFactor));
    }
    repetitionCount += 1;
    state = intervalDays >= 21 ? "mastered" : "review";
    nextReviewAt = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

    return {
      repetitionCount,
      intervalDays,
      easeFactor: Math.round(easeFactor * 100) / 100,
      lapses,
      state,
      nextReviewAt,
      previewInterval: formatIntervalPreview(intervalDays),
    };
  }

  // rating === 4: Easy: Instant effortless recall
  easeFactor = Math.min(3.0, easeFactor + 0.15);
  if (repetitionCount === 0 || intervalDays === 0) {
    intervalDays = 4;
  } else if (repetitionCount === 1) {
    intervalDays = 6;
  } else {
    intervalDays = Math.max(4, Math.round(intervalDays * easeFactor * 1.3));
  }
  repetitionCount += 1;
  state = intervalDays >= 21 ? "mastered" : "review";
  nextReviewAt = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  return {
    repetitionCount,
    intervalDays,
    easeFactor: Math.round(easeFactor * 100) / 100,
    lapses,
    state,
    nextReviewAt,
    previewInterval: formatIntervalPreview(intervalDays),
  };
}

/**
 * Get default clean record for a card that hasn't been reviewed yet
 */
export function createDefaultSrsCard(cardId: string, stageId: string, userId = "guest@sakana.net"): SrsCardRecord {
  return {
    id: `${userId}_${cardId}`,
    userId,
    cardId,
    stageId,
    repetitionCount: 0,
    intervalDays: 0,
    easeFactor: 2.5,
    lapses: 0,
    state: "learning",
    lastReviewedAt: null,
    nextReviewAt: new Date().toISOString(),
  };
}

/**
 * Get preview labels for all 4 ratings (1: Again, 2: Hard, 3: Good, 4: Easy)
 */
export function getRatingPreviews(card: SrsCardRecord): Record<SrsRating, string> {
  return {
    1: calculateSrsReview(card, 1).previewInterval,
    2: calculateSrsReview(card, 2).previewInterval,
    3: calculateSrsReview(card, 3).previewInterval,
    4: calculateSrsReview(card, 4).previewInterval,
  };
}

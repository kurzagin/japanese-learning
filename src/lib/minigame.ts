import { StudyCard, STAGES, Stage } from "@/data/stages";
import { SrsCardRecord } from "@/lib/srs";

export interface MinigameCard extends StudyCard {
  weight: number;
  lapseCount: number;
  isMastered: boolean;
}

/**
 * Calculates a selection weight for a card based on SRS history and past mistakes.
 * - Mastered (0 errors, high interval/state === 'mastered'): weight 0 (filtered out unless pool is too small)
 * - High lapses / frequent mistakes: weight 5 (high priority)
 * - Learning / in review: weight 3 (medium priority)
 * - Normal recognized: weight 1 (refresher)
 */
export function calculateCardWeight(srsRecord?: SrsCardRecord | null): {
  weight: number;
  lapseCount: number;
  isMastered: boolean;
} {
  if (!srsRecord) {
    // No prior SRS record yet; treated as standard weight
    return { weight: 2, lapseCount: 0, isMastered: false };
  }

  const lapses = srsRecord.lapses || 0;
  const isMastered =
    srsRecord.state === "mastered" ||
    (srsRecord.intervalDays >= 21 && lapses === 0);

  if (isMastered) {
    return { weight: 0, lapseCount: lapses, isMastered: true };
  }

  if (lapses >= 2 || srsRecord.state === "learning") {
    return { weight: 5, lapseCount: lapses, isMastered: false };
  }

  if (lapses === 1) {
    return { weight: 3, lapseCount: lapses, isMastered: false };
  }

  return { weight: 1, lapseCount: lapses, isMastered: false };
}

/**
 * Builds a 30-letter looped question sequence from all cleared stages up to current milestone.
 * 
 * Rules:
 * 1. Collect unique cards from cleared stages.
 * 2. Evaluate weights via calculateCardWeight.
 * 3. Filter out 100% mastered cards (weight > 0).
 * 4. Fallback: if remaining pool < 10 or cannot fill 30 without extreme repeats, re-include mastered cards with baseline weight 1.
 * 5. Generate 30 items via weighted random selection ensuring no direct adjacent duplicate.
 */
export function buildMinigameQueue(
  availableCards: StudyCard[],
  srsRecords: Record<string, SrsCardRecord> = {},
  targetLength: number = 30
): MinigameCard[] {
  if (availableCards.length === 0) return [];

  // Map each card to weight info
  const scoredCards: MinigameCard[] = availableCards.map((card) => {
    const srs = srsRecords[card.id];
    const { weight, lapseCount, isMastered } = calculateCardWeight(srs);
    return {
      ...card,
      weight,
      lapseCount,
      isMastered,
    };
  });

  // Active pool: cards with weight > 0
  let activePool = scoredCards.filter((c) => c.weight > 0);

  // Fallback: If not enough cards in active pool, re-admit mastered cards
  if (activePool.length < 8) {
    activePool = scoredCards.map((c) => ({
      ...c,
      weight: c.weight > 0 ? c.weight : 1, // mastered cards get weight 1
    }));
  }

  const totalWeight = activePool.reduce((acc, c) => acc + c.weight, 0);
  if (totalWeight <= 0) return [];

  const queue: MinigameCard[] = [];
  let previousCardId: string | null = null;

  for (let i = 0; i < targetLength; i++) {
    // Weighted random selection
    // Exclude immediate previous card if pool size allows
    const candidatePool =
      activePool.length > 1
        ? activePool.filter((c) => c.id !== previousCardId)
        : activePool;

    const candidateTotalWeight = candidatePool.reduce((acc, c) => acc + c.weight, 0);
    let rand = Math.random() * candidateTotalWeight;
    let chosen: MinigameCard = candidatePool[0];

    for (const card of candidatePool) {
      if (rand < card.weight) {
        chosen = card;
        break;
      }
      rand -= card.weight;
    }

    queue.push(chosen);
    previousCardId = chosen.id;
  }

  return queue;
}

/**
 * Returns all cards from stages up to a specific boss milestone or cleared stage list.
 */
export function getUnlockedCardsUpToStage(
  stageId: string,
  progress: Record<string, { completed: boolean }>,
  allStages: Stage[] = []
): StudyCard[] {
  const cardsMap = new Map<string, StudyCard>();

  // If specific progress exists, gather all completed stages
  const completedStageIds = new Set(
    Object.entries(progress)
      .filter(([_, val]) => val.completed)
      .map(([id]) => id)
  );

  // Always include the current stage being cleared
  completedStageIds.add(stageId);

  const stagesToUse = allStages.length > 0 ? allStages : STAGES;
  for (const stage of stagesToUse) {
    // Only pool characters from hiragana and katakana (exclude words)
    if (stage.category !== "words" && completedStageIds.has(stage.id)) {
      for (const card of stage.cards) {
        if (!cardsMap.has(card.id)) {
          cardsMap.set(card.id, card);
        }
      }
    }
  }

  return Array.from(cardsMap.values());
}

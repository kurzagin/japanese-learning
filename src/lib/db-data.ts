import { db } from "@/db";
import { kana, vocabulary } from "@/db/schema";
import { asc } from "drizzle-orm";
import { KanaCharacter, KanaScript, KanaType, KanaRow } from "@/types/kana";
import { VocabWord, FuriganaSegment, VocabSentence, KanjiOption } from "@/types/vocab";
import { Stage, buildStages } from "@/data/stages";
import { getKanaSlug, CURATED_COMPARISONS } from "@/lib/kana-seo";

// In-process memory caches to ensure zero redundant network roundtrips during SSG or requests
let cachedKana: KanaCharacter[] | null = null;
let cachedVocab: VocabWord[] | null = null;
let cachedStages: Stage[] | null = null;

/**
 * Fetch all Kana characters from Neon Postgres ordered by created_at
 */
export async function getAllKana(): Promise<KanaCharacter[]> {
  if (cachedKana) return cachedKana;

  const rows = await db.select().from(kana).orderBy(asc(kana.createdAt));
  cachedKana = rows.map((r) => ({
    id: r.id,
    script: r.script as KanaScript,
    character: r.character,
    romaji: r.romaji,
    type: r.type as KanaType,
    row: r.row as KanaRow,
    hint: {
      en: r.hintEn || "",
      id: r.hintId || "",
      ja: r.hintJa || "",
    },
  }));

  return cachedKana;
}

/**
 * Fetch all Kana for a given script ("hiragana" | "katakana")
 */
export async function getKanaByScript(script: KanaScript): Promise<KanaCharacter[]> {
  const all = await getAllKana();
  return all.filter((k) => k.script === script);
}

/**
 * Find single Kana by script and URL slug (e.g. "hiragana", "a")
 */
export async function getKanaBySlug(
  script: string,
  slug: string
): Promise<KanaCharacter | undefined> {
  const all = await getAllKana();
  const normScript = script.toLowerCase();
  const normSlug = slug.toLowerCase();

  return all.find((k) => {
    if (k.script !== normScript) return false;
    return getKanaSlug(k) === normSlug;
  });
}

/**
 * Find single Kana by canonical ID (e.g. "h-a", "k-ka")
 */
export async function getKanaById(id: string): Promise<KanaCharacter | undefined> {
  const all = await getAllKana();
  return all.find((k) => k.id === id);
}

/**
 * Fetch all Vocabulary from Neon Postgres ordered by created_at
 */
export async function getAllVocabulary(): Promise<VocabWord[]> {
  if (cachedVocab) return cachedVocab;

  const rows = await db.select().from(vocabulary).orderBy(asc(vocabulary.createdAt));
  cachedVocab = rows.map((r) => ({
    slug: r.slug,
    character: r.character,
    romaji: r.romaji,
    script: r.script as "hiragana" | "katakana",
    kanji: r.kanji || null,
    jlpt: (r.jlpt as VocabWord["jlpt"]) || undefined,
    primaryKanaId: r.primaryKanaId || undefined,
    meaning: JSON.parse(r.meaning),
    trivia: r.trivia ? JSON.parse(r.trivia) : undefined,
    furigana: r.furigana ? (JSON.parse(r.furigana) as FuriganaSegment[]) : undefined,
    sentence: r.sentence ? (JSON.parse(r.sentence) as VocabSentence) : undefined,
    kanjiOptions: r.kanjiOptions ? (JSON.parse(r.kanjiOptions) as KanjiOption[]) : undefined,
  }));

  return cachedVocab;
}

/**
 * Find single vocabulary item by slug
 */
export async function getWordBySlug(slug: string): Promise<VocabWord | undefined> {
  const all = await getAllVocabulary();
  const normSlug = slug.toLowerCase();
  return all.find((w) => w.slug === normSlug);
}

/**
 * Get words by JLPT / Pop Culture category
 */
export async function getWordsByJlpt(jlpt: "N5" | "N4" | "Anime"): Promise<VocabWord[]> {
  const all = await getAllVocabulary();
  return all.filter((w) => w.jlpt === jlpt);
}

/**
 * Breakdown word characters into matching Kana primitives for cross-linking
 */
export async function getConstituentKana(
  word: VocabWord,
  providedKana?: KanaCharacter[]
): Promise<KanaCharacter[]> {
  const all = providedKana || (await getAllKana());
  const text = word.character;
  const matched: KanaCharacter[] = [];

  for (let i = 0; i < text.length; ) {
    // Try 2-character digraph (e.g. ヴォ, リュ, しゃ) first
    if (i + 1 < text.length) {
      const two = text.slice(i, i + 2);
      const matchTwo = all.find(
        (k) => k.character === two && k.script === word.script
      );
      if (matchTwo) {
        if (!matched.some((m) => m.id === matchTwo.id)) {
          matched.push(matchTwo);
        }
        i += 2;
        continue;
      }
    }

    // Fallback to single character
    const char = text[i];
    const matchOne = all.find(
      (k) => k.character === char && k.script === word.script
    );
    if (matchOne && !matched.some((m) => m.id === matchOne.id)) {
      matched.push(matchOne);
    }
    i += 1;
  }

  return matched;
}

/**
 * Get related words sharing the same script
 */
export async function getRelatedWords(
  word: VocabWord,
  providedWords?: VocabWord[],
  count: number = 4
): Promise<VocabWord[]> {
  const all = providedWords || (await getAllVocabulary());
  return all
    .filter((w) => w.slug !== word.slug && w.script === word.script)
    .slice(0, count);
}

/**
 * Find visually or phonetically similar Kana for practice & distinction
 */
export async function getSimilarKana(
  kanaChar: KanaCharacter,
  providedKana?: KanaCharacter[]
): Promise<KanaCharacter[]> {
  const all = providedKana || (await getAllKana());
  const matchedComparisons = CURATED_COMPARISONS.filter(
    (c) => c.kana1Id === kanaChar.id || c.kana2Id === kanaChar.id
  );

  const similarIds = new Set<string>();
  matchedComparisons.forEach((c) => {
    similarIds.add(c.kana1Id === kanaChar.id ? c.kana2Id : c.kana1Id);
  });

  const similarCharacters = all.filter((k) => similarIds.has(k.id));

  // If curated list has fewer than 2, fill with characters from same row or type
  if (similarCharacters.length < 2) {
    const rowSiblings = all.filter(
      (k) =>
        k.id !== kanaChar.id &&
        k.script === kanaChar.script &&
        (k.row === kanaChar.row || k.type === kanaChar.type) &&
        !similarIds.has(k.id)
    );
    similarCharacters.push(...rowSiblings.slice(0, 3 - similarCharacters.length));
  }

  return similarCharacters;
}

/**
 * Get related category sibling characters
 */
export async function getRelatedCategoryCharacters(
  kanaChar: KanaCharacter,
  providedKana?: KanaCharacter[]
): Promise<KanaCharacter[]> {
  const all = providedKana || (await getAllKana());
  return all
    .filter(
      (k) =>
        k.id !== kanaChar.id &&
        k.script === kanaChar.script &&
        k.type === kanaChar.type
    )
    .slice(0, 6);
}

/**
 * Get all 32 stages dynamically built from Neon Kana & Vocabulary
 */
export async function getStages(): Promise<Stage[]> {
  if (cachedStages) return cachedStages;

  const allKana = await getAllKana();
  cachedStages = buildStages(allKana);
  return cachedStages;
}

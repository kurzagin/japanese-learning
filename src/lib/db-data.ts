import { KanaCharacter, KanaScript, KanaType, KanaRow } from "@/types/kana";
import { VocabWord, FuriganaSegment, VocabSentence, KanjiOption } from "@/types/vocab";
import { Stage, buildStages } from "@/data/stages";
import { getKanaSlug, CURATED_COMPARISONS } from "@/lib/kana-seo";
import rawKana from "@/data/kana.json";
import rawVocab from "@/data/vocab.json";

// In-process memory caches to ensure zero redundant iterations
let cachedKana: KanaCharacter[] | null = null;
let cachedVocab: VocabWord[] | null = null;
let cachedStages: Stage[] | null = null;

interface RawKanaItem {
  id: string;
  script: string;
  character: string;
  romaji: string;
  type: string;
  row: string;
  hint_en?: string;
  hint_id?: string;
  hint_ja?: string;
}

interface RawVocabItem {
  slug: string;
  character: string;
  romaji: string;
  script: string;
  kanji?: string | null;
  jlpt?: string;
  primary_kana_id?: string | null;
  meaning: unknown;
  trivia?: unknown;
  furigana?: unknown;
  sentence?: unknown;
  kanjiOptions?: unknown;
  kanji_options?: unknown;
}

/**
 * Fetch all Kana characters from static JSON (instant 0ms lookup)
 */
export async function getAllKana(): Promise<KanaCharacter[]> {
  if (cachedKana) return cachedKana;

  cachedKana = (rawKana as unknown as RawKanaItem[]).map((r) => ({
    id: r.id,
    script: r.script as KanaScript,
    character: r.character,
    romaji: r.romaji,
    type: r.type as KanaType,
    row: (r.row === "ha" ? "h" : r.row) as KanaRow,
    hint: {
      en: r.hint_en || "",
      id: r.hint_id || "",
      ja: r.hint_ja || "",
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
  script?: string,
  slug?: string
): Promise<KanaCharacter | undefined> {
  if (!script || !slug) return undefined;
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

function parseJsonField<T>(val: unknown): T {
  return (typeof val === "string" ? JSON.parse(val) : val) as T;
}

/**
 * Fetch all Vocabulary from static JSON (instant 0ms lookup)
 */
export async function getAllVocabulary(): Promise<VocabWord[]> {
  if (cachedVocab) return cachedVocab;

  cachedVocab = (rawVocab as unknown as RawVocabItem[]).map((r) => ({
    slug: r.slug,
    character: r.character,
    romaji: r.romaji,
    script: r.script as "hiragana" | "katakana",
    kanji: r.kanji || null,
    jlpt: (r.jlpt as VocabWord["jlpt"]) || undefined,
    primaryKanaId: r.primary_kana_id || undefined,
    meaning: parseJsonField<VocabWord["meaning"]>(r.meaning),
    trivia: r.trivia ? parseJsonField<VocabWord["trivia"]>(r.trivia) : undefined,
    furigana: r.furigana ? parseJsonField<FuriganaSegment[]>(r.furigana) : undefined,
    sentence: r.sentence ? parseJsonField<VocabSentence>(r.sentence) : undefined,
    kanjiOptions: r.kanjiOptions || r.kanji_options ? parseJsonField<KanjiOption[]>(r.kanjiOptions || r.kanji_options) : undefined,
  }));

  return cachedVocab;
}

/**
 * Find single vocabulary item by slug
 */
export async function getWordBySlug(slug?: string): Promise<VocabWord | undefined> {
  if (!slug) return undefined;
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
    (c) => c.kana1Id === kanaChar.id || c.kana2Id === kanaChar.id || c.kana3Id === kanaChar.id
  );

  const similarIds = new Set<string>();
  matchedComparisons.forEach((c) => {
    [c.kana1Id, c.kana2Id, c.kana3Id].forEach((id) => {
      if (id && id !== kanaChar.id) similarIds.add(id);
    });
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
 * Get all 58 stages dynamically built from static Kana & Vocabulary
 */
export async function getStages(): Promise<Stage[]> {
  if (cachedStages) return cachedStages;

  const allKana = await getAllKana();
  cachedStages = buildStages(allKana);
  return cachedStages;
}

import vocabularyData from "@/data/vocabulary.json";
import { ALL_KANA_PRIMITIVES, KanaCharacter } from "@/data/kana";
import { getKanaSlug } from "@/lib/kana-seo";
import { Locale } from "@/data/i18n";

export interface VocabWord {
  slug: string;
  character: string;
  romaji: string;
  script: "hiragana" | "katakana";
  meaning: Record<Locale, string>;
  trivia?: Record<Locale, string>;
  primaryKanaId?: string;
}

export const VOCABULARY_LIST: VocabWord[] = vocabularyData as VocabWord[];

export function getWordBySlug(slug: string): VocabWord | undefined {
  const normSlug = slug.toLowerCase();
  return VOCABULARY_LIST.find((w) => w.slug === normSlug);
}

/**
 * Breakdown word characters into matching Kana primitives for cross-linking
 */
export function getConstituentKana(word: VocabWord): KanaCharacter[] {
  const chars = Array.from(word.character);
  const matched: KanaCharacter[] = [];

  for (const char of chars) {
    const kana = ALL_KANA_PRIMITIVES.find(
      (k) => k.character === char && k.script === word.script
    );
    if (kana && !matched.some((m) => m.id === kana.id)) {
      matched.push(kana);
    }
  }

  return matched;
}

/**
 * Get related words sharing the same script
 */
export function getRelatedWords(word: VocabWord, count = 4): VocabWord[] {
  return VOCABULARY_LIST.filter(
    (w) => w.slug !== word.slug && w.script === word.script
  ).slice(0, count);
}

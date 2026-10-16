import vocabularyData from "@/data/vocabulary.json";
import { ALL_KANA_PRIMITIVES, KanaCharacter } from "@/data/kana";
import { getKanaSlug } from "@/lib/kana-seo";
import { Locale } from "@/data/i18n";

export interface FuriganaSegment {
  ruby: string;
  rt?: string;
}

export interface VocabSentence {
  ja: string;
  furigana: FuriganaSegment[];
  romaji: string;
  en: string;
  id: string;
}

export interface VocabWord {
  slug: string;
  character: string;
  romaji: string;
  script: "hiragana" | "katakana";
  kanji?: string | null;
  jlpt?: "N5" | "N4" | "N3" | "Anime";
  furigana?: FuriganaSegment[];
  sentence?: VocabSentence;
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

export interface JlptCategoryMeta {
  key: "n5" | "n4" | "anime";
  jlpt: "N5" | "N4" | "Anime";
  title: string;
  tagline: string;
  description: string;
}

export const JLPT_CATEGORIES: JlptCategoryMeta[] = [
  {
    key: "n5",
    jlpt: "N5",
    title: "JLPT N5 Core Vocabulary List",
    tagline: "Essential 104 words for Japanese Language Proficiency Test Level 5",
    description:
      "Master the foundational JLPT N5 vocabulary words with native pronunciation audio, Kanji & furigana breakdowns, romaji reading, and example sentences.",
  },
  {
    key: "n4",
    jlpt: "N4",
    title: "JLPT N4 Elementary Vocabulary List",
    tagline: "Essential 47 words for Japanese Language Proficiency Test Level 4",
    description:
      "Expand your Japanese vocabulary with elementary JLPT N4 words featuring audio pronunciation, romaji guides, and realistic contextual sentences.",
  },
  {
    key: "anime",
    jlpt: "Anime",
    title: "Anime & Pop Culture Japanese Vocabulary",
    tagline: "Iconic words, reactions, and loanwords from anime and manga",
    description:
      "Learn the most iconic Japanese anime reactions, loanwords, and conversational terms with native audio, character origins, and English & Indonesian meanings.",
  },
];

export function getWordsByJlpt(jlpt: "N5" | "N4" | "Anime"): VocabWord[] {
  return VOCABULARY_LIST.filter((w) => w.jlpt === jlpt);
}


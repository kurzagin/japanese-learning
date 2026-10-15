import { Locale } from "@/data/i18n";
import { ALL_KANA_PRIMITIVES, KanaCharacter, KanaScript } from "@/data/kana";
import { SAMPLE_WORDS } from "@/data/stages";

/**
 * Standardized slug helper for kana characters:
 * e.g. "h-a" -> "a"
 * e.g. "h-dji" -> "dji"
 * e.g. "k-kya" -> "kya"
 */
export function getKanaSlug(kana: KanaCharacter): string {
  return kana.id.replace(/^[hk]-/, "");
}

/**
 * Find kana by script ("hiragana" | "katakana") and slug (e.g. "a", "dji", "ka")
 */
export function getKanaBySlug(
  script: string,
  slug: string
): KanaCharacter | undefined {
  const normScript = script.toLowerCase();
  const normSlug = slug.toLowerCase();

  return ALL_KANA_PRIMITIVES.find((k) => {
    if (k.script !== normScript) return false;
    const itemSlug = getKanaSlug(k);
    return itemSlug === normSlug;
  });
}

/**
 * Common stroke counts for standard Kana characters
 */
export const KANA_STROKE_COUNTS: Record<string, number> = {
  // Hiragana Vowels
  "h-a": 3,
  "h-i": 2,
  "h-u": 2,
  "h-e": 2,
  "h-o": 3,
  // K-row
  "h-ka": 3,
  "h-ki": 4,
  "h-ku": 1,
  "h-ke": 3,
  "h-ko": 2,
  // S-row
  "h-sa": 3,
  "h-shi": 1,
  "h-su": 2,
  "h-se": 3,
  "h-so": 1,
  // T-row
  "h-ta": 4,
  "h-chi": 2,
  "h-tsu": 1,
  "h-te": 1,
  "h-to": 2,
  // N-row
  "h-na": 4,
  "h-ni": 3,
  "h-nu": 2,
  "h-ne": 2,
  "h-no": 1,
  // H-row
  "h-ha": 3,
  "h-hi": 1,
  "h-fu": 4,
  "h-he": 1,
  "h-ho": 4,
  // M-row
  "h-ma": 3,
  "h-mi": 2,
  "h-mu": 3,
  "h-me": 2,
  "h-mo": 3,
  // Y-row
  "h-ya": 3,
  "h-yu": 2,
  "h-yo": 2,
  // R-row
  "h-ra": 2,
  "h-ri": 2,
  "h-ru": 1,
  "h-re": 2,
  "h-ro": 1,
  // W-row & Singular
  "h-wa": 2,
  "h-wo": 3,
  "h-n": 1,

  // Katakana Vowels
  "k-a": 2,
  "k-i": 2,
  "k-u": 3,
  "k-e": 3,
  "k-o": 3,
  // K-row
  "k-ka": 2,
  "k-ki": 3,
  "k-ku": 2,
  "k-ke": 3,
  "k-ko": 2,
  // S-row
  "k-sa": 3,
  "k-shi": 3,
  "k-su": 2,
  "k-se": 2,
  "k-so": 2,
  // T-row
  "k-ta": 3,
  "k-chi": 3,
  "k-tsu": 3,
  "k-te": 3,
  "k-to": 2,
  // N-row
  "k-na": 2,
  "k-ni": 2,
  "k-nu": 2,
  "k-ne": 4,
  "k-no": 1,
  // H-row
  "k-ha": 2,
  "k-hi": 2,
  "k-fu": 1,
  "k-he": 1,
  "k-ho": 4,
  // M-row
  "k-ma": 2,
  "k-mi": 3,
  "k-mu": 2,
  "k-me": 2,
  "k-mo": 3,
  // Y-row
  "k-ya": 2,
  "k-yu": 2,
  "k-yo": 3,
  // R-row
  "k-ra": 2,
  "k-ri": 2,
  "k-ru": 2,
  "k-re": 1,
  "k-ro": 3,
  // W-row & Singular
  "k-wa": 2,
  "k-wo": 3,
  "k-n": 2,
};

/**
 * Standard confused pairs for learners (SEO value)
 */
export const CONFUSED_PAIRS: Record<string, string[]> = {
  // Hiragana lookalikes
  "h-a": ["h-o", "h-me"],
  "h-o": ["h-a", "h-mu"],
  "h-sa": ["h-ki", "h-chi"],
  "h-ki": ["h-sa"],
  "h-chi": ["h-sa", "h-ra"],
  "h-nu": ["h-me", "h-ne"],
  "h-me": ["h-nu", "h-a"],
  "h-ne": ["h-wa", "h-re", "h-nu"],
  "h-wa": ["h-ne", "h-re"],
  "h-re": ["h-wa", "h-ne"],
  "h-ru": ["h-ro"],
  "h-ro": ["h-ru"],

  // Katakana lookalikes
  "k-shi": ["k-tsu", "k-so", "k-n"],
  "k-tsu": ["k-shi", "k-so", "k-n"],
  "k-so": ["k-n", "k-shi", "k-tsu"],
  "k-n": ["k-so", "k-shi", "k-tsu"],
  "k-ko": ["k-yu", "k-e"],
  "k-yu": ["k-ko"],
  "k-ku": ["k-ta", "k-ke"],
  "k-ta": ["k-ku", "k-nu"],
};

/**
 * Get sample word for a kana character
 */
export function getSampleWord(kanaId: string) {
  if (SAMPLE_WORDS[kanaId]) {
    return SAMPLE_WORDS[kanaId];
  }

  // Fallback defaults if not in stages dictionary
  return null;
}

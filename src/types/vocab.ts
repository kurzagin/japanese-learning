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

export interface KanjiOption {
  kanji: string;
  meaning: Record<Locale, string>;
  pitchAccent?: string;
  note?: Record<Locale, string>;
  example?: string;
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
  kanjiOptions?: KanjiOption[];
  aliases?: string[];
}

export interface JlptCategoryMeta {
  key: "n5" | "n4" | "anime";
  jlpt: "N5" | "N4" | "Anime";
  title: Record<Locale, string>;
  tagline: Record<Locale, string>;
  description: Record<Locale, string>;
}

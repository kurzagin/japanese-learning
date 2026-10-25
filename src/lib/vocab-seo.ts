import { KanaCharacter } from "@/types/kana";
import { Locale } from "@/data/i18n";

export type {
  FuriganaSegment,
  VocabSentence,
  KanjiOption,
  VocabWord,
  JlptCategoryMeta,
} from "@/types/vocab";

import type { VocabWord, JlptCategoryMeta } from "@/types/vocab";

/**
 * Breakdown word characters into matching Kana primitives for cross-linking
 */
export function getConstituentKana(
  word: VocabWord,
  allKana: KanaCharacter[] = []
): KanaCharacter[] {
  const text = word.character;
  const matched: KanaCharacter[] = [];

  for (let i = 0; i < text.length; ) {
    if (i + 1 < text.length) {
      const two = text.slice(i, i + 2);
      const matchTwo = allKana.find(
        (k) => k.character === two && k.script === word.script
      );
      if (matchTwo) {
        if (!matched.some((m) => m.id === matchTwo.id)) {
          matched.push(matchTwo);
        }
        const baseOne = allKana.find(
          (k) => k.character === text[i] && k.script === word.script
        );
        if (
          baseOne &&
          word.primaryKanaId === baseOne.id &&
          !matched.some((m) => m.id === baseOne.id)
        ) {
          matched.push(baseOne);
        }
        i += 2;
        continue;
      }
    }

    const char = text[i];
    const kana = allKana.find(
      (k) => k.character === char && k.script === word.script
    );
    if (kana && !matched.some((m) => m.id === kana.id)) {
      matched.push(kana);
    }
    i += 1;
  }

  return matched;
}

/**
 * Get related words sharing the same script
 */
export function getRelatedWords(
  word: VocabWord,
  allWords: VocabWord[] = [],
  count = 4
): VocabWord[] {
  return allWords
    .filter((w) => w.slug !== word.slug && w.script === word.script)
    .slice(0, count);
}

export const JLPT_CATEGORIES: JlptCategoryMeta[] = [
  {
    key: "n5",
    jlpt: "N5",
    title: {
      en: "JLPT N5 Core Vocabulary List",
      id: "Daftar Kosakata Inti JLPT N5",
      ja: "JLPT N5 必須基礎単語一覧",
    },
    tagline: {
      en: "Essential 105 words for Japanese Language Proficiency Test Level 5",
      id: "105 kata penting untuk Ujian Kemampuan Bahasa Jepang (JLPT) Level N5",
      ja: "日本語能力試験 N5レベルの重要基礎105単語",
    },
    description: {
      en: "Master the foundational JLPT N5 vocabulary words with native TTS pronunciation audio, Kanji & furigana breakdowns, romaji reading, and example sentences.",
      id: "Kuasai kosakata dasar JLPT N5 lengkap dengan audio pelafalan TTS penutur asli, rincian Kanji & furigana, panduan bacaan romaji, dan kalimat contoh.",
      ja: "JLPT N5の基礎単語をネイティブ発音音声、漢字・ふりがな分解、ローマ字読み、実践的な例文とともにマスターしましょう。",
    },
  },
  {
    key: "n4",
    jlpt: "N4",
    title: {
      en: "JLPT N4 Elementary Vocabulary List",
      id: "Daftar Kosakata Dasar JLPT N4",
      ja: "JLPT N4 初級重要単語一覧",
    },
    tagline: {
      en: "Essential 47 words for Japanese Language Proficiency Test Level 4",
      id: "47 kata penting untuk Ujian Kemampuan Bahasa Jepang (JLPT) Level N4",
      ja: "日本語能力試験 N4レベルの初級重要47単語",
    },
    description: {
      en: "Expand your Japanese vocabulary with elementary JLPT N4 words featuring audio pronunciation, romaji guides, and realistic contextual sentences.",
      id: "Perluas kosakata bahasa Jepangmu dengan kata-kata tingkat dasar JLPT N4 lengkap dengan audio pelafalan, panduan romaji, dan kalimat kontekstual.",
      ja: "ネイティブ音声合成（TTS）、ローマ字ガイド、自然な文脈の例文を備えたJLPT N4単語で日本語の語彙力を広げましょう。",
    },
  },
  {
    key: "anime",
    jlpt: "Anime",
    title: {
      en: "Anime & Pop Culture Japanese Vocabulary",
      id: "Kosakata Bahasa Jepang Anime & Kultur Pop",
      ja: "アニメ＆ポップカルチャー日本語語彙集",
    },
    tagline: {
      en: "Iconic words, reactions, and loanwords from anime and manga",
      id: "Kata ikonik, ekspresi reaksi, dan kata serapan dari dunia anime dan manga",
      ja: "アニメやマンガで頻出する定番表現・リアクション・外来語",
    },
    description: {
      en: "Learn the most iconic Japanese anime reactions, loanwords, and conversational terms with native TTS audio, character origins, and English & Indonesian meanings.",
      id: "Pelajari ekspresi reaksi anime Jepang paling ikonik, kata serapan, dan istilah percakapan lengkap dengan audio TTS asli, rincian karakter, serta artinya.",
      ja: "アニメの象徴的なリアクション、外来語、日常会話フレーズをネイティブ音声合成（TTS）と文字の成り立ち解説とともに楽しく学びましょう。",
    },
  },
];

export function getWordsByJlpt(
  jlpt: "N5" | "N4" | "Anime",
  allWords: VocabWord[] = []
): VocabWord[] {
  return allWords.filter((w) => w.jlpt === jlpt);
}

import rawKana from "@/data/kana.json";
import rawVocab from "@/data/vocab.json";
import { STAGES } from "@/data/stages";

/**
 * Site-wide content counts derived from the source data files.
 * Import this only from Server Components / route handlers and pass the
 * resulting numbers to Client Components as props so the large JSON files
 * are not shipped to the browser just to render a number.
 */
export interface SiteStats {
  kanaTotal: number;
  hiraganaTotal: number;
  katakanaTotal: number;
  vocabTotal: number;
  n5: number;
  n4: number;
  anime: number;
  stagesTotal: number;
}

const kana = rawKana as Array<{ script: string }>;
const vocab = rawVocab as Array<{ jlpt: string }>;

export const SITE_STATS: SiteStats = {
  kanaTotal: kana.length,
  hiraganaTotal: kana.filter((k) => k.script === "hiragana").length,
  katakanaTotal: kana.filter((k) => k.script === "katakana").length,
  vocabTotal: vocab.length,
  n5: vocab.filter((w) => w.jlpt === "N5").length,
  n4: vocab.filter((w) => w.jlpt === "N4").length,
  anime: vocab.filter((w) => w.jlpt === "Anime").length,
  stagesTotal: STAGES.length,
};

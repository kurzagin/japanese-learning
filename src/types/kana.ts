import { Locale } from "@/data/i18n";

export type KanaScript = "hiragana" | "katakana";
export type KanaType = "gojuon" | "dakuon" | "handakuon" | "yoon" | "extended";
export type KanaRow =
  | "vowel"
  | "k"
  | "s"
  | "t"
  | "n"
  | "ha"
  | "h"
  | "m"
  | "y"
  | "r"
  | "w"
  | "singular"
  | "g"
  | "z"
  | "d"
  | "b"
  | "p"
  | "yoon"
  | "extended";

export interface KanaCharacter {
  id: string; // e.g. "h-a", "k-ka"
  script: KanaScript;
  character: string; // e.g. "あ", "ア"
  romaji: string; // e.g. "a", "ka"
  type: KanaType;
  row: KanaRow;
  hint: Record<Locale, string>;
  aliases?: string[];
}

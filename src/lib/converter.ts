import { ALL_KANA_PRIMITIVES, KanaCharacter } from "@/data/kana";

// Mapping table for Romaji to Hiragana / Katakana
const ROMAJI_TABLE: [string, string, string][] = [
  // 3-character combos
  ["kya", "きゃ", "キャ"],
  ["kyu", "きゅ", "キュ"],
  ["kyo", "きょ", "キョ"],
  ["sha", "しゃ", "シャ"],
  ["shu", "しゅ", "シュ"],
  ["sho", "しょ", "ショ"],
  ["cha", "ちゃ", "チャ"],
  ["chu", "ちゅ", "チュ"],
  ["cho", "ちょ", "チョ"],
  ["nya", "にゃ", "ニャ"],
  ["nyu", "にゅ", "ニュ"],
  ["nyo", "にょ", "ニョ"],
  ["hya", "ひゃ", "ヒャ"],
  ["hyu", "ひゅ", "ヒュ"],
  ["hyo", "ひょ", "ヒョ"],
  ["mya", "みゃ", "ミャ"],
  ["myu", "みゅ", "ミュ"],
  ["myo", "みょ", "ミョ"],
  ["rya", "りゃ", "リャ"],
  ["ryu", "りゅ", "リュ"],
  ["ryo", "りょ", "リョ"],
  ["gya", "ぎゃ", "ギャ"],
  ["gyu", "ぎゅ", "ギュ"],
  ["gyo", "ぎょ", "ギョ"],
  ["bya", "びゃ", "ビャ"],
  ["byu", "びゅ", "ビュ"],
  ["byo", "びょ", "ビョ"],
  ["pya", "ぴゃ", "ピャ"],
  ["pyu", "ぴゅ", "ピュ"],
  ["pyo", "ぴょ", "ピョ"],
  ["tsu", "つ", "ツ"],
  ["shi", "し", "シ"],
  ["chi", "ち", "チ"],

  // 2-character pairs
  ["ka", "か", "カ"],
  ["ki", "き", "キ"],
  ["ku", "く", "ク"],
  ["ke", "け", "ケ"],
  ["ko", "こ", "コ"],
  ["sa", "さ", "サ"],
  ["su", "す", "ス"],
  ["se", "せ", "セ"],
  ["so", "そ", "ソ"],
  ["ta", "た", "タ"],
  ["te", "て", "テ"],
  ["to", "と", "ト"],
  ["na", "な", "ナ"],
  ["ni", "に", "ニ"],
  ["nu", "ぬ", "ヌ"],
  ["ne", "ね", "ネ"],
  ["no", "の", "ノ"],
  ["ha", "は", "ハ"],
  ["hi", "ひ", "ヒ"],
  ["fu", "ふ", "フ"],
  ["he", "へ", "ヘ"],
  ["ho", "ほ", "ホ"],
  ["ma", "ま", "マ"],
  ["mi", "み", "ミ"],
  ["mu", "む", "ム"],
  ["me", "め", "メ"],
  ["mo", "も", "モ"],
  ["ya", "や", "ヤ"],
  ["yu", "ゆ", "ユ"],
  ["yo", "よ", "ヨ"],
  ["ra", "ら", "ラ"],
  ["ri", "り", "リ"],
  ["ru", "る", "ル"],
  ["re", "れ", "レ"],
  ["ro", "ろ", "ロ"],
  ["wa", "わ", "ワ"],
  ["wo", "を", "ヲ"],
  ["ga", "が", "ガ"],
  ["gi", "ぎ", "ギ"],
  ["gu", "ぐ", "グ"],
  ["ge", "げ", "ゲ"],
  ["go", "ご", "ゴ"],
  ["za", "ざ", "ザ"],
  ["ji", "じ", "ジ"],
  ["zu", "ず", "ズ"],
  ["ze", "ぜ", "ゼ"],
  ["zo", "ぞ", "ゾ"],
  ["da", "だ", "ダ"],
  ["de", "で", "デ"],
  ["do", "ど", "ド"],
  ["ba", "ば", "バ"],
  ["bi", "び", "ビ"],
  ["bu", "ぶ", "ブ"],
  ["be", "べ", "ベ"],
  ["bo", "ぼ", "ボ"],
  ["pa", "ぱ", "パ"],
  ["pi", "ぴ", "ピ"],
  ["pu", "ぷ", "プ"],
  ["pe", "ぺ", "ペ"],
  ["po", "ぽ", "ポ"],

  // 1-character vowels & singulars
  ["a", "あ", "ア"],
  ["i", "い", "イ"],
  ["u", "う", "ウ"],
  ["e", "え", "エ"],
  ["o", "お", "オ"],
  ["n", "ん", "ン"],
];

/**
 * Convert Romaji text to Hiragana
 */
export function romajiToHiragana(text: string): string {
  let lower = text.toLowerCase();

  // Handle small tsu (sokuon): double consonants like 'kk', 'tt', 'pp', 'ss'
  lower = lower.replace(/([bcdfghjklmpqrstvwxyz])\1/g, (match, char) => {
    if (char === "n") return match; // 'nn' is handled as ん
    return "っ" + char;
  });

  let result = "";
  let i = 0;

  while (i < lower.length) {
    if (lower[i] === "っ") {
      result += "っ";
      i++;
      continue;
    }

    let matched = false;

    // Check 3-letter, 2-letter, then 1-letter prefixes
    for (const [romaji, hira] of ROMAJI_TABLE) {
      if (lower.startsWith(romaji, i)) {
        result += hira;
        i += romaji.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result += lower[i];
      i++;
    }
  }

  return result;
}

/**
 * Convert Romaji text to Katakana
 */
export function romajiToKatakana(text: string): string {
  let lower = text.toLowerCase();

  // Handle small tsu (sokuon): double consonants
  lower = lower.replace(/([bcdfghjklmpqrstvwxyz])\1/g, (match, char) => {
    if (char === "n") return match;
    return "ッ" + char;
  });

  let result = "";
  let i = 0;

  while (i < lower.length) {
    if (lower[i] === "ッ") {
      result += "ッ";
      i++;
      continue;
    }

    let matched = false;

    for (const [romaji, , kata] of ROMAJI_TABLE) {
      if (lower.startsWith(romaji, i)) {
        result += kata;
        i += romaji.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result += lower[i];
      i++;
    }
  }

  return result;
}

/**
 * Reverse Kana to Romaji helper
 */
export function kanaToRomaji(kanaText: string): string {
  let result = kanaText;

  // Sokuon replacements
  result = result.replace(/っ([かきくけこ])/g, "k$1");
  result = result.replace(/っ([さしすせそ])/g, "s$1");
  result = result.replace(/っ([たちつてと])/g, "t$1");
  result = result.replace(/っ([ぱぴぷぺぽ])/g, "p$1");
  result = result.replace(/ッ([カキクケコ])/g, "k$1");
  result = result.replace(/ッ([サシスセソ])/g, "s$1");
  result = result.replace(/ッ([タチツテト])/g, "t$1");
  result = result.replace(/ッ([パピプペポ])/g, "p$1");

  // Multi-char to single-char replacement order
  for (const [romaji, hira, kata] of ROMAJI_TABLE) {
    if (hira.length > 1) {
      result = result.split(hira).join(romaji);
    }
    if (kata.length > 1) {
      result = result.split(kata).join(romaji);
    }
  }

  for (const [romaji, hira, kata] of ROMAJI_TABLE) {
    result = result.split(hira).join(romaji);
    result = result.split(kata).join(romaji);
  }

  return result;
}

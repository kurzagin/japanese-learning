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
  ["ja", "じゃ", "ジャ"],
  ["ju", "じゅ", "ジュ"],
  ["jo", "じょ", "ジョ"],
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
  ["jya", "じゃ", "ジャ"],
  ["jyu", "じゅ", "ジュ"],
  ["jyo", "じょ", "ジョ"],
  ["sya", "しゃ", "シャ"],
  ["syu", "しゅ", "シュ"],
  ["syo", "しょ", "ショ"],
  ["tya", "ちゃ", "チャ"],
  ["tyu", "ちゅ", "チュ"],
  ["tyo", "ちょ", "チョ"],
  ["cya", "ちゃ", "チャ"],
  ["cyu", "ちゅ", "チュ"],
  ["cyo", "ちょ", "チョ"],
  ["dya", "ぢゃ", "ヂャ"],
  ["dyu", "ぢゅ", "ヂュ"],
  ["dyo", "ぢょ", "ヂョ"],
  ["bya", "びゃ", "ビャ"],
  ["byu", "びゅ", "ビュ"],
  ["byo", "びょ", "ビョ"],
  ["pya", "ぴゃ", "ピャ"],
  ["pyu", "ぴゅ", "ピュ"],
  ["pyo", "ぴょ", "ピョ"],
  ["tsu", "つ", "ツ"],
  ["shi", "し", "シ"],
  ["chi", "ち", "チ"],
  ["dji", "ぢ", "ヂ"],
  ["dzu", "づ", "ヅ"],

  // 2-character pairs
  ["fa", "ふぁ", "ファ"],
  ["fi", "ふぃ", "フィ"],
  ["fe", "ふぇ", "フェ"],
  ["fo", "ふぉ", "フォ"],
  ["wi", "うぃ", "ウィ"],
  ["we", "うぇ", "ウェ"],
  ["va", "ゔぁ", "ヴァ"],
  ["vi", "ゔぃ", "ヴィ"],
  ["vu", "ゔ", "ヴ"],
  ["ve", "ゔぇ", "ヴェ"],
  ["vo", "ゔぉ", "ヴォ"],
  ["ka", "か", "カ"],
  ["ki", "き", "キ"],
  ["ku", "く", "ク"],
  ["ke", "け", "ケ"],
  ["ko", "こ", "コ"],
  ["ca", "か", "カ"],
  ["cu", "く", "ク"],
  ["co", "こ", "コ"],
  ["sa", "さ", "サ"],
  ["si", "し", "シ"],
  ["su", "す", "ス"],
  ["se", "せ", "セ"],
  ["so", "そ", "ソ"],
  ["ta", "た", "タ"],
  ["tu", "つ", "ツ"],
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
  ["hu", "ふ", "フ"],
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
  ["zi", "じ", "ジ"],
  ["zu", "ず", "ズ"],
  ["ze", "ぜ", "ゼ"],
  ["zo", "ぞ", "ゾ"],
  ["da", "だ", "ダ"],
  ["du", "づ", "ヅ"],
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
  ["nn", "ん", "ン"],
  ["n'", "ん", "ン"],
  ["ti", "てぃ", "ティ"],
  ["di", "でぃ", "ディ"],

  // 1-character vowels & singulars
  ["a", "あ", "ア"],
  ["i", "い", "イ"],
  ["u", "う", "ウ"],
  ["e", "え", "エ"],
  ["o", "お", "オ"],
  ["n", "ん", "ン"],
];

/**
 * Pre-process text to handle grammatical particle and greeting conventions:
 * 1. "konnichiwa" -> standard greeting is spelled with 'ha': こんにちは (not こんにちわ)
 * 2. "konbanwa" -> standard greeting is spelled with 'ha': こんばんは (not こんばんわ)
 * 3. Standalone particle "wa" (e.g. "watashi wa") -> particle is written as は (not わ)
 */
function preprocessParticles(text: string): string {
  let processed = text;

  // 1. Standard greetings
  processed = processed.replace(/\bkonnichiwa\b/gi, "konnichiha");
  processed = processed.replace(/\bkonbanwa\b/gi, "konbanha");

  // 2. Standalone topic particle 'wa' (surrounded by word boundaries / whitespace / punctuation)
  // e.g. "watashi wa" -> "watashi ha"
  processed = processed.replace(/(\s)wa(\s|$|[.,!?、。])/gi, "$1ha$2");
  processed = processed.replace(/^wa(\s|$|[.,!?、。])/gi, "ha$1");

  return processed;
}

/**
 * Convert Romaji text to Hiragana with smart particle awareness
 */
export function romajiToHiragana(text: string, smartParticles: boolean = true): string {
  let lower = (smartParticles ? preprocessParticles(text) : text)
    .toLowerCase()
    .replace(/ā/g, "aa")
    .replace(/ī/g, "ii")
    .replace(/ū/g, "uu")
    .replace(/ē/g, "ee")
    .replace(/ō/g, "ou");

  // Handle Japanese punctuation replacements
  lower = lower.replace(/,/g, "、").replace(/\./g, "。");

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
export function romajiToKatakana(text: string, smartParticles: boolean = true): string {
  let lower = (smartParticles ? preprocessParticles(text) : text)
    .toLowerCase()
    .replace(/ā/g, "aー")
    .replace(/ī/g, "iー")
    .replace(/ū/g, "uー")
    .replace(/ē/g, "eー")
    .replace(/ō/g, "oー");

  lower = lower.replace(/,/g, "、").replace(/\./g, "。");

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

  // Japanese punctuation back to Latin
  result = result.replace(/、/g, ", ").replace(/。/g, ". ");

  // Sokuon replacements (voiceless + voiced consonants)
  result = result.replace(/[っッ]([かきくけこカキクケコ])/g, "k$1");
  result = result.replace(/[っッ]([さしすせそサシスセソ])/g, "s$1");
  result = result.replace(/[っッ]([たちつてとタチツテト])/g, "t$1");
  result = result.replace(/[っッ]([ぱぴぷぺぽパピプペポ])/g, "p$1");
  result = result.replace(/[っッ]([がぎぐげごガギグゲゴ])/g, "g$1");
  result = result.replace(/[っッ]([ざずぜぞザズゼゾづヅ])/g, "z$1");
  result = result.replace(/[っッ]([じジぢヂ])/g, "j$1");
  result = result.replace(/[っッ]([だでどダデド])/g, "d$1");
  result = result.replace(/[っッ]([ばびぶべぼバビブベボ])/g, "b$1");
  result = result.replace(/[っッ]([ふフ])/g, "f$1");
  result = result.replace(/[っッ]([はひへほハヒヘホ])/g, "h$1");

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

  // Handle prolonged sound mark (ー) by doubling the preceding vowel
  result = result.replace(/([aiueo])ー/gi, "$1$1");

  return result;
}

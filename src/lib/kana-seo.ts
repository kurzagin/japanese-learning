import { Locale } from "@/data/i18n";
import { KanaCharacter, KanaScript, KanaType } from "@/types/kana";
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
  slug: string,
  allKana: KanaCharacter[] = []
): KanaCharacter | undefined {
  const normScript = script.toLowerCase();
  const normSlug = slug.toLowerCase();

  return allKana.find((k) => {
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

export interface KanaOrigin {
  kanji: string;
  reading: string;
  notes: Record<Locale, string>;
}

export const KANA_ORIGINS: Record<string, KanaOrigin> = {
  "h-a": {
    kanji: "安",
    reading: "an",
    notes: {
      en: "Derived from the cursive form of the Kanji 安 (peace/cheap).",
      id: "Berasal dari bentuk kaligrafi kursif Kanji 安 (damai/tenang).",
      ja: "漢字「安」の草書体（くずし字）から生まれました。",
    },
  },
  "h-i": {
    kanji: "以",
    reading: "i",
    notes: {
      en: "Derived from the cursive form of 以 (by means of).",
      id: "Berasal dari bentuk kursif Kanji 以 (dengan/melalui).",
      ja: "漢字「以」の草書体から生まれました。",
    },
  },
  "h-u": {
    kanji: "宇",
    reading: "u",
    notes: {
      en: "Derived from the crown and body of 宇 (universe).",
      id: "Berasal dari bagian mahkota dan badan Kanji 宇 (alam semesta).",
      ja: "漢字「宇」の草書体から生まれました。",
    },
  },
  "h-e": {
    kanji: "衣",
    reading: "e",
    notes: {
      en: "Derived from the cursive strokes of 衣 (clothing).",
      id: "Berasal dari goresan kursif Kanji 衣 (pakaian).",
      ja: "漢字「衣」の草書体から生まれました。",
    },
  },
  "h-o": {
    kanji: "於",
    reading: "o",
    notes: {
      en: "Derived from the cursive form of 於 (at/in).",
      id: "Berasal dari bentuk kursif Kanji 於 (di/pada).",
      ja: "漢字「於」の草書体から生まれました。",
    },
  },
  "h-ka": {
    kanji: "加",
    reading: "ka",
    notes: {
      en: "Derived from 加 (to add).",
      id: "Berasal dari bentuk kursif Kanji 加 (menambah).",
      ja: "漢字「加」の草書体から生まれました。",
    },
  },
  "h-ki": {
    kanji: "幾",
    reading: "ki",
    notes: {
      en: "Derived from the cursive form of 幾 (how many).",
      id: "Berasal dari bentuk kursif Kanji 幾 (berapa banyak).",
      ja: "漢字「幾」の草書体から生まれました。",
    },
  },
  "h-ku": {
    kanji: "久",
    reading: "ku",
    notes: {
      en: "Derived from 久 (long time).",
      id: "Berasal dari bentuk kursif Kanji 久 (waktu lama).",
      ja: "漢字「久」の草書体から生まれました。",
    },
  },
  "h-ke": {
    kanji: "計",
    reading: "ke",
    notes: {
      en: "Derived from 計 (to measure/plan).",
      id: "Berasal dari bentuk kursif Kanji 計 (mengukur/merencanakan).",
      ja: "漢字「計」の草書体から生まれました。",
    },
  },
  "h-ko": {
    kanji: "己",
    reading: "ko",
    notes: {
      en: "Derived from 己 (oneself).",
      id: "Berasal dari bentuk kursif Kanji 己 (diri sendiri).",
      ja: "漢字「己」の草書体から生まれました。",
    },
  },
  "h-sa": {
    kanji: "左",
    reading: "sa",
    notes: {
      en: "Derived from 左 (left).",
      id: "Berasal dari bentuk kursif Kanji 左 (kiri).",
      ja: "漢字「左」の草書体から生まれました。",
    },
  },
  "h-shi": {
    kanji: "之",
    reading: "shi",
    notes: {
      en: "Derived from the flowing stroke of 之 (of).",
      id: "Berasal dari goresan mengalir Kanji 之 (dari/milik).",
      ja: "漢字「之」の草書体から生まれました。",
    },
  },
  "h-su": {
    kanji: "寸",
    reading: "su",
    notes: {
      en: "Derived from 寸 (traditional measurement unit).",
      id: "Berasal dari bentuk kursif Kanji 寸 (satuan ukur tradisional).",
      ja: "漢字「寸」の草書体から生まれました。",
    },
  },
  "h-se": {
    kanji: "世",
    reading: "se",
    notes: {
      en: "Derived from 世 (world/generation).",
      id: "Berasal dari bentuk kursif Kanji 世 (dunia/generasi).",
      ja: "漢字「世」の草書体から生まれました。",
    },
  },
  "h-so": {
    kanji: "曽",
    reading: "so",
    notes: {
      en: "Derived from 曽 (formerly).",
      id: "Berasal dari bentuk kursif Kanji 曽 (dahulu).",
      ja: "漢字「曽」の草書体から生まれました。",
    },
  },
  "h-ta": {
    kanji: "太",
    reading: "ta",
    notes: {
      en: "Derived from 太 (thick/great).",
      id: "Berasal dari bentuk kursif Kanji 太 (tebal/besar).",
      ja: "漢字「太」の草書体から生まれました。",
    },
  },
  "h-chi": {
    kanji: "知",
    reading: "chi",
    notes: {
      en: "Derived from 知 (to know).",
      id: "Berasal dari bentuk kursif Kanji 知 (mengetahui).",
      ja: "漢字「知」の草書体から生まれました。",
    },
  },
  "h-tsu": {
    kanji: "川",
    reading: "tsu",
    notes: {
      en: "Derived from 川 (river).",
      id: "Berasal dari bentuk kursif Kanji 川 (sungai).",
      ja: "漢字「川」の草書体から生まれました。",
    },
  },
  "h-te": {
    kanji: "天",
    reading: "te",
    notes: {
      en: "Derived from 天 (heaven/sky).",
      id: "Berasal dari bentuk kursif Kanji 天 (langit/surga).",
      ja: "漢字「天」の草書体から生まれました。",
    },
  },
  "h-to": {
    kanji: "止",
    reading: "to",
    notes: {
      en: "Derived from 止 (to stop).",
      id: "Berasal dari bentuk kursif Kanji 止 (berhenti).",
      ja: "漢字「止」の草書体から生まれました。",
    },
  },
  "h-na": {
    kanji: "奈",
    reading: "na",
    notes: {
      en: "Derived from 奈 (Nara prefecture / what).",
      id: "Berasal dari bentuk kursif Kanji 奈 (Nara).",
      ja: "漢字「奈」の草書体から生まれました。",
    },
  },
  "h-ni": {
    kanji: "仁",
    reading: "ni",
    notes: {
      en: "Derived from 仁 (benevolence).",
      id: "Berasal dari bentuk kursif Kanji 仁 (kebajikan/kemurahan hati).",
      ja: "漢字「仁」の草書体から生まれました。",
    },
  },
  "h-nu": {
    kanji: "奴",
    reading: "nu",
    notes: {
      en: "Derived from 奴 (fellow/servant).",
      id: "Berasal dari bentuk kursif Kanji 奴 (orang/abdi).",
      ja: "漢字「奴」の草書体から生まれました。",
    },
  },
  "h-ne": {
    kanji: "祢",
    reading: "ne",
    notes: {
      en: "Derived from 祢 (ancestral shrine).",
      id: "Berasal dari bentuk kursif Kanji 祢 (kuil leluhur).",
      ja: "漢字「祢」の草書体から生まれました。",
    },
  },
  "h-no": {
    kanji: "乃",
    reading: "no",
    notes: {
      en: "Derived from 乃 (from/whereupon).",
      id: "Berasal dari bentuk kursif Kanji 乃 (dari/milik).",
      ja: "漢字「乃」の草書体から生まれました。",
    },
  },
  "h-ha": {
    kanji: "波",
    reading: "ha",
    notes: {
      en: "Derived from 波 (wave).",
      id: "Berasal dari bentuk kursif Kanji 波 (ombak).",
      ja: "漢字「波」の草書体から生まれました。",
    },
  },
  "h-hi": {
    kanji: "比",
    reading: "hi",
    notes: {
      en: "Derived from 比 (to compare).",
      id: "Berasal dari bentuk kursif Kanji 比 (membandingkan).",
      ja: "漢字「比」の草書体から生まれました。",
    },
  },
  "h-fu": {
    kanji: "不",
    reading: "fu",
    notes: {
      en: "Derived from 不 (non/negative).",
      id: "Berasal dari bentuk kursif Kanji 不 (tidak/negasi).",
      ja: "漢字「不」の草書体から生まれました。",
    },
  },
  "h-he": {
    kanji: "部",
    reading: "he",
    notes: {
      en: "Derived from 部 (part/section).",
      id: "Berasal dari bagian kanan Kanji 部 (bagian/sektor).",
      ja: "漢字「部」の旁（つくり）の草書体から生まれました。",
    },
  },
  "h-ho": {
    kanji: "保",
    reading: "ho",
    notes: {
      en: "Derived from 保 (to protect/preserve).",
      id: "Berasal dari bentuk kursif Kanji 保 (melindungi/menjaga).",
      ja: "漢字「保」の草書体から生まれました。",
    },
  },
  "h-ma": {
    kanji: "末",
    reading: "ma",
    notes: {
      en: "Derived from 末 (end/extremity).",
      id: "Berasal dari bentuk kursif Kanji 末 (ujung/akhir).",
      ja: "漢字「末」の草書体から生まれました。",
    },
  },
  "h-mi": {
    kanji: "美",
    reading: "mi",
    notes: {
      en: "Derived from 美 (beauty).",
      id: "Berasal dari bentuk kursif Kanji 美 (keindahan).",
      ja: "漢字「美」の草書体から生まれました。",
    },
  },
  "h-mu": {
    kanji: "武",
    reading: "mu",
    notes: {
      en: "Derived from 武 (martial/warrior).",
      id: "Berasal dari bentuk kursif Kanji 武 (bela diri/kesatria).",
      ja: "漢字「武」の草書体から生まれました。",
    },
  },
  "h-me": {
    kanji: "女",
    reading: "me",
    notes: {
      en: "Derived from 女 (woman/female).",
      id: "Berasal dari bentuk kursif Kanji 女 (perempuan/wanita).",
      ja: "漢字「女」の草書体から生まれました。",
    },
  },
  "h-mo": {
    kanji: "毛",
    reading: "mo",
    notes: {
      en: "Derived from 毛 (hair/fur).",
      id: "Berasal dari bentuk kursif Kanji 毛 (rambut/bulu).",
      ja: "漢字「毛」の草書体から生まれました。",
    },
  },
  "h-ya": {
    kanji: "也",
    reading: "ya",
    notes: {
      en: "Derived from 也 (to be).",
      id: "Berasal dari bentuk kursif Kanji 也 (adalah).",
      ja: "漢字「也」の草書体から生まれました。",
    },
  },
  "h-yu": {
    kanji: "由",
    reading: "yu",
    notes: {
      en: "Derived from 由 (reason/cause).",
      id: "Berasal dari bentuk kursif Kanji 由 (alasan/asal).",
      ja: "漢字「由」の草書体から生まれました。",
    },
  },
  "h-yo": {
    kanji: "与",
    reading: "yo",
    notes: {
      en: "Derived from 与 (to give).",
      id: "Berasal dari bentuk kursif Kanji 与 (memberikan).",
      ja: "漢字「与」の草書体から生まれました。",
    },
  },
  "h-ra": {
    kanji: "良",
    reading: "ra",
    notes: {
      en: "Derived from 良 (good/virtuous).",
      id: "Berasal dari bentuk kursif Kanji 良 (baik/bagus).",
      ja: "漢字「良」の草書体から生まれました。",
    },
  },
  "h-ri": {
    kanji: "利",
    reading: "ri",
    notes: {
      en: "Derived from 利 (benefit/sharp).",
      id: "Berasal dari bentuk kursif Kanji 利 (manfaat/tajam).",
      ja: "漢字「利」の草書体から生まれました。",
    },
  },
  "h-ru": {
    kanji: "留",
    reading: "ru",
    notes: {
      en: "Derived from 留 (to stay/detain).",
      id: "Berasal dari bentuk kursif Kanji 留 (menetap/tinggal).",
      ja: "漢字「留」の草書体から生まれました。",
    },
  },
  "h-re": {
    kanji: "礼",
    reading: "re",
    notes: {
      en: "Derived from 礼 (courtesy/bow).",
      id: "Berasal dari bentuk kursif Kanji 礼 (hormat/sopan santun).",
      ja: "漢字「礼」の草書体から生まれました。",
    },
  },
  "h-ro": {
    kanji: "呂",
    reading: "ro",
    notes: {
      en: "Derived from 呂 (bath/spine).",
      id: "Berasal dari bentuk kursif Kanji 呂 (punggung/pemandian).",
      ja: "漢字「呂」の草書体から生まれました。",
    },
  },
  "h-wa": {
    kanji: "和",
    reading: "wa",
    notes: {
      en: "Derived from 和 (harmony/peace).",
      id: "Berasal dari bentuk kursif Kanji 和 (harmoni/kedamaian).",
      ja: "漢字「和」の草書体から生まれました。",
    },
  },
  "h-wo": {
    kanji: "遠",
    reading: "wo",
    notes: {
      en: "Derived from 遠 (distant/far).",
      id: "Berasal dari bentuk kursif Kanji 遠 (jauh).",
      ja: "漢字「遠」の草書体から生まれました。",
    },
  },
  "h-n": {
    kanji: "无",
    reading: "n",
    notes: {
      en: "Derived from 无 (nothingness).",
      id: "Berasal dari bentuk kursif Kanji 无 (ketiadaan).",
      ja: "漢字「无」の草書体から生まれました。",
    },
  },
  "k-a": {
    kanji: "阿",
    reading: "a",
    notes: {
      en: "Derived from the left radical 阝 of 阿.",
      id: "Berasal dari radikal kiri 阝 pada Kanji 阿.",
      ja: "漢字「阿」の偏（こざとへん）から生まれました。",
    },
  },
  "k-i": {
    kanji: "伊",
    reading: "i",
    notes: {
      en: "Derived from the left radical 亻 of 伊.",
      id: "Berasal dari radikal kiri 亻 pada Kanji 伊.",
      ja: "漢字「伊」の偏（にんべん）から生まれました。",
    },
  },
  "k-u": {
    kanji: "宇",
    reading: "u",
    notes: {
      en: "Derived from the crown radical 宀 of 宇.",
      id: "Berasal dari radikal mahkota atas 宀 pada Kanji 宇.",
      ja: "漢字「宇」の冠（うかんむり）から生まれました。",
    },
  },
  "k-e": {
    kanji: "江",
    reading: "e",
    notes: {
      en: "Derived from the right part 工 of 江.",
      id: "Berasal dari bagian kanan 工 pada Kanji 江.",
      ja: "漢字「江」の旁（つくり「工」）から生まれました。",
    },
  },
  "k-o": {
    kanji: "於",
    reading: "o",
    notes: {
      en: "Derived from the upper-left of 於.",
      id: "Berasal dari bagian kiri-atas pada Kanji 於.",
      ja: "漢字「於」の偏（かたへん）から生まれました。",
    },
  },
  "k-ka": {
    kanji: "加",
    reading: "ka",
    notes: {
      en: "Derived from the left part 力 of 加.",
      id: "Berasal dari bagian kiri 力 pada Kanji 加.",
      ja: "漢字「加」の偏（「力」）から生まれました。",
    },
  },
  "k-ki": {
    kanji: "幾",
    reading: "ki",
    notes: {
      en: "Derived from the top part of 幾.",
      id: "Berasal dari bagian atas Kanji 幾.",
      ja: "漢字「幾」の草書体の一部から生まれました。",
    },
  },
  "k-ku": {
    kanji: "久",
    reading: "ku",
    notes: {
      en: "Derived from the first two strokes of 久.",
      id: "Berasal dari dua goresan pertama Kanji 久.",
      ja: "漢字「久」の最初の2画から生まれました。",
    },
  },
  "k-ke": {
    kanji: "介",
    reading: "ke",
    notes: {
      en: "Derived from the left part of 介.",
      id: "Berasal dari bagian pecahan Kanji 介.",
      ja: "漢字「介」の一部から生まれました。",
    },
  },
  "k-ko": {
    kanji: "己",
    reading: "ko",
    notes: {
      en: "Derived from the top strokes of 己.",
      id: "Berasal dari goresan bagian atas Kanji 己.",
      ja: "漢字「己」の上部2画から生まれました。",
    },
  },
  "k-sa": {
    kanji: "散",
    reading: "sa",
    notes: {
      en: "Derived from the top-left of 散.",
      id: "Berasal dari bagian kiri-atas Kanji 散.",
      ja: "漢字「散」の左上部分から生まれました。",
    },
  },
  "k-shi": {
    kanji: "之",
    reading: "shi",
    notes: {
      en: "Derived from the cursive form of 之.",
      id: "Berasal dari bentuk pecahan Kanji 之.",
      ja: "漢字「之」の草書体・点画から生まれました。",
    },
  },
  "k-su": {
    kanji: "須",
    reading: "su",
    notes: {
      en: "Derived from the top-right strokes of 須.",
      id: "Berasal dari goresan akhir kanan-bawah Kanji 須.",
      ja: "漢字「須」の右下部分から生まれました。",
    },
  },
  "k-se": {
    kanji: "世",
    reading: "se",
    notes: {
      en: "Derived from the bottom stroke and body of 世.",
      id: "Berasal dari kerangka bagian dalam Kanji 世.",
      ja: "漢字「世」の一部を省略して生まれました。",
    },
  },
  "k-so": {
    kanji: "曽",
    reading: "so",
    notes: {
      en: "Derived from the top two strokes of 曽.",
      id: "Berasal dari dua titik goresan paling atas Kanji 曽.",
      ja: "漢字「曽」の上部の2画から生まれました。",
    },
  },
  "k-ta": {
    kanji: "多",
    reading: "ta",
    notes: {
      en: "Derived from the top part of 多.",
      id: "Berasal dari bagian atas (夕) Kanji 多.",
      ja: "漢字「多」の上半分の「夕」から生まれました。",
    },
  },
  "k-chi": {
    kanji: "千",
    reading: "chi",
    notes: {
      en: "Derived from 千 (thousand).",
      id: "Berasal dari Kanji 千 (seribu).",
      ja: "漢字「千」の全体から生まれました。",
    },
  },
  "k-tsu": {
    kanji: "川",
    reading: "tsu",
    notes: {
      en: "Derived from 川 (river).",
      id: "Berasal dari tiga aliran goresan Kanji 川 (sungai).",
      ja: "漢字「川」の3画から生まれました。",
    },
  },
  "k-te": {
    kanji: "天",
    reading: "te",
    notes: {
      en: "Derived from the top strokes of 天.",
      id: "Berasal dari tiga goresan awal Kanji 天.",
      ja: "漢字「天」の最初の3画から生まれました。",
    },
  },
  "k-to": {
    kanji: "止",
    reading: "to",
    notes: {
      en: "Derived from the right and top stroke of 止.",
      id: "Berasal dari dua goresan awal Kanji 止.",
      ja: "漢字「止」の最初の2画から生まれました。",
    },
  },
  "k-na": {
    kanji: "奈",
    reading: "na",
    notes: {
      en: "Derived from the top two strokes of 奈.",
      id: "Berasal dari dua goresan pertama Kanji 奈.",
      ja: "漢字「奈」の最初の2画から生まれました。",
    },
  },
  "k-ni": {
    kanji: "二",
    reading: "ni",
    notes: {
      en: "Derived from 二 (two).",
      id: "Berasal langsung dari Kanji 二 (dua).",
      ja: "漢字「二」の全体から生まれました。",
    },
  },
  "k-nu": {
    kanji: "奴",
    reading: "nu",
    notes: {
      en: "Derived from the right part 又 of 奴.",
      id: "Berasal dari bagian kanan 又 pada Kanji 奴.",
      ja: "漢字「奴」の旁（「又」）から生まれました。",
    },
  },
  "k-ne": {
    kanji: "祢",
    reading: "ne",
    notes: {
      en: "Derived from the left radical 礻 of 祢.",
      id: "Berasal dari radikal kiri 礻 pada Kanji 祢.",
      ja: "漢字「祢」の偏（しめすへん）から生まれました。",
    },
  },
  "k-no": {
    kanji: "乃",
    reading: "no",
    notes: {
      en: "Derived from the left stroke of 乃.",
      id: "Berasal dari goresan miring kiri pada Kanji 乃.",
      ja: "漢字「乃」の最初の1画（左払い）から生まれました。",
    },
  },
  "k-ha": {
    kanji: "八",
    reading: "ha",
    notes: {
      en: "Derived from 八 (eight).",
      id: "Berasal langsung dari Kanji 八 (delapan).",
      ja: "漢字「八」の全体から生まれました。",
    },
  },
  "k-hi": {
    kanji: "比",
    reading: "hi",
    notes: {
      en: "Derived from the right half of 比.",
      id: "Berasal dari separuh bagian kanan Kanji 比.",
      ja: "漢字「比」の右半分から生まれました。",
    },
  },
  "k-fu": {
    kanji: "不",
    reading: "fu",
    notes: {
      en: "Derived from the first stroke of 不.",
      id: "Berasal dari goresan sudut kiri-atas Kanji 不.",
      ja: "漢字「不」の左上部分から生まれました。",
    },
  },
  "k-he": {
    kanji: "部",
    reading: "he",
    notes: {
      en: "Derived from the right part 阝 of 部.",
      id: "Berasal dari bagian kanan 阝 pada Kanji 部.",
      ja: "漢字「部」の旁の草書体から生まれました。",
    },
  },
  "k-ho": {
    kanji: "保",
    reading: "ho",
    notes: {
      en: "Derived from the right part 呆 of 保.",
      id: "Berasal dari bagian kanan-bawah 木 pada Kanji 保.",
      ja: "漢字「保」の右下部分（「木」）から生まれました。",
    },
  },
  "k-ma": {
    kanji: "末",
    reading: "ma",
    notes: {
      en: "Derived from the top strokes of 末.",
      id: "Berasal dari bagian atas Kanji 末.",
      ja: "漢字「末」の上部2画から生まれました。",
    },
  },
  "k-mi": {
    kanji: "三",
    reading: "mi",
    notes: {
      en: "Derived from 三 (three).",
      id: "Berasal langsung dari tiga garis Kanji 三 (tiga).",
      ja: "漢字「三」の全体から生まれました。",
    },
  },
  "k-mu": {
    kanji: "牟",
    reading: "mu",
    notes: {
      en: "Derived from the top strokes of 牟.",
      id: "Berasal dari bagian mahkota atas Kanji 牟.",
      ja: "漢字「牟」の上部（ム）から生まれました。",
    },
  },
  "k-me": {
    kanji: "女",
    reading: "me",
    notes: {
      en: "Derived from the cross strokes of 女.",
      id: "Berasal dari dua goresan silang bawah Kanji 女.",
      ja: "漢字「女」の下部2画から生まれました。",
    },
  },
  "k-mo": {
    kanji: "毛",
    reading: "mo",
    notes: {
      en: "Derived from the bottom strokes of 毛.",
      id: "Berasal dari goresan Kanji 毛.",
      ja: "漢字「毛」の画を省略して生まれました。",
    },
  },
  "k-ya": {
    kanji: "也",
    reading: "ya",
    notes: {
      en: "Derived from the first strokes of 也.",
      id: "Berasal dari dua goresan pertama Kanji 也.",
      ja: "漢字「也」の上部2画から生まれました。",
    },
  },
  "k-yu": {
    kanji: "由",
    reading: "yu",
    notes: {
      en: "Derived from the lower strokes of 由.",
      id: "Berasal dari bagian kerangka Kanji 由.",
      ja: "漢字「由」の上部から生まれました。",
    },
  },
  "k-yo": {
    kanji: "与",
    reading: "yo",
    notes: {
      en: "Derived from the right and bottom angles of 与.",
      id: "Berasal dari sudut garis Kanji 与.",
      ja: "漢字「与」の一部から生まれました。",
    },
  },
  "k-ra": {
    kanji: "良",
    reading: "ra",
    notes: {
      en: "Derived from the top of 良.",
      id: "Berasal dari bagian atas Kanji 良.",
      ja: "漢字「良」の上部2画から生まれました。",
    },
  },
  "k-ri": {
    kanji: "利",
    reading: "ri",
    notes: {
      en: "Derived from the right radical 刂 of 利.",
      id: "Berasal dari radikal kanan 刂 pada Kanji 利.",
      ja: "漢字「利」の旁（りっとう「刂」）から生まれました。",
    },
  },
  "k-ru": {
    kanji: "流",
    reading: "ru",
    notes: {
      en: "Derived from the bottom-right strokes of 流.",
      id: "Berasal dari goresan kaki kanan-bawah Kanji 流.",
      ja: "漢字「流」の右下部分から生まれました。",
    },
  },
  "k-re": {
    kanji: "礼",
    reading: "re",
    notes: {
      en: "Derived from the right radical 乚 of 礼.",
      id: "Berasal dari bagian kanan Kanji 礼.",
      ja: "漢字「礼」の旁（右側）から生まれました。",
    },
  },
  "k-ro": {
    kanji: "呂",
    reading: "ro",
    notes: {
      en: "Derived from the top square 口 of 呂.",
      id: "Berasal dari kotak atas 口 pada Kanji 呂.",
      ja: "漢字「呂」の上部の「口」から生まれました。",
    },
  },
  "k-wa": {
    kanji: "和",
    reading: "wa",
    notes: {
      en: "Derived from the right radical 口 of 和.",
      id: "Berasal dari bagian sudut atas Kanji 和.",
      ja: "漢字「和」の旁などから生まれました。",
    },
  },
  "k-wo": {
    kanji: "乎",
    reading: "wo",
    notes: {
      en: "Derived from the top and body strokes of 乎.",
      id: "Berasal dari tiga goresan atas Kanji 乎.",
      ja: "漢字「乎」の上部3画から生まれました。",
    },
  },
  "k-n": {
    kanji: "尓",
    reading: "n",
    notes: {
      en: "Derived from the cursive form of 尓.",
      id: "Berasal dari goresan atas Kanji 尓.",
      ja: "漢字「尓」の上部2画から生まれました。",
    },
  },
};

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

export interface ComparisonPair {
  slug: string; // e.g. "shi-vs-tsu"
  kana1Id: string;
  kana2Id: string;
  script: KanaScript;
  keyDifferences: Record<Locale, string[]>;
  visualTip: Record<Locale, string>;
}

/**
 * Curated high-volume comparison queries searched by learners
 */
export const CURATED_COMPARISONS: ComparisonPair[] = [
  // Katakana big four
  {
    slug: "shi-vs-tsu",
    kana1Id: "k-shi",
    kana2Id: "k-tsu",
    script: "katakana",
    keyDifferences: {
      en: [
        "シ (shi) strokes are drawn upward from bottom-left to top-right.",
        "ツ (tsu) strokes are drawn downward from top-right to bottom-left.",
        "シ dots align along a vertical left curve; ツ dots align along a horizontal top line.",
      ],
      id: [
        "Goresan シ (shi) ditarik dari bawah-kiri naik ke atas-kanan.",
        "Goresan ツ (tsu) ditarik dari atas turun ke bawah-kiri.",
        "Titik pada シ sejajar vertikal di sebelah kiri; titik pada ツ sejajar horizontal di bagian atas.",
      ],
      ja: [
        "シ（シ）は左下から右上に向けて払います。",
        "ツ（ツ）は右上から左下に向けて払います。",
        "シの2点は左側に縦並び、ツの2点は上部に横並びになります。",
      ],
    },
    visualTip: {
      en: "Remember: 'SHI looks UP at the ceiling, TSU falls DOWN like a TSUnami wave.'",
      id: "Tips: 'SHI memandang ke ATAS, sedangkan TSU jatuh ke BAWAH seperti ombak TSUnami.'",
      ja: "覚え方：「シは上を見上げ、ツは津波のように上から落ちる」。",
    },
  },
  {
    slug: "so-vs-n",
    kana1Id: "k-so",
    kana2Id: "k-n",
    script: "katakana",
    keyDifferences: {
      en: [
        "ソ (so) starts from the top and swoops steeply down.",
        "ン (n) starts from the bottom-left and sweeps upwards.",
        "ソ's first mark is almost vertical; ン's first mark is angled flatter.",
      ],
      id: [
        "Goresan utama ソ (so) ditarik curam dari atas ke bawah.",
        "Goresan utama ン (n) disapu dari bawah-kiri ke atas-kanan.",
        "Titik pertama ソ lebih tegak lurus, sedangkan titik ン mendatar.",
      ],
      ja: [
        "ソは上から下へ向かって払います。",
        "ンは左下から右上へ向かって跳ね上げます。",
        "ソの1画目は縦に近く、ンの1画目は寝かせて書きます。",
      ],
    },
    visualTip: {
      en: "Remember: 'SO slides down a slope, N points up into the sky.'",
      id: "Tips: 'SO meluncur ke bawah lereng, N melesat naik ke angkasa.'",
      ja: "覚え方：「ソは滑り台で降り、ンは空へ昇る」。",
    },
  },
  {
    slug: "sa-vs-ki",
    kana1Id: "h-sa",
    kana2Id: "h-ki",
    script: "hiragana",
    keyDifferences: {
      en: [
        "さ (sa) has only ONE horizontal crossbar.",
        "き (ki) has TWO horizontal crossbars.",
        "Both characters sweep down to the lower loop.",
      ],
      id: [
        "さ (sa) hanya memiliki SATU garis horizontal.",
        "き (ki) memiliki DUA garis horizontal paralel.",
        "Keduanya memiliki ekor melengkung di bagian bawah.",
      ],
      ja: [
        "さの横線は1本のみです。",
        "きの横線は2本並びます。",
        "どちらも下部の弧を描く形状が似ています。",
      ],
    },
    visualTip: {
      en: "Remember: 'KI has a Key with two teeth, SA has only one crossbar.'",
      id: "Tips: 'KI mirip Kunci dengan dua gerigi, SA hanya satu palang.'",
      ja: "覚え方：「き（Key）の鍵穴は2本、さは1本」。",
    },
  },
  {
    slug: "wa-vs-re-vs-ne",
    kana1Id: "h-wa",
    kana2Id: "h-ne",
    script: "hiragana",
    keyDifferences: {
      en: [
        "わ (wa) finishes with a smooth round curve inwards.",
        "ね (ne) finishes with a tiny curled loop at the bottom-right tail.",
        "れ (re) kicks outward to the right like a curl.",
      ],
      id: [
        "わ (wa) berakhir dengan lengkungan bulat halus ke dalam tanpa loop.",
        "ね (ne) memiliki simpul/loop kecil melingkar di ujung kanan.",
        "れ (re) menendang keluar meliuk ke arah kanan.",
      ],
      ja: [
        "わは最後が内側に丸まります（結びなし）。",
        "ねは最後に小さく丸い「結び」があります。",
        "れは最後が右外側へ跳ね出します。",
      ],
    },
    visualTip: {
      en: "Remember: 'WA is open, NE has a knot like a cat's curled tail (neko), RE sweeps right.'",
      id: "Tips: 'WA perutnya bundar, NE ada ikatan ekor kucing (neko), RE meliuk ke kanan.'",
      ja: "覚え方：「わは輪を描き、ねは猫のしっぽを結び、れは右へ払う」。",
    },
  },
  {
    slug: "nu-vs-me",
    kana1Id: "h-nu",
    kana2Id: "h-me",
    script: "hiragana",
    keyDifferences: {
      en: [
        "ぬ (nu) finishes with a loop/knot at the tail.",
        "め (me) finishes cleanly without any loop or curl at the end.",
        "The overall shape and crossing strokes are otherwise identical.",
      ],
      id: [
        "ぬ (nu) memiliki simpul/lingkaran kecil di ujung ekornya.",
        "め (me) berakhir dengan sapuan bersih tanpa simpul.",
        "Bentuk kerangka dan garis potong keduanya hampir sama persis.",
      ],
      ja: [
        "ぬの末尾には小さな結び（輪）があります。",
        "めの末尾は結びを作らずそのまま抜きます。",
        "基本のクロスする骨格はほぼ同一です。",
      ],
    },
    visualTip: {
      en: "Remember: 'NU has noodles looped at the end, ME is simple like an eye (目 / me).'",
      id: "Tips: 'NU ada putaran mie di ujungnya, ME bersih seperti mata (目 / me).'",
      ja: "覚え方：「ぬはヌードルの結び目、めはすっきり目の形」。",
    },
  },
  {
    slug: "ru-vs-ro",
    kana1Id: "h-ru",
    kana2Id: "h-ro",
    script: "hiragana",
    keyDifferences: {
      en: [
        "る (ru) curls inside with a closed loop at the bottom.",
        "ろ (ro) stays completely open at the bottom without any loop.",
      ],
      id: [
        "る (ru) memiliki lingkaran melingkar ke dalam di bagian bawah.",
        "ろ (ro) terbuka lebar tanpa ada loop sama sekali di bawahnya.",
      ],
      ja: [
        "るは下部に丸い結びを作ります。",
        "ろは結ばずに開いたまま終わります。",
      ],
    },
    visualTip: {
      en: "Remember: 'RU holds a ruby loop inside, RO has ro-bbed the jewel away.'",
      id: "Tips: 'RU punya kantong bundar di bawah, RO kantongnya kosong.'",
      ja: "覚え方：「るは宝物を抱えて丸まり、ろは何も持たずに開く」。",
    },
  },
  {
    slug: "a-vs-o",
    kana1Id: "h-a",
    kana2Id: "h-o",
    script: "hiragana",
    keyDifferences: {
      en: [
        "あ (a) has a straight vertical stem with an apple-like swirl.",
        "お (o) is formed in one central downward flow with a separate detached dot on the upper right.",
      ],
      id: [
        "あ (a) punya garis vertikal tegak dengan putaran seperti apel.",
        "お (o) memiliki garis turun berputar dengan satu titik terpisah di kanan atas.",
      ],
      ja: [
        "あは縦棒を貫通させて円を描きます。",
        "おは中央から回して右上に独立した点を打ちます。",
      ],
    },
    visualTip: {
      en: "Remember: 'A is an Apple with a cross, O is an Octopus throwing an extra ball.'",
      id: "Tips: 'A bentuknya seperti Apel bersilang, O punya titik bola terpisah di kanan.'",
      ja: "覚え方：「あはリンゴの十字、おは右上に独立した点がある」。",
    },
  },
  {
    slug: "ku-vs-ta",
    kana1Id: "k-ku",
    kana2Id: "k-ta",
    script: "katakana",
    keyDifferences: {
      en: [
        "ク (ku) has 2 strokes: left slash and hooked angle.",
        "タ (ta) has 3 strokes: it looks like ク with an extra stroke intersecting inside.",
      ],
      id: [
        "ク (ku) hanya 2 goresan tanpa garis di dalam.",
        "タ (ta) memiliki 3 goresan dengan garis pemotong di dalamnya.",
      ],
      ja: [
        "クは2画で内側に線がありません。",
        "タは3画でクの内側に斜め線が交差します。",
      ],
    },
    visualTip: {
      en: "Remember: 'KU is clean inside, TA has a Tiny mark inside.'",
      id: "Tips: 'KU dalamnya bersih, TA ada garis tambahan di dalamnya.'",
      ja: "覚え方：「クは中が空っぽ、タは中に線が入る」。",
    },
  },
  {
    slug: "chi-vs-sa",
    kana1Id: "h-chi",
    kana2Id: "h-sa",
    script: "hiragana",
    keyDifferences: {
      en: [
        "ち (chi) curves to the right (like the number '5').",
        "さ (sa) curves to the left and starts with a diagonal down-stroke.",
        "ち has a top horizontal stroke connected directly to the loop.",
      ],
      id: [
        "ち (chi) melengkung menghadap ke kanan (mirip angka '5').",
        "さ (sa) lengkungan ekornya menghadap ke kiri.",
        "ち garis atasnya tersambung langsung membentuk lengkungan perut.",
      ],
      ja: [
        "ちは右側へ大きく膨らむ弧を描きます（数字の5に類似）。",
        "さは左下側へ向かって弧を描きます。",
        "ちは上の横棒と下の丸みが繋がっています。",
      ],
    },
    visualTip: {
      en: "Remember: 'CHI is a Cheerleader with pom-poms facing right, SA faces left.'",
      id: "Tips: 'CHI perutnya menghadap ke kanan (seperti Cheerleader), SA menghadap ke kiri.'",
      ja: "覚え方：「ちは右向き、さは左向き」。",
    },
  },
  {
    slug: "ha-vs-ho",
    kana1Id: "h-ha",
    kana2Id: "h-ho",
    script: "hiragana",
    keyDifferences: {
      en: [
        "は (ha) has ONE horizontal stroke on the right, and the vertical stem goes through it freely.",
        "ほ (ho) has TWO horizontal strokes on the right, and the vertical line does NOT cross through the top bar.",
      ],
      id: [
        "は (ha) hanya punya SATU palang horizontal di kanan.",
        "ほ (ho) punya DUA palang horizontal di kanan, dan garis vertikal TIDAK menembus palang paling atas.",
      ],
      ja: [
        "はの右側は横線が1本です。",
        "ほの右側は横線が2本あり、縦棒は上の横線を上に突き抜けません。",
      ],
    },
    visualTip: {
      en: "Remember: 'HO wears a Hat (top bar) that covers its head; HA has no hat.'",
      id: "Tips: 'HO memakai topi (ada atap di atasnya), HA rambutnya terbuka tanpa topi.'",
      ja: "覚え方：「ほは帽子をかぶって頭が突き出ない、はは頭が開いている」。",
    },
  },
  {
    slug: "ko-vs-ni",
    kana1Id: "h-ko",
    kana2Id: "h-ni",
    script: "hiragana",
    keyDifferences: {
      en: [
        "こ (ko) consists solely of two horizontal bars (top and bottom curved).",
        "に (ni) has a vertical stem stroke on the left, plus the two bars of こ on the right.",
      ],
      id: [
        "こ (ko) hanya terdiri dari dua kurva horizontal atas dan bawah.",
        "に (ni) punya garis tiang vertikal di kiri sebelum dua kurva kanan.",
      ],
      ja: [
        "こは上下の2本の横線のみです。",
        "には左側に縦棒（1画目）があり、その右に「こ」が並びます。",
      ],
    },
    visualTip: {
      en: "Remember: 'NI is a Needle (left line) next to a KO (right bars).'",
      id: "Tips: 'NI punya jarum (Needle) di sebelah kiri garis KO.'",
      ja: "覚え方：「には左に一本針が立ち、右にこがある」。",
    },
  },
  {
    slug: "fu-vs-u",
    kana1Id: "h-fu",
    kana2Id: "h-u",
    script: "hiragana",
    keyDifferences: {
      en: [
        "ふ (fu) has four distinct strokes: top dot, center hook, and two outer side dots.",
        "う (u) has only two strokes: a top accent dot and one large curved hook below.",
      ],
      id: [
        "ふ (fu) memiliki 4 goresan terpisah (titik atas, lengkungan tengah, dan 2 titik samping).",
        "う (u) hanya 2 goresan sederhana (titik atas dan lengkungan bawah).",
      ],
      ja: [
        "ふは4画に分かれ、中心のフックと両脇の点が特徴です。",
        "うは2画で、上の点と下の大きな湾曲のみです。",
      ],
    },
    visualTip: {
      en: "Remember: 'FU is Mount Fuji with clouds drifting on both sides; U is a person bent over.'",
      id: "Tips: 'FU seperti Gunung Fuji dengan lereng kiri-kanan; U seperti orang membungkuk.'",
      ja: "覚え方：「ふは富士山と左右の雲、うは体を丸めてうずくまる姿」。",
    },
  },
  {
    slug: "re-vs-wa",
    kana1Id: "h-re",
    kana2Id: "h-wa",
    script: "hiragana",
    keyDifferences: {
      en: [
        "れ (re) sweeps out and kicks up to the right at the end.",
        "わ (wa) sweeps inwards in a round curve like a rounded belly.",
      ],
      id: [
        "れ (re) menendang keluar melengkung ke kanan di ujungnya.",
        "わ (wa) melengkung bulat ke dalam seperti perut buncit.",
      ],
      ja: [
        "れは末尾が右外側へ向けて跳ね上がります。",
        "わは内側へ丸く巻き込みます。",
      ],
    },
    visualTip: {
      en: "Remember: 'RE kicks its leg out, WA wraps around like a wheel.'",
      id: "Tips: 'RE menendang ke luar, WA melingkar seperti roda bundar.'",
      ja: "覚え方：「れは右へ跳ね、わは輪のように丸い」。",
    },
  },
  {
    slug: "yu-vs-ko",
    kana1Id: "k-yu",
    kana2Id: "k-ko",
    script: "katakana",
    keyDifferences: {
      en: [
        "ユ (yu) has a vertical stroke in the middle extending down, and a bottom crossbar.",
        "コ (ko) forms a clean open square bracket with equal right corners.",
      ],
      id: [
        "ユ (yu) garis vertikalnya tembus dan menancap di garis bawah horizontal.",
        "コ (ko) membentuk kurung kotak persegi siku sempurna.",
      ],
      ja: [
        "ユは中央の縦線が底辺の横線と交差します。",
        "コは角ばった四角いコの字型を作ります。",
      ],
    },
    visualTip: {
      en: "Remember: 'YU looks like a U-turn fish hook, KO is an open Corner box.'",
      id: "Tips: 'YU mirip kail putar U-turn, KO adalah kotak Corner (sudut) siku-siku.'",
      ja: "覚え方：「ユはUターンするフック、コは角ばった箱の角」。",
    },
  },
  {
    slug: "ke-vs-ku",
    kana1Id: "k-ke",
    kana2Id: "k-ku",
    script: "katakana",
    keyDifferences: {
      en: [
        "ケ (ke) has 3 strokes: left slash, top horizontal stroke, and right curved slash.",
        "ク (ku) has only 2 strokes: left slash and hooked corner.",
      ],
      id: [
        "ケ (ke) memiliki 3 goresan dengan garis pemotong di sebelah kanan.",
        "ク (ku) hanya memiliki 2 goresan sederhana tanpa garis kanan.",
      ],
      ja: [
        "ケは3画で右側に長い払いがあります。",
        "クは2画で角を曲がって終わります。",
      ],
    },
    visualTip: {
      en: "Remember: 'KE is a K with extra branches; KU is a simple beak bird.'",
      id: "Tips: 'KE punya ranting tambahan di kanan, KU seperti paruh burung sederhana.'",
      ja: "覚え方：「ケは毛の崩しで払いがある、クはシンプルな口の形」。",
    },
  },
  {
    slug: "ta-vs-nu",
    kana1Id: "k-ta",
    kana2Id: "k-nu",
    script: "katakana",
    keyDifferences: {
      en: [
        "タ (ta) has 3 strokes: slash, hooked angle, and an interior horizontal slash.",
        "ヌ (nu) has 2 strokes: folded angle and a crossing diagonal stroke.",
      ],
      id: [
        "タ (ta) memiliki 3 goresan (bentuk ク dengan garis di dalam).",
        "ヌ (nu) memiliki 2 goresan bersilang (bentuk angka 7 terlipat dengan goresan silang).",
      ],
      ja: [
        "タは3画で、クの内側に線が入ります。",
        "ヌは2画で、折れ曲がった画に交差する払いが付きます。",
      ],
    },
    visualTip: {
      en: "Remember: 'TA has a T-mark inside; NU is like cross-chopsticks.'",
      id: "Tips: 'TA memiliki garis T kecil di dalamnya, NU seperti sumpit bersilang.'",
      ja: "覚え方：「タは夕方の夕に似て3画、ヌは又に似て2画」。",
    },
  },
  {
    slug: "shi-vs-so",
    kana1Id: "k-shi",
    kana2Id: "k-so",
    script: "katakana",
    keyDifferences: {
      en: [
        "シ (shi) has THREE strokes (2 small dots on the left, 1 upward sweep).",
        "ソ (so) has TWO strokes (1 small dot on the top, 1 downward slash).",
      ],
      id: [
        "シ (shi) memiliki 3 goresan (2 titik di sebelah kiri dan 1 sapuan naik).",
        "ソ (so) memiliki 2 goresan (1 titik di atas dan 1 sapuan turun ke bawah).",
      ],
      ja: [
        "シは3画で左側に点が2つあります。",
        "ソは2画で上部に点が1つのみです。",
      ],
    },
    visualTip: {
      en: "Remember: 'SHI has three strokes (S-H-I), SO has two strokes (S-O).'",
      id: "Tips: 'SHI ada 3 huruf (3 goresan), SO ada 2 huruf (2 goresan).'",
      ja: "覚え方：「シは3文字（3画）、ソは2文字（2画）」。",
    },
  },
  {
    slug: "tsu-vs-n",
    kana1Id: "k-tsu",
    kana2Id: "k-n",
    script: "katakana",
    keyDifferences: {
      en: [
        "ツ (tsu) has THREE strokes (2 dots across the top, 1 downward sweep).",
        "ン (n) has TWO strokes (1 low angle dash, 1 upward sweep).",
      ],
      id: [
        "ツ (tsu) memiliki 3 goresan (2 titik sejajar di atas, 1 sapuan turun).",
        "ン (n) memiliki 2 goresan (1 titik bawah mendatar, 1 sapuan naik).",
      ],
      ja: [
        "ツは3画で上部に2点並びます。",
        "ンは2画で左下の1点から右上に跳ね上げます。",
      ],
    },
    visualTip: {
      en: "Remember: 'TSU has three strokes (T-S-U); N has two strokes.'",
      id: "Tips: 'TSU punya 3 goresan di atas, N hanya punya 2 goresan.'",
      ja: "覚え方：「ツは3画で津波が落ちる、ンは2画で上を向く」。",
    },
  },
];

/**
 * Find comparison pair by slug
 */
export function getComparisonBySlug(slug: string): ComparisonPair | undefined {
  return CURATED_COMPARISONS.find((c) => c.slug === slug);
}

/**
 * Get sample word for a kana character
 */
export function getSampleWord(kanaId: string) {
  if (SAMPLE_WORDS[kanaId]) {
    return SAMPLE_WORDS[kanaId];
  }

  return null;
}

export interface KanaCategoryInfo {
  category: KanaType;
  script: KanaScript;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  explanation: Record<Locale, string>;
}

export const KANA_CATEGORIES: KanaCategoryInfo[] = [
  {
    category: "gojuon",
    script: "hiragana",
    title: {
      en: "Hiragana Gojūon (46 Basic Characters)",
      id: "Hiragana Gojūon (46 Huruf Dasar)",
      ja: "平仮名 五十音（基本46文字）",
    },
    description: {
      en: "Learn all 46 core Hiragana Gojūon characters with stroke order, audio pronunciation, and mnemonics.",
      id: "Pelajari 46 karakter dasar Hiragana Gojūon lengkap dengan urutan goresan, audio pengucapan, dan jembatan keledai.",
      ja: "五十音図の基本46文字。書き順、ネイティブ音声、単語例を網羅。",
    },
    explanation: {
      en: "Gojūon (五十音, lit. 'fifty sounds') forms the structural foundation of the Japanese phonetic writing system. It spans 5 vowel sounds (A, I, U, E, O) and consonant rows (K, S, T, N, H, M, Y, R, W, and singular N).",
      id: "Gojūon (五十音, secara harfiah '50 bunyi') adalah fondasi fonetik utama dalam bahasa Jepang. Terdiri dari 5 vokal dasar (A, I, U, E, O) dan konsonan (K, S, T, N, H, M, Y, R, W, serta konsonan tunggal N).",
      ja: "五十音は日本語のかな文字の体系的な基礎です。あ行〜わ行までの各段と「ん」で構成されます。",
    },
  },
  {
    category: "dakuon",
    script: "hiragana",
    title: {
      en: "Hiragana Dakuon (Voiced Sounds: が, ざ, だ, ば)",
      id: "Hiragana Dakuon (Bunyi Bersuara: が, ざ, だ, ば)",
      ja: "平仮名 濁音（が・ざ・だ・ば行）",
    },
    description: {
      en: "Master all 20 Hiragana Dakuon voiced sounds with dakuten (tenten) marks, pronunciation audio, and stroke order.",
      id: "Kuasai 20 karakter Hiragana Dakuon (tanda tenten) lengkap dengan audio, panduan penulisan, dan contoh kata.",
      ja: "濁点（゛）を付けた濁音20文字。G行、Z行、D行、B行の正しい発音と書き順。",
    },
    explanation: {
      en: "Dakuon (濁音, 'muddy/voiced sounds') are formed by attaching dakuten (濁点, two small strokes commonly called ten-ten: ゛) to the upper right of K, S, T, and H rows, transforming them into G, Z, D, and B sounds.",
      id: "Dakuon (濁音, 'bunyi keruh/bersuara') dibentuk dengan menambahkan tanda petik dua kecil (濁点, dakuten / ten-ten: ゛) di sudut kanan atas huruf K, S, T, dan H sehingga berubah menjadi G, Z, D, dan B.",
      ja: "濁音は「か・さ・た・は」行の右上に濁点（゛）を付けて濁った音（が・ざ・だ・ば行）を表します。",
    },
  },
  {
    category: "handakuon",
    script: "hiragana",
    title: {
      en: "Hiragana Handakuon (Semi-Voiced P-row: ぱ, ぴ, ぷ, ぺ, ぽ)",
      id: "Hiragana Handakuon (Bunyi Semi-Bersuara: ぱ, ぴ, ぷ, ぺ, ぽ)",
      ja: "平仮名 半濁音（ぱ・ぴ・ぷ・ぺ・ぽ）",
    },
    description: {
      en: "Guide to the 5 Hiragana Handakuon characters featuring the small maru circle. Full audio and practice cards.",
      id: "Panduan lengkap 5 karakter Hiragana Handakuon dengan tanda maru (lingkaran kecil). Dilengkapi audio TTS dan latihan.",
      ja: "半濁点（゜）を付けた「ぱ・ぴ・ぷ・ぺ・ぽ」の5文字。発音と書き順ガイド。",
    },
    explanation: {
      en: "Handakuon (半濁音, 'semi-voiced sounds') are created by adding a handakuten (半濁点, a small circle called maru: ゜) to the H-row characters, converting them into P sounds (pa, pi, pu, pe, po).",
      id: "Handakuon (半濁音, 'bunyi semi-bersuara') dibentuk dengan menambahkan lingkaran kecil (半濁点, handakuten / maru: ゜) pada baris H, mengubahnya menjadi bunyi P (pa, pi, pu, pe, po).",
      ja: "半濁音は「は」行の右上に半濁点（゜、丸）を付加してP音（ぱ行）を表します。",
    },
  },
  {
    category: "yoon",
    script: "hiragana",
    title: {
      en: "Hiragana Yōon (Contracted Combo Sounds: きゃ, しゅ, ちょ)",
      id: "Hiragana Yōon (Kombinasi Suara Majemuk: きゃ, しゅ, ちょ)",
      ja: "平仮名 拗音（きゃ・しゅ・ちょ等の複合音）",
    },
    description: {
      en: "Learn all 33 Hiragana Yōon contracted sounds formed with small ゃ, ゅ, ょ. Audio, pronunciation, and sample words.",
      id: "Pelajari 33 karakter gabungan Hiragana Yōon dengan huruf kecil ゃ, ゅ, ょ. Lengkap dengan audio dan kosakata.",
      ja: "小書きの「ゃ・ゅ・ょ」を組み合わせた拗音33文字。正確な発音と表記規則。",
    },
    explanation: {
      en: "Yōon (拗音, 'contracted/twisted sounds') combine an I-vowel kana (such as ki, shi, chi, ni, hi, mi, ri, gi, ji, bi, pi) with a half-sized small ya (ゃ), yu (ゅ), or yo (ょ) to create single-beat glide syllables.",
      id: "Yōon (拗音, 'bunyi meliuk/kontraksi') menggabungkan kana berakhiran vokal I (seperti ki, shi, chi, ni, hi, mi, ri, gi, ji, bi, pi) dengan huruf kecil ya (ゃ), yu (ゅ), atau yo (ょ).",
      ja: "拗音は「い」段のかなに小さく「ゃ・ゅ・ょ」を添えて1拍として発音する複合音です。",
    },
  },
  {
    category: "gojuon",
    script: "katakana",
    title: {
      en: "Katakana Gojūon (46 Core Angular Characters)",
      id: "Katakana Gojūon (46 Huruf Dasar)",
      ja: "片仮名 五十音（基本46文字）",
    },
    description: {
      en: "Master all 46 basic Katakana characters used for loanwords, emphasis, and sound effects.",
      id: "Kuasai 46 karakter dasar Katakana untuk kata serapan asing, penekanan, dan onomatope.",
      ja: "外来語や擬音語の表記に欠かせない片仮名五十音の基本文字一覧。",
    },
    explanation: {
      en: "Katakana Gojūon is the angular counterpart to Hiragana, derived from fragments of Chinese characters (kanji). It is primarily used for foreign loanwords (gairaigo), scientific names, and sound effects (manga onomatopoeia).",
      id: "Katakana Gojūon adalah aksara bersudut tegas yang merupakan pasangan Hiragana. Terutama digunakan untuk kata serapan asing (gairaigo), istilah ilmiah, nama asing, dan onomatope di manga.",
      ja: "漢字の一部を省略して作られた角ばった文字体系。主に外来語や動植物名、オノマトペに使用されます。",
    },
  },
  {
    category: "dakuon",
    script: "katakana",
    title: {
      en: "Katakana Dakuon (Voiced Sounds: ガ, ザ, ダ, バ)",
      id: "Katakana Dakuon (Bunyi Bersuara: ガ, ザ, ダ, バ)",
      ja: "片仮名 濁音（ガ・ザ・ダ・バ行）",
    },
    description: {
      en: "All 20 Katakana Dakuon characters with dakuten quotation marks for loanwords like 'game', 'design', and 'bus'.",
      id: "20 karakter Katakana Dakuon untuk kata serapan seperti 'game' (ゲーム), 'desain' (デザイン), dan 'bus' (バス).",
      ja: "外来語の濁音表記（ゲーム、デザイン、バスなど）に用いる濁音文字20字。",
    },
    explanation: {
      en: "Katakana Dakuon modifies the K, S, T, and H rows into voiced G, Z, D, and B equivalents using the two diagonal strokes (゛). Essential for thousands of modern foreign loanwords.",
      id: "Katakana Dakuon mengubah baris K, S, T, dan H menjadi bunyi bersuara G, Z, D, dan B dengan tanda tenten (゛). Sangat penting untuk ribuan kosakata serapan modern.",
      ja: "カ・サ・タ・ハ行に濁点を付けて発音する有声音群。",
    },
  },
  {
    category: "handakuon",
    script: "katakana",
    title: {
      en: "Katakana Handakuon (Semi-Voiced P-row: パ, ピ, プ, ペ, ポ)",
      id: "Katakana Handakuon (Bunyi P: パ, ピ, プ, ペ, ポ)",
      ja: "片仮名 半濁音（パ・ピ・プ・ペ・ポ）",
    },
    description: {
      en: "Study all 5 Katakana Handakuon characters with maru circle marks for loanwords like 'party', 'piano', and 'pen'.",
      id: "5 karakter Katakana Handakuon dengan tanda maru bulat untuk kata seperti 'party' (パーティー) dan 'pen' (ペン).",
      ja: "ハ行に半濁点（゜）を付けた「パ・ピ・プ・ペ・ポ」。外来語のP音を表現。",
    },
    explanation: {
      en: "Katakana Handakuon adds the small circle (゜) to represent foreign 'P' sounds, seen in everyday terms like pasokon (PC), pan (bread), and poketto (pocket).",
      id: "Katakana Handakuon menambahkan lingkaran kecil (゜) untuk mewakili bunyi fonetik 'P' dari bahasa asing.",
      ja: "外来語のP音を表す半濁音文字。",
    },
  },
  {
    category: "yoon",
    script: "katakana",
    title: {
      en: "Katakana Yōon (Contracted Combos: キャ, シュ, チョ)",
      id: "Katakana Yōon (Kombinasi Majemuk: キャ, シュ, チョ)",
      ja: "片仮名 拗音（キャ・シュ・チョ等の外来語複合音）",
    },
    description: {
      en: "Master Katakana Yōon combo characters with small ャ, ュ, ョ. Essential for loanwords like 'shirt', 'chocolate', and 'camp'.",
      id: "Kuasai karakter kombinasi Katakana Yōon dengan huruf kecil ャ, ュ, ョ untuk kata serapan.",
      ja: "外来語の表記に多用される片仮名拗音の全文字一覧とネイティブ発音。",
    },
    explanation: {
      en: "Katakana Yōon matches an I-column character with small ya (ャ), yu (ュ), or yo (ョ), generating glide syllables such as kya, shu, and cho.",
      id: "Katakana Yōon menggabungkan baris I dengan ャ, ュ, ョ kecil untuk menciptakan suku kata luncur seperti kya, shu, dan cho.",
      ja: "イ段の片仮名に小字「ャ・ュ・ョ」を組み合わせて外来語の拗音を表現します。",
    },
  },
  {
    category: "extended",
    script: "katakana",
    title: {
      en: "Katakana Extended Sounds (Modern Foreign Phonemes: ティ, ファ, ヴ, etc.)",
      id: "Katakana Extended (Fonem Modern: ティ, ファ, ヴ, dll)",
      ja: "片仮名 特殊音・外来音（ティ・ファ・ヴ等）",
    },
    description: {
      en: "Learn the modern extended Katakana combinations invented to transcribe foreign sounds like 'ti', 'fa', 'di', 'we', and 'v'.",
      id: "Pelajari huruf Katakana khusus/ekstensi untuk mengeja suara asing modern seperti 'ti', 'fa', 'di', 'we', dan 'v'.",
      ja: "近代以降の外来語を原音に近づけて表記するための特殊音（ファ・フィ・フェ・フォ・ティ・ディ・ヴ等）。",
    },
    explanation: {
      en: "Extended Katakana (特殊音 / tokushuon) were created in modern times to accurately transcribe Western phonetic sounds not natively present in traditional Japanese, such as 'fa', 'fi', 'fe', 'fo', 'ti', 'di', 'we', and 'v'.",
      id: "Katakana Ekstensi (特殊音 / tokushuon) diciptakan di era modern untuk menuliskan bunyi bahasa asing Barat secara presisi (seperti 'fa', 'fi', 'fe', 'fo', 'ti', 'di', 'we', dan 'v') yang aslinya tidak ada dalam bahasa Jepang klasik.",
      ja: "日本語に本来存在しない外国語の音（F、V、TI、DI、W音など）を正確に書き表すために作られた現代的な片仮名表記です。",
    },
  },
];

export function getKanaCategoryInfo(
  script: string,
  category: string
): KanaCategoryInfo | undefined {
  const normScript = script.toLowerCase();
  const normCategory = category.toLowerCase();
  return KANA_CATEGORIES.find(
    (c) => c.script === normScript && c.category === normCategory
  );
}


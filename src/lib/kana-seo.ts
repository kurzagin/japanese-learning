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

import { Locale } from "@/data/i18n";
import { KanaCharacter, KanaScript, KanaType, KanaRow } from "@/types/kana";
import rawKana from "@/data/kana.json";
import rawVocab from "@/data/vocab.json";

interface RawKanaRow {
  id: string;
  script: string;
  character: string;
  romaji: string;
  type: string;
  row: string;
  hint_en?: string;
  hint_id?: string;
  hint_ja?: string;
}

const DEFAULT_KANA: KanaCharacter[] = (rawKana as unknown as RawKanaRow[]).map((r) => ({
  id: r.id,
  script: r.script as KanaScript,
  character: r.character,
  romaji: r.romaji,
  type: r.type as KanaType,
  row: r.row as KanaRow,
  hint: {
    en: r.hint_en || "",
    id: r.hint_id || "",
    ja: r.hint_ja || "",
  },
}));

// Shape of a raw row in vocab.json (JSON-ish fields may be strings or objects)
interface RawVocabRow {
  slug: string;
  character: string;
  romaji: string;
  kanji?: string | null;
  primary_kana_id?: string | null;
  meaning: unknown;
  trivia?: unknown;
  sentence?: unknown;
  kanji_options?: unknown;
}

const RAW_VOCAB = rawVocab as unknown as RawVocabRow[];

function parseJsonField<T>(val: unknown): T {
  return (typeof val === "string" ? JSON.parse(val) : val) as T;
}

export type LocalizedString = Record<Locale, string>;

export interface StudyCard {
  id: string;
  character: string;      // The target kana or word (e.g. "あ" or "ねこ")
  kanaReading?: string;   // Native Japanese reading (e.g. "あ", "ア", "ねこ")
  sampleWordJp: string;   // Real Japanese sample word: e.g. "あめ (ame / 雨・飴)"
  sampleWordMeaning: LocalizedString;
  romaji: string;         // Romaji pronunciation helper
  hint: LocalizedString;  // Mnemonic / hint in en, id, ja
}

export interface Stage {
  id: string;
  name: LocalizedString;
  category: "hiragana" | "katakana" | "words";
  depthName: LocalizedString;
  description: LocalizedString;
  targetDurationSeconds: number;
  itemCount: number;
  unlockedByDefault?: boolean;
  isBossStage?: boolean;
  requiredStageIds?: string[];
  cards: StudyCard[];
}

// Dynamically derived map of Japanese sample words from vocab.json (single source of truth)
export const SAMPLE_WORDS: Record<
  string,
  { jp: string; en: string; id: string; ja: string; slug: string }
> = Object.fromEntries(
  RAW_VOCAB
    .filter((r) => Boolean(r.primary_kana_id))
    .map((r) => {
      const meaning = parseJsonField<LocalizedString>(r.meaning);
      const kanjiOptions = r.kanji_options
        ? parseJsonField<Array<{ kanji: string }>>(r.kanji_options)
        : null;
      const jpLabel =
        kanjiOptions && kanjiOptions.length > 0
          ? `${r.character} (${r.romaji} / ${kanjiOptions.map((o) => o.kanji).join("・")})`
          : `${r.character} (${r.romaji})`;

      return [
        r.primary_kana_id as string,
        {
          jp: jpLabel,
          en: meaning.en,
          id: meaning.id,
          ja: meaning.ja,
          slug: r.slug as string,
        },
      ];
    })
);

function createCard(k: KanaCharacter): StudyCard {
  const sample = SAMPLE_WORDS[k.id] || {
    jp: `${k.character} (${k.romaji})`,
    en: `Sound: ${k.romaji}`,
    id: `Pelafalan: ${k.romaji}`,
    ja: `発音: ${k.romaji}`,
  };

  return {
    id: k.id,
    character: k.character,
    kanaReading: k.character,
    sampleWordJp: sample.jp,
    sampleWordMeaning: {
      en: sample.en,
      id: sample.id,
      ja: sample.ja,
    },
    romaji: k.romaji,
    hint: k.hint,
  };
}

// Stage row definitions for Hiragana and Katakana
interface RowDef {
  key: string;
  nameEn: string;
  nameId: string;
  nameJa: string;
  filter: (k: KanaCharacter) => boolean;
}

const HIRAGANA_ROW_DEFS: RowDef[] = [
  // Basic Gojuon
  { key: "vowels", nameEn: "Vowels", nameId: "Vokal (A-I-U-E-O)", nameJa: "母音 (あ・い・う・え・お)", filter: (k) => k.row === "vowel" },
  { key: "k-row", nameEn: "K-Row", nameId: "Baris K (Ka-Ki-Ku-Ke-Ko)", nameJa: "か行 (か・き・く・け・こ)", filter: (k) => k.row === "k" },
  { key: "s-row", nameEn: "S-Row", nameId: "Baris S (Sa-Shi-Su-Se-So)", nameJa: "さ行 (さ・し・す・せ・そ)", filter: (k) => k.row === "s" },
  { key: "t-row", nameEn: "T-Row", nameId: "Baris T (Ta-Chi-Tsu-Te-To)", nameJa: "た行 (た・ち・つ・て・と)", filter: (k) => k.row === "t" },
  { key: "n-row", nameEn: "N-Row", nameId: "Baris N (Na-Ni-Nu-Ne-No)", nameJa: "な行 (な・に・ぬ・ね・の)", filter: (k) => k.row === "n" },
  { key: "h-row", nameEn: "H-Row", nameId: "Baris H (Ha-Hi-Fu-He-Ho)", nameJa: "は行 (は・ひ・ふ・へ・ほ)", filter: (k) => k.row === "h" || k.row === "ha" },
  { key: "m-row", nameEn: "M-Row", nameId: "Baris M (Ma-Mi-Mu-Me-Mo)", nameJa: "ま行 (ま・み・む・め・も)", filter: (k) => k.row === "m" },
  { key: "y-row", nameEn: "Y-Row", nameId: "Baris Y (Ya-Yu-Yo)", nameJa: "や行 (や・ゆ・よ)", filter: (k) => k.row === "y" },
  { key: "r-row", nameEn: "R-Row", nameId: "Baris R (Ra-Ri-Ru-Re-Ro)", nameJa: "ら行 (ら・り・る・れ・ろ)", filter: (k) => k.row === "r" },
  { key: "w-n-row", nameEn: "W-Row & N", nameId: "Baris W & N (Wa-Wo-N)", nameJa: "わ行・撥音 (わ・を・ん)", filter: (k) => k.row === "w" || k.row === "singular" },

  // Advanced: Dakuon & Handakuon Variants
  { key: "g-row", nameEn: "G-Row (Voiced)", nameId: "Baris G (Ga-Gi-Gu-Ge-Go)", nameJa: "が行・濁音 (が・ぎ・ぐ・げ・ご)", filter: (k) => k.row === "g" },
  { key: "z-row", nameEn: "Z-Row (Voiced)", nameId: "Baris Z (Za-Ji-Zu-Ze-Zo)", nameJa: "ざ行・濁音 (ざ・じ・ず・ぜ・ぞ)", filter: (k) => k.row === "z" },
  { key: "d-row", nameEn: "D-Row (Voiced)", nameId: "Baris D (Da-Ji-Zu-De-Do)", nameJa: "だ行・濁音 (だ・ぢ・づ・で・ど)", filter: (k) => k.row === "d" },
  { key: "b-row", nameEn: "B-Row (Voiced)", nameId: "Baris B (Ba-Bi-Bu-Be-Bo)", nameJa: "ば行・濁音 (ば・び・ぶ・べ・ぼ)", filter: (k) => k.row === "b" },
  { key: "p-row", nameEn: "P-Row (Semi-Voiced)", nameId: "Baris P (Pa-Pi-Pu-Pe-Po)", nameJa: "ぱ行・半濁音 (ぱ・ぴ・ぷ・ぺ・ぽ)", filter: (k) => k.row === "p" },

  // Advanced: Yoon Combinations (3 groups totaling 33 characters: 12 + 9 + 12)
  {
    key: "yoon-1",
    nameEn: "Contracted: Kya-Sha-Cha-Nya",
    nameId: "Kombinasi Yōon 1 (Kya, Sha, Cha, Nya)",
    nameJa: "拗音一：きゃ・しゃ・ちゃ・にゃ行",
    filter: (k) => k.row === "yoon" && ["kya", "kyu", "kyo", "sha", "shu", "sho", "cha", "chu", "cho", "nya", "nyu", "nyo"].includes(k.romaji),
  },
  {
    key: "yoon-2",
    nameEn: "Contracted: Hya-Mya-Rya",
    nameId: "Kombinasi Yōon 2 (Hya, Mya, Rya)",
    nameJa: "拗音二：ひゃ・みゃ・りゃ行",
    filter: (k) => k.row === "yoon" && ["hya", "hyu", "hyo", "mya", "myu", "myo", "rya", "ryu", "ryo"].includes(k.romaji),
  },
  {
    key: "yoon-3",
    nameEn: "Contracted: Gya-Ja-Bya-Pya",
    nameId: "Kombinasi Yōon 3 (Gya, Ja, Bya, Pya)",
    nameJa: "拗音三：ぎゃ・じゃ・びゃ・ぴゃ行",
    filter: (k) => k.row === "yoon" && ["gya", "gyu", "gyo", "ja", "ju", "jo", "bya", "byu", "byo", "pya", "pyu", "pyo"].includes(k.romaji),
  },
];

const KATAKANA_ROW_DEFS: RowDef[] = [
  // Basic Gojuon
  { key: "vowels", nameEn: "Vowels", nameId: "Vokal (A-I-U-E-O)", nameJa: "母音 (ア・イ・ウ・エ・オ)", filter: (k) => k.row === "vowel" },
  { key: "k-row", nameEn: "K-Row", nameId: "Baris K (Ka-Ki-Ku-Ke-Ko)", nameJa: "カ行 (カ・キ・ク・ケ・コ)", filter: (k) => k.row === "k" },
  { key: "s-row", nameEn: "S-Row", nameId: "Baris S (Sa-Shi-Su-Se-So)", nameJa: "サ行 (サ・シ・ス・セ・ソ)", filter: (k) => k.row === "s" },
  { key: "t-row", nameEn: "T-Row", nameId: "Baris T (Ta-Chi-Tsu-Te-To)", nameJa: "タ行 (タ・チ・ツ・テ・ト)", filter: (k) => k.row === "t" },
  { key: "n-row", nameEn: "N-Row", nameId: "Baris N (Na-Ni-Nu-Ne-No)", nameJa: "ナ行 (ナ・ニ・ヌ・ネ・ノ)", filter: (k) => k.row === "n" },
  { key: "h-row", nameEn: "H-Row", nameId: "Baris H (Ha-Hi-Fu-He-Ho)", nameJa: "ハ行 (ハ・ヒ・フ・ヘ・ホ)", filter: (k) => k.row === "h" || k.row === "ha" },
  { key: "m-row", nameEn: "M-Row", nameId: "Baris M (Ma-Mi-Mu-Me-Mo)", nameJa: "マ行 (マ・ミ・ム・メ・モ)", filter: (k) => k.row === "m" },
  { key: "y-row", nameEn: "Y-Row", nameId: "Baris Y (Ya-Yu-Yo)", nameJa: "ヤ行 (ヤ・ユ・ヨ)", filter: (k) => k.row === "y" },
  { key: "r-row", nameEn: "R-Row", nameId: "Baris R (Ra-Ri-Ru-Re-Ro)", nameJa: "ラ行 (ラ・リ・ル・レ・ロ)", filter: (k) => k.row === "r" },
  { key: "w-n-row", nameEn: "W-Row & N", nameId: "Baris W & N (Wa-Wo-N)", nameJa: "ワ行・撥音 (ワ・ヲ・ン)", filter: (k) => k.row === "w" || k.row === "singular" },

  // Advanced: Dakuon & Handakuon Variants
  { key: "g-row", nameEn: "G-Row (Voiced)", nameId: "Baris G (Ga-Gi-Gu-Ge-Go)", nameJa: "ガ行・濁音 (ガ・ギ・グ・ゲ・ゴ)", filter: (k) => k.row === "g" },
  { key: "z-row", nameEn: "Z-Row (Voiced)", nameId: "Baris Z (Za-Ji-Zu-Ze-Zo)", nameJa: "ザ行・濁音 (ザ・ジ・ズ・ゼ・ゾ)", filter: (k) => k.row === "z" },
  { key: "d-row", nameEn: "D-Row (Voiced)", nameId: "Baris D (Da-Ji-Zu-De-Do)", nameJa: "ダ行・濁音 (ダ・ヂ・ヅ・デ・ド)", filter: (k) => k.row === "d" },
  { key: "b-row", nameEn: "B-Row (Voiced)", nameId: "Baris B (Ba-Bi-Bu-Be-Bo)", nameJa: "バ行・濁音 (バ・ビ・ブ・ベ・ボ)", filter: (k) => k.row === "b" },
  { key: "p-row", nameEn: "P-Row (Semi-Voiced)", nameId: "Baris P (Pa-Pi-Pu-Pe-Po)", nameJa: "パ行・半濁音 (パ・ピ・プ・ペ・ポ)", filter: (k) => k.row === "p" },

  // Advanced: Yoon Combinations
  {
    key: "yoon-1",
    nameEn: "Contracted: Kya-Sha-Cha-Nya",
    nameId: "Kombinasi Yōon 1 (Kya, Sha, Cha, Nya)",
    nameJa: "拗音一：キャ・シャ・チャ・ニャ行",
    filter: (k) => k.row === "yoon" && ["kya", "kyu", "kyo", "sha", "shu", "sho", "cha", "chu", "cho", "nya", "nyu", "nyo"].includes(k.romaji),
  },
  {
    key: "yoon-2",
    nameEn: "Contracted: Hya-Mya-Rya",
    nameId: "Kombinasi Yōon 2 (Hya, Mya, Rya)",
    nameJa: "拗音二：ヒャ・ミャ・リャ行",
    filter: (k) => k.row === "yoon" && ["hya", "hyu", "hyo", "mya", "myu", "myo", "rya", "ryu", "ryo"].includes(k.romaji),
  },
  {
    key: "yoon-3",
    nameEn: "Contracted: Gya-Ja-Bya-Pya",
    nameId: "Kombinasi Yōon 3 (Gya, Ja, Bya, Pya)",
    nameJa: "拗音三：ギャ・ジャ・ビャ・ピャ行",
    filter: (k) => k.row === "yoon" && ["gya", "gyu", "gyo", "ja", "ju", "jo", "bya", "byu", "byo", "pya", "pyu", "pyo"].includes(k.romaji),
  },

  // Advanced: Extended Katakana (Foreign loanwords)
  {
    key: "extended",
    nameEn: "Extended Katakana (Loanwords)",
    nameId: "Katakana Lanjutan (Kata Serapan)",
    nameJa: "特殊音・外来語表記 (ファ・ティ・ウェ等)",
    filter: (k) => k.row === "extended",
  },
];

const VOCAB_BY_SLUG = new Map(
  RAW_VOCAB.map((r) => [r.slug as string, r])
);

function createWordCard(slug: string): StudyCard | null {
  const r = VOCAB_BY_SLUG.get(slug);
  if (!r) return null;

  const meaning = parseJsonField<LocalizedString>(r.meaning);
  const trivia = parseJsonField<LocalizedString>(r.trivia);
  const sentence = parseJsonField<{
    ja: string;
    romaji: string;
    en: string;
    id: string;
  }>(r.sentence);

  return {
    id: `w-${r.slug}`,
    character: r.character,
    kanaReading: r.kanji ? `${r.character} (${r.kanji})` : `${r.character} (${meaning.en})`,
    sampleWordJp: `${sentence.ja} (${sentence.romaji})`,
    sampleWordMeaning: {
      en: `${meaning.en} — ${sentence.en}`,
      id: `${meaning.id} — ${sentence.id}`,
      ja: `${meaning.ja} — ${sentence.ja}`,
    },
    romaji: r.romaji,
    hint: trivia,
  };
}

interface WordStageDef {
  id: string;
  name: LocalizedString;
  slugs: string[];
}

const WORD_STAGE_DEFS: WordStageDef[] = [
  {
    id: "words-daily-hiragana",
    name: {
      en: "Everyday Hiragana Words",
      id: "Kosakata Harian Hiragana",
      ja: "実戦平仮名単語 (日常・アニメ)",
    },
    slugs: ["neko", "inu", "kawaii", "suki", "arigatou", "sugoi"],
  },
  {
    id: "words-anime-katakana",
    name: {
      en: "Anime Loanwords (Katakana)",
      id: "Kata Serapan Anime (Katakana)",
      ja: "片仮名実戦外来語 (アニメ・ゲーム)",
    },
    slugs: ["anime", "geemu", "hiiroo", "koohii", "raamen", "terebi"],
  },
];

// Word stages dynamically built from vocab.json
export const WORD_STAGES: Stage[] = WORD_STAGE_DEFS.map((def) => {
  const cards = def.slugs
    .map(createWordCard)
    .filter((c): c is StudyCard => c !== null);

  const buildDesc = (locale: Locale) =>
    def.slugs
      .map((slug) => {
        const r = VOCAB_BY_SLUG.get(slug);
        if (!r) return slug;
        const m = parseJsonField<LocalizedString>(r.meaning);
        return `${r.character} (${m[locale].split(" / ")[0]})`;
      })
      .join(", ");

  return {
    id: def.id,
    name: def.name,
    category: "words",
    depthName: {
      en: "The Reef",
      id: "Terumbu Karang (The Reef)",
      ja: "第三海域：暗礁 (THE REEF)",
    },
    description: {
      en: buildDesc("en"),
      id: buildDesc("id"),
      ja: buildDesc("ja"),
    },
    targetDurationSeconds: Math.max(20, cards.length * 4),
    itemCount: cards.length,
    cards,
  };
});

function buildStagesInternal(allKana: KanaCharacter[] = []): Stage[] {
  const result: Stage[] = [];

  // Helper to build rows with boss stages every 2 rows
  function addAlphabetStages(category: "hiragana" | "katakana", defs: RowDef[], primitives: KanaCharacter[]) {
    const isHiragana = category === "hiragana";
    const depthBasic = isHiragana
      ? { en: "The Shallows", id: "Perairan Dangkal (The Shallows)", ja: "第一海域：浅瀬" }
      : { en: "The River", id: "Arus Sungai (The River)", ja: "第二海域：激流" };
    const depthAdv = isHiragana
      ? { en: "The Trench (Advanced)", id: "The Trench (Lanjutan)", ja: "深海：海溝 (発展)" }
      : { en: "The Abyss (Advanced)", id: "The Abyss (Lanjutan)", ja: "深海：深淵 (発展)" };

    let currentGroupCards: StudyCard[] = [];
    let currentGroupStageIds: string[] = [];
    let bossCounter = 1;

    defs.forEach((def, idx) => {
      const rawCards = primitives.filter(def.filter);
      const chars = rawCards.map((c) => `${c.character} (${c.romaji})`).join(", ");
      const isBasic = idx < 10;
      const stageId = `${category}-${def.key}`;
      const cards = rawCards.map(createCard);

      result.push({
        id: stageId,
        name: {
          en: `${isHiragana ? "Hiragana" : "Katakana"}: ${def.nameEn}`,
          id: `${isHiragana ? "Hiragana" : "Katakana"}: ${def.nameId}`,
          ja: `${isHiragana ? "平仮名" : "片仮名"}：${def.nameJa}`,
        },
        category,
        depthName: isBasic ? depthBasic : depthAdv,
        description: {
          en: chars,
          id: chars,
          ja: chars,
        },
        targetDurationSeconds: Math.max(15, rawCards.length * 3),
        itemCount: rawCards.length,
        unlockedByDefault: idx === 0,
        cards,
      });

      currentGroupCards.push(...cards);
      currentGroupStageIds.push(stageId);

      // Every 2 stages, inject a Boss Checkpoint Stage!
      if (currentGroupStageIds.length === 2 || idx === defs.length - 1) {
        const bossId = `${category}-boss-${bossCounter}`;
        const bossTitlePrefix = isHiragana ? "Hiragana" : "Katakana";
        const bossDescChars = currentGroupCards.map((c) => c.character).join(" ");

        result.push({
          id: bossId,
          name: {
            en: `BOSS: ${bossTitlePrefix} Checkpoint ${bossCounter}`,
            id: `BOSS: Checkpoint ${bossTitlePrefix} ${bossCounter}`,
            ja: `ボス関門：${isHiragana ? "平仮名" : "片仮名"} 突破戦 ${bossCounter}`,
          },
          category,
          depthName: {
            en: `Boss Gate #${bossCounter}`,
            id: `Gerbang Bos #${bossCounter}`,
            ja: `第${bossCounter}ボス突破門`,
          },
          description: {
            en: `Cumulative reflex test (${currentGroupCards.length} kana): ${bossDescChars}`,
            id: `Ujian refleks kumulatif (${currentGroupCards.length} kana): ${bossDescChars}`,
            ja: `累積反射テスト (${currentGroupCards.length}文字)：${bossDescChars}`,
          },
          targetDurationSeconds: Math.max(20, Math.round(currentGroupCards.length * 2.5)),
          itemCount: currentGroupCards.length,
          isBossStage: true,
          requiredStageIds: [...currentGroupStageIds],
          cards: [...currentGroupCards],
        });

        bossCounter++;
        currentGroupCards = [];
        currentGroupStageIds = [];
      }
    });
  }

  // 1. HIRAGANA
  const hiraganaPrimitives = allKana.filter((k) => k.script === "hiragana");
  addAlphabetStages("hiragana", HIRAGANA_ROW_DEFS, hiraganaPrimitives);

  // 2. KATAKANA
  const katakanaPrimitives = allKana.filter((k) => k.script === "katakana");
  addAlphabetStages("katakana", KATAKANA_ROW_DEFS, katakanaPrimitives);

  // 3. WORD STAGES
  result.push(...WORD_STAGES);

  return result;
}

export function buildStages(allKana: KanaCharacter[] = DEFAULT_KANA): Stage[] {
  return buildStagesInternal(allKana.length > 0 ? allKana : DEFAULT_KANA);
}

export const STAGES: Stage[] = buildStagesInternal(DEFAULT_KANA);
export const STAGES_BY_ID = new Map(STAGES.map((s) => [s.id, s]));

// Arcade prerequisites: Defeat Boss Checkpoint 1 and Checkpoint 2 of either Hiragana OR Katakana
export const ARCADE_HIRAGANA_PREREQUISITES = ["hiragana-boss-1", "hiragana-boss-2"];
export const ARCADE_KATAKANA_PREREQUISITES = ["katakana-boss-1", "katakana-boss-2"];

/**
 * Returns the list of prerequisite stage IDs needed for Arcade mode display.
 * If user has more progress in Hiragana, show Hiragana prerequisites; otherwise Katakana.
 */
export function getArcadePrerequisiteStageIds(
  progress: Record<string, { completed?: boolean }>
): string[] {
  const hiraganaCleared = ARCADE_HIRAGANA_PREREQUISITES.filter((id) => !!progress[id]?.completed).length;
  const katakanaCleared = ARCADE_KATAKANA_PREREQUISITES.filter((id) => !!progress[id]?.completed).length;

  if (katakanaCleared > hiraganaCleared) {
    return ARCADE_KATAKANA_PREREQUISITES;
  }
  return ARCADE_HIRAGANA_PREREQUISITES;
}

/**
 * Legacy list of all possible prerequisite stage IDs for fallback filtering.
 */
export const ARCADE_PREREQUISITE_STAGE_IDS = [
  ...ARCADE_HIRAGANA_PREREQUISITES,
  ...ARCADE_KATAKANA_PREREQUISITES,
];

/**
 * Determines whether a stage is unlocked given the user's progress map.
 * Also returns prerequisite stage information when locked.
 */
export function getStageUnlockStatus(
  stageId: string,
  progress: Record<string, { completed?: boolean }>,
  allStages: Stage[] = []
): { isUnlocked: boolean; requiredStage?: Stage; requiredStageIds?: string[] } {
  const stage = allStages.find((s) => s.id === stageId) || STAGES_BY_ID.get(stageId);
  if (!stage) {
    return { isUnlocked: false };
  }

  // Already completed is always unlocked
  if (progress[stage.id]?.completed) {
    return { isUnlocked: true };
  }

  // Find index within its category
  const categoryStages = allStages.length > 0
    ? allStages.filter((s) => s.category === stage.category)
    : STAGES.filter((s) => s.category === stage.category);
  const stageIdx = categoryStages.findIndex((s) => s.id === stage.id);

  // First stage of each category or explicit default unlock
  if (stage.unlockedByDefault || stageIdx === 0) {
    return { isUnlocked: true };
  }

  // Boss stages require all preceding stages in their checkpoint group
  if (stage.isBossStage && stage.requiredStageIds && stage.requiredStageIds.length > 0) {
    const isUnlocked = stage.requiredStageIds.every((reqId) => !!progress[reqId]?.completed);
    return {
      isUnlocked,
      requiredStageIds: stage.requiredStageIds,
    };
  }

  // Normal stages require the immediate previous stage in the category
  const prevStage = stageIdx > 0 ? categoryStages[stageIdx - 1] : undefined;
  const isUnlocked = prevStage ? !!progress[prevStage.id]?.completed : false;
  return {
    isUnlocked,
    requiredStage: prevStage,
  };
}

/**
 * Checks whether Arcade mode is unlocked (requires defeating Boss Checkpoint 1 & 2 of either Hiragana or Katakana).
 */
export function isArcadeUnlocked(
  progress: Record<string, { completed?: boolean }>
): boolean {
  const hiraganaUnlocked = ARCADE_HIRAGANA_PREREQUISITES.every((reqId) => !!progress[reqId]?.completed);
  const katakanaUnlocked = ARCADE_KATAKANA_PREREQUISITES.every((reqId) => !!progress[reqId]?.completed);
  return hiraganaUnlocked || katakanaUnlocked;
}

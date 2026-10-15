import { Locale } from "@/data/i18n";
import { HIRAGANA_PRIMITIVES, KATAKANA_PRIMITIVES, KanaCharacter } from "@/data/kana";

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

// Map of real Japanese sample words for kana characters
const SAMPLE_WORDS: Record<string, { jp: string; en: string; id: string; ja: string }> = {
  // Hiragana Vowels
  "h-a": { jp: "あめ (ame)", en: "Rain / Candy", id: "Hujan / Permen", ja: "あめ" },
  "h-i": { jp: "いぬ (inu)", en: "Dog", id: "Anjing", ja: "いぬ" },
  "h-u": { jp: "うみ (umi)", en: "Sea / Ocean", id: "Laut / Samudra", ja: "うみ" },
  "h-e": { jp: "えき (eki)", en: "Train station", id: "Stasiun kereta", ja: "えき" },
  "h-o": { jp: "おにぎり (onigiri)", en: "Rice ball", id: "Nasi kepal onigiri", ja: "おにぎり" },

  // Hiragana K-row
  "h-ka": { jp: "かわ (kawa)", en: "River", id: "Sungai", ja: "かわ" },
  "h-ki": { jp: "きつね (kitsune)", en: "Fox", id: "Rubah", ja: "きつね" },
  "h-ku": { jp: "くるま (kuruma)", en: "Car / Vehicle", id: "Mobil", ja: "くるま" },
  "h-ke": { jp: "けむり (kemuri)", en: "Smoke", id: "Asap", ja: "けむり" },
  "h-ko": { jp: "こころ (kokoro)", en: "Heart / Soul", id: "Hati / Jiwa", ja: "こころ" },

  // Hiragana S-row
  "h-sa": { jp: "さくら (sakura)", en: "Cherry blossom", id: "Bunga sakura", ja: "さくら" },
  "h-shi": { jp: "しろ (shiro)", en: "White / Castle", id: "Putih / Kastil", ja: "しろ" },
  "h-su": { jp: "すし (sushi)", en: "Sushi", id: "Sushi", ja: "すし" },
  "h-se": { jp: "せかい (sekai)", en: "World", id: "Dunia", ja: "せかい" },
  "h-so": { jp: "そら (sora)", en: "Sky", id: "Langit", ja: "そら" },

  // Hiragana T-row
  "h-ta": { jp: "たまご (tamago)", en: "Egg", id: "Telur", ja: "たまご" },
  "h-chi": { jp: "ちず (chizu)", en: "Map", id: "Peta", ja: "ちず" },
  "h-tsu": { jp: "つき (tsuki)", en: "Moon", id: "Bulan", ja: "つき" },
  "h-te": { jp: "て (te)", en: "Hand", id: "Tangan", ja: "て" },
  "h-to": { jp: "ともだち (tomodachi)", en: "Friend", id: "Teman", ja: "ともだち" },

  // Hiragana N-row
  "h-na": { jp: "なつ (natsu)", en: "Summer", id: "Musim panas", ja: "なつ" },
  "h-ni": { jp: "にじ (niji)", en: "Rainbow", id: "Pelangi", ja: "にじ" },
  "h-nu": { jp: "ぬいぐるみ (nuigurumi)", en: "Stuffed plushie", id: "Boneka", ja: "ぬいぐるみ" },
  "h-ne": { jp: "ねこ (neko)", en: "Cat", id: "Kucing", ja: "ねこ" },
  "h-no": { jp: "のり (nori)", en: "Seaweed", id: "Rumput laut nori", ja: "のり" },

  // Hiragana H-row
  "h-ha": { jp: "はな (hana)", en: "Flower / Nose", id: "Bunga / Hidung", ja: "はな" },
  "h-hi": { jp: "ひかり (hikari)", en: "Light", id: "Cahaya", ja: "ひかり" },
  "h-fu": { jp: "ふね (fune)", en: "Ship / Boat", id: "Kapal", ja: "ふね" },
  "h-he": { jp: "へや (heya)", en: "Room", id: "Kamar", ja: "へや" },
  "h-ho": { jp: "ほし (hoshi)", en: "Star", id: "Bintang", ja: "ほし" },

  // Hiragana M-row
  "h-ma": { jp: "まつり (matsuri)", en: "Festival", id: "Festival", ja: "まつり" },
  "h-mi": { jp: "みず (mizu)", en: "Water", id: "Air", ja: "みず" },
  "h-mu": { jp: "むし (mushi)", en: "Insect", id: "Serangga", ja: "むし" },
  "h-me": { jp: "めがね (megane)", en: "Glasses", id: "Kacamata", ja: "めがね" },
  "h-mo": { jp: "もり (mori)", en: "Forest", id: "Hutan", ja: "もり" },

  // Hiragana Y-row
  "h-ya": { jp: "やま (yama)", en: "Mountain", id: "Gunung", ja: "やま" },
  "h-yu": { jp: "ゆき (yuki)", en: "Snow", id: "Salju", ja: "ゆき" },
  "h-yo": { jp: "よる (yoru)", en: "Night", id: "Malam", ja: "よる" },

  // Hiragana R-row
  "h-ra": { jp: "らいおん (raion)", en: "Lion", id: "Singa", ja: "らいおん" },
  "h-ri": { jp: "りんご (ringo)", en: "Apple", id: "Apel", ja: "りんご" },
  "h-ru": { jp: "るす (rusu)", en: "Away from home", id: "Tidak di rumah", ja: "るす" },
  "h-re": { jp: "れんしゅう (renshuu)", en: "Practice", id: "Latihan", ja: "れんしゅう" },
  "h-ro": { jp: "ろうそく (rousoku)", en: "Candle", id: "Lilin", ja: "ろうそく" },

  // Hiragana W-row & N
  "h-wa": { jp: "わに (wani)", en: "Crocodile", id: "Buaya", ja: "わに" },
  "h-wo": { jp: "ほん を よむ (hon wo yomu)", en: "Object particle (wo)", id: "Partikel objek (wo)", ja: "本を読む (を)" },
  "h-n": { jp: "にほん (nihon)", en: "Japan (ending n)", id: "Jepang (akhiran n)", ja: "にほん" },

  // Hiragana G-row
  "h-ga": { jp: "がっこう (gakkou)", en: "School", id: "Sekolah", ja: "がっこう" },
  "h-gi": { jp: "ぎんこう (ginkou)", en: "Bank", id: "Bank", ja: "ぎんこう" },
  "h-gu": { jp: "ぐんたい (guntai)", en: "Army", id: "Tentara", ja: "ぐんたい" },
  "h-ge": { jp: "げんき (genki)", en: "Healthy / Energetic", id: "Sehat / Semangat", ja: "げんき" },
  "h-go": { jp: "ごはん (gohan)", en: "Rice / Meal", id: "Nasi / Makanan", ja: "ごはん" },

  // Hiragana Z-row
  "h-za": { jp: "ざっし (zasshi)", en: "Magazine", id: "Majalah", ja: "ざっし" },
  "h-ji": { jp: "じかん (jikan)", en: "Time", id: "Waktu", ja: "じかん" },
  "h-zu": { jp: "ずっと (zutto)", en: "All the time / Always", id: "Selamanya / Terus-menerus", ja: "ずっと" },
  "h-ze": { jp: "ぜんぶ (zenbu)", en: "All / Everything", id: "Semua", ja: "ぜんぶ" },
  "h-zo": { jp: "ぞう (zou)", en: "Elephant", id: "Gajah", ja: "ぞう" },

  // Hiragana D-row
  "h-da": { jp: "だいがく (daigaku)", en: "University", id: "Universitas", ja: "だいがく" },
  "h-dji": { jp: "はなぢ (hanaji)", en: "Nosebleed (ji / ぢ)", id: "Mimisan", ja: "はなぢ" },
  "h-dzu": { jp: "つづく (tsuzuku)", en: "To continue (zu / づ)", id: "Berlanjut", ja: "つづく" },
  "h-de": { jp: "でんしゃ (densha)", en: "Train", id: "Kereta listrik", ja: "でんしゃ" },
  "h-do": { jp: "どうぶつ (doubutsu)", en: "Animal", id: "Hewan", ja: "どうぶつ" },

  // Hiragana B-row
  "h-ba": { jp: "ばしょ (basho)", en: "Place", id: "Tempat", ja: "ばしょ" },
  "h-bi": { jp: "びょういん (byouin)", en: "Hospital", id: "Rumah sakit", ja: "びょういん" },
  "h-bu": { jp: "ぶんか (bunka)", en: "Culture", id: "Budaya", ja: "ぶんか" },
  "h-be": { jp: "べんとう (bentou)", en: "Bento box", id: "Bekal bento", ja: "べんとう" },
  "h-bo": { jp: "ぼうし (boushi)", en: "Hat", id: "Topi", ja: "ぼうし" },

  // Hiragana P-row
  "h-pa": { jp: "ぱんだ (panda)", en: "Panda", id: "Panda", ja: "ぱんだ" },
  "h-pi": { jp: "ぴあの (piano)", en: "Piano", id: "Piano", ja: "ぴあの" },
  "h-pu": { jp: "ぷれぜんと (purezento)", en: "Present / Gift", id: "Hadiah", ja: "ぷれぜんと" },
  "h-pe": { jp: "ぺんぎん (pengin)", en: "Penguin", id: "Penguin", ja: "ぺんぎん" },
  "h-po": { jp: "ぽけっと (poketto)", en: "Pocket", id: "Kantong / Saku", ja: "ぽけっと" },

  // Katakana Vowels
  "k-a": { jp: "アイス (aisu)", en: "Ice cream / Ice", id: "Es krim / Es", ja: "アイス" },
  "k-i": { jp: "インク (inku)", en: "Ink", id: "Tinta", ja: "インク" },
  "k-u": { jp: "ウェブ (webu)", en: "Web / Website", id: "Web / Website", ja: "ウェブ" },
  "k-e": { jp: "エコー (ekoo)", en: "Echo", id: "Gema / Echo", ja: "エコー" },
  "k-o": { jp: "オレンジ (orenji)", en: "Orange", id: "Jeruk / Oranye", ja: "オレンジ" },

  // Katakana K-row
  "k-ka": { jp: "カフェ (kafe)", en: "Café", id: "Kafe", ja: "カフェ" },
  "k-ki": { jp: "キー (kii)", en: "Key", id: "Kunci", ja: "キー" },
  "k-ku": { jp: "クラス (kurasu)", en: "Class", id: "Kelas", ja: "クラス" },
  "k-ke": { jp: "ケーキ (keeki)", en: "Cake", id: "Kue / Cake", ja: "ケーキ" },
  "k-ko": { jp: "コイン (koin)", en: "Coin", id: "Koin", ja: "コイン" },

  // Katakana S-row
  "k-sa": { jp: "サイン (sain)", en: "Signature / Autograph", id: "Tanda tangan", ja: "サイン" },
  "k-shi": { jp: "シャツ (shatsu)", en: "Shirt", id: "Kemeja / Kaos", ja: "シャツ" },
  "k-su": { jp: "スポーツ (supootsu)", en: "Sports", id: "Olahraga", ja: "スポーツ" },
  "k-se": { jp: "セーター (seetaa)", en: "Sweater", id: "Baju hangat sweater", ja: "セーター" },
  "k-so": { jp: "ソース (soosu)", en: "Sauce", id: "Saus", ja: "ソース" },

  // Katakana T-row
  "k-ta": { jp: "タクシー (takushii)", en: "Taxi", id: "Taksi", ja: "タクシー" },
  "k-chi": { jp: "チーズ (chiizu)", en: "Cheese", id: "Keju", ja: "チーズ" },
  "k-tsu": { jp: "ツアー (tsuaa)", en: "Tour", id: "Tur / Wisata", ja: "ツアー" },
  "k-te": { jp: "テスト (tesuto)", en: "Test / Exam", id: "Ujian / Tes", ja: "テスト" },
  "k-to": { jp: "トマト (tomato)", en: "Tomato", id: "Tomat", ja: "トマト" },

  // Katakana N-row
  "k-na": { jp: "ナイフ (naifu)", en: "Knife", id: "Pisau", ja: "ナイフ" },
  "k-ni": { jp: "ニュース (nyuusu)", en: "News", id: "Berita", ja: "ニュース" },
  "k-nu": { jp: "ヌードル (nuudoru)", en: "Noodle", id: "Mie", ja: "ヌードル" },
  "k-ne": { jp: "ネット (netto)", en: "Internet / Net", id: "Internet / Jaring", ja: "ネット" },
  "k-no": { jp: "ノート (nooto)", en: "Notebook", id: "Buku catatan", ja: "ノート" },

  // Katakana H-row
  "k-ha": { jp: "ハンバーガー (hanbaagaa)", en: "Hamburger", id: "Hamburger", ja: "ハンバーガー" },
  "k-hi": { jp: "ヒーロー (hiiroo)", en: "Hero", id: "Pahlawan / Hero", ja: "ヒーロー" },
  "k-fu": { jp: "フォーク (fooku)", en: "Fork", id: "Garpu", ja: "フォーク" },
  "k-he": { jp: "ヘルメット (herumetto)", en: "Helmet", id: "Helm", ja: "ヘルメット" },
  "k-ho": { jp: "ホテル (hoteru)", en: "Hotel", id: "Hotel", ja: "ホテル" },

  // Katakana M-row
  "k-ma": { jp: "マスク (masuku)", en: "Mask", id: "Masker", ja: "マスク" },
  "k-mi": { jp: "ミルク (miruku)", en: "Milk", id: "Susu", ja: "ミルク" },
  "k-mu": { jp: "ムービー (muubii)", en: "Movie", id: "Film / Bioskop", ja: "ムービー" },
  "k-me": { jp: "メニュー (menyuu)", en: "Menu", id: "Menu makanan", ja: "メニュー" },
  "k-mo": { jp: "モデル (moderu)", en: "Model", id: "Model", ja: "モデル" },

  // Katakana Y-row
  "k-ya": { jp: "ヤード (yaado)", en: "Yard", id: "Halaman / Yard", ja: "ヤード" },
  "k-yu": { jp: "ユーモア (yuumoa)", en: "Humor", id: "Humor / Lelucon", ja: "ユーモア" },
  "k-yo": { jp: "ヨーグルト (yooguruto)", en: "Yogurt", id: "Yogurt", ja: "ヨーグルト" },

  // Katakana R-row
  "k-ra": { jp: "ラジオ (rajio)", en: "Radio", id: "Radio", ja: "ラジオ" },
  "k-ri": { jp: "リーダー (riidaa)", en: "Leader", id: "Pemimpin / Leader", ja: "リーダー" },
  "k-ru": { jp: "ルール (ruuru)", en: "Rule", id: "Aturan / Rules", ja: "ルール" },
  "k-re": { jp: "レストラン (resutoran)", en: "Restaurant", id: "Restoran", ja: "レストラン" },
  "k-ro": { jp: "ロボット (robotto)", en: "Robot", id: "Robot", ja: "ロボット" },

  // Katakana W & N
  "k-wa": { jp: "ワイン (wain)", en: "Wine", id: "Anggur / Wine", ja: "ワイン" },
  "k-wo": { jp: "ヲ (wo)", en: "Rare Katakana wo", id: "Katakana langka wo", ja: "ヲ" },
  "k-n": { jp: "パン (pan)", en: "Bread (ending n)", id: "Roti (akhiran n)", ja: "パン" },

  // Katakana G-row
  "k-ga": { jp: "ガス (gasu)", en: "Gas", id: "Gas", ja: "ガス" },
  "k-gi": { jp: "ギター (gitaa)", en: "Guitar", id: "Gitar", ja: "ギター" },
  "k-gu": { jp: "グラス (gurasu)", en: "Glass / Tumbler", id: "Gelas", ja: "グラス" },
  "k-ge": { jp: "ゲーム (geemu)", en: "Video game", id: "Video game", ja: "ゲーム" },
  "k-go": { jp: "ゴルフ (gorufu)", en: "Golf", id: "Golf", ja: "ゴルフ" },

  // Katakana Z-row
  "k-za": { jp: "デザイン (dezain)", en: "Design", id: "Desain", ja: "デザイン" },
  "k-ji": { jp: "ジュース (juusu)", en: "Juice", id: "Jus", ja: "ジュース" },
  "k-zu": { jp: "ズボン (zubon)", en: "Pants / Trousers", id: "Celana panjang", ja: "ズボン" },
  "k-ze": { jp: "ゼロ (zero)", en: "Zero", id: "Nol", ja: "ゼロ" },
  "k-zo": { jp: "ゾンビ (zonbi)", en: "Zombie", id: "Zombi", ja: "ゾンビ" },

  // Katakana D-row
  "k-da": { jp: "ダンス (dansu)", en: "Dance", id: "Tari / Dance", ja: "ダンス" },
  "k-dji": { jp: "ハナヂ (hanaji)", en: "Nosebleed (ji / ヂ)", id: "Mimisan", ja: "ハナヂ" },
  "k-dzu": { jp: "グッズ (guzzu)", en: "Goods / Merch (zu / ヅ)", id: "Barang merchandise", ja: "グッズ" },
  "k-de": { jp: "デザート (dezaato)", en: "Dessert", id: "Hidangan penutup", ja: "デザート" },
  "k-do": { jp: "ドア (doa)", en: "Door", id: "Pintu", ja: "ドア" },

  // Katakana B-row
  "k-ba": { jp: "バス (basu)", en: "Bus", id: "Bus", ja: "バス" },
  "k-bi": { jp: "ビール (biiru)", en: "Beer", id: "Bir", ja: "ビール" },
  "k-bu": { jp: "ブーツ (buutsu)", en: "Boots", id: "Sepatu bot", ja: "ブーツ" },
  "k-be": { jp: "ベッド (beddo)", en: "Bed", id: "Tempat tidur", ja: "ベッド" },
  "k-bo": { jp: "ボール (booru)", en: "Ball", id: "Bola", ja: "ボール" },

  // Katakana P-row
  "k-pa": { jp: "パーティー (paatii)", en: "Party", id: "Pesta", ja: "パーティー" },
  "k-pi": { jp: "ピアノ (piano)", en: "Piano", id: "Piano", ja: "ピアノ" },
  "k-pu": { jp: "プール (puuru)", en: "Swimming pool", id: "Kolam renang", ja: "プール" },
  "k-pe": { jp: "ペン (pen)", en: "Pen", id: "Pena / Pulpen", ja: "ペン" },
  "k-po": { jp: "ポスト (posuto)", en: "Mailbox", id: "Kotak pos", ja: "ポスト" },

  // Katakana Extended
  "k-fa": { jp: "ファッション (fasshon)", en: "Fashion", id: "Mode / Busana", ja: "ファッション" },
  "k-fi": { jp: "フィルム (firumu)", en: "Film", id: "Film", ja: "フィルム" },
  "k-fe": { jp: "フェス (fesu)", en: "Festival", id: "Festival", ja: "フェス" },
  "k-fo": { jp: "フォーク (fooku)", en: "Fork", id: "Garpu", ja: "フォーク" },
  "k-ti": { jp: "パーティー (paatii)", en: "Party", id: "Pesta", ja: "パーティー" },
  "k-di": { jp: "ビルディング (birudingu)", en: "Building", id: "Gedung", ja: "ビルディング" },
  "k-we": { jp: "ウェディング (wedingu)", en: "Wedding", id: "Pernikahan", ja: "ウェディング" },
  "k-wi": { jp: "ウィーク (wiiku)", en: "Week", id: "Minggu / Pekan", ja: "ウィーク" },
  "k-va": { jp: "バイオリン (vaiorin)", en: "Violin", id: "Biola", ja: "ヴァイオリン" },
  "k-vo": { jp: "ボリューム (voryuumu)", en: "Volume", id: "Volume suara", ja: "ヴォリューム" },
};

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
  { key: "h-row", nameEn: "H-Row", nameId: "Baris H (Ha-Hi-Fu-He-Ho)", nameJa: "は行 (は・ひ・ふ・へ・ほ)", filter: (k) => k.row === "ha" },
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

  // Advanced: Yoon Combinations (3 groups of 11 characters for smooth study)
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
  { key: "h-row", nameEn: "H-Row", nameId: "Baris H (Ha-Hi-Fu-He-Ho)", nameJa: "ハ行 (ハ・ヒ・フ・ヘ・ホ)", filter: (k) => k.row === "ha" },
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

// Word stages for anime & daily expressions
export const WORD_STAGES: Stage[] = [
  {
    id: "words-daily-hiragana",
    name: {
      en: "Everyday Hiragana Words",
      id: "Everyday Hiragana Words",
      ja: "実戦平仮名単語 (日常・アニメ)",
    },
    category: "words",
    depthName: {
      en: "The Reef",
      id: "The Reef",
      ja: "第三海域：暗礁 (THE REEF)",
    },
    description: {
      en: "ねこ (cat), いぬ (dog), かわいい (cute), すき (like)",
      id: "ねこ (cat), いぬ (dog), かわいい (cute), すき (like)",
      ja: "ねこ (猫), いぬ (犬), かわいい (可愛い), すき (好き)",
    },
    targetDurationSeconds: 25,
    itemCount: 6,
    cards: [
      {
        id: "w-neko",
        character: "ねこ",
        kanaReading: "ねこ (ネコ・猫)",
        sampleWordJp: "黒ねこ (kuro neko / 黒猫)",
        sampleWordMeaning: {
          en: "Black cat",
          id: "Kucing hitam",
          ja: "黒ねこ",
        },
        romaji: "neko",
        hint: {
          en: "Cat. Traditional anime pet companion.",
          id: "Kucing. Hewan peliharaan favorit di anime.",
          ja: "アニメで定番のペット。「ニャー」と鳴く。",
        },
      },
      {
        id: "w-inu",
        character: "いぬ",
        kanaReading: "いぬ (イヌ・犬)",
        sampleWordJp: "柴いぬ (shiba inu / 柴犬)",
        sampleWordMeaning: {
          en: "Shiba dog",
          id: "Anjing ras Shiba",
          ja: "柴いぬ",
        },
        romaji: "inu",
        hint: {
          en: "Dog. Man's loyal companion.",
          id: "Anjing. Sahabat setia manusia.",
          ja: "忠実な相棒の代表格。",
        },
      },
      {
        id: "w-kawaii",
        character: "かわいい",
        kanaReading: "かわいい (可愛い)",
        sampleWordJp: "超かわいい (chou kawaii)",
        sampleWordMeaning: {
          en: "Super cute!",
          id: "Lucu banget!",
          ja: "超かわいい",
        },
        romaji: "kawaii",
        hint: {
          en: "Cute / Adorable. World-famous pop culture phrase.",
          id: "Lucu / Imut. Kata pop culture Jepang paling populer.",
          ja: "日本ポップカルチャーを象徴する言葉。",
        },
      },
      {
        id: "w-suki",
        character: "すき",
        kanaReading: "すき (好き)",
        sampleWordJp: "大好き (daisuki)",
        sampleWordMeaning: {
          en: "I love you / I really like it",
          id: "Aku sangat suka / Aku mencintaimu",
          ja: "大好き",
        },
        romaji: "suki",
        hint: {
          en: "Like / Fond of. Crucial for anime confession scenes.",
          id: "Suka / Naksir. Kunci adegan nembak di anime.",
          ja: "アニメの告白シーンで最重要の台詞。",
        },
      },
      {
        id: "w-arigatou",
        character: "ありがとう",
        kanaReading: "ありがとう (有難う)",
        sampleWordJp: "どうもありがとう (doumo arigatou)",
        sampleWordMeaning: {
          en: "Thank you very much",
          id: "Terima kasih banyak",
          ja: "どうもありがとう",
        },
        romaji: "arigatou",
        hint: {
          en: "Thank you. Everyday expression of gratitude.",
          id: "Terima kasih. Ungkapan rasa syukur paling umum.",
          ja: "感謝を伝える基本の挨拶。",
        },
      },
      {
        id: "w-sugoi",
        character: "すごい",
        kanaReading: "すごい (凄い)",
        sampleWordJp: "すっごい！ (suggoi!)",
        sampleWordMeaning: {
          en: "So awesome!",
          id: "Keren abis!",
          ja: "すっごい！",
        },
        romaji: "sugoi",
        hint: {
          en: "Amazing / Awesome. Iconic anime reaction shout.",
          id: "Hebat / Keren. Reaksi kagum yang sering diteriakkan di anime.",
          ja: "アニメの驚き・称賛リアクションの大定番。",
        },
      },
    ],
  },
  {
    id: "words-anime-katakana",
    name: {
      en: "Anime Loanwords (Katakana)",
      id: "Anime Loanwords (Katakana)",
      ja: "片仮名実戦外来語 (アニメ・ゲーム)",
    },
    category: "words",
    depthName: {
      en: "The Reef",
      id: "The Reef",
      ja: "第三海域：暗礁 (THE REEF)",
    },
    description: {
      en: "アニメ (anime), ゲーム (game), ヒーロー (hero)",
      id: "アニメ (anime), ゲーム (game), ヒーロー (hero)",
      ja: "アニメ, ゲーム, ヒーロー, コーヒー, ラーメン, テレビ",
    },
    targetDurationSeconds: 25,
    itemCount: 6,
    cards: [
      {
        id: "w-anime",
        character: "アニメ",
        kanaReading: "アニメ (animation)",
        sampleWordJp: "日本のアニメ (nihon no anime)",
        sampleWordMeaning: {
          en: "Japanese anime",
          id: "Anime buatan Jepang",
          ja: "日本のアニメ",
        },
        romaji: "anime",
        hint: {
          en: "Short for animation. Japanese animated media.",
          id: "Singkatan dari kata animation. Animasi Jepang.",
          ja: "「アニメーション」の略称。世界共通語。",
        },
      },
      {
        id: "w-geemu",
        character: "ゲーム",
        kanaReading: "ゲーム (game)",
        sampleWordJp: "テレビゲーム (terebi geemu)",
        sampleWordMeaning: {
          en: "Video game",
          id: "Video game",
          ja: "テレビゲーム",
        },
        romaji: "geemu",
        hint: {
          en: "From English 'game'. Note the long vowel mark 'ー'.",
          id: "Dari bahasa Inggris 'game'. Perhatikan tanda strip panjang 'ー'.",
          ja: "英語の『game』から。長音符「ー」に注目。",
        },
      },
      {
        id: "w-hiiroo",
        character: "ヒーロー",
        kanaReading: "ヒーロー (hero)",
        sampleWordJp: "僕のヒーロー (boku no hiiroo)",
        sampleWordMeaning: {
          en: "My hero",
          id: "Pahlawanku",
          ja: "僕のヒーロー",
        },
        romaji: "hiiroo",
        hint: {
          en: "Hero. Popularized in anime like My Hero Academia.",
          id: "Pahlawan (Hero). Populer di anime Boku no Hero Academia.",
          ja: "英語の『hero』から。『僕のヒーローアカデミア』等。",
        },
      },
      {
        id: "w-koohii",
        character: "コーヒー",
        kanaReading: "コーヒー (珈琲)",
        sampleWordJp: "ホットコーヒー (hotto koohii)",
        sampleWordMeaning: {
          en: "Hot coffee",
          id: "Kopi panas",
          ja: "ホットコーヒー",
        },
        romaji: "koohii",
        hint: {
          en: "Coffee. Common café order.",
          id: "Kopi. Minuman kafe paling umum.",
          ja: "オランダ語・英語の『coffee』から。",
        },
      },
      {
        id: "w-raamen",
        character: "ラーメン",
        kanaReading: "ラーメン (拉麺)",
        sampleWordJp: "味噌ラーメン (miso raamen)",
        sampleWordMeaning: {
          en: "Miso ramen",
          id: "Ramen kuah miso",
          ja: "味噌ラーメン",
        },
        romaji: "raamen",
        hint: {
          en: "Ramen noodles. Naruto's favorite dish.",
          id: "Mie ramen khas Jepang. Makanan kesukaan Naruto.",
          ja: "ナルトの大好物。日本の国民食。",
        },
      },
      {
        id: "w-terebi",
        character: "テレビ",
        kanaReading: "テレビ (television)",
        sampleWordJp: "テレビアニメ (terebi anime)",
        sampleWordMeaning: {
          en: "TV anime broadcast",
          id: "Tayangan anime TV",
          ja: "テレビアニメ",
        },
        romaji: "terebi",
        hint: {
          en: "Short for television.",
          id: "Singkatan dari kata television (televisi).",
          ja: "『television』の略語。",
        },
      },
    ],
  },
];

function buildStages(): Stage[] {
  const result: Stage[] = [];

  // Helper to build rows with boss stages every 2 rows
  function addAlphabetStages(category: "hiragana" | "katakana", defs: RowDef[], primitives: KanaCharacter[]) {
    const isHiragana = category === "hiragana";
    const depthBasic = isHiragana
      ? { en: "The Shallows", id: "The Shallows", ja: "第一海域：浅瀬" }
      : { en: "The River", id: "The River", ja: "第二海域：激流" };
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
  addAlphabetStages("hiragana", HIRAGANA_ROW_DEFS, HIRAGANA_PRIMITIVES);

  // 2. KATAKANA
  addAlphabetStages("katakana", KATAKANA_ROW_DEFS, KATAKANA_PRIMITIVES);

  // 3. WORD STAGES
  result.push(...WORD_STAGES);

  return result;
}

export const STAGES: Stage[] = buildStages();
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
  progress: Record<string, { completed?: boolean }>
): { isUnlocked: boolean; requiredStage?: Stage; requiredStageIds?: string[] } {
  const stage = STAGES_BY_ID.get(stageId);
  if (!stage) {
    return { isUnlocked: false };
  }

  // Already completed is always unlocked
  if (progress[stage.id]?.completed) {
    return { isUnlocked: true };
  }

  // Find index within its category
  const categoryStages = STAGES.filter((s) => s.category === stage.category);
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

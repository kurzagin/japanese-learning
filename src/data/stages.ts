import { Locale } from "@/data/i18n";
import { KanaCharacter, KanaScript, KanaType, KanaRow } from "@/types/kana";
import rawKana from "@/data/kana.json";

const DEFAULT_KANA: KanaCharacter[] = (rawKana as any[]).map((r) => ({
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
export const SAMPLE_WORDS: Record<string, { jp: string; en: string; id: string; ja: string }> = {
  // Hiragana Vowels
  "h-a": { jp: "あめ (ame / 雨・飴)", en: "Rain (雨) / Candy (飴)", id: "Hujan (雨) / Permen (飴)", ja: "雨（天候）・飴（菓子）" },
  "h-i": { jp: "いぬ (inu)", en: "Dog", id: "Anjing", ja: "犬（動物）" },
  "h-u": { jp: "うみ (umi)", en: "Sea / Ocean", id: "Laut / Samudra", ja: "海（海洋）" },
  "h-e": { jp: "えき (eki)", en: "Train station", id: "Stasiun kereta", ja: "駅（鉄道駅）" },
  "h-o": { jp: "おにぎり (onigiri)", en: "Rice ball", id: "Nasi kepal onigiri", ja: "お握り（握り飯）" },

  // Hiragana K-row
  "h-ka": { jp: "かわ (kawa)", en: "River", id: "Sungai", ja: "川（河川）" },
  "h-ki": { jp: "きつね (kitsune)", en: "Fox", id: "Rubah", ja: "狐（動物）" },
  "h-ku": { jp: "くるま (kuruma)", en: "Car / Vehicle", id: "Mobil", ja: "車（自動車）" },
  "h-ke": { jp: "けむり (kemuri)", en: "Smoke", id: "Asap", ja: "煙（けむり）" },
  "h-ko": { jp: "こころ (kokoro)", en: "Heart / Soul", id: "Hati / Jiwa", ja: "心（精神・気持ち）" },

  // Hiragana S-row
  "h-sa": { jp: "さかな (sakana)", en: "Fish", id: "Ikan", ja: "魚（さかな）" },
  "h-shi": { jp: "しろ (shiro / 白・城)", en: "White (白) / Castle (城)", id: "Putih (白) / Kastil (城)", ja: "白（色）・城（建造物）" },
  "h-su": { jp: "すし (sushi)", en: "Sushi", id: "Sushi", ja: "寿司（日本料理）" },
  "h-se": { jp: "せかい (sekai)", en: "World", id: "Dunia", ja: "世界（地球・世の中）" },
  "h-so": { jp: "そら (sora)", en: "Sky", id: "Langit", ja: "空（大空・天）" },

  // Hiragana T-row
  "h-ta": { jp: "たまご (tamago)", en: "Egg", id: "Telur", ja: "卵・玉子（食材）" },
  "h-chi": { jp: "ちず (chizu)", en: "Map", id: "Peta", ja: "地図（マップ）" },
  "h-tsu": { jp: "つき (tsuki)", en: "Moon", id: "Bulan", ja: "月（天体）" },
  "h-te": { jp: "て (te)", en: "Hand", id: "Tangan", ja: "手（身体）" },
  "h-to": { jp: "ともだち (tomodachi)", en: "Friend", id: "Teman", ja: "友達（友人）" },

  // Hiragana N-row
  "h-na": { jp: "なつ (natsu)", en: "Summer", id: "Musim panas", ja: "夏（季節）" },
  "h-ni": { jp: "にじ (niji)", en: "Rainbow", id: "Pelangi", ja: "虹（気象）" },
  "h-nu": { jp: "ぬいぐるみ (nuigurumi)", en: "Stuffed plushie", id: "Boneka", ja: "縫い包み（人形・玩具）" },
  "h-ne": { jp: "ねこ (neko)", en: "Cat", id: "Kucing", ja: "猫（動物）" },
  "h-no": { jp: "のり (nori)", en: "Seaweed", id: "Rumput laut nori", ja: "海苔（食用海藻）" },

  // Hiragana H-row
  "h-ha": { jp: "はな (hana / 花・鼻)", en: "Flower (花) / Nose (鼻)", id: "Bunga (花) / Hidung (鼻)", ja: "花（植物）・鼻（身体）" },
  "h-hi": { jp: "ひかり (hikari)", en: "Light", id: "Cahaya", ja: "光（輝き・光線）" },
  "h-fu": { jp: "ふね (fune)", en: "Ship / Boat", id: "Kapal", ja: "船・舟（船舶）" },
  "h-he": { jp: "へや (heya)", en: "Room", id: "Kamar", ja: "部屋（室内）" },
  "h-ho": { jp: "ほし (hoshi)", en: "Star", id: "Bintang", ja: "星（天体）" },

  // Hiragana M-row
  "h-ma": { jp: "まつり (matsuri)", en: "Festival", id: "Festival", ja: "祭り（祭礼・行事）" },
  "h-mi": { jp: "みず (mizu)", en: "Water", id: "Air", ja: "水（飲料水）" },
  "h-mu": { jp: "むし (mushi)", en: "Insect", id: "Serangga", ja: "虫（昆虫）" },
  "h-me": { jp: "めがね (megane)", en: "Glasses", id: "Kacamata", ja: "眼鏡（めがね）" },
  "h-mo": { jp: "もり (mori)", en: "Forest", id: "Hutan", ja: "森（森林）" },

  // Hiragana Y-row
  "h-ya": { jp: "やま (yama)", en: "Mountain", id: "Gunung", ja: "山（山岳）" },
  "h-yu": { jp: "ゆき (yuki)", en: "Snow", id: "Salju", ja: "雪（気象）" },
  "h-yo": { jp: "よる (yoru)", en: "Night", id: "Malam", ja: "夜（夜間）" },

  // Hiragana R-row
  "h-ra": { jp: "らいおん (raion)", en: "Lion", id: "Singa", ja: "ライオン（百獣の王・獅子）" },
  "h-ri": { jp: "りんご (ringo)", en: "Apple", id: "Apel", ja: "林檎（果物）" },
  "h-ru": { jp: "るす (rusu)", en: "Away from home", id: "Tidak di rumah", ja: "留守（不在）" },
  "h-re": { jp: "れんしゅう (renshuu)", en: "Practice", id: "Latihan", ja: "練習（トレーニング）" },
  "h-ro": { jp: "ろうそく (rousoku)", en: "Candle", id: "Lilin", ja: "蝋燭（キャンドル）" },

  // Hiragana W-row & N
  "h-wa": { jp: "わに (wani)", en: "Crocodile", id: "Buaya", ja: "鰐（爬虫類）" },
  "h-wo": { jp: "ほんをよむ (hon wo yomu)", en: "Read a book (wo = object particle)", id: "Membaca buku (wo = partikel objek)", ja: "本を読む (を＝目的格助詞)" },
  "h-n": { jp: "にほん (nihon)", en: "Japan (ending n)", id: "Jepang (akhiran n)", ja: "日本（国名・撥音「ん」）" },

  // Hiragana G-row
  "h-ga": { jp: "がっこう (gakkou)", en: "School", id: "Sekolah", ja: "学校（教育機関）" },
  "h-gi": { jp: "ぎんこう (ginkou)", en: "Bank", id: "Bank", ja: "銀行（金融機関）" },
  "h-gu": { jp: "ぐんたい (guntai)", en: "Army", id: "Tentara", ja: "軍隊（兵隊）" },
  "h-ge": { jp: "げんき (genki)", en: "Healthy / Energetic", id: "Sehat / Semangat", ja: "元気（健康・活力）" },
  "h-go": { jp: "ごはん (gohan)", en: "Rice / Meal", id: "Nasi / Makanan", ja: "ご飯（白米・食事）" },

  // Hiragana Z-row
  "h-za": { jp: "ざっし (zasshi)", en: "Magazine", id: "Majalah", ja: "雑誌（出版物）" },
  "h-ji": { jp: "じかん (jikan)", en: "Time", id: "Waktu", ja: "時間（時刻）" },
  "h-zu": { jp: "ずっと (zutto)", en: "All the time / Always", id: "Selamanya / Terus-menerus", ja: "ずっと（絶えず・長く続く様子）" },
  "h-ze": { jp: "ぜんぶ (zenbu)", en: "All / Everything", id: "Semua", ja: "全部（すべて）" },
  "h-zo": { jp: "ぞう (zou)", en: "Elephant", id: "Gajah", ja: "象（動物）" },

  // Hiragana D-row
  "h-da": { jp: "だいがく (daigaku)", en: "University", id: "Universitas", ja: "大学（高等教育機関）" },
  "h-dji": { jp: "はなぢ (hanaji)", en: "Nosebleed (ji / ぢ)", id: "Mimisan", ja: "鼻血（連濁の「ぢ」）" },
  "h-dzu": { jp: "つづく (tsuzuku)", en: "To continue (zu / づ)", id: "Berlanjut", ja: "続く（同音連呼の「づ」）" },
  "h-de": { jp: "でんしゃ (densha)", en: "Train", id: "Kereta listrik", ja: "電車（鉄道車両）" },
  "h-do": { jp: "どうぶつ (doubutsu)", en: "Animal", id: "Hewan", ja: "動物（生き物）" },

  // Hiragana B-row
  "h-ba": { jp: "ばしょ (basho)", en: "Place", id: "Tempat", ja: "場所（位置・スポット）" },
  "h-bi": { jp: "びょういん (byouin)", en: "Hospital", id: "Rumah sakit", ja: "病院（医療機関）" },
  "h-bu": { jp: "ぶんか (bunka)", en: "Culture", id: "Budaya", ja: "文化（カルチャー）" },
  "h-be": { jp: "べんとう (bentou)", en: "Bento box", id: "Bekal bento", ja: "弁当（携帯食）" },
  "h-bo": { jp: "ぼうし (boushi)", en: "Hat", id: "Topi", ja: "帽子（キャップ・ハット）" },

  // Hiragana P-row
  "h-pa": { jp: "ぱんだ (panda)", en: "Panda", id: "Panda", ja: "パンダ（大熊猫）" },
  "h-pi": { jp: "ぴかぴか (pikapika)", en: "Sparkling / Shiny", id: "Berkilau", ja: "ぴかぴか（光り輝く様子）" },
  "h-pu": { jp: "ぷれぜんと (purezento)", en: "Present / Gift", id: "Hadiah", ja: "プレゼント（贈り物）" },
  "h-pe": { jp: "ぺんぎん (pengin)", en: "Penguin", id: "Penguin", ja: "ペンギン（水鳥）" },
  "h-po": { jp: "ぽけっと (poketto)", en: "Pocket", id: "Kantong / Saku", ja: "ポケット（衣類の袋）" },

  // Katakana Vowels
  "k-a": { jp: "アイス (aisu)", en: "Ice cream / Ice", id: "Es krim / Es", ja: "アイスクリーム・氷" },
  "k-i": { jp: "インク (inku)", en: "Ink", id: "Tinta", ja: "筆記用インク（墨汁）" },
  "k-u": { jp: "ウェブ (webu)", en: "Web / Website", id: "Web / Website", ja: "インターネット・ウェブサイト" },
  "k-e": { jp: "エコー (ekoo)", en: "Echo", id: "Gema / Echo", ja: "反響・こだま" },
  "k-o": { jp: "オレンジ (orenji)", en: "Orange", id: "Jeruk / Oranye", ja: "柑橘類のオレンジ・橙色" },

  // Katakana K-row
  "k-ka": { jp: "カフェ (kafe)", en: "Café", id: "Kafe", ja: "喫茶店・カフェ" },
  "k-ki": { jp: "キー (kii)", en: "Key", id: "Kunci", ja: "鍵・キーボードのキー" },
  "k-ku": { jp: "クラス (kurasu)", en: "Class", id: "Kelas", ja: "学級・クラス" },
  "k-ke": { jp: "ケーキ (keeki)", en: "Cake", id: "Kue / Cake", ja: "洋菓子のケーキ" },
  "k-ko": { jp: "コイン (koin)", en: "Coin", id: "Koin", ja: "硬貨・コイン" },

  // Katakana S-row
  "k-sa": { jp: "サイン (sain)", en: "Signature / Autograph", id: "Tanda tangan", ja: "署名・合図" },
  "k-shi": { jp: "シャツ (shatsu)", en: "Shirt", id: "Kemeja / Kaos", ja: "衣類のシャツ" },
  "k-su": { jp: "スポーツ (supootsu)", en: "Sports", id: "Olahraga", ja: "運動・スポーツ競技" },
  "k-se": { jp: "セーター (seetaa)", en: "Sweater", id: "Baju hangat sweater", ja: "毛糸の編物衣類" },
  "k-so": { jp: "ソース (soosu)", en: "Sauce", id: "Saus", ja: "調味料のソース" },

  // Katakana T-row
  "k-ta": { jp: "タクシー (takushii)", en: "Taxi", id: "Taksi", ja: "旅客自動車・タクシー" },
  "k-chi": { jp: "チーズ (chiizu)", en: "Cheese", id: "Keju", ja: "乳製品のチーズ" },
  "k-tsu": { jp: "ツアー (tsuaa)", en: "Tour", id: "Tur / Wisata", ja: "団体旅行・周遊ツアー" },
  "k-te": { jp: "テスト (tesuto)", en: "Test / Exam", id: "Ujian / Tes", ja: "試験・検査" },
  "k-to": { jp: "トマト (tomato)", en: "Tomato", id: "Tomat", ja: "野菜のトマト（赤茄子）" },

  // Katakana N-row
  "k-na": { jp: "ナイフ (naifu)", en: "Knife", id: "Pisau", ja: "洋包丁・小刀" },
  "k-ni": { jp: "ニュース (nyuusu)", en: "News", id: "Berita", ja: "報道・時事ニュース" },
  "k-nu": { jp: "ヌードル (nuudoru)", en: "Noodle", id: "Mie", ja: "麺類・カップ麺" },
  "k-ne": { jp: "ネット (netto)", en: "Internet / Net", id: "Internet / Jaring", ja: "インターネット・網" },
  "k-no": { jp: "ノート (nooto)", en: "Notebook", id: "Buku catatan", ja: "帳面・ノートブック" },

  // Katakana H-row
  "k-ha": { jp: "ハンバーガー (hanbaagaa)", en: "Hamburger", id: "Hamburger", ja: "パンに肉を挟んだ料理" },
  "k-hi": { jp: "ヒーロー (hiiroo)", en: "Hero", id: "Pahlawan / Hero", ja: "英雄・主人公" },
  "k-fu": { jp: "フランス (furansu)", en: "France", id: "Prancis", ja: "欧州の国名（仏蘭西）" },
  "k-he": { jp: "ヘルメット (herumetto)", en: "Helmet", id: "Helm", ja: "頭部保護帽・ヘルメット" },
  "k-ho": { jp: "ホテル (hoteru)", en: "Hotel", id: "Hotel", ja: "宿泊施設・洋式旅館" },

  // Katakana M-row
  "k-ma": { jp: "マスク (masuku)", en: "Mask", id: "Masker", ja: "衛生マスク・仮面" },
  "k-mi": { jp: "ミルク (miruku)", en: "Milk", id: "Susu", ja: "牛乳・ミルク" },
  "k-mu": { jp: "ムービー (muubii)", en: "Movie", id: "Film / Bioskop", ja: "映画・動画映像" },
  "k-me": { jp: "メニュー (menyuu)", en: "Menu", id: "Menu makanan", ja: "献立表・品書き" },
  "k-mo": { jp: "モデル (moderu)", en: "Model", id: "Model", ja: "模型・ファッションモデル" },

  // Katakana Y-row
  "k-ya": { jp: "ヤード (yaado)", en: "Yard", id: "Halaman / Yard", ja: "距離の単位（約91.4cm）" },
  "k-yu": { jp: "ユーモア (yuumoa)", en: "Humor", id: "Humor / Lelucon", ja: "諧謔・ユーモア（滑稽味）" },
  "k-yo": { jp: "ヨーグルト (yooguruto)", en: "Yogurt", id: "Yogurt", ja: "発酵乳製品" },

  // Katakana R-row
  "k-ra": { jp: "ラジオ (rajio)", en: "Radio", id: "Radio", ja: "音声放送・ラジオ受信機" },
  "k-ri": { jp: "リーダー (riidaa)", en: "Leader", id: "Pemimpin / Leader", ja: "指導者・代表者" },
  "k-ru": { jp: "ルール (ruuru)", en: "Rule", id: "Aturan / Rules", ja: "規則・きまり" },
  "k-re": { jp: "レストラン (resutoran)", en: "Restaurant", id: "Restoran", ja: "洋風飲食店・食堂" },
  "k-ro": { jp: "ロボット (robotto)", en: "Robot", id: "Robot", ja: "自動機械・人造人間" },

  // Katakana W & N
  "k-wa": { jp: "ワイン (wain)", en: "Wine", id: "Anggur / Wine", ja: "葡萄酒（ワイン）" },
  "k-wo": { jp: "ヲタク (wotaku)", en: "Otaku / Geek (slang)", id: "Otaku / Penggemar berat", ja: "熱狂的ファン（ネットスラング表記）" },
  "k-n": { jp: "パン (pan)", en: "Bread (ending n)", id: "Roti (akhiran n)", ja: "小麦粉を焼いた主食（撥音「ン」）" },

  // Katakana G-row
  "k-ga": { jp: "ガス (gasu)", en: "Gas", id: "Gas", ja: "気体・燃料用ガス" },
  "k-gi": { jp: "ギター (gitaa)", en: "Guitar", id: "Gitar", ja: "弦楽器のギター" },
  "k-gu": { jp: "グラス (gurasu)", en: "Glass / Tumbler", id: "Gelas", ja: "ガラス製のコップ" },
  "k-ge": { jp: "ゲーム (geemu)", en: "Video game", id: "Video game", ja: "遊戯・テレビゲーム" },
  "k-go": { jp: "ゴルフ (gorufu)", en: "Golf", id: "Golf", ja: "球技のゴルフ" },

  // Katakana Z-row
  "k-za": { jp: "デザイン (dezain)", en: "Design", id: "Desain", ja: "設計・意匠デザイン" },
  "k-ji": { jp: "ジュース (juusu)", en: "Juice", id: "Jus", ja: "果汁飲料・清涼飲料" },
  "k-zu": { jp: "ズボン (zubon)", en: "Pants / Trousers", id: "Celana panjang", ja: "下半身に履く衣類（トラウザーズ）" },
  "k-ze": { jp: "ゼロ (zero)", en: "Zero", id: "Nol", ja: "零（数字の0）" },
  "k-zo": { jp: "ゾンビ (zonbi)", en: "Zombie", id: "Zombi", ja: "ホラー作品の動く死体" },

  // Katakana D-row
  "k-da": { jp: "ダンス (dansu)", en: "Dance", id: "Tari / Dance", ja: "舞踊・ダンス" },
  "k-dji": { jp: "ハナヂ (hanaji)", en: "Nosebleed (ji / ヂ)", id: "Mimisan", ja: "鼻血（連濁の「ヂ」）" },
  "k-dzu": { jp: "ツヅキ (tsuzuki)", en: "Continuation / Next episode (zu / ヅ)", id: "Kelanjutan / Episode berikutnya", ja: "続き（同音連呼の「ヅ」）" },
  "k-de": { jp: "デザート (dezaato)", en: "Dessert", id: "Hidangan penutup", ja: "食後の甘味・菓子" },
  "k-do": { jp: "ドア (doa)", en: "Door", id: "Pintu", ja: "扉・出入口のドア" },

  // Katakana B-row
  "k-ba": { jp: "バス (basu)", en: "Bus", id: "Bus", ja: "乗合自動車・路線バス" },
  "k-bi": { jp: "ビール (biiru)", en: "Beer", id: "Bir", ja: "麦酒（アルコール飲料）" },
  "k-bu": { jp: "ブーツ (buutsu)", en: "Boots", id: "Sepatu bot", ja: "長靴・革製ブーツ" },
  "k-be": { jp: "ベッド (beddo)", en: "Bed", id: "Tempat tidur", ja: "寝台・ベッド" },
  "k-bo": { jp: "ボール (booru)", en: "Ball", id: "Bola", ja: "球・運動用のボール" },

  // Katakana P-row
  "k-pa": { jp: "パスポート (pasupooto)", en: "Passport", id: "Paspor", ja: "旅券（海外渡航証）" },
  "k-pi": { jp: "ピアノ (piano)", en: "Piano", id: "Piano", ja: "鍵盤楽器のピアノ" },
  "k-pu": { jp: "プール (puuru)", en: "Swimming pool", id: "Kolam renang", ja: "水泳用プール" },
  "k-pe": { jp: "ペン (pen)", en: "Pen", id: "Pena / Pulpen", ja: "筆記用具のペン" },
  "k-po": { jp: "ポスト (posuto)", en: "Mailbox", id: "Kotak pos", ja: "郵便ポスト（投函箱）" },

  // Katakana Extended
  "k-fa": { jp: "ファッション (fasshon)", en: "Fashion", id: "Mode / Busana", ja: "流行の服装・ファッション" },
  "k-fi": { jp: "フィルム (firumu)", en: "Film", id: "Film", ja: "写真フィルム・薄膜" },
  "k-fe": { jp: "フェス (fesu)", en: "Festival", id: "Festival", ja: "音楽祭・フェスティバル" },
  "k-fo": { jp: "フォーク (fooku)", en: "Fork", id: "Garpu", ja: "食器のフォーク" },
  "k-ti": { jp: "パーティー (paatii)", en: "Party", id: "Pesta", ja: "社交の宴会・集まり" },
  "k-di": { jp: "ビルディング (birudingu)", en: "Building", id: "Gedung", ja: "高層建築物・ビル" },
  "k-we": { jp: "ウェディング (wedingu)", en: "Wedding", id: "Pernikahan", ja: "結婚式・婚礼" },
  "k-wi": { jp: "ウィーク (wiiku)", en: "Week", id: "Minggu / Pekan", ja: "一週間（ゴールデンウィーク等）" },
  "k-va": { jp: "ヴァイオリン (vaiorin)", en: "Violin", id: "Biola", ja: "弦楽器のバイオリン" },
  "k-vo": { jp: "ヴォリューム (voryuumu)", en: "Volume", id: "Volume suara", ja: "音量・分量" },

  // Hiragana Yōon Combinations (33)
  "h-kya": { jp: "きゃく (kyaku)", en: "Guest / Customer", id: "Tamu / Pelanggan", ja: "客（来客・顧客）" },
  "h-kyu": { jp: "きゅうり (kyuuri)", en: "Cucumber", id: "Mentimun", ja: "胡瓜（夏野菜）" },
  "h-kyo": { jp: "きょうと (kyouto)", en: "Kyoto city", id: "Kota Kyoto", ja: "京都（日本の古都）" },
  "h-sha": { jp: "しゃしん (shashin)", en: "Photograph", id: "Foto", ja: "写真（カメラ画像）" },
  "h-shu": { jp: "しゅみ (shumi)", en: "Hobby", id: "Hobi", ja: "趣味（愛好すること）" },
  "h-sho": { jp: "しょくどう (shokudou)", en: "Dining hall / Cafeteria", id: "Kantin", ja: "食堂（飲食店）" },
  "h-cha": { jp: "おちゃ (ocha)", en: "Green tea", id: "Teh hijau", ja: "お茶（日本茶・緑茶）" },
  "h-chu": { jp: "ちゅうしゃ (chuusha)", en: "Parking / Injection", id: "Parkir / Suntikan", ja: "駐車（車庫入れ）・注射" },
  "h-cho": { jp: "ちょっと (chotto)", en: "A little bit", id: "Sebentar / Sedikit", ja: "少し・少々（副詞）" },
  "h-nya": { jp: "にゃんこ (nyanko)", en: "Kitty cat", id: "Kucing kecil", ja: "猫の愛称（幼児語）" },
  "h-nyu": { jp: "ぎゅうにゅう (gyuunyuu)", en: "Cow milk", id: "Susu sapi", ja: "牛乳（ミルク）" },
  "h-nyo": { jp: "にょうぼう (nyoubou)", en: "Wife / Court lady", id: "Istri", ja: "女房（妻・配偶者）" },
  "h-hya": { jp: "ひゃく (hyaku)", en: "Hundred (100)", id: "Seratus (100)", ja: "百（数字の100）" },
  "h-hyu": { jp: "ひゅうひゅう (hyuuhyuu)", en: "Whistling wind sound", id: "Desir angin kencang", ja: "風が吹く擬音語" },
  "h-hyo": { jp: "ひょう (hyou)", en: "Leopard / Hail", id: "Macan tutul / Hujan es", ja: "豹（動物）・雹（気象）" },
  "h-mya": { jp: "みゃく (myaku)", en: "Pulse / Vein", id: "Denyut nadi", ja: "脈（脈拍・血管）" },
  "h-myu": { jp: "みゅうじっく (myuujikku)", en: "Music", id: "Musik", ja: "音楽（ミュージック）" },
  "h-myo": { jp: "みょうじ (myouji)", en: "Family surname", id: "Nama keluarga", ja: "名字・苗字（姓）" },
  "h-rya": { jp: "りゃく (ryaku)", en: "Abbreviation / Shortening", id: "Singkatan", ja: "略（省略・略称）" },
  "h-ryu": { jp: "りゅう (ryuu)", en: "Dragon", id: "Naga", ja: "竜・龍（伝説の生物）" },
  "h-ryo": { jp: "りょこう (ryokou)", en: "Travel / Trip", id: "Perjalanan / Wisata", ja: "旅行（旅に出ること）" },
  "h-gya": { jp: "ぎゃくてん (gyakuten)", en: "Turnabout / Comeback", id: "Pembalikan keadaan", ja: "逆転（形勢が覆ること）" },
  "h-gyu": { jp: "ぎゅうにく (gyuuniku)", en: "Beef meat", id: "Daging sapi", ja: "牛肉（ビーフ）" },
  "h-gyo": { jp: "ぎょぎょう (gyogyou)", en: "Fishery industry", id: "Perikanan", ja: "漁業（水産漁労）" },
  "h-ja": { jp: "じゃがいも (jagaimo)", en: "Potato", id: "Kentang", ja: "馬鈴薯（ジャガイモ）" },
  "h-ju": { jp: "じゅう (juu)", en: "Ten (10)", id: "Sepuluh (10)", ja: "十（数字の10）" },
  "h-jo": { jp: "じょせい (josei)", en: "Woman / Female", id: "Wanita / Perempuan", ja: "女性（婦女）" },
  "h-bya": { jp: "びゃくだん (byakudan)", en: "Sandalwood incense", id: "Kayu cendana", ja: "白檀（香木の一種）" },
  "h-byu": { jp: "びゅうびゅう (byuubyuu)", en: "Howling wind gust", id: "Deru hembusan angin", ja: "強風が吹く擬音語" },
  "h-byo": { jp: "びょういん (byouin)", en: "Hospital", id: "Rumah sakit", ja: "病院（医療施設）" },
  "h-pya": { jp: "ぴゃっと (pyatto)", en: "In a sudden flash", id: "Dalam sekejap mata", ja: "素早く動く様子（擬態語）" },
  "h-pyu": { jp: "ぴゅうっと (pyuutto)", en: "Whistling gust", id: "Tiupan angin melesat", ja: "勢いよく飛ぶ様子（擬態語）" },
  "h-pyo": { jp: "ぴょんぴょん (pyonpyon)", en: "Hopping happily", id: "Melompat-lompat", ja: "軽快に跳ねる様子（擬態語）" },

  // Katakana Yōon Combinations (33)
  "k-kya": { jp: "キャベツ (kyabetsu)", en: "Cabbage", id: "Kubis / Kol", ja: "葉菜類のキャベツ（甘藍）" },
  "k-kyu": { jp: "キューブ (kyuubu)", en: "Cube", id: "Kubus", ja: "立方体・正六面体" },
  "k-kyo": { jp: "キョウト (kyouto)", en: "Kyoto city", id: "Kota Kyoto", ja: "京都（都市名）" },
  "k-sha": { jp: "シャツ (shatsu)", en: "Shirt", id: "Kemeja / Kaos", ja: "衣類のシャツ（ワイシャツ等）" },
  "k-shu": { jp: "シュークリーム (shuukuriimu)", en: "Cream puff", id: "Kue sus", ja: "クリーム入り洋菓子" },
  "k-sho": { jp: "ショップ (shoppu)", en: "Shop / Store", id: "Toko", ja: "店舗・お店" },
  "k-cha": { jp: "チャンス (chansu)", en: "Chance / Opportunity", id: "Kesempatan", ja: "好機・機会" },
  "k-chu": { jp: "チューリップ (chuurippu)", en: "Tulip flower", id: "Bunga tulip", ja: "春に咲く球根植物の花" },
  "k-cho": { jp: "チョコレート (chokoreeto)", en: "Chocolate", id: "Cokelat", ja: "カカオ製の甘い菓子" },
  "k-nya": { jp: "ニャー (nyaa)", en: "Meow sound", id: "Suara mengeong kucing", ja: "猫の鳴き声（擬音語）" },
  "k-nyu": { jp: "ニュース (nyuusu)", en: "News broadcast", id: "Berita", ja: "報道番組・最新情報" },
  "k-nyo": { jp: "ニョッキ (nyokki)", en: "Gnocchi pasta", id: "Pasta gnocchi", ja: "イタリアの団子状パスタ" },
  "k-hya": { jp: "ヒャッホウ (hyahhou)", en: "Yippee shout", id: "Sorakan riang", ja: "歓喜の掛け声（感嘆詞）" },
  "k-hyu": { jp: "ヒューズ (hyuuzu)", en: "Electrical fuse", id: "Sekring listrik", ja: "過電流を防ぐ安全部品" },
  "k-hyo": { jp: "ヒョウ (hyou)", en: "Leopard / Panther", id: "Macan tutul", ja: "ネコ科の大型肉食獣（豹）" },
  "k-mya": { jp: "ミャンマー (myanmaa)", en: "Myanmar country", id: "Negara Myanmar", ja: "東南アジアの国名" },
  "k-myu": { jp: "ミュージカル (myuujikaru)", en: "Musical theatre", id: "Drama musikal", ja: "歌と踊りの音楽劇" },
  "k-myo": { jp: "ミョウガ (myouga)", en: "Japanese myoga ginger", id: "Jahe myoga Jepang", ja: "香味野菜の茗荷（みょうが）" },
  "k-rya": { jp: "リャマ (ryama)", en: "Llama", id: "Hewan llama", ja: "南米アンデスのラクダ科動物" },
  "k-ryu": { jp: "リュック (ryukku)", en: "Backpack / Rucksack", id: "Ransel", ja: "背負い鞄（リュックサック）" },
  "k-ryo": { jp: "リョカン (ryokan)", en: "Japanese inn", id: "Penginapan ryokan", ja: "和風の宿泊施設（旅館）" },
  "k-gya": { jp: "ギャング (gyangu)", en: "Gang / Gangster", id: "Geng", ja: "無法者の集団・悪党団" },
  "k-gyu": { jp: "ギュッと (gyutto)", en: "Tight squeeze / Hug", id: "Pelukan erat", ja: "強く抱きしめる様子（擬態語）" },
  "k-gyo": { jp: "ギョーザ (gyooza)", en: "Gyoza dumpling", id: "Pangsit gyoza", ja: "小麦粉の皮で具を包んだ料理（餃子）" },
  "k-ja": { jp: "ジャム (jamu)", en: "Fruit jam", id: "Selai buah", ja: "果物を砂糖で煮詰めた保存食" },
  "k-ju": { jp: "ジュース (juusu)", en: "Fruit juice", id: "Jus buah", ja: "果汁飲料・ソフトドリンク" },
  "k-jo": { jp: "ジョギング (jogingu)", en: "Jogging", id: "Lari joging", ja: "健康のための軽いランニング" },
  "k-bya": { jp: "ビャクヤ (byakuya)", en: "Midnight sun", id: "Malam putih kutub", ja: "極地で夜も太陽が沈まない現象（白夜）" },
  "k-byu": { jp: "ビュッフェ (byuffe)", en: "Buffet dining", id: "Prasmanan", ja: "立食・セルフサービス形式の食事" },
  "k-byo": { jp: "ビョウ (byou)", en: "Tack / Rivet pin", id: "Paku payung / Pin", ja: "画鋲・留め具の鋲（びょう）" },
  "k-pya": { jp: "ピャッと (pyatto)", en: "Swift flash", id: "Kilatan cepat", ja: "素早く飛び出す様子（擬態語）" },
  "k-pyu": { jp: "ピューマ (pyuuma)", en: "Puma cougar", id: "Puma / Singa gunung", ja: "米大陸産のネコ科大型獣" },
  "k-pyo": { jp: "ピョンチャン (pyonchan)", en: "Pyeongchang", id: "Pyeongchang", ja: "韓国の都市名（平昌）" },
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

// Word stages for anime & daily expressions
export const WORD_STAGES: Stage[] = [
  {
    id: "words-daily-hiragana",
    name: {
      en: "Everyday Hiragana Words",
      id: "Kosakata Harian Hiragana",
      ja: "実戦平仮名単語 (日常・アニメ)",
    },
    category: "words",
    depthName: {
      en: "The Reef",
      id: "Terumbu Karang (The Reef)",
      ja: "第三海域：暗礁 (THE REEF)",
    },
    description: {
      en: "ねこ (cat), いぬ (dog), かわいい (cute), すき (like), ありがとう (thanks), すごい (awesome)",
      id: "ねこ (kucing), いぬ (anjing), かわいい (imut), すき (suka), ありがとう (terima kasih), すごい (hebat)",
      ja: "ねこ (猫), いぬ (犬), かわいい (可愛い), すき (好き), ありがとう (有難う), すごい (凄い)",
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
          en: "Like / Fond of (daisuki = love / really like)",
          id: "Suka / Gemar (daisuki = sangat suka)",
          ja: "大好き",
        },
        romaji: "suki",
        hint: {
          en: "Like / Fond of. Used to express liking; often heard in anime confessions.",
          id: "Suka / Gemar. Digunakan untuk menyatakan kesukaan atau naksir di anime.",
          ja: "好意を表す言葉。アニメの告白シーンでも頻出。",
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
      id: "Kata Serapan Anime (Katakana)",
      ja: "片仮名実戦外来語 (アニメ・ゲーム)",
    },
    category: "words",
    depthName: {
      en: "The Reef",
      id: "Terumbu Karang (The Reef)",
      ja: "第三海域：暗礁 (THE REEF)",
    },
    description: {
      en: "アニメ (anime), ゲーム (game), ヒーロー (hero), コーヒー (coffee), ラーメン (ramen), テレビ (TV)",
      id: "アニメ (anime), ゲーム (game), ヒーロー (pahlawan), コーヒー (kopi), ラーメン (ramen), テレビ (TV)",
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
          en: "Coffee (hotto koohii = hot coffee)",
          id: "Kopi (hotto koohii = kopi panas)",
          ja: "コーヒー (ホットコーヒー)",
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
          en: "Ramen (miso raamen = miso ramen)",
          id: "Ramen (miso raamen = ramen kuah miso)",
          ja: "ラーメン (味噌ラーメン)",
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

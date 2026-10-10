import { Locale } from "@/data/i18n";

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
  cards: StudyCard[];
}

export const STAGES: Stage[] = [
  {
    "id": "hiragana-vowels",
    "name": {
      "en": "Hiragana: Vowels",
      "id": "Hiragana: Vowels",
      "ja": "平仮名：母音 (あ・い・う・え・お)"
    },
    "category": "hiragana",
    "depthName": {
      "en": "The Shallows",
      "id": "The Shallows",
      "ja": "第一海域：浅瀬 (THE SHALLOWS)"
    },
    "description": {
      "en": "あ (a), い (i), う (u), え (e), お (o)",
      "id": "あ (a), い (i), う (u), え (e), お (o)",
      "ja": "あ (a), い (i), う (u), え (e), お (o)"
    },
    "targetDurationSeconds": 15,
    "itemCount": 5,
    "unlockedByDefault": true,
    "cards": [
      {
        "id": "h-a",
        "character": "あ",
        "kanaReading": "あ",
        "sampleWordJp": "あめ (ame)",
        "sampleWordMeaning": {
          "en": "Rain / Candy",
          "id": "Hujan / Permen",
          "ja": "あめ"
        },
        "romaji": "a",
        "hint": {
          "en": "Derived from kanji '安'. Looks like an apple with a stem.",
          "id": "Berasal dari kanji '安'. Bentuknya mirip buah apel bertangkai.",
          "ja": "「安」の草書体から作られた文字。丸いリンゴのような形。"
        }
      },
      {
        "id": "h-i",
        "character": "い",
        "kanaReading": "い",
        "sampleWordJp": "いぬ (inu)",
        "sampleWordMeaning": {
          "en": "Dog",
          "id": "Anjing",
          "ja": "いぬ"
        },
        "romaji": "i",
        "hint": {
          "en": "Derived from kanji '以'. Two needles standing side-by-side.",
          "id": "Berasal dari kanji '以'. Dua garis/jarum berdampingan.",
          "ja": "「以」の草書体から作られた文字。二本の並んだ線。"
        }
      },
      {
        "id": "h-u",
        "character": "う",
        "kanaReading": "う",
        "sampleWordJp": "うみ (umi)",
        "sampleWordMeaning": {
          "en": "Sea / Ocean",
          "id": "Laut / Samudra",
          "ja": "うみ"
        },
        "romaji": "u",
        "hint": {
          "en": "Derived from kanji '宇'. Someone hunching over.",
          "id": "Berasal dari kanji '宇'. Orang membungkuk.",
          "ja": "「宇」の冠から作られた文字。背をかがめた人の姿。"
        }
      },
      {
        "id": "h-e",
        "character": "え",
        "kanaReading": "え",
        "sampleWordJp": "えき (eki)",
        "sampleWordMeaning": {
          "en": "Train station",
          "id": "Stasiun kereta",
          "ja": "えき"
        },
        "romaji": "e",
        "hint": {
          "en": "Derived from kanji '衣'. An energetic dash.",
          "id": "Berasal dari kanji '衣'. Gerakan melompat maju.",
          "ja": "「衣」の草書体から作られた文字。駆け抜ける姿。"
        }
      },
      {
        "id": "h-o",
        "character": "お",
        "kanaReading": "お",
        "sampleWordJp": "おにぎり (onigiri)",
        "sampleWordMeaning": {
          "en": "Rice ball",
          "id": "Nasi kepal onigiri",
          "ja": "おにぎり"
        },
        "romaji": "o",
        "hint": {
          "en": "Derived from kanji '於'. A golfer swinging at a ball.",
          "id": "Berasal dari kanji '於'. Pemain memukul bola ke lubang.",
          "ja": "「於」の草書体から作られた文字。ゴルフボールを打つ形。"
        }
      }
    ]
  },
  {
    "id": "hiragana-k-row",
    "name": {
      "en": "Hiragana: K-Row",
      "id": "Hiragana: K-Row",
      "ja": "平仮名：か行 (か・き・く・け・こ)"
    },
    "category": "hiragana",
    "depthName": {
      "en": "The Shallows",
      "id": "The Shallows",
      "ja": "第一海域：浅瀬 (THE SHALLOWS)"
    },
    "description": {
      "en": "か (ka), き (ki), く (ku), け (ke), こ (ko)",
      "id": "か (ka), き (ki), く (ku), け (ke), こ (ko)",
      "ja": "か (ka), き (ki), く (ku), ke (け), ko (こ)"
    },
    "targetDurationSeconds": 15,
    "itemCount": 5,
    "cards": [
      {
        "id": "h-ka",
        "character": "か",
        "kanaReading": "か",
        "sampleWordJp": "かわ (kawa)",
        "sampleWordMeaning": {
          "en": "River",
          "id": "Sungai",
          "ja": "かわ"
        },
        "romaji": "ka",
        "hint": {
          "en": "Derived from '加'. A person kicking a ball.",
          "id": "Berasal dari kanji '加'. Orang menendang bola.",
          "ja": "「加」から作られた文字。力を込めて蹴り上げる形。"
        }
      },
      {
        "id": "h-ki",
        "character": "き",
        "kanaReading": "き",
        "sampleWordJp": "きつね (kitsune)",
        "sampleWordMeaning": {
          "en": "Fox",
          "id": "Rubah",
          "ja": "きつね"
        },
        "romaji": "ki",
        "hint": {
          "en": "Derived from '幾'. Looks like a classic key.",
          "id": "Berasal dari kanji '幾'. Bentuk anak kunci.",
          "ja": "「幾」の草書体から作られた文字。鍵（key）の形。"
        }
      },
      {
        "id": "h-ku",
        "character": "く",
        "kanaReading": "く",
        "sampleWordJp": "くるま (kuruma)",
        "sampleWordMeaning": {
          "en": "Car / Vehicle",
          "id": "Mobil / Kendaraan",
          "ja": "くるま"
        },
        "romaji": "ku",
        "hint": {
          "en": "Derived from '久'. Bird beak opening.",
          "id": "Berasal dari kanji '久'. Paruh burung terbuka.",
          "ja": "「久」から作られた文字。鳥のくちばしの形。"
        }
      },
      {
        "id": "h-ke",
        "character": "け",
        "kanaReading": "け",
        "sampleWordJp": "けむり (kemuri)",
        "sampleWordMeaning": {
          "en": "Smoke",
          "id": "Asap",
          "ja": "けむり"
        },
        "romaji": "ke",
        "hint": {
          "en": "Derived from '計'. Looks like a wooden barrel.",
          "id": "Berasal dari kanji '計'. Bentuk tong kayu.",
          "ja": "「計」の草書体から作られた文字。木樽（keg）の形。"
        }
      },
      {
        "id": "h-ko",
        "character": "こ",
        "kanaReading": "こ",
        "sampleWordJp": "こころ (kokoro)",
        "sampleWordMeaning": {
          "en": "Heart / Soul",
          "id": "Hati / Jiwa",
          "ja": "こころ"
        },
        "romaji": "ko",
        "hint": {
          "en": "Derived from '己'. Two koi fish swimming parallel.",
          "id": "Berasal dari kanji '己'. Dua ikan koi berenang berdampingan.",
          "ja": "「己」の草書体から作られた文字。二匹の鯉が並んで泳ぐ姿。"
        }
      }
    ]
  },
  {
    "id": "hiragana-s-row",
    "name": {
      "en": "Hiragana: S-Row",
      "id": "Hiragana: S-Row",
      "ja": "平仮名：さ行 (さ・し・す・せ・そ)"
    },
    "category": "hiragana",
    "depthName": {
      "en": "The Shallows",
      "id": "The Shallows",
      "ja": "第一海域：浅瀬 (THE SHALLOWS)"
    },
    "description": {
      "en": "さ (sa), し (shi), す (su), せ (se), そ (so)",
      "id": "さ (sa), し (shi), す (su), せ (se), そ (so)",
      "ja": "さ (sa), し (shi), す (su), せ (se), そ (so)"
    },
    "targetDurationSeconds": 15,
    "itemCount": 5,
    "cards": [
      {
        "id": "h-sa",
        "character": "さ",
        "kanaReading": "さ",
        "sampleWordJp": "さくら (sakura)",
        "sampleWordMeaning": {
          "en": "Cherry blossom",
          "id": "Bunga sakura",
          "ja": "さくら"
        },
        "romaji": "sa",
        "hint": {
          "en": "Derived from '左'. Similar to 'ki' with one crossbar.",
          "id": "Berasal dari kanji '左'. Mirip 'ki' dengan satu garis melintang.",
          "ja": "「左」の草書体から作られた文字。「き」に似て横棒が一本。"
        }
      },
      {
        "id": "h-shi",
        "character": "し",
        "kanaReading": "し",
        "sampleWordJp": "しろ (shiro)",
        "sampleWordMeaning": {
          "en": "White / Castle",
          "id": "Putih / Kastil",
          "ja": "しろ"
        },
        "romaji": "shi",
        "hint": {
          "en": "Derived from '之'. A curved fishing hook in the sea.",
          "id": "Berasal dari kanji '之'. Kail pancing melengkung.",
          "ja": "「之」の草書体から作られた文字。海に沈む釣り針。"
        }
      },
      {
        "id": "h-su",
        "character": "す",
        "kanaReading": "す",
        "sampleWordJp": "すし (sushi)",
        "sampleWordMeaning": {
          "en": "Sushi",
          "id": "Sushi",
          "ja": "すし"
        },
        "romaji": "su",
        "hint": {
          "en": "Derived from '寸'. A spiral loop.",
          "id": "Berasal dari kanji '寸'. Pusaran spiral melingkar.",
          "ja": "「寸」の草書体から作られた文字。くるりと巻いた形。"
        }
      },
      {
        "id": "h-se",
        "character": "せ",
        "kanaReading": "せ",
        "sampleWordJp": "せかい (sekai)",
        "sampleWordMeaning": {
          "en": "World",
          "id": "Dunia",
          "ja": "せかい"
        },
        "romaji": "se",
        "hint": {
          "en": "Derived from '世'. Two people sitting together.",
          "id": "Berasal dari kanji '世'. Dua orang duduk berdampingan.",
          "ja": "「世」の草書体から作られた文字。背中を預けて座る姿。"
        }
      },
      {
        "id": "h-so",
        "character": "そ",
        "kanaReading": "そ",
        "sampleWordJp": "そら (sora)",
        "sampleWordMeaning": {
          "en": "Sky",
          "id": "Langit",
          "ja": "そら"
        },
        "romaji": "so",
        "hint": {
          "en": "Derived from '曽'. Zigzag stitch.",
          "id": "Berasal dari kanji '曽'. Pola zig-zag benang jahit.",
          "ja": "「曽」の草書体から作られた文字。ジグザグの縫い目。"
        }
      }
    ]
  },
  {
    "id": "katakana-vowels",
    "name": {
      "en": "Katakana: Vowels",
      "id": "Katakana: Vowels",
      "ja": "片仮名：母音 (ア・イ・ウ・エ・オ)"
    },
    "category": "katakana",
    "depthName": {
      "en": "The River",
      "id": "The River",
      "ja": "第二海域：激流 (THE RIVER)"
    },
    "description": {
      "en": "ア (a), イ (i), ウ (u), エ (e), オ (o)",
      "id": "ア (a), イ (i), ウ (u), エ (e), オ (o)",
      "ja": "ア (a), イ (i), ウ (u), エ (e), オ (o)"
    },
    "targetDurationSeconds": 15,
    "itemCount": 5,
    "cards": [
      {
        "id": "k-a",
        "character": "ア",
        "kanaReading": "ア",
        "sampleWordJp": "アイス (aisu)",
        "sampleWordMeaning": {
          "en": "Ice cream / Ice",
          "id": "Es krim / Es",
          "ja": "アイス"
        },
        "romaji": "a",
        "hint": {
          "en": "Derived from '阿'. Angular corner of an arrow.",
          "id": "Berasal dari bagian kiri kanji '阿'. Sudut panah tajam.",
          "ja": "「阿」の偏から作られた文字。矢印の尖った角。"
        }
      },
      {
        "id": "k-i",
        "character": "イ",
        "kanaReading": "イ",
        "sampleWordJp": "インク (inku)",
        "sampleWordMeaning": {
          "en": "Ink",
          "id": "Tinta",
          "ja": "インク"
        },
        "romaji": "i",
        "hint": {
          "en": "Derived from '伊' (person radical). Standing sharp.",
          "id": "Berasal dari radikal orang pada '伊'. Garis berdiri miring.",
          "ja": "「伊」の偏（にんべん）から作られた文字。斜めに立つイーゼル。"
        }
      },
      {
        "id": "k-u",
        "character": "ウ",
        "kanaReading": "ウ",
        "sampleWordJp": "ウェブ (webu)",
        "sampleWordMeaning": {
          "en": "Web / Website",
          "id": "Web / Website",
          "ja": "ウェブ"
        },
        "romaji": "u",
        "hint": {
          "en": "Derived from '宇'. Roof crown shape.",
          "id": "Berasal dari bagian atas kanji '宇'. Bentuk atap kuil.",
          "ja": "「宇」の冠から作られた文字。神社の屋根の形。"
        }
      },
      {
        "id": "k-e",
        "character": "エ",
        "kanaReading": "エ",
        "sampleWordJp": "エコー (ekoo)",
        "sampleWordMeaning": {
          "en": "Echo",
          "id": "Gema / Echo",
          "ja": "エコー"
        },
        "romaji": "e",
        "hint": {
          "en": "Derived from '江'. Capital 'I' girder beam.",
          "id": "Berasal dari bagian kanan kanji '江'. Bentuk balok besi 'I'.",
          "ja": "「江」の旁から作られた文字。アルファベットの「I」や鉄骨の形。"
        }
      },
      {
        "id": "k-o",
        "character": "オ",
        "kanaReading": "オ",
        "sampleWordJp": "オレンジ (orenji)",
        "sampleWordMeaning": {
          "en": "Orange",
          "id": "Jeruk / Warna oranye",
          "ja": "オレンジ"
        },
        "romaji": "o",
        "hint": {
          "en": "Derived from '於'. Opera singer with arm stretched.",
          "id": "Berasal dari bagian kiri kanji '於'. Lengan terentang.",
          "ja": "「於」の偏から作られた文字。腕を伸ばして歌うオペラ歌手。"
        }
      }
    ]
  },
  {
    "id": "katakana-k-row",
    "name": {
      "en": "Katakana: K-Row",
      "id": "Katakana: K-Row",
      "ja": "片仮名：カ行 (カ・キ・ク・ケ・コ)"
    },
    "category": "katakana",
    "depthName": {
      "en": "The River",
      "id": "The River",
      "ja": "第二海域：激流 (THE RIVER)"
    },
    "description": {
      "en": "カ (ka), キ (ki), ク (ku), ケ (ke), コ (ko)",
      "id": "カ (ka), キ (ki), ク (ku), ケ (ke), コ (ko)",
      "ja": "カ (ka), キ (ki), ク (ku), ケ (ke), コ (ko)"
    },
    "targetDurationSeconds": 15,
    "itemCount": 5,
    "cards": [
      {
        "id": "k-ka",
        "character": "カ",
        "kanaReading": "カ",
        "sampleWordJp": "カフェ (kafe)",
        "sampleWordMeaning": {
          "en": "Café",
          "id": "Kafe",
          "ja": "カフェ"
        },
        "romaji": "ka",
        "hint": {
          "en": "Derived from '加'. Sharper, angular version of hiragana か.",
          "id": "Berasal dari bagian kiri '加'. Versi tajam bersudut dari 'か'.",
          "ja": "「加」の偏から作られた文字。平仮名「か」の角張った形。"
        }
      },
      {
        "id": "k-ki",
        "character": "キ",
        "kanaReading": "キ",
        "sampleWordJp": "キー (kii)",
        "sampleWordMeaning": {
          "en": "Key",
          "id": "Kunci",
          "ja": "キー"
        },
        "romaji": "ki",
        "hint": {
          "en": "Derived from '幾'. Key without bottom loop.",
          "id": "Berasal dari bagian atas '幾'. Kunci tanpa lekukan bawah.",
          "ja": "「幾」の上部から作られた文字。鍵の上部分。"
        }
      },
      {
        "id": "k-ku",
        "character": "ク",
        "kanaReading": "ク",
        "sampleWordJp": "クラス (kurasu)",
        "sampleWordMeaning": {
          "en": "Class",
          "id": "Kelas",
          "ja": "クラス"
        },
        "romaji": "ku",
        "hint": {
          "en": "Derived from '久'. Sharp blade.",
          "id": "Berasal dari goresan awal '久'. Pisau tajam.",
          "ja": "「久」の初画から作られた文字。料理人の鋭い包丁。"
        }
      },
      {
        "id": "k-ke",
        "character": "ケ",
        "kanaReading": "ケ",
        "sampleWordJp": "ケーキ (keeki)",
        "sampleWordMeaning": {
          "en": "Cake",
          "id": "Kue / Cake",
          "ja": "ケーキ"
        },
        "romaji": "ke",
        "hint": {
          "en": "Derived from '介'. Looks like letter 'K'.",
          "id": "Berasal dari penyederhanaan '介'. Mirip huruf 'K'.",
          "ja": "「介」の略体から作られた文字。アルファベット「K」の形。"
        }
      },
      {
        "id": "k-ko",
        "character": "コ",
        "kanaReading": "コ",
        "sampleWordJp": "コイン (koin)",
        "sampleWordMeaning": {
          "en": "Coin",
          "id": "Koin",
          "ja": "コイン"
        },
        "romaji": "ko",
        "hint": {
          "en": "Derived from '己'. Corner of an open box.",
          "id": "Berasal dari goresan awal '己'. Sudut kotak terbuka.",
          "ja": "「己」の初画から作られた文字。四角い箱の角。"
        }
      }
    ]
  },
  {
    "id": "words-daily-hiragana",
    "name": {
      "en": "Everyday Hiragana Words",
      "id": "Everyday Hiragana Words",
      "ja": "実戦平仮名単語 (日常・アニメ)"
    },
    "category": "words",
    "depthName": {
      "en": "The Reef",
      "id": "The Reef",
      "ja": "第三海域：暗礁 (THE REEF)"
    },
    "description": {
      "en": "ねこ (cat), いぬ (dog), かわいい (cute), すき (like)",
      "id": "ねこ (cat), いぬ (dog), かわいい (cute), すき (like)",
      "ja": "ねこ (猫), いぬ (犬), かわいい (可愛い), すき (好き)"
    },
    "targetDurationSeconds": 25,
    "itemCount": 6,
    "cards": [
      {
        "id": "w-neko",
        "character": "ねこ",
        "kanaReading": "ねこ (ネコ・猫)",
        "sampleWordJp": "黒ねこ (kuro neko / 黒猫)",
        "sampleWordMeaning": {
          "en": "Black cat",
          "id": "Kucing hitam",
          "ja": "黒ねこ"
        },
        "romaji": "neko",
        "hint": {
          "en": "Cat. Traditional anime pet companion.",
          "id": "Kucing. Hewan peliharaan favorit di anime.",
          "ja": "アニメで定番のペット。「ニャー」と鳴く。"
        }
      },
      {
        "id": "w-inu",
        "character": "いぬ",
        "kanaReading": "いぬ (イヌ・犬)",
        "sampleWordJp": "柴いぬ (shiba inu / 柴犬)",
        "sampleWordMeaning": {
          "en": "Shiba dog",
          "id": "Anjing ras Shiba",
          "ja": "柴いぬ"
        },
        "romaji": "inu",
        "hint": {
          "en": "Dog. Man's loyal companion.",
          "id": "Anjing. Sahabat setia manusia.",
          "ja": "忠実な相棒の代表格。"
        }
      },
      {
        "id": "w-kawaii",
        "character": "かわいい",
        "kanaReading": "かわいい (可愛い)",
        "sampleWordJp": "超かわいい (chou kawaii)",
        "sampleWordMeaning": {
          "en": "Super cute!",
          "id": "Lucu banget!",
          "ja": "超かわいい"
        },
        "romaji": "kawaii",
        "hint": {
          "en": "Cute / Adorable. World-famous pop culture phrase.",
          "id": "Lucu / Imut. Kata pop culture Jepang paling populer.",
          "ja": "日本ポップカルチャーを象徴する言葉。"
        }
      },
      {
        "id": "w-suki",
        "character": "すき",
        "kanaReading": "すき (好き)",
        "sampleWordJp": "大好き (daisuki)",
        "sampleWordMeaning": {
          "en": "I love you / I really like it",
          "id": "Aku sangat suka / Aku mencintaimu",
          "ja": "大好き"
        },
        "romaji": "suki",
        "hint": {
          "en": "Like / Fond of. Crucial for anime confession scenes.",
          "id": "Suka / Naksir. Kunci adegan nembak di anime.",
          "ja": "アニメの告白シーンで最重要の台詞。"
        }
      },
      {
        "id": "w-arigatou",
        "character": "ありがとう",
        "kanaReading": "ありがとう (有難う)",
        "sampleWordJp": "どうもありがとう (doumo arigatou)",
        "sampleWordMeaning": {
          "en": "Thank you very much",
          "id": "Terima kasih banyak",
          "ja": "どうもありがとう"
        },
        "romaji": "arigatou",
        "hint": {
          "en": "Thank you. Everyday expression of gratitude.",
          "id": "Terima kasih. Ungkapan rasa syukur paling umum.",
          "ja": "感謝を伝える基本の挨拶。"
        }
      },
      {
        "id": "w-sugoi",
        "character": "すごい",
        "kanaReading": "すごい (凄い)",
        "sampleWordJp": "すっごい！ (suggoi!)",
        "sampleWordMeaning": {
          "en": "So awesome!",
          "id": "Keren abis!",
          "ja": "すっごい！"
        },
        "romaji": "sugoi",
        "hint": {
          "en": "Amazing / Awesome. Iconic anime reaction shout.",
          "id": "Hebat / Keren. Reaksi kagum yang sering diteriakkan di anime.",
          "ja": "アニメの驚き・称賛リアクションの大定番。"
        }
      }
    ]
  },
  {
    "id": "words-anime-katakana",
    "name": {
      "en": "Anime Loanwords (Katakana)",
      "id": "Anime Loanwords (Katakana)",
      "ja": "片仮名実戦外来語 (アニメ・ゲーム)"
    },
    "category": "words",
    "depthName": {
      "en": "The Reef",
      "id": "The Reef",
      "ja": "第三海域：暗礁 (THE REEF)"
    },
    "description": {
      "en": "アニメ (anime), ゲーム (game), ヒーロー (hero)",
      "id": "アニメ (anime), ゲーム (game), ヒーロー (hero)",
      "ja": "アニメ, ゲーム, ヒーロー, コーヒー, ラーメン, テレビ"
    },
    "targetDurationSeconds": 25,
    "itemCount": 6,
    "cards": [
      {
        "id": "w-anime",
        "character": "アニメ",
        "kanaReading": "アニメ (animation)",
        "sampleWordJp": "日本のアニメ (nihon no anime)",
        "sampleWordMeaning": {
          "en": "Japanese anime",
          "id": "Anime buatan Jepang",
          "ja": "日本のアニメ"
        },
        "romaji": "anime",
        "hint": {
          "en": "Short for animation. Japanese animated media.",
          "id": "Singkatan dari kata animation. Animasi Jepang.",
          "ja": "「アニメーション」の略称。世界共通語。"
        }
      },
      {
        "id": "w-geemu",
        "character": "ゲーム",
        "kanaReading": "ゲーム (game)",
        "sampleWordJp": "テレビゲーム (terebi geemu)",
        "sampleWordMeaning": {
          "en": "Video game",
          "id": "Video game",
          "ja": "テレビゲーム"
        },
        "romaji": "geemu",
        "hint": {
          "en": "From English 'game'. Note the long vowel mark 'ー'.",
          "id": "Dari bahasa Inggris 'game'. Perhatikan tanda strip panjang 'ー'.",
          "ja": "英語の『game』から。長音符「ー」に注目。"
        }
      },
      {
        "id": "w-hiiroo",
        "character": "ヒーロー",
        "kanaReading": "ヒーロー (hero)",
        "sampleWordJp": "僕のヒーロー (boku no hiiroo)",
        "sampleWordMeaning": {
          "en": "My hero",
          "id": "Pahlawanku",
          "ja": "僕のヒーロー"
        },
        "romaji": "hiiroo",
        "hint": {
          "en": "Hero. Popularized in anime like My Hero Academia.",
          "id": "Pahlawan (Hero). Populer di anime Boku no Hero Academia.",
          "ja": "英語の『hero』から。『僕のヒーローアカデミア』等。"
        }
      },
      {
        "id": "w-koohii",
        "character": "コーヒー",
        "kanaReading": "コーヒー (珈琲)",
        "sampleWordJp": "ホットコーヒー (hotto koohii)",
        "sampleWordMeaning": {
          "en": "Hot coffee",
          "id": "Kopi panas",
          "ja": "ホットコーヒー"
        },
        "romaji": "koohii",
        "hint": {
          "en": "Coffee. Common café order.",
          "id": "Kopi. Minuman kafe paling umum.",
          "ja": "オランダ語・英語の『coffee』から。"
        }
      },
      {
        "id": "w-raamen",
        "character": "ラーメン",
        "kanaReading": "ラーメン (拉麺)",
        "sampleWordJp": "味噌ラーメン (miso raamen)",
        "sampleWordMeaning": {
          "en": "Miso ramen",
          "id": "Ramen kuah miso",
          "ja": "味噌ラーメン"
        },
        "romaji": "raamen",
        "hint": {
          "en": "Ramen noodles. Naruto's favorite dish.",
          "id": "Mie ramen khas Jepang. Makanan kesukaan Naruto.",
          "ja": "ナルトの大好物。日本の国民食。"
        }
      },
      {
        "id": "w-terebi",
        "character": "テレビ",
        "kanaReading": "テレビ (television)",
        "sampleWordJp": "テレビアニメ (terebi anime)",
        "sampleWordMeaning": {
          "en": "TV anime broadcast",
          "id": "Tayangan anime TV",
          "ja": "テレビアニメ"
        },
        "romaji": "terebi",
        "hint": {
          "en": "Short for television.",
          "id": "Singkatan dari kata television (televisi).",
          "ja": "『television』の略語。"
        }
      }
    ]
  }
];

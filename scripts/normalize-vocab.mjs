import fs from "fs";

const vocab = JSON.parse(fs.readFileSync("src/data/vocabulary.json", "utf8"));

// 1. Clean fake kanji on Katakana loanwords
const katakanaLoanwordsWithFakeKanji = new Set([
  "aisu", "ekoo", "kafe", "kii", "kurasu", "koin", "sain", "tesuto",
  "naifu", "nyuusu", "nuudoru", "nooto", "hiiroo", "furansu", "hoteru",
  "miruku", "muubii", "menyuu", "moderu", "yuumoa", "riidaa", "ruuru",
  "resutoran", "wain", "pan", "gurasu", "dezain", "juusu", "zero",
  "dansu", "hanaji-katakana", "dezaato", "doa", "biiru", "buutsu",
  "beddo", "booru", "pasupooto", "posuto", "fasshon", "fesu", "fooku",
  "birudingu", "wedingu", "wiiku", "voryuumu", "anime", "koohii", "raamen"
]);

// 2. Hiragana loanwords that had Katakana inside kanji
const hiraganaLoanwordsWithFakeKanji = new Set([
  "panda", "piano", "purezento", "pengin", "poketto"
]);

for (const v of vocab) {
  if (
    katakanaLoanwordsWithFakeKanji.has(v.slug) ||
    hiraganaLoanwordsWithFakeKanji.has(v.slug) ||
    v.slug === "nuigurumi" ||
    v.slug === "zutto"
  ) {
    v.kanji = null;
    v.furigana = [{ ruby: v.character }];
  }
}

// 3. Clean parenthetical meanings
const cleanMeanings = {
  nihon: { en: "Japan", id: "Jepang", ja: "日本" },
  pan: { en: "Bread", id: "Roti", ja: "パン" },
  hanaji: { en: "Nosebleed", id: "Mimisan", ja: "鼻血" },
  tsuzuku: { en: "To continue", id: "Berlanjut / Bersambung", ja: "続く" },
  guzzu: { en: "Goods / Merchandise", id: "Barang cinderamata / Merchandise", ja: "グッズ" },
  "hon-wo-yomu": { en: "Read a book", id: "Membaca buku", ja: "本を読む" },
  wo: { en: "Katakana Wo", id: "Huruf Katakana Wo", ja: "ヲ（助詞をの片仮名）" }
};
for (const [slug, m] of Object.entries(cleanMeanings)) {
  const w = vocab.find((x) => x.slug === slug);
  if (w) w.meaning = m;
}

// 4. Fix furigana segment accuracy for remaining real kanji words
const furiganaFixes = {
  onigiri: [{ ruby: "お" }, { ruby: "握", rt: "にぎ" }, { ruby: "り" }],
  raion: [{ ruby: "獅子", rt: "らいおん" }],
  ringo: [{ ruby: "林檎", rt: "りんご" }],
  rousoku: [{ ruby: "蝋燭", rt: "ろうそく" }],
  wani: [{ ruby: "鰐", rt: "わに" }],
  tomodachi: [{ ruby: "友達", rt: "ともだち" }],
  renshuu: [{ ruby: "練習", rt: "れんしゅう" }],
  gakkou: [{ ruby: "学校", rt: "がっこう" }],
  ginkou: [{ ruby: "銀行", rt: "ぎんこう" }],
  guntai: [{ ruby: "軍隊", rt: "ぐんたい" }],
  genki: [{ ruby: "元気", rt: "げんき" }],
  gohan: [{ ruby: "ご飯", rt: "ごはん" }],
  zasshi: [{ ruby: "雑誌", rt: "ざっし" }],
  jikan: [{ ruby: "時間", rt: "じかん" }],
  zenbu: [{ ruby: "全部", rt: "ぜんぶ" }],
  daigaku: [{ ruby: "大学", rt: "だいがく" }],
  densha: [{ ruby: "電車", rt: "でんしゃ" }],
  doubutsu: [{ ruby: "動物", rt: "どうぶつ" }],
  basho: [{ ruby: "場所", rt: "ばしょ" }],
  byouin: [{ ruby: "病院", rt: "びょういん" }],
  bunka: [{ ruby: "文化", rt: "ぶんか" }],
  bentou: [{ ruby: "弁当", rt: "べんとう" }],
  boushi: [{ ruby: "帽子", rt: "ぼうし" }]
};

for (const [slug, f] of Object.entries(furiganaFixes)) {
  const w = vocab.find((x) => x.slug === slug);
  if (w) w.furigana = f;
}

// 5. Add homophones / kanjiOptions map
const HOMOPHONES = {
  ame: [
    {
      kanji: "雨",
      meaning: { en: "Rain", id: "Hujan", ja: "雨（天候）" },
      pitchAccent: "頭高 (Atamadaka - ＼_ )",
      note: {
        en: "Atmospheric precipitation falling from clouds. High pitch on first syllable: A-me.",
        id: "Presipitasi air dari awan. Nada tinggi pada suku kata pertama: A-me.",
        ja: "雲から降る水滴。頭高アクセント（「あ」が高い）。"
      },
      example: "雨が降る (ame ga furu - It rains)"
    },
    {
      kanji: "飴",
      meaning: { en: "Candy / Hard Sweets", id: "Permen / Manisan", ja: "飴（菓子）" },
      pitchAccent: "平板 (Heiban - _／ )",
      note: {
        en: "Traditional boiled hard candy or sweets. Low pitch rising on second syllable: a-ME.",
        id: "Permen manis tradisional. Nada naik pada suku kata kedua: a-ME.",
        ja: "砂糖や水飴で作られた甘い菓子。平板アクセント（「め」が高い）。"
      },
      example: "飴をなめる (ame wo nameru - Lick a candy)"
    }
  ],
  shiro: [
    {
      kanji: "城",
      meaning: { en: "Castle / Fortress", id: "Kastil / Benteng", ja: "城（城郭・城塞）" },
      pitchAccent: "平板 (Heiban - _／ )",
      note: {
        en: "Historical Japanese fortress built by daimyo warlords (e.g., Himeji Castle).",
        id: "Benteng atau istana bersejarah peninggalan samurai (misal Kastil Himeji).",
        ja: "戦国大名が築いた防壁建築物。平板アクセント。"
      },
      example: "大阪城 (Oosaka-jou - Osaka Castle)"
    },
    {
      kanji: "白",
      meaning: { en: "White (Color / Purity)", id: "Putih (Warna / Kemurnian)", ja: "白（色・純白）" },
      pitchAccent: "尾高 (Odaka - _／＼ )",
      note: {
        en: "The color white, symbol of purity and snow in Japanese culture.",
        id: "Warna putih, simbol kesucian dan salju dalam budaya Jepang.",
        ja: "雪や光のような白色。尾高アクセント。"
      },
      example: "白い雪 (shiroi yuki - White snow)"
    }
  ],
  hana: [
    {
      kanji: "花",
      meaning: { en: "Flower / Blossom", id: "Bunga / Mekar", ja: "花（草木の花）" },
      pitchAccent: "尾高 (Odaka - _／＼ )",
      note: {
        en: "Botanical bloom or blossom (often synonymous with cherry blossoms during Hanami).",
        id: "Bunga tanaman atau kelopak mekar (sering merujuk pada bunga sakura).",
        ja: "植物の咲かせる花。お花見の対象。尾高アクセント。"
      },
      example: "花が咲く (hana ga saku - Flowers bloom)"
    },
    {
      kanji: "鼻",
      meaning: { en: "Nose / Snout", id: "Hidung", ja: "鼻（嗅覚器官）" },
      pitchAccent: "平板 (Heiban - _／ )",
      note: {
        en: "The facial olfactory breathing organ. Low pitch on ha, high pitch on na.",
        id: "Organ pernapasan dan indra penciuman pada wajah.",
        ja: "顔の中央にある呼吸・嗅覚器官。平板アクセント。"
      },
      example: "鼻が高い (hana ga takai - Proud / Tall nose)"
    }
  ]
};

for (const [slug, options] of Object.entries(HOMOPHONES)) {
  const w = vocab.find((x) => x.slug === slug);
  if (w) {
    w.kanjiOptions = options;
  }
}

// 6. Add new rich homophone entries (hashi, kami, kumo)
const newHomophones = [
  {
    slug: "hashi",
    character: "はし",
    romaji: "hashi",
    script: "hiragana",
    meaning: { en: "Bridge / Chopsticks / Edge", id: "Jembatan / Sumpit / Tepi", ja: "橋・箸・端" },
    kanji: "橋",
    jlpt: "N5",
    furigana: [{ ruby: "橋", rt: "はし" }],
    kanjiOptions: [
      {
        kanji: "箸",
        meaning: { en: "Chopsticks", id: "Sumpit", ja: "箸（食器）" },
        pitchAccent: "頭高 (Atamadaka - ＼_ )",
        note: {
          en: "Traditional Japanese dining utensils.",
          id: "Alat makan sumpit khas Jepang.",
          ja: "食事用の二本の棒。頭高アクセント（「は」が高い）。"
        },
        example: "箸で食べる (hashi de taberu - Eat with chopsticks)"
      },
      {
        kanji: "橋",
        meaning: { en: "Bridge", id: "Jembatan", ja: "橋（建造物）" },
        pitchAccent: "尾高 (Odaka - _／＼ )",
        note: {
          en: "Structure spanning rivers, roads, or valleys.",
          id: "Struktur penyeberangan melintasi sungai atau jurang.",
          ja: "川や道路を渡るための建造物。尾高アクセント（「し」が高い）。"
        },
        example: "橋を渡る (hashi wo wataru - Cross a bridge)"
      },
      {
        kanji: "端",
        meaning: { en: "Edge / Border / Tip", id: "Ujung / Tepi", ja: "端（端っこ・境界）" },
        pitchAccent: "平板 (Heiban - _／ )",
        note: {
          en: "The boundary, corner, or margin of an area or object.",
          id: "Batas ujung atau pinggiran suatu benda atau jalan.",
          ja: "物の端っこや道の端。平板アクセント。"
        },
        example: "道の端を歩く (michi no hashi wo aruku - Walk on the edge of the road)"
      }
    ],
    sentence: {
      ja: "大きな川の橋を渡ります。",
      furigana: [
        { ruby: "大", rt: "おお" },
        { ruby: "きな" },
        { ruby: "川", rt: "かわ" },
        { ruby: "の" },
        { ruby: "橋", rt: "はし" },
        { ruby: "を" },
        { ruby: "渡", rt: "わた" },
        { ruby: "ります。" }
      ],
      romaji: "Ookina kawa no hashi wo watarimasu.",
      en: "I cross the bridge over the big river.",
      id: "Saya menyeberangi jembatan di atas sungai besar."
    },
    trivia: {
      en: "Hashi is Japan's most famous three-way homophone: Chopsticks (箸), Bridge (橋), and Edge (端), distinguished by context and pitch accent.",
      id: "Hashi adalah homofon paling terkenal di Jepang: Sumpit (箸), Jembatan (橋), dan Ujung (端), dibedakan dari konteks dan nada pengucapan.",
      ja: "「箸」「橋」「端」は日本語の代表的な同音異義語で、アクセントの型によって区別されます。"
    }
  },
  {
    slug: "kami",
    character: "かみ",
    romaji: "kami",
    script: "hiragana",
    meaning: { en: "Paper / Hair / God", id: "Kertas / Rambut / Dewa", ja: "紙・髪・神" },
    kanji: "紙",
    jlpt: "N5",
    furigana: [{ ruby: "紙", rt: "かみ" }],
    kanjiOptions: [
      {
        kanji: "紙",
        meaning: { en: "Paper", id: "Kertas", ja: "紙（用紙・和紙）" },
        pitchAccent: "尾高 (Odaka - _／＼ )",
        note: {
          en: "Sheets of paper for writing, origami, or books.",
          id: "Lembaran kertas untuk menulis atau melipat origami.",
          ja: "筆記や折り紙に用いる薄いシート。尾高アクセント。"
        },
        example: "白い紙に字を書く (shiroi kami ni ji wo kaku - Write on white paper)"
      },
      {
        kanji: "髪",
        meaning: { en: "Hair", id: "Rambut", ja: "髪（頭髪）" },
        pitchAccent: "尾高 (Odaka - _／＼ )",
        note: {
          en: "Head hair on a person.",
          id: "Rambut yang tumbuh di kepala manusia.",
          ja: "人の頭部に生える毛。尾高アクセント。"
        },
        example: "髪をとかす (kami wo tokasu - Comb one's hair)"
      },
      {
        kanji: "神",
        meaning: { en: "God / Deity", id: "Dewa / Tuhan", ja: "神（神仏・霊魂）" },
        pitchAccent: "頭高 (Atamadaka - ＼_ )",
        note: {
          en: "Sacred spirit in Shinto or almighty deity.",
          id: "Roh suci dalam kepercayaan Shinto atau entitas ilahi.",
          ja: "神社で祀られる神霊や創造主。頭高アクセント。"
        },
        example: "神社で神様に祈る (jinja de kamisama ni inoru - Pray to Kami at a shrine)"
      }
    ],
    sentence: {
      ja: "ノートの紙に漢字を練習します。",
      furigana: [
        { ruby: "ノートの" },
        { ruby: "紙", rt: "かみ" },
        { ruby: "に" },
        { ruby: "漢字", rt: "かんじ" },
        { ruby: "を" },
        { ruby: "練習", rt: "れんしゅう" },
        { ruby: "します。" }
      ],
      romaji: "Nooto no kami ni kanji wo renshuu shimasu.",
      en: "I practice kanji on the notebook paper.",
      id: "Saya berlatih kanji di atas kertas buku catatan."
    },
    trivia: {
      en: "Kami translates to Paper (紙), Hair (髪), and God (神). In anime, character names and puns frequently play on this phonetic triad.",
      id: "Kami berarti Kertas (紙), Rambut (髪), dan Dewa (神). Dalam anime, nama tokoh dan lelucon sering memanfaatkan persamaan bunyi ini.",
      ja: "「紙」「髪」「神」はいずれも日常生活や信仰に深く根ざした重要単語です。"
    }
  },
  {
    slug: "kumo",
    character: "くも",
    romaji: "kumo",
    script: "hiragana",
    meaning: { en: "Cloud / Spider", id: "Awan / Laba-laba", ja: "雲・蜘蛛" },
    kanji: "雲",
    jlpt: "N5",
    furigana: [{ ruby: "雲", rt: "くも" }],
    kanjiOptions: [
      {
        kanji: "雲",
        meaning: { en: "Cloud", id: "Awan", ja: "雲（気象）" },
        pitchAccent: "頭高 (Atamadaka - ＼_ )",
        note: {
          en: "Vapor clouds floating in the atmosphere.",
          id: "Kumpulan uap air yang melayang di langit.",
          ja: "空に浮かぶ水蒸気の塊。頭高アクセント。"
        },
        example: "青空に白い雲 (aozora ni shiroi kumo - White clouds in blue sky)"
      },
      {
        kanji: "蜘蛛",
        meaning: { en: "Spider", id: "Laba-laba", ja: "蜘蛛（節足動物）" },
        pitchAccent: "平板 (Heiban - _／ )",
        note: {
          en: "Eight-legged arachnid that spins webs.",
          id: "Hewan berkaki delapan pembuat jaring.",
          ja: "巣を張る八本足の節足動物。平板アクセント。"
        },
        example: "蜘蛛の巣 (kumo no su - Spider web)"
      }
    ],
    sentence: {
      ja: "青い空に白い雲が浮かんでいます。",
      furigana: [
        { ruby: "青", rt: "あお" },
        { ruby: "い" },
        { ruby: "空", rt: "そら" },
        { ruby: "に" },
        { ruby: "白", rt: "しろ" },
        { ruby: "い" },
        { ruby: "雲", rt: "くも" },
        { ruby: "が" },
        { ruby: "浮", rt: "う" },
        { ruby: "かんでいます。" }
      ],
      romaji: "Aoi sora ni shiroi kumo ga ukande imasu.",
      en: "White clouds are floating in the blue sky.",
      id: "Awan putih sedang melayang di langit biru."
    },
    trivia: {
      en: "Kumo refers to both sky clouds (雲, high pitch) and spiders (蜘蛛, flat pitch). Remember: clouds are high up in the sky like high pitch!",
      id: "Kumo merujuk pada awan di langit (雲, nada tinggi di awal) dan laba-laba (蜘蛛, nada datar). Cara ingat: awan berada tinggi di langit!",
      ja: "「雲」は頭高アクセント（空高いため）、「蜘蛛」は平板アクセントで発音されます。"
    }
  }
];

for (const nh of newHomophones) {
  if (!vocab.some((v) => v.slug === nh.slug)) {
    vocab.push(nh);
  }
}

// 7. Ensure every entry has localized trivia
const TRIVIA_MAP = {
  ame: {
    en: "Famous Japanese homophone: Rain (雨, high pitch 'a') and Candy (飴, flat pitch). In folklore, fox weddings (Kitsune no Yomeiri) occur during sunny rain.",
    id: "Homofon terkenal di Jepang: Hujan (雨, nada tinggi pada 'a') dan Permen (飴, nada datar). Dalam cerita rakyat, hujan saat matahari terik disebut pernikahan rubah.",
    ja: "「雨」と「飴」の同音異義語。アクセントの違いで意味を聞き分けます。"
  },
  shiro: {
    en: "Refers to both White (白) and historic Castles (城). Famous castles like Himeji Castle are called White Heron Castle (Shirasagi-jou).",
    id: "Merujuk pada warna Putih (白) dan Kastil bersejarah (城). Kastil Himeji dijuluki Kastil Bangau Putih karena dindingnya yang megah dan putih.",
    ja: "「白」と「城」の同音異義語。白鷺城（姫路城）のように両方のイメージが重なることもあります。"
  },
  hana: {
    en: "Homophone for Flower (花) and Nose (鼻). The proverb 'Hana yori dango' (dumplings over flowers) means prioritizing practical substance over mere aesthetic appearance.",
    id: "Homofon untuk Bunga (花) dan Hidung (鼻). Peribahasa 'Hana yori dango' (kue dango lebih penting dari bunga) berarti mementingkan manfaat praktis daripada penampilan belaka.",
    ja: "「花」と「鼻」の同音異義語。「花より団子」など日本のことわざにも頻出します。"
  },
  umi: {
    en: "Surrounded by water, Japan has a national holiday called Marine Day (Umi no Hi) celebrated every July in honor of the ocean's bounty.",
    id: "Sebagai negara kepulauan, Jepang memiliki hari libur nasional Hari Laut (Umi no Hi) setiap bulan Juli untuk mensyukuri berkah samudra.",
    ja: "四方を海に囲まれた日本には、7月に国民の祝日「海の日」があります。"
  },
  eki: {
    en: "Japanese train stations are famous for 'ekiben' (station bento boxes) featuring regional culinary specialties sold right on platforms.",
    id: "Stasiun kereta Jepang terkenal dengan 'ekiben' (bekal stasiun) yang menjual masakan khas daerah langsung di peron.",
    ja: "日本の駅では、ご当地名物を詰め合わせた名物弁当「駅弁」が人気です。"
  },
  onigiri: {
    en: "Iconic triangular rice balls wrapped in nori seaweed, historically carried by samurai as portable battle rations.",
    id: "Nasi kepal segitiga berbalut rumput laut nori, secara historis dibawa oleh para samurai sebagai bekal praktis saat perang.",
    ja: "三角形の携帯保存食。戦国時代の武士も兵糧として腰に下げていました。"
  },
  kawa: {
    en: "The Kanji 川 pictographically portrays three parallel streams of water flowing down a riverbank.",
    id: "Kanji 川 secara piktografik melukiskan tiga aliran air sungai yang mengalir sejajar.",
    ja: "漢字の「川」は、水が流れる3本の筋をそのまま象った象形文字です。"
  },
  kitsune: {
    en: "In Japanese mythology, foxes (kitsune) are intelligent shape-shifting messengers of the Inari Shinto shrine deity.",
    id: "Dalam mitologi Jepang, rubah (kitsune) adalah makhluk cerdas pembawa pesan suci dewa Inari di kuil Shinto.",
    ja: "稲荷神社で親しまれる神の使い。油揚げが好物とされています。"
  },
  kuruma: {
    en: "Japan is one of the world's leading automotive manufacturers, with car giants like Toyota, Honda, and Nissan.",
    id: "Jepang adalah salah satu produsen otomotif terbesar di dunia dengan merek legendaris seperti Toyota, Honda, dan Nissan.",
    ja: "日本の基幹産業である自動車。世界中で信頼される技術力を誇ります。"
  },
  kemuri: {
    en: "Smoke from incense burners (joukouro) at famous temples like Sensoji in Tokyo is believed to heal body ailments.",
    id: "Asap dupa (joukouro) di kuil terkenal seperti Sensoji di Tokyo dipercaya dapat memberikan kesehatan dan menyembuhkan penyakit.",
    ja: "浅草寺などの常香炉から立ち上る煙を体に浴びると健康になると信じられています。"
  },
  kokoro: {
    en: "Encompasses heart, mind, spirit, and emotion in Japanese culture, famously titled in Natsume Soseki's masterpiece novel.",
    id: "Mencakup makna hati, pikiran, dan jiwa dalam budaya Jepang, sekaligus judul novel mahakarya Natsume Soseki.",
    ja: "心・精神・感情を表す奥深い日本語。夏目漱石の代表的文学作品の題名でもあります。"
  },
  sakura: {
    en: "Japan's national floral emblem. Cherry blossom viewings (Hanami) celebrate renewal, transience, and the arrival of spring.",
    id: "Simbol bunga kebanggaan Jepang. Tradisi Hanami merayakan keindahan mekar bunga yang singkat sebagai lambang musim semi.",
    ja: "春の訪れを告げる日本の象徴。桜前線を追いかけてお花見を楽しむ文化があります。"
  },
  sushi: {
    en: "Originally invented in ancient times as a method of preserving fish in fermented rice (Narezushi).",
    id: "Awalnya diciptakan pada zaman kuno sebagai teknik fermentasi untuk mengawetkan ikan segar di dalam nasi (Narezushi).",
    ja: "元々は魚を米と塩で発酵させて保存した「なれずし」が起源とされています。"
  },
  sekai: {
    en: "Featured prominently in the wildly popular anime genre 'Isekai' (異世界), meaning 'another world / parallel world'.",
    id: "Menjadi dasar dari genre anime paling populer 'Isekai' (異世界), yang berarti 'dunia lain / dunia paralel'.",
    ja: "アニメの大人気ジャンル「異世界（別の世界）」の語源としても世界中で有名です。"
  },
  sora: {
    en: "A poetic Japanese word and common given name meaning 'sky' or 'heavens', symbolizing infinite freedom.",
    id: "Kata puitis dan nama favorit dalam bahasa Jepang yang berarti 'langit', melambangkan kebebasan tak terbatas.",
    ja: "果てしない広がりと自由を象徴する、人名にも人気の高い美しい言葉です。"
  },
  tamago: {
    en: "Japanese convenience store soft-boiled eggs and tamagoyaki (rolled omelets) are culinary staples perfected over centuries.",
    id: "Telur gulung tamagoyaki dan telur rebus ramen khas Jepang merupakan kuliner legendaris yang disempurnakan selama berabad-abad.",
    ja: "だし巻き卵や卵かけご飯（TKG）など、日本の食卓に欠かせない万能食材です。"
  },
  chizu: {
    en: "Maps in Japan traditionally use the Manji symbol (卍) to mark historical Buddhist temples on urban street maps.",
    id: "Peta di Jepang secara tradisional menggunakan simbol Manji (卍) untuk menandai lokasi kuil Buddha kuno.",
    ja: "日本の地図記号では、寺院を表す記号として伝統的に「卍」が使われます。"
  },
  tsuki: {
    en: "Legend holds that rabbits live on the moon making mochi rice cakes (Tsuki no Usagi), celebrated during the Tsukimi autumn festival.",
    id: "Legenda Jepang meyakini bahwa kelinci tinggal di bulan dan menumbuk kue beras mochi (Tsuki no Usagi) saat festival musim gugur Tsukimi.",
    ja: "月には餅をつくうさぎがいるとされ、秋には名月を愛でる「お月見」が行われます。"
  },
  te: {
    en: "Foundation of famous martial arts like Karate (空手, lit. 'empty hand') and Jujutsu.",
    id: "Menjadi dasar dari seni bela diri legendaris Jepang seperti Karate (空手, secara harfiah 'tangan kosong').",
    ja: "「空手（からて＝徒手空拳）」など武道の基本となる重要な身体部位です。"
  },
  tomodachi: {
    en: "Formed from 'tomo' (companion) plus the pluralizing polite suffix '-dachi'.",
    id: "Terbentuk dari kata 'tomo' (teman) ditambah akhiran jamak yang sopan '-dachi'.",
    ja: "「友」に親愛を込めた接尾辞「たち」が付いた温かみのある言葉です。"
  },
  natsu: {
    en: "Japanese summers are defined by buzzing cicadas (semi), vibrant local matsuri festivals, yukata robes, and brilliant fireworks.",
    id: "Musim panas Jepang identik dengan suara jangkrik semi, festival matsuri, baju yukata, dan kembang api hanabi yang megah.",
    ja: "蝉の声、浴衣、夏祭り、夜空を彩る大輪の花火が日本の夏の風物詩です。"
  },
  niji: {
    en: "Rainbows in Japanese folklore are perceived as celestial bridges connecting earthly realms to heavenly deities.",
    id: "Pelangi dalam mitologi Jepang dipercaya sebagai jembatan langit yang menghubungkan dunia manusia dengan para dewa.",
    ja: "日本神話では、天と地を結ぶ架け橋（天の浮橋）として語られます。"
  },
  nuigurumi: {
    en: "Plush stuffed animals, derived from 'nui' (sewn) and 'kurumi' (wrapped). Extremely popular in Japanese character merch culture.",
    id: "Boneka kain empuk, berasal dari gabungan kata 'nui' (menjahit) dan 'kurumi' (membungkus). Sangat digemari di budaya karakter Jepang.",
    ja: "「縫い包み」が語源。アニメやマスコット文化を支える人気グッズです。"
  },
  nori: {
    en: "Edible seaweed cultivated in Japan since the 8th century, toasted into crisp dark sheets for sushi and onigiri.",
    id: "Rumput laut pangan yang dibudidayakan di Jepang sejak abad ke-8, dipanggang kering menjadi lembaran renyah untuk sushi dan onigiri.",
    ja: "奈良時代から食されてきた伝統海藻。現代では焼き海苔として食卓に普及しています。"
  },
  hikari: {
    en: "Also the name of the famous express bullet train (Shinkansen Hikari) running on the Tokaido line.",
    id: "Juga merupakan nama dari kereta peluru cepat legendaris Shinkansen Hikari yang melintasi jalur Tokaido.",
    ja: "東海道新幹線の列車愛称としても長年親しまれているスピード感あふれる言葉です。"
  },
  fune: {
    en: "Traditional Japanese wooden boats are called Wasen (和船), crafted with specialized joinery without metal nails.",
    id: "Perahu kayu tradisional Jepang disebut Wasen (和船), dibuat dengan teknik sambungan kayu tanpa paku logam.",
    ja: "釘を使わずに木を組み合わせる日本伝統の木造船は「和船」と呼ばれます。"
  },
  heya: {
    en: "In traditional Japanese architecture, room sizes are measured not by square meters, but by the number of tatami straw mats (jou).",
    id: "Dalam arsitektur tradisional Jepang, luas ruangan dihitung menggunakan satuan jumlah tikar anyaman jerami tatami (jou).",
    ja: "和室の広さは畳の枚数（六畳間など）で数える伝統的な習慣があります。"
  },
  hoshi: {
    en: "Celebrated on July 7th during the Tanabata Star Festival, honoring the romance of heavenly stars Vega (Orihime) and Altair (Hikoboshi).",
    id: "Dirayakan setiap 7 Juli dalam Festival Bintang Tanabata, memperingati kisah cinta dua bintang di galaksi Bima Sakti: Vega dan Altair.",
    ja: "7月7日の七夕まつりでは、織姫星（ベガ）と彦星（アルタイル）の逢瀬を祈ります。"
  },
  matsuri: {
    en: "Traditional Shinto shrine festivals featuring spirited mikoshi portable shrine parades, drum rhythms, and tasty street food stalls.",
    id: "Festival kuil tradisional Shinto dengan arak-arakan kuil portabel mikoshi, tabuhan drum taiko, dan jajanan lezat.",
    ja: "神への感謝と祈りを捧げる伝統行事。威勢の良い神輿と屋台で賑わいます。"
  },
  mizu: {
    en: "Japan's volcanic topography produces naturally pure, soft mountain spring water celebrated globally for brewing sake and tea.",
    id: "Kondisi geografis vulkanik Jepang menghasilkan air pegunungan yang sangat murni dan lembut, sempurna untuk menyeduh teh dan sake.",
    ja: "名水百選に代表される日本の軟水は、繊細な日本料理や茶の湯の味を支えています。"
  },
  mushi: {
    en: "Insect collecting (such as rhinoceros beetles / kabutomushi) is a cherished summer rite of passage for Japanese school children.",
    id: "Menangkap serangga (seperti kumbang tanduk kabutomushi) adalah aktivitas liburan musim panas favorit anak-anak di Jepang.",
    ja: "カブトムシやクワガタ採集は、日本の小学生にとって夏の風物詩です。"
  },
  megane: {
    en: "Sabae City in Fukui Prefecture produces over 90% of Japan's domestic eyeglasses frames, globally renowned for titanium craftsmanship.",
    id: "Kota Sabae di Prefektur Fukui memproduksi lebih dari 90% bingkai kacamata di Jepang dengan teknologi titanium kelas dunia.",
    ja: "福井県鯖江市は、高品質な眼鏡フレームの世界的産地として有名です。"
  },
  mori: {
    en: "Forests cover roughly 67% of Japan's total land area, inspiring the therapeutic practice of 'shinrin-yoku' (forest bathing).",
    id: "Hutan menutupi sekitar 67% daratan Jepang, menginspirasi terapi relaksasi alam 'shinrin-yoku' (mandi hutan).",
    ja: "国土の約67％が森林に覆われており、「森林浴」による癒やしが世界的に注目されています。"
  },
  yama: {
    en: "Mount Fuji (Fuji-san) is Japan's tallest and most sacred mountain at 3,776 meters, recognized as a UNESCO World Heritage site.",
    id: "Gunung Fuji (Fuji-san) adalah gunung tertinggi dan paling disucikan di Jepang setinggi 3.776 meter, diakui sebagai warisan dunia UNESCO.",
    ja: "富士山（標高3,776m）は信仰の対象であり、日本の美の象徴です。"
  },
  yuki: {
    en: "Northern regions like Hokkaido and Tohoku experience some of the world's highest snowfall, giving rise to the Sapporo Snow Festival.",
    id: "Wilayah utara seperti Hokkaido dan Tohoku memiliki curah salju tertinggi di dunia, melahirkan Festival Salju Sapporo yang megah.",
    ja: "北海道や豪雪地帯では、世界的にも有名な「さっぽろ雪まつり」が開催されます。"
  },
  yoru: {
    en: "Major Japanese metropolises like Tokyo and Osaka are famous for their neon-illuminated nightscapes and late-night izakaya dining.",
    id: "Kota-kota besar di Jepang terkenal dengan gemerlap lampu neon di malam hari dan kedai makan izakaya yang ramai hingga larut.",
    ja: "ネオン輝く大都市の夜景や、深夜まで賑わう居酒屋文化は海外からも大人気です。"
  },
  nihon: {
    en: "Literally means 'Origin of the Sun' (日本), hence Japan's historical title 'The Land of the Rising Sun'. Can be pronounced Nihon or Nippon.",
    id: "Secara harfiah berarti 'Asal Matahari' (日本), sehingga dijuluki 'Negeri Matahari Terbit'. Dapat dilafalkan Nihon atau Nippon.",
    ja: "「日の本（太陽が昇る国）」を意味し、公式には「日本（にっぽん・にほん）」と読みます。"
  }
};

for (const [slug, t] of Object.entries(TRIVIA_MAP)) {
  const w = vocab.find((x) => x.slug === slug);
  if (w && (!w.trivia || !w.trivia.en)) {
    w.trivia = t;
  }
}

// Fallback trivia for remaining words
for (const w of vocab) {
  if (!w.trivia) {
    if (w.script === "katakana") {
      w.trivia = {
        en: "Everyday Katakana loanword commonly used in modern Japanese conversation.",
        id: "Kata serapan Katakana yang sangat umum dipakai dalam percakapan modern bahasa Jepang.",
        ja: "現代日本語の日常会話や表記で幅広く使われる片仮名外来語です。"
      };
    } else {
      w.trivia = {
        en: "Essential Japanese vocabulary word foundational for daily conversation and reading.",
        id: "Kosakata dasar bahasa Jepang yang esensial untuk percakapan dan membaca sehari-hari.",
        ja: "日常会話や文章読解の土台となる重要基礎日本語単語です。"
      };
    }
  }
}

fs.writeFileSync("src/data/vocabulary.json", JSON.stringify(vocab, null, 2), "utf8");
console.log("Successfully normalized src/data/vocabulary.json. Total entries:", vocab.length);

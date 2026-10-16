import fs from "fs";

// Load vocabulary.json
const rawVocab = JSON.parse(fs.readFileSync("./src/data/vocabulary.json", "utf8"));

// 1. Enrich vocabulary with:
// kanji: Kanji representation or null for pure katakana loanwords
// jlpt: "N5" | "N4" | "Anime"
// furigana: Array of { ruby: string, rt?: string } or string representation with ruby
// sentence: { ja: string, furigana: Array<{ ruby: string, rt?: string }>, romaji: string, en: string, id: string }

// Define dictionary map for all 161 words
const vocabMeta = {
  // Hiragana Core
  "sakana": {
    kanji: "魚",
    jlpt: "N5",
    furigana: [{ ruby: "魚", rt: "さかな" }],
    sentence: {
      ja: "海で魚が泳いでいます。",
      furigana: [
        { ruby: "海", rt: "うみ" },
        { ruby: "で" },
        { ruby: "魚", rt: "さかな" },
        { ruby: "が" },
        { ruby: "泳", rt: "およ" },
        { ruby: "いでいます。" }
      ],
      romaji: "Umi de sakana ga oyoide imasu.",
      en: "Fish are swimming in the sea.",
      id: "Ikan sedang berenang di laut."
    }
  },
  "ame": {
    kanji: "雨",
    jlpt: "N5",
    furigana: [{ ruby: "雨", rt: "あめ" }],
    sentence: {
      ja: "今日は雨が降っています。",
      furigana: [
        { ruby: "今日", rt: "きょう" },
        { ruby: "は" },
        { ruby: "雨", rt: "あめ" },
        { ruby: "が" },
        { ruby: "降", rt: "ふ" },
        { ruby: "っています。" }
      ],
      romaji: "Kyou wa ame ga futte imasu.",
      en: "It is raining today.",
      id: "Hari ini hujan turun."
    }
  },
  "inu": {
    kanji: "犬",
    jlpt: "N5",
    furigana: [{ ruby: "犬", rt: "いぬ" }],
    sentence: {
      ja: "公園で犬と散歩します。",
      furigana: [
        { ruby: "公園", rt: "こうえん" },
        { ruby: "で" },
        { ruby: "犬", rt: "いぬ" },
        { ruby: "と" },
        { ruby: "散歩", rt: "さんぽ" },
        { ruby: "します。" }
      ],
      romaji: "Kouen de inu to sanpo shimasu.",
      en: "I walk with the dog in the park.",
      id: "Saya jalan-jalan dengan anjing di taman."
    }
  },
  "umi": {
    kanji: "海",
    jlpt: "N5",
    furigana: [{ ruby: "海", rt: "うみ" }],
    sentence: {
      ja: "夏の海はとても青いです。",
      furigana: [
        { ruby: "夏", rt: "なつ" },
        { ruby: "の" },
        { ruby: "海", rt: "うみ" },
        { ruby: "はとても" },
        { ruby: "青", rt: "あお" },
        { ruby: "いです。" }
      ],
      romaji: "Natsu no umi wa totemo aoi desu.",
      en: "The summer ocean is very blue.",
      id: "Laut di musim panas sangat biru."
    }
  },
  "eki": {
    kanji: "駅",
    jlpt: "N5",
    furigana: [{ ruby: "駅", rt: "えき" }],
    sentence: {
      ja: "駅の前で友達を待ちます。",
      furigana: [
        { ruby: "駅", rt: "えき" },
        { ruby: "の" },
        { ruby: "前", rt: "まえ" },
        { ruby: "で" },
        { ruby: "友達", rt: "ともだち" },
        { ruby: "を" },
        { ruby: "待", rt: "ま" },
        { ruby: "ちます。" }
      ],
      romaji: "Eki no mae de tomodachi wo machimasu.",
      en: "I wait for my friend in front of the station.",
      id: "Saya menunggu teman di depan stasiun."
    }
  },
  "onigiri": {
    kanji: "お握り",
    jlpt: "N5",
    furigana: [{ ruby: "お" }, { ruby: "握", rt: "にぎ" }, { ruby: "り" }],
    sentence: {
      ja: "お昼におにぎりを食べます。",
      furigana: [
        { ruby: "お" },
        { ruby: "昼", rt: "ひる" },
        { ruby: "に" },
        { ruby: "おにぎり" },
        { ruby: "を" },
        { ruby: "食", rt: "た" },
        { ruby: "べます。" }
      ],
      romaji: "Ohiru ni onigiri wo tabemasu.",
      en: "I eat rice balls for lunch.",
      id: "Saya makan onigiri untuk makan siang."
    }
  },
  "kawa": {
    kanji: "川",
    jlpt: "N5",
    furigana: [{ ruby: "川", rt: "かわ" }],
    sentence: {
      ja: "川の水がきれいです。",
      furigana: [
        { ruby: "川", rt: "かわ" },
        { ruby: "の" },
        { ruby: "水", rt: "みず" },
        { ruby: "がきれいです。" }
      ],
      romaji: "Kawa no mizu ga kirei desu.",
      en: "The river water is clean and clear.",
      id: "Air sungai itu jernih dan bersih."
    }
  },
  "kitsune": {
    kanji: "狐",
    jlpt: "N4",
    furigana: [{ ruby: "狐", rt: "きつね" }],
    sentence: {
      ja: "神社で狐の像を見ました。",
      furigana: [
        { ruby: "神社", rt: "じんじゃ" },
        { ruby: "で" },
        { ruby: "狐", rt: "きつね" },
        { ruby: "の" },
        { ruby: "像", rt: "ぞう" },
        { ruby: "を" },
        { ruby: "見", rt: "み" },
        { ruby: "ました。" }
      ],
      romaji: "Jinja de kitsune no zou wo mimashita.",
      en: "I saw a fox statue at the shrine.",
      id: "Saya melihat patung rubah di kuil jinja."
    }
  },
  "kuruma": {
    kanji: "車",
    jlpt: "N5",
    furigana: [{ ruby: "車", rt: "くるま" }],
    sentence: {
      ja: "新しい車を買いました。",
      furigana: [
        { ruby: "新", rt: "あたら" },
        { ruby: "しい" },
        { ruby: "車", rt: "くるま" },
        { ruby: "を" },
        { ruby: "買", rt: "か" },
        { ruby: "いました。" }
      ],
      romaji: "Atarashii kuruma wo kaimashita.",
      en: "I bought a new car.",
      id: "Saya membeli mobil baru."
    }
  },
  "kemuri": {
    kanji: "煙",
    jlpt: "N4",
    furigana: [{ ruby: "煙", rt: "けむり" }],
    sentence: {
      ja: "山から白い煙が上がっています。",
      furigana: [
        { ruby: "山", rt: "やま" },
        { ruby: "から" },
        { ruby: "白", rt: "しろ" },
        { ruby: "い" },
        { ruby: "煙", rt: "けむり" },
        { ruby: "が" },
        { ruby: "上", rt: "あ" },
        { ruby: "がっています。" }
      ],
      romaji: "Yama kara shiroi kemuri ga agatte imasu.",
      en: "White smoke is rising from the mountain.",
      id: "Asap putih membubung dari gunung."
    }
  },
  "kokoro": {
    kanji: "心",
    jlpt: "N4",
    furigana: [{ ruby: "心", rt: "こころ" }],
    sentence: {
      ja: "優しい心を持つことが大切です。",
      furigana: [
        { ruby: "優", rt: "やさ" },
        { ruby: "しい" },
        { ruby: "心", rt: "こころ" },
        { ruby: "を" },
        { ruby: "持", rt: "も" },
        { ruby: "つことが" },
        { ruby: "大切", rt: "たいせつ" },
        { ruby: "です。" }
      ],
      romaji: "Yasashii kokoro wo motsu koto ga taisetsu desu.",
      en: "Having a kind heart is important.",
      id: "Memiliki hati yang baik itu penting."
    }
  },
  "sakura": {
    kanji: "桜",
    jlpt: "N5",
    furigana: [{ ruby: "桜", rt: "さくら" }],
    sentence: {
      ja: "春になると桜が咲きます。",
      furigana: [
        { ruby: "春", rt: "はる" },
        { ruby: "になると" },
        { ruby: "桜", rt: "さくら" },
        { ruby: "が" },
        { ruby: "咲", rt: "さ" },
        { ruby: "きます。" }
      ],
      romaji: "Haru ni naru to sakura ga sakimasu.",
      en: "Cherry blossoms bloom when spring comes.",
      id: "Bunga sakura mekar saat musim semi tiba."
    }
  },
  "shiro": {
    kanji: "城",
    jlpt: "N4",
    furigana: [{ ruby: "城", rt: "しろ" }],
    sentence: {
      ja: "古い日本の城を訪れました。",
      furigana: [
        { ruby: "古", rt: "ふる" },
        { ruby: "い" },
        { ruby: "日本", rt: "にほん" },
        { ruby: "の" },
        { ruby: "城", rt: "しろ" },
        { ruby: "を" },
        { ruby: "訪", rt: "おとず" },
        { ruby: "れました。" }
      ],
      romaji: "Furui Nihon no shiro wo otozuremashita.",
      en: "I visited an ancient Japanese castle.",
      id: "Saya mengunjungi kastil kuno Jepang."
    }
  },
  "sushi": {
    kanji: "寿司",
    jlpt: "N5",
    furigana: [{ ruby: "寿", rt: "す" }, { ruby: "司", rt: "し" }],
    sentence: {
      ja: "寿司にワサビをつけます。",
      furigana: [
        { ruby: "寿司", rt: "すし" },
        { ruby: "に" },
        { ruby: "ワサビ" },
        { ruby: "をつけます。" }
      ],
      romaji: "Sushi ni wasabi wo tsukemasu.",
      en: "I put wasabi on the sushi.",
      id: "Saya menambahkan wasabi pada sushi."
    }
  },
  "sekai": {
    kanji: "世界",
    jlpt: "N4",
    furigana: [{ ruby: "世", rt: "せ" }, { ruby: "界", rt: "かい" }],
    sentence: {
      ja: "世界中を旅したいです。",
      furigana: [
        { ruby: "世界中", rt: "せかいじゅう" },
        { ruby: "を" },
        { ruby: "旅", rt: "たび" },
        { ruby: "したいです。" }
      ],
      romaji: "Sekaijuu wo tabi shitai desu.",
      en: "I want to travel around the world.",
      id: "Saya ingin bepergian keliling dunia."
    }
  },
  "sora": {
    kanji: "空",
    jlpt: "N5",
    furigana: [{ ruby: "空", rt: "そら" }],
    sentence: {
      ja: "青い空に鳥が飛んでいます。",
      furigana: [
        { ruby: "青", rt: "あお" },
        { ruby: "い" },
        { ruby: "空", rt: "そら" },
        { ruby: "に" },
        { ruby: "鳥", rt: "とり" },
        { ruby: "が" },
        { ruby: "飛", rt: "と" },
        { ruby: "んでいます。" }
      ],
      romaji: "Aoi sora ni tori ga tonde imasu.",
      en: "Birds are flying in the blue sky.",
      id: "Burung-burung terbang di langit biru."
    }
  },
  "tamago": {
    kanji: "卵",
    jlpt: "N5",
    furigana: [{ ruby: "卵", rt: "たまご" }],
    sentence: {
      ja: "朝ごはんに卵焼きを食べます。",
      furigana: [
        { ruby: "朝", rt: "あさ" },
        { ruby: "ごはんに" },
        { ruby: "卵焼", rt: "たまごや" },
        { ruby: "きを" },
        { ruby: "食", rt: "た" },
        { ruby: "べます。" }
      ],
      romaji: "Asagohan ni tamagoyaki wo tabemasu.",
      en: "I eat rolled omelette for breakfast.",
      id: "Saya makan tamagoyaki untuk sarapan."
    }
  },
  "chizu": {
    kanji: "地図",
    jlpt: "N5",
    furigana: [{ ruby: "地", rt: "ち" }, { ruby: "図", rt: "ず" }],
    sentence: {
      ja: "スマホの地図で道を探します。",
      furigana: [
        { ruby: "スマホ" },
        { ruby: "の" },
        { ruby: "地図", rt: "ちず" },
        { ruby: "で" },
        { ruby: "道", rt: "みち" },
        { ruby: "を" },
        { ruby: "探", rt: "さが" },
        { ruby: "します。" }
      ],
      romaji: "Sumaho no chizu de michi wo sagashimasu.",
      en: "I look for the route on my smartphone map.",
      id: "Saya mencari jalan lewat peta di ponsel pintar."
    }
  },
  "tsuki": {
    kanji: "月",
    jlpt: "N5",
    furigana: [{ ruby: "月", rt: "つき" }],
    sentence: {
      ja: "今夜は月がとても明るいです。",
      furigana: [
        { ruby: "今夜", rt: "こんや" },
        { ruby: "は" },
        { ruby: "月", rt: "つき" },
        { ruby: "がとても" },
        { ruby: "明", rt: "あか" },
        { ruby: "るいです。" }
      ],
      romaji: "Konya wa tsuki ga totemo akarui desu.",
      en: "The moon is very bright tonight.",
      id: "Malam ini bulannya sangat terang."
    }
  },
  "te": {
    kanji: "手",
    jlpt: "N5",
    furigana: [{ ruby: "手", rt: "て" }],
    sentence: {
      ja: "食事の前に手を洗います。",
      furigana: [
        { ruby: "食事", rt: "しょくじ" },
        { ruby: "の" },
        { ruby: "前", rt: "まえ" },
        { ruby: "に" },
        { ruby: "手", rt: "て" },
        { ruby: "を" },
        { ruby: "洗", rt: "あら" },
        { ruby: "います。" }
      ],
      romaji: "Shokuji no mae ni te wo araimasu.",
      en: "I wash my hands before eating.",
      id: "Saya mencuci tangan sebelum makan."
    }
  },
  "tomodachi": {
    kanji: "友達",
    jlpt: "N5",
    furigana: [{ ruby: "友", rt: "とも" }, { ruby: "達", rt: "だち" }],
    sentence: {
      ja: "友達とアニメの話をします。",
      furigana: [
        { ruby: "友達", rt: "ともだち" },
        { ruby: "と" },
        { ruby: "アニメ" },
        { ruby: "の" },
        { ruby: "話", rt: "はなし" },
        { ruby: "をします。" }
      ],
      romaji: "Tomodachi to anime no hanashi wo shimasu.",
      en: "I talk about anime with my friend.",
      id: "Saya mengobrol tentang anime bersama teman."
    }
  },
  "natsu": {
    kanji: "夏",
    jlpt: "N5",
    furigana: [{ ruby: "夏", rt: "なつ" }],
    sentence: {
      ja: "日本の夏は花火大会があります。",
      furigana: [
        { ruby: "日本", rt: "にほん" },
        { ruby: "の" },
        { ruby: "夏", rt: "なつ" },
        { ruby: "は" },
        { ruby: "花火大会", rt: "はなびたいかい" },
        { ruby: "があります。" }
      ],
      romaji: "Nihon no natsu wa hanabi taikai ga arimasu.",
      en: "Japan's summer has fireworks festivals.",
      id: "Musim panas di Jepang memiliki festival kembang api."
    }
  },
  "niji": {
    kanji: "虹",
    jlpt: "N4",
    furigana: [{ ruby: "虹", rt: "にじ" }],
    sentence: {
      ja: "雨の後にきれいな虹が出ました。",
      furigana: [
        { ruby: "雨", rt: "あめ" },
        { ruby: "の" },
        { ruby: "後", rt: "あと" },
        { ruby: "にきれいな" },
        { ruby: "虹", rt: "にじ" },
        { ruby: "が" },
        { ruby: "出", rt: "で" },
        { ruby: "ました。" }
      ],
      romaji: "Ame no ato ni kireina niji ga demashita.",
      en: "A beautiful rainbow appeared after the rain.",
      id: "Pelangi indah muncul setelah hujan."
    }
  },
  "nuigurumi": {
    kanji: "ぬいぐるみ",
    jlpt: "N4",
    furigana: [{ ruby: "ぬいぐるみ" }],
    sentence: {
      ja: "可愛いポケモンのぬいぐるみを集めています。",
      furigana: [
        { ruby: "可愛", rt: "かわい" },
        { ruby: "い" },
        { ruby: "ポケモン" },
        { ruby: "の" },
        { ruby: "ぬいぐるみ" },
        { ruby: "を" },
        { ruby: "集", rt: "あつ" },
        { ruby: "めています。" }
      ],
      romaji: "Kawaii pokemon no nuigurumi wo atsumete imasu.",
      en: "I collect cute Pokemon plushies.",
      id: "Saya mengoleksi boneka Pokemon yang lucu."
    }
  },
  "neko": {
    kanji: "猫",
    jlpt: "N5",
    furigana: [{ ruby: "猫", rt: "ねこ" }],
    sentence: {
      ja: "猫が日向で眠っています。",
      furigana: [
        { ruby: "猫", rt: "ねこ" },
        { ruby: "が" },
        { ruby: "日向", rt: "ひなた" },
        { ruby: "で" },
        { ruby: "眠", rt: "ねむ" },
        { ruby: "っています。" }
      ],
      romaji: "Neko ga hinata de nemutte imasu.",
      en: "The cat is sleeping in a sunny spot.",
      id: "Kucing sedang tidur di tempat yang terkena sinar matahari."
    }
  },
  "nori": {
    kanji: "海苔",
    jlpt: "N4",
    furigana: [{ ruby: "海苔", rt: "のり" }],
    sentence: {
      ja: "おにぎりにパリパリの海苔を巻きます。",
      furigana: [
        { ruby: "おにぎり" },
        { ruby: "にパリパリの" },
        { ruby: "海苔", rt: "のり" },
        { ruby: "を" },
        { ruby: "巻", rt: "ま" },
        { ruby: "きます。" }
      ],
      romaji: "Onigiri ni paripari no nori wo makimasu.",
      en: "I wrap crispy seaweed around the rice ball.",
      id: "Saya membungkus onigiri dengan rumput laut renyah."
    }
  },
  "hana": {
    kanji: "花",
    jlpt: "N5",
    furigana: [{ ruby: "花", rt: "はな" }],
    sentence: {
      ja: "庭にきれいな花が咲きました。",
      furigana: [
        { ruby: "庭", rt: "にわ" },
        { ruby: "にきれいな" },
        { ruby: "花", rt: "はな" },
        { ruby: "が" },
        { ruby: "咲", rt: "さ" },
        { ruby: "きました。" }
      ],
      romaji: "Niwa ni kireina hana ga sakimashita.",
      en: "Beautiful flowers bloomed in the garden.",
      id: "Bunga-bunga indah bermekaran di taman."
    }
  },
  "hikari": {
    kanji: "光",
    jlpt: "N4",
    furigana: [{ ruby: "光", rt: "ひかり" }],
    sentence: {
      ja: "太陽の光が部屋に入ります。",
      furigana: [
        { ruby: "太陽", rt: "たいよう" },
        { ruby: "の" },
        { ruby: "光", rt: "ひかり" },
        { ruby: "が" },
        { ruby: "部屋", rt: "へや" },
        { ruby: "に" },
        { ruby: "入", rt: "はい" },
        { ruby: "ります。" }
      ],
      romaji: "Taiyou no hikari ga heya ni hairimasu.",
      en: "Sunlight enters the room.",
      id: "Cahaya matahari masuk ke dalam kamar."
    }
  },
  "fune": {
    kanji: "船",
    jlpt: "N5",
    furigana: [{ ruby: "船", rt: "ふね" }],
    sentence: {
      ja: "大きな船が港を出発します。",
      furigana: [
        { ruby: "大", rt: "おお" },
        { ruby: "きな" },
        { ruby: "船", rt: "ふね" },
        { ruby: "が" },
        { ruby: "港", rt: "みなと" },
        { ruby: "を" },
        { ruby: "出発", rt: "しゅっぱつ" },
        { ruby: "します。" }
      ],
      romaji: "Ookina fune ga minato wo shuppatsu shimasu.",
      en: "A large boat departs from the harbor.",
      id: "Kapal besar berangkat dari pelabuhan."
    }
  },
  "heya": {
    kanji: "部屋",
    jlpt: "N5",
    furigana: [{ ruby: "部", rt: "へ" }, { ruby: "屋", rt: "や" }],
    sentence: {
      ja: "自分の部屋を掃除します。",
      furigana: [
        { ruby: "自分", rt: "じぶん" },
        { ruby: "の" },
        { ruby: "部屋", rt: "へや" },
        { ruby: "を" },
        { ruby: "掃除", rt: "そうじ" },
        { ruby: "します。" }
      ],
      romaji: "Jibun no heya wo souji shimasu.",
      en: "I clean my room.",
      id: "Saya membersihkan kamar saya sendiri."
    }
  },
  "hoshi": {
    kanji: "星",
    jlpt: "N4",
    furigana: [{ ruby: "星", rt: "ほし" }],
    sentence: {
      ja: "夜空にたくさんの星が輝いています。",
      furigana: [
        { ruby: "夜空", rt: "よぞら" },
        { ruby: "にたくさんの" },
        { ruby: "星", rt: "ほし" },
        { ruby: "が" },
        { ruby: "輝", rt: "かがや" },
        { ruby: "いています。" }
      ],
      romaji: "Yozora ni takusan no hoshi ga kagayaite imasu.",
      en: "Many stars are shining in the night sky.",
      id: "Banyak bintang bersinar di langit malam."
    }
  },
  "matsuri": {
    kanji: "祭り",
    jlpt: "N4",
    furigana: [{ ruby: "祭", rt: "まつ" }, { ruby: "り" }],
    sentence: {
      ja: "夏祭りで浴衣を着ました。",
      furigana: [
        { ruby: "夏祭", rt: "なつまつ" },
        { ruby: "りで" },
        { ruby: "浴衣", rt: "ゆかた" },
        { ruby: "を" },
        { ruby: "着", rt: "き" },
        { ruby: "ました。" }
      ],
      romaji: "Natsumatsuri de yukata wo kimashita.",
      en: "I wore a yukata at the summer festival.",
      id: "Saya mengenakan yukata di festival musim panas."
    }
  },
  "mizu": {
    kanji: "水",
    jlpt: "N5",
    furigana: [{ ruby: "水", rt: "みず" }],
    sentence: {
      ja: "冷たい水を一杯飲みます。",
      furigana: [
        { ruby: "冷", rt: "つめ" },
        { ruby: "たい" },
        { ruby: "水", rt: "みず" },
        { ruby: "を" },
        { ruby: "一杯", rt: "いっぱい" },
        { ruby: "飲", rt: "の" },
        { ruby: "みます。" }
      ],
      romaji: "Tsumetai mizu wo ippai nomimasu.",
      en: "I drink a cup of cold water.",
      id: "Saya minum segelas air dingin."
    }
  },
  "mushi": {
    kanji: "虫",
    jlpt: "N4",
    furigana: [{ ruby: "虫", rt: "むし" }],
    sentence: {
      ja: "夏になるとセミなどの虫が鳴きます。",
      furigana: [
        { ruby: "夏", rt: "なつ" },
        { ruby: "になるとセミなどの" },
        { ruby: "虫", rt: "むし" },
        { ruby: "が" },
        { ruby: "鳴", rt: "な" },
        { ruby: "きます。" }
      ],
      romaji: "Natsu ni naru to semi nado no mushi ga nakimasu.",
      en: "When summer comes, insects like cicadas sing.",
      id: "Saat musim panas tiba, serangga seperti tonggeret bersuara."
    }
  },
  "megane": {
    kanji: "眼鏡",
    jlpt: "N5",
    furigana: [{ ruby: "眼", rt: "め" }, { ruby: "鏡", rt: "がね" }],
    sentence: {
      ja: "本を読むときに眼鏡をかけます。",
      furigana: [
        { ruby: "本", rt: "ほん" },
        { ruby: "を" },
        { ruby: "読", rt: "よ" },
        { ruby: "むときに" },
        { ruby: "眼鏡", rt: "めがね" },
        { ruby: "をかけます。" }
      ],
      romaji: "Hon wo yomu toki ni megane wo kakemasu.",
      en: "I wear glasses when reading books.",
      id: "Saya memakai kacamata saat membaca buku."
    }
  },
  "mori": {
    kanji: "森",
    jlpt: "N4",
    furigana: [{ ruby: "森", rt: "もり" }],
    sentence: {
      ja: "静かな森の中を散歩します。",
      furigana: [
        { ruby: "静", rt: "しず" },
        { ruby: "かな" },
        { ruby: "森", rt: "もり" },
        { ruby: "の" },
        { ruby: "中", rt: "なか" },
        { ruby: "を" },
        { ruby: "散歩", rt: "さんぽ" },
        { ruby: "します。" }
      ],
      romaji: "Shizukana mori no naka wo sanpo shimasu.",
      en: "I walk inside the quiet forest.",
      id: "Saya berjalan-jalan di dalam hutan yang tenang."
    }
  },
  "yama": {
    kanji: "山",
    jlpt: "N5",
    furigana: [{ ruby: "山", rt: "やま" }],
    sentence: {
      ja: "富士山は日本で一番高い山です。",
      furigana: [
        { ruby: "富士山", rt: "ふじさん" },
        { ruby: "は" },
        { ruby: "日本", rt: "にほん" },
        { ruby: "で" },
        { ruby: "一番", rt: "いちばん" },
        { ruby: "高", rt: "たか" },
        { ruby: "い" },
        { ruby: "山", rt: "やま" },
        { ruby: "です。" }
      ],
      romaji: "Fujisan wa Nihon de ichiban takai yama desu.",
      en: "Mount Fuji is the tallest mountain in Japan.",
      id: "Gunung Fuji adalah gunung tertinggi di Jepang."
    }
  },
  "yuki": {
    kanji: "雪",
    jlpt: "N5",
    furigana: [{ ruby: "雪", rt: "ゆき" }],
    sentence: {
      ja: "冬の朝に白い雪が積もりました。",
      furigana: [
        { ruby: "冬", rt: "ふゆ" },
        { ruby: "の" },
        { ruby: "朝", rt: "あさ" },
        { ruby: "に" },
        { ruby: "白", rt: "しろ" },
        { ruby: "い" },
        { ruby: "雪", rt: "ゆき" },
        { ruby: "が" },
        { ruby: "積", rt: "つ" },
        { ruby: "もりました。" }
      ],
      romaji: "Fuyu no asa ni shiroi yuki ga tsumorimashita.",
      en: "White snow piled up in the winter morning.",
      id: "Salju putih menumpuk di pagi musim dingin."
    }
  },
  "yoru": {
    kanji: "夜",
    jlpt: "N5",
    furigana: [{ ruby: "夜", rt: "よる" }],
    sentence: {
      ja: "夜になると街が静かになります。",
      furigana: [
        { ruby: "夜", rt: "よる" },
        { ruby: "になると" },
        { ruby: "街", rt: "まち" },
        { ruby: "が" },
        { ruby: "静", rt: "しず" },
        { ruby: "かになります。" }
      ],
      romaji: "Yoru ni naru to machi ga shizuka ni narimasu.",
      en: "The town becomes quiet at night.",
      id: "Saat malam tiba, kota menjadi tenang."
    }
  },
  "raion": {
    kanji: "獅子",
    jlpt: "N4",
    furigana: [{ ruby: "らいおん" }],
    sentence: {
      ja: "動物園で大きなライオンを見ました。",
      furigana: [
        { ruby: "動物園", rt: "どうぶつえん" },
        { ruby: "で" },
        { ruby: "大", rt: "おお" },
        { ruby: "きなライオンを" },
        { ruby: "見", rt: "み" },
        { ruby: "ました。" }
      ],
      romaji: "Doubutsuen de ookina raion wo mimashita.",
      en: "I saw a big lion at the zoo.",
      id: "Saya melihat singa besar di kebun binatang."
    }
  },
  "ringo": {
    kanji: "林檎",
    jlpt: "N5",
    furigana: [{ ruby: "りんご" }],
    sentence: {
      ja: "朝に甘いりんごを食べます。",
      furigana: [
        { ruby: "朝", rt: "あさ" },
        { ruby: "に" },
        { ruby: "甘", rt: "あま" },
        { ruby: "いりんごを" },
        { ruby: "食", rt: "た" },
        { ruby: "べます。" }
      ],
      romaji: "Asa ni amai ringo wo tabemasu.",
      en: "I eat a sweet apple in the morning.",
      id: "Saya makan apel manis di pagi hari."
    }
  },
  "rusu": {
    kanji: "留守",
    jlpt: "N4",
    furigana: [{ ruby: "留", rt: "る" }, { ruby: "守", rt: "す" }],
    sentence: {
      ja: "友達の家に行きましたが留守でした。",
      furigana: [
        { ruby: "友達", rt: "ともだち" },
        { ruby: "の" },
        { ruby: "家", rt: "いえ" },
        { ruby: "に" },
        { ruby: "行", rt: "い" },
        { ruby: "きましたが" },
        { ruby: "留守", rt: "るす" },
        { ruby: "でした。" }
      ],
      romaji: "Tomodachi no ie ni ikimashita ga rusu deshita.",
      en: "I went to my friend's house, but they were away.",
      id: "Saya pergi ke rumah teman, tapi sedang tidak ada orang di rumah."
    }
  },
  "renshuu": {
    kanji: "練習",
    jlpt: "N5",
    furigana: [{ ruby: "練", rt: "れん" }, { ruby: "習", rt: "しゅう" }],
    sentence: {
      ja: "毎日ひらがなの練習をします。",
      furigana: [
        { ruby: "毎日", rt: "まいにち" },
        { ruby: "ひらがなの" },
        { ruby: "練習", rt: "れんしゅう" },
        { ruby: "をします。" }
      ],
      romaji: "Mainichi hiragana no renshuu wo shimasu.",
      en: "I practice Hiragana every day.",
      id: "Saya berlatih Hiragana setiap hari."
    }
  },
  "rousoku": {
    kanji: "蝋燭",
    jlpt: "N4",
    furigana: [{ ruby: "ろうそく" }],
    sentence: {
      ja: "ケーキの上にろうそくを立てます。",
      furigana: [
        { ruby: "ケーキの" },
        { ruby: "上", rt: "うえ" },
        { ruby: "にろうそくを" },
        { ruby: "立", rt: "た" },
        { ruby: "てます。" }
      ],
      romaji: "Keeki no ue ni rousoku wo tatemasu.",
      en: "I set candles on top of the cake.",
      id: "Saya menaruh lilin di atas kue."
    }
  },
  "wani": {
    kanji: "鰐",
    jlpt: "N4",
    furigana: [{ ruby: "わに" }],
    sentence: {
      ja: "川辺でわにが休んでいます。",
      furigana: [
        { ruby: "川辺", rt: "かわべ" },
        { ruby: "でわにが" },
        { ruby: "休", rt: "やす" },
        { ruby: "んでいます。" }
      ],
      romaji: "Kawabe de wani ga yasunde imasu.",
      en: "An alligator is resting by the riverbank.",
      id: "Buaya sedang beristirahat di tepi sungai."
    }
  },
  "hon-wo-yomu": {
    kanji: "本を読む",
    jlpt: "N5",
    furigana: [{ ruby: "本", rt: "ほん" }, { ruby: "を" }, { ruby: "読", rt: "よ" }, { ruby: "む" }],
    sentence: {
      ja: "図書館で静かに本を読みます。",
      furigana: [
        { ruby: "図書館", rt: "としょかん" },
        { ruby: "で" },
        { ruby: "静", rt: "しず" },
        { ruby: "かに" },
        { ruby: "本", rt: "ほん" },
        { ruby: "を" },
        { ruby: "読", rt: "よ" },
        { ruby: "みます。" }
      ],
      romaji: "Toshokan de shizuka ni hon wo yomimasu.",
      en: "I read books quietly in the library.",
      id: "Saya membaca buku dengan tenang di perpustakaan."
    }
  },
  "nihon": {
    kanji: "日本",
    jlpt: "N5",
    furigana: [{ ruby: "日", rt: "に" }, { ruby: "本", rt: "ほん" }],
    sentence: {
      ja: "いつか日本へ旅行したいです。",
      furigana: [
        { ruby: "いつか" },
        { ruby: "日本", rt: "にほん" },
        { ruby: "へ" },
        { ruby: "旅行", rt: "りょこう" },
        { ruby: "したいです。" }
      ],
      romaji: "Itsuka Nihon e ryokou shitai desu.",
      en: "I want to travel to Japan someday.",
      id: "Suatu hari nanti saya ingin bepergian ke Jepang."
    }
  },
  "gakkou": {
    kanji: "学校",
    jlpt: "N5",
    furigana: [{ ruby: "学", rt: "がっ" }, { ruby: "校", rt: "こう" }],
    sentence: {
      ja: "朝八時に学校へ行きます。",
      furigana: [
        { ruby: "朝", rt: "あさ" },
        { ruby: "八時", rt: "はちじ" },
        { ruby: "に" },
        { ruby: "学校", rt: "がっこう" },
        { ruby: "へ" },
        { ruby: "行", rt: "い" },
        { ruby: "きます。" }
      ],
      romaji: "Asa hachiji ni gakkou e ikimasu.",
      en: "I go to school at 8 in the morning.",
      id: "Saya pergi ke sekolah jam 8 pagi."
    }
  },
  "ginkou": {
    kanji: "銀行",
    jlpt: "N5",
    furigana: [{ ruby: "銀", rt: "ぎん" }, { ruby: "行", rt: "こう" }],
    sentence: {
      ja: "駅の近くの銀行でお金を下ろします。",
      furigana: [
        { ruby: "駅", rt: "えき" },
        { ruby: "の" },
        { ruby: "近", rt: "ちか" },
        { ruby: "くの" },
        { ruby: "銀行", rt: "ぎんこう" },
        { ruby: "でお" },
        { ruby: "金", rt: "かね" },
        { ruby: "を" },
        { ruby: "下", rt: "お" },
        { ruby: "ろします。" }
      ],
      romaji: "Eki no chikaku no ginkou de okane wo oroshimasu.",
      en: "I withdraw money at the bank near the station.",
      id: "Saya mengambil uang di bank dekat stasiun."
    }
  },
  "guntai": {
    kanji: "軍隊",
    jlpt: "N3",
    furigana: [{ ruby: "軍", rt: "ぐん" }, { ruby: "隊", rt: "たい" }],
    sentence: {
      ja: "歴史の授業で軍隊について学びました。",
      furigana: [
        { ruby: "歴史", rt: "れきし" },
        { ruby: "の" },
        { ruby: "授業", rt: "じゅぎょう" },
        { ruby: "で" },
        { ruby: "軍隊", rt: "ぐんたい" },
        { ruby: "について" },
        { ruby: "学", rt: "まな" },
        { ruby: "びました。" }
      ],
      romaji: "Rekishi no jugyou de guntai ni tsuite manabimashita.",
      en: "I learned about the military in history class.",
      id: "Saya belajar tentang militer di kelas sejarah."
    }
  },
  "genki": {
    kanji: "元気",
    jlpt: "N5",
    furigana: [{ ruby: "元", rt: "げん" }, { ruby: "気", rt: "き" }],
    sentence: {
      ja: "「お元気ですか？」「はい、元気です！」",
      furigana: [
        { ruby: "「お" },
        { ruby: "元気", rt: "げんき" },
        { ruby: "ですか？」" },
        { ruby: "「はい、" },
        { ruby: "元気", rt: "げんき" },
        { ruby: "です！」" }
      ],
      romaji: "\"O-genki desu ka?\" \"Hai, genki desu!\"",
      en: "\"How are you?\" \"Yes, I am doing well!\"",
      id: "\"Bagaimana kabarmu?\" \"Ya, saya baik-baik saja!\""
    }
  },
  "gohan": {
    kanji: "ご飯",
    jlpt: "N5",
    furigana: [{ ruby: "ご" }, { ruby: "飯", rt: "はん" }],
    sentence: {
      ja: "家族と一緒に温かいご飯を食べます。",
      furigana: [
        { ruby: "家族", rt: "かぞく" },
        { ruby: "と" },
        { ruby: "一緒", rt: "いっしょ" },
        { ruby: "に" },
        { ruby: "温", rt: "あたた" },
        { ruby: "かいご" },
        { ruby: "飯", rt: "はん" },
        { ruby: "を" },
        { ruby: "食", rt: "た" },
        { ruby: "べます。" }
      ],
      romaji: "Kazoku to issho ni atatakai gohan wo tabemasu.",
      en: "I eat a warm meal together with my family.",
      id: "Saya makan hidangan hangat bersama keluarga."
    }
  },
  "zasshi": {
    kanji: "雑誌",
    jlpt: "N5",
    furigana: [{ ruby: "雑", rt: "ざっ" }, { ruby: "誌", rt: "し" }],
    sentence: {
      ja: "コンビニでアニメの雑誌を買いました。",
      furigana: [
        { ruby: "コンビニでアニメの" },
        { ruby: "雑誌", rt: "ざっし" },
        { ruby: "を" },
        { ruby: "買", rt: "か" },
        { ruby: "いました。" }
      ],
      romaji: "Konbini de anime no zasshi wo kaimashita.",
      en: "I bought an anime magazine at the convenience store.",
      id: "Saya membeli majalah anime di toserba konbini."
    }
  },
  "jikan": {
    kanji: "時間",
    jlpt: "N5",
    furigana: [{ ruby: "時", rt: "じ" }, { ruby: "間", rt: "かん" }],
    sentence: {
      ja: "日本語を勉強する時間を作ります。",
      furigana: [
        { ruby: "日本語", rt: "にほんご" },
        { ruby: "を" },
        { ruby: "勉強", rt: "べんきょう" },
        { ruby: "する" },
        { ruby: "時間", rt: "じかん" },
        { ruby: "を" },
        { ruby: "作", rt: "つく" },
        { ruby: "ります。" }
      ],
      romaji: "Nihongo wo benkyou suru jikan wo tsukurimasu.",
      en: "I make time to study Japanese.",
      id: "Saya meluangkan waktu untuk belajar bahasa Jepang."
    }
  },
  "zutto": {
    kanji: "ずっと",
    jlpt: "N4",
    furigana: [{ ruby: "ずっと" }],
    sentence: {
      ja: "これからもずっと友達でいようね。",
      furigana: [
        { ruby: "これからもずっと" },
        { ruby: "友達", rt: "ともだち" },
        { ruby: "でいようね。" }
      ],
      romaji: "Kore kara mo zutto tomodachi de iyou ne.",
      en: "Let's be friends forever and always.",
      id: "Mari tetap berteman selamanya dari sekarang."
    }
  },
  "zenbu": {
    kanji: "全部",
    jlpt: "N5",
    furigana: [{ ruby: "全", rt: "ぜん" }, { ruby: "部", rt: "ぶ" }],
    sentence: {
      ja: "宿題を全部終わらせました。",
      furigana: [
        { ruby: "宿題", rt: "しゅくだい" },
        { ruby: "を" },
        { ruby: "全部", rt: "ぜんぶ" },
        { ruby: "終", rt: "お" },
        { ruby: "わらせました。" }
      ],
      romaji: "Shukudai wo zenbu owarasemashita.",
      en: "I finished all of my homework.",
      id: "Saya sudah menyelesaikan semua PR saya."
    }
  },
  "zou": {
    kanji: "象",
    jlpt: "N4",
    furigana: [{ ruby: "象", rt: "ぞう" }],
    sentence: {
      ja: "象の鼻はとても長いです。",
      furigana: [
        { ruby: "象", rt: "ぞう" },
        { ruby: "の" },
        { ruby: "鼻", rt: "はな" },
        { ruby: "はとても" },
        { ruby: "長", rt: "なが" },
        { ruby: "いです。" }
      ],
      romaji: "Zou no hana wa totemo nagai desu.",
      en: "An elephant's trunk is very long.",
      id: "Belalai gajah sangat panjang."
    }
  },
  "daigaku": {
    kanji: "大学",
    jlpt: "N5",
    furigana: [{ ruby: "大", rt: "だい" }, { ruby: "学", rt: "がく" }],
    sentence: {
      ja: "来年大学に進学します。",
      furigana: [
        { ruby: "来年", rt: "らいねん" },
        { ruby: "大学", rt: "だいがく" },
        { ruby: "に" },
        { ruby: "進学", rt: "しんがく" },
        { ruby: "します。" }
      ],
      romaji: "Rainen daigaku ni shingaku shimasu.",
      en: "I will enter university next year.",
      id: "Tahun depan saya akan melanjutkan studi ke universitas."
    }
  },
  "hanaji": {
    kanji: "鼻血",
    jlpt: "Anime",
    furigana: [{ ruby: "鼻", rt: "はな" }, { ruby: "血", rt: "ぢ" }],
    sentence: {
      ja: "アニメで驚いたキャラクターが鼻血を出します。",
      furigana: [
        { ruby: "アニメで" },
        { ruby: "驚", rt: "おどろ" },
        { ruby: "いたキャラクターが" },
        { ruby: "鼻血", rt: "はなぢ" },
        { ruby: "を" },
        { ruby: "出", rt: "だ" },
        { ruby: "します。" }
      ],
      romaji: "Anime de odoroita kyarakutaa ga hanaji wo dashimasu.",
      en: "In anime, a shocked character gets a nosebleed.",
      id: "Di anime, karakter yang terkejut mimisan."
    }
  },
  "tsuzuku": {
    kanji: "続く",
    jlpt: "N4",
    furigana: [{ ruby: "続", rt: "つづ" }, { ruby: "く" }],
    sentence: {
      ja: "アニメのエンディングに「つづく」と出ました。",
      furigana: [
        { ruby: "アニメのエンディングに「つづく」と" },
        { ruby: "出", rt: "で" },
        { ruby: "ました。" }
      ],
      romaji: "Anime no endingu ni 'tsuzuku' to demashita.",
      en: "'To be continued' appeared at the end of the anime.",
      id: "'Bersambung' muncul di bagian akhir anime."
    }
  },
  "densha": {
    kanji: "電車",
    jlpt: "N5",
    furigana: [{ ruby: "電", rt: "でん" }, { ruby: "車", rt: "しゃ" }],
    sentence: {
      ja: "電車に乗って東京へ行きます。",
      furigana: [
        { ruby: "電車", rt: "でんしゃ" },
        { ruby: "に" },
        { ruby: "乗", rt: "の" },
        { ruby: "って" },
        { ruby: "東京", rt: "とうきょう" },
        { ruby: "へ" },
        { ruby: "行", rt: "い" },
        { ruby: "きます。" }
      ],
      romaji: "Densha ni notte Toukyou e ikimasu.",
      en: "I take the train to go to Tokyo.",
      id: "Saya naik kereta listrik pergi ke Tokyo."
    }
  },
  "doubutsu": {
    kanji: "動物",
    jlpt: "N5",
    furigana: [{ ruby: "動", rt: "どう" }, { ruby: "物", rt: "ぶつ" }],
    sentence: {
      ja: "可愛い動物が大好きです。",
      furigana: [
        { ruby: "可愛", rt: "かわい" },
        { ruby: "い" },
        { ruby: "動物", rt: "どうぶつ" },
        { ruby: "が" },
        { ruby: "大好", rt: "だいす" },
        { ruby: "きです。" }
      ],
      romaji: "Kawaii doubutsu ga daisuki desu.",
      en: "I love cute animals.",
      id: "Saya sangat suka hewan-hewan lucu."
    }
  },
  "basho": {
    kanji: "場所",
    jlpt: "N5",
    furigana: [{ ruby: "場", rt: "ば" }, { ruby: "所", rt: "しょ" }],
    sentence: {
      ja: "待ち合わせの場所を決めましょう。",
      furigana: [
        { ruby: "待", rt: "ま" },
        { ruby: "ち" },
        { ruby: "合", rt: "あ" },
        { ruby: "わせの" },
        { ruby: "場所", rt: "ばしょ" },
        { ruby: "を" },
        { ruby: "決", rt: "き" },
        { ruby: "めましょう。" }
      ],
      romaji: "Machiawase no basho wo kimemashou.",
      en: "Let's decide on the meeting place.",
      id: "Mari tentukan tempat pertemuannya."
    }
  },
  "byouin": {
    kanji: "病院",
    jlpt: "N5",
    furigana: [{ ruby: "病", rt: "びょう" }, { ruby: "院", rt: "いん" }],
    sentence: {
      ja: "熱があるので病院へ行きます。",
      furigana: [
        { ruby: "熱", rt: "ねつ" },
        { ruby: "があるので" },
        { ruby: "病院", rt: "びょういん" },
        { ruby: "へ" },
        { ruby: "行", rt: "い" },
        { ruby: "きます。" }
      ],
      romaji: "Netsu ga aru node byouin e ikimasu.",
      en: "I have a fever, so I go to the hospital.",
      id: "Karena demam, saya pergi ke rumah sakit."
    }
  },
  "bunka": {
    kanji: "文化",
    jlpt: "N4",
    furigana: [{ ruby: "文", rt: "ぶん" }, { ruby: "化", rt: "か" }],
    sentence: {
      ja: "日本の伝統文化に興味があります。",
      furigana: [
        { ruby: "日本", rt: "にほん" },
        { ruby: "の" },
        { ruby: "伝統文化", rt: "でんとうぶんか" },
        { ruby: "に" },
        { ruby: "興味", rt: "きょうみ" },
        { ruby: "があります。" }
      ],
      romaji: "Nihon no dentou bunka ni kyoumi ga arimasu.",
      en: "I am interested in Japanese traditional culture.",
      id: "Saya tertarik dengan kebudayaan tradisional Jepang."
    }
  },
  "bentou": {
    kanji: "弁当",
    jlpt: "N5",
    furigana: [{ ruby: "弁", rt: "べん" }, { ruby: "当", rt: "とう" }],
    sentence: {
      ja: "お母さんが美味しい弁当を作ってくれました。",
      furigana: [
        { ruby: "お" },
        { ruby: "母", rt: "かあ" },
        { ruby: "さんが" },
        { ruby: "美味", rt: "おい" },
        { ruby: "しい" },
        { ruby: "弁当", rt: "べんとう" },
        { ruby: "を" },
        { ruby: "作", rt: "つく" },
        { ruby: "ってくれました。" }
      ],
      romaji: "Okaasan ga oishii bentou wo tsukutte kuremashita.",
      en: "My mother made a delicious bento for me.",
      id: "Ibu membuatkan bekal bento yang lezat untukku."
    }
  },
  "boushi": {
    kanji: "帽子",
    jlpt: "N5",
    furigana: [{ ruby: "帽", rt: "ぼう" }, { ruby: "子", rt: "し" }],
    sentence: {
      ja: "日差しが強いので麦わら帽子をかぶります。",
      furigana: [
        { ruby: "日差", rt: "ひざ" },
        { ruby: "しが" },
        { ruby: "強", rt: "つよ" },
        { ruby: "いので" },
        { ruby: "麦", rt: "むぎ" },
        { ruby: "わら" },
        { ruby: "帽子", rt: "ぼうし" },
        { ruby: "をかぶります。" }
      ],
      romaji: "Hizashi ga tsuyoi node mugiwara boushi wo kaburimasu.",
      en: "The sunlight is strong, so I wear a straw hat.",
      id: "Sinar matahari terik, jadi saya memakai topi jerami."
    }
  },
  "panda": {
    kanji: "パンダ",
    jlpt: "N5",
    furigana: [{ ruby: "ぱんだ" }],
    sentence: {
      ja: "上野動物園で可愛いパンダを見ました。",
      furigana: [
        { ruby: "上野動物園", rt: "うえのどうぶつえん" },
        { ruby: "で" },
        { ruby: "可愛", rt: "かわい" },
        { ruby: "いパンダを" },
        { ruby: "見", rt: "み" },
        { ruby: "ました。" }
      ],
      romaji: "Ueno doubutsuen de kawaii panda wo mimashita.",
      en: "I saw a cute panda at Ueno Zoo.",
      id: "Saya melihat panda lucu di Kebun Binatang Ueno."
    }
  },
  "piano": {
    kanji: "ピアノ",
    jlpt: "N5",
    furigana: [{ ruby: "ぴあの" }],
    sentence: {
      ja: "音楽室でピアノを弾きます。",
      furigana: [
        { ruby: "音楽室", rt: "おんがくしつ" },
        { ruby: "でピアノを" },
        { ruby: "弾", rt: "ひ" },
        { ruby: "きます。" }
      ],
      romaji: "Ongakushitsu de piano wo hikimasu.",
      en: "I play the piano in the music room.",
      id: "Saya bermain piano di ruang musik."
    }
  },
  "purezento": {
    kanji: "プレゼント",
    jlpt: "N5",
    furigana: [{ ruby: "ぷれぜんと" }],
    sentence: {
      ja: "誕生日に友達からプレゼントをもらいました。",
      furigana: [
        { ruby: "誕生日", rt: "たんじょうび" },
        { ruby: "に" },
        { ruby: "友達", rt: "ともだち" },
        { ruby: "からプレゼントをもらいました。" }
      ],
      romaji: "Tanjoubi ni tomodachi kara purezento wo moraimashita.",
      en: "I received a present from my friend on my birthday.",
      id: "Saya menerima kado hadiah dari teman pada hari ulang tahun saya."
    }
  },
  "pengin": {
    kanji: "ペンギン",
    jlpt: "N4",
    furigana: [{ ruby: "ぺんぎん" }],
    sentence: {
      ja: "水族館でペンギンが歩いています。",
      furigana: [
        { ruby: "水族館", rt: "すいぞくかん" },
        { ruby: "でペンギンが" },
        { ruby: "歩", rt: "ある" },
        { ruby: "いています。" }
      ],
      romaji: "Suizokukan de pengin ga aruite imasu.",
      en: "Penguins are walking at the aquarium.",
      id: "Penguin sedang berjalan di akuarium."
    }
  },
  "poketto": {
    kanji: "ポケット",
    jlpt: "N5",
    furigana: [{ ruby: "ぽけっと" }],
    sentence: {
      ja: "コートのポケットに鍵を入れます。",
      furigana: [
        { ruby: "コートのポケットに" },
        { ruby: "鍵", rt: "かぎ" },
        { ruby: "を" },
        { ruby: "入", rt: "い" },
        { ruby: "れます。" }
      ],
      romaji: "Kooto no poketto ni kagi wo iremasu.",
      en: "I put the key into my coat pocket.",
      id: "Saya memasukkan kunci ke dalam saku mantel."
    }
  },
  "kawaii": {
    kanji: "可愛い",
    jlpt: "N5",
    furigana: [{ ruby: "可", rt: "か" }, { ruby: "愛", rt: "わい" }, { ruby: "い" }],
    sentence: {
      ja: "その子猫は本当に可愛いです！",
      furigana: [
        { ruby: "その" },
        { ruby: "子猫", rt: "こねこ" },
        { ruby: "は" },
        { ruby: "本当", rt: "ほんとう" },
        { ruby: "に" },
        { ruby: "可愛", rt: "かわい" },
        { ruby: "いです！" }
      ],
      romaji: "Sono koneko wa hontou ni kawaii desu!",
      en: "That kitten is really cute!",
      id: "Anak kucing itu sungguh imut!"
    }
  },
  "suki": {
    kanji: "好き",
    jlpt: "N5",
    furigana: [{ ruby: "好", rt: "す" }, { ruby: "き" }],
    sentence: {
      ja: "日本のアニメや漫画が大好きです。",
      furigana: [
        { ruby: "日本", rt: "にほん" },
        { ruby: "のアニメや" },
        { ruby: "漫画", rt: "まんが" },
        { ruby: "が" },
        { ruby: "大好", rt: "だいす" },
        { ruby: "きです。" }
      ],
      romaji: "Nihon no anime ya manga ga daisuki desu.",
      en: "I love Japanese anime and manga.",
      id: "Saya sangat menyukai anime dan manga Jepang."
    }
  },
  "arigatou": {
    kanji: "有難う",
    jlpt: "N5",
    furigana: [{ ruby: "有", rt: "あり" }, { ruby: "難", rt: "がと" }, { ruby: "う" }],
    sentence: {
      ja: "手伝ってくれて本当にありがとう！",
      furigana: [
        { ruby: "手伝", rt: "てつだ" },
        { ruby: "ってくれて" },
        { ruby: "本当", rt: "ほんとう" },
        { ruby: "にありがとう！" }
      ],
      romaji: "Tetsudatte kurete hontou ni arigatou!",
      en: "Thank you so much for helping me out!",
      id: "Terima kasih banyak sudah membantu!"
    }
  },
  "sugoi": {
    kanji: "凄い",
    jlpt: "N5",
    furigana: [{ ruby: "凄", rt: "すご" }, { ruby: "い" }],
    sentence: {
      ja: "その技のスピードは本当にすごいです！",
      furigana: [
        { ruby: "その" },
        { ruby: "技", rt: "わざ" },
        { ruby: "のスピードは" },
        { ruby: "本当", rt: "ほんとう" },
        { ruby: "にすごいです！" }
      ],
      romaji: "Sono waza no supiido wa hontou ni sugoi desu!",
      en: "The speed of that technique is truly amazing!",
      id: "Kecepatan jurus itu benar-benar luar biasa!"
    }
  }
};

export default vocabMeta;

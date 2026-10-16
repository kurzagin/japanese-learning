import fs from "fs";
import part1 from "./vocab-meta-part1.mjs";

// Load original vocabulary.json
const rawVocab = JSON.parse(fs.readFileSync("./src/data/vocabulary.json", "utf8"));

// 85 Katakana words definition map
const katakanaMeta = {
  "aisu": {
    kanji: "アイスクリーム",
    jlpt: "N5",
    furigana: [{ ruby: "アイス" }],
    sentence: {
      ja: "暑い日に冷たいアイスを食べます。",
      furigana: [
        { ruby: "暑", rt: "あつ" },
        { ruby: "い" },
        { ruby: "日", rt: "ひ" },
        { ruby: "に" },
        { ruby: "冷", rt: "つめ" },
        { ruby: "たいアイスを" },
        { ruby: "食", rt: "た" },
        { ruby: "べます。" }
      ],
      romaji: "Atsui hi ni tsumetai aisu wo tabemasu.",
      en: "I eat cold ice cream on a hot day.",
      id: "Saya makan es krim dingin di hari yang panas."
    }
  },
  "inku": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "インク" }],
    sentence: {
      ja: "ペンのインクがなくなりました。",
      furigana: [
        { ruby: "ペンのインクがなくなりました。" }
      ],
      romaji: "Pen no inku ga nakunarimashita.",
      en: "The pen ran out of ink.",
      id: "Tinta pulpen sudah habis."
    }
  },
  "webu": {
    kanji: null,
    jlpt: "N4",
    furigana: [{ ruby: "ウェブ" }],
    sentence: {
      ja: "ウェブサイトで最新の情報を調べます。",
      furigana: [
        { ruby: "ウェブサイトで" },
        { ruby: "最新", rt: "さいしん" },
        { ruby: "の" },
        { ruby: "情報", rt: "じょうほう" },
        { ruby: "を" },
        { ruby: "調", rt: "しら" },
        { ruby: "べます。" }
      ],
      romaji: "Webusaito de saishin no jouhou wo shirabemasu.",
      en: "I look up the latest info on the website.",
      id: "Saya mencari informasi terbaru di situs web."
    }
  },
  "ekoo": {
    kanji: "反響",
    jlpt: "N4",
    furigana: [{ ruby: "エコー" }],
    sentence: {
      ja: "トンネルの中で声のエコーが響きます。",
      furigana: [
        { ruby: "トンネルの" },
        { ruby: "中", rt: "なか" },
        { ruby: "で" },
        { ruby: "声", rt: "こえ" },
        { ruby: "のエコーが" },
        { ruby: "響", rt: "ひび" },
        { ruby: "きます。" }
      ],
      romaji: "Tonneru no naka de koe no ekoo ga hibikimasu.",
      en: "The voice's echo resonates inside the tunnel.",
      id: "Gema suara bergema di dalam terowongan."
    }
  },
  "orenji": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "オレンジ" }],
    sentence: {
      ja: "朝に新鮮なオレンジジュースを飲みます。",
      furigana: [
        { ruby: "朝", rt: "あさ" },
        { ruby: "に" },
        { ruby: "新鮮", rt: "しんせん" },
        { ruby: "なオレンジジュースを" },
        { ruby: "飲", rt: "の" },
        { ruby: "みます。" }
      ],
      romaji: "Asa ni shinsen na orenji juusu wo nomimasu.",
      en: "I drink fresh orange juice in the morning.",
      id: "Saya minum jus jeruk segar di pagi hari."
    }
  },
  "kafe": {
    kanji: "喫茶店",
    jlpt: "N5",
    furigana: [{ ruby: "カフェ" }],
    sentence: {
      ja: "静かなカフェで本を読みます。",
      furigana: [
        { ruby: "静", rt: "しず" },
        { ruby: "かなカフェで" },
        { ruby: "本", rt: "ほん" },
        { ruby: "を" },
        { ruby: "読", rt: "よ" },
        { ruby: "みます。" }
      ],
      romaji: "Shizukana kafe de hon wo yomimasu.",
      en: "I read books at a quiet cafe.",
      id: "Saya membaca buku di kafe yang tenang."
    }
  },
  "kii": {
    kanji: "鍵",
    jlpt: "N5",
    furigana: [{ ruby: "キー" }],
    sentence: {
      ja: "キーボードのキーを押します。",
      furigana: [
        { ruby: "キーボードのキーを" },
        { ruby: "押", rt: "お" },
        { ruby: "します。" }
      ],
      romaji: "Kiiboodo no kii wo oshimasu.",
      en: "I press a key on the keyboard.",
      id: "Saya menekan tombol pada papan tik."
    }
  },
  "kurasu": {
    kanji: "学級",
    jlpt: "N5",
    furigana: [{ ruby: "クラス" }],
    sentence: {
      ja: "日本語のクラスに新しい生徒が来ました。",
      furigana: [
        { ruby: "日本語", rt: "にほんご" },
        { ruby: "のクラスに" },
        { ruby: "新", rt: "あたら" },
        { ruby: "しい" },
        { ruby: "生徒", rt: "せいと" },
        { ruby: "が" },
        { ruby: "来", rt: "き" },
        { ruby: "ました。" }
      ],
      romaji: "Nihongo no kurasu ni atarashii seito ga kimashita.",
      en: "A new student came to the Japanese class.",
      id: "Murid baru datang ke kelas bahasa Jepang."
    }
  },
  "keeki": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "ケーキ" }],
    sentence: {
      ja: "誕生日にイチゴのケーキを食べました。",
      furigana: [
        { ruby: "誕生日", rt: "たんじょうび" },
        { ruby: "にイチゴのケーキを" },
        { ruby: "食", rt: "た" },
        { ruby: "べました。" }
      ],
      romaji: "Tanjoubi ni ichigo no keeki wo tabemashita.",
      en: "I ate strawberry cake on my birthday.",
      id: "Saya makan kue stroberi di hari ulang tahun."
    }
  },
  "koin": {
    kanji: "硬貨",
    jlpt: "N4",
    furigana: [{ ruby: "コイン" }],
    sentence: {
      ja: "自動販売機にコインを入れます。",
      furigana: [
        { ruby: "自動販売機", rt: "じどうはんばいき" },
        { ruby: "にコインを" },
        { ruby: "入", rt: "い" },
        { ruby: "れます。" }
      ],
      romaji: "Jidouhanbaiki ni koin wo iremasu.",
      en: "I insert a coin into the vending machine.",
      id: "Saya memasukkan koin ke mesin penjual otomatis."
    }
  },
  "sain": {
    kanji: "署名",
    jlpt: "N4",
    furigana: [{ ruby: "サイン" }],
    sentence: {
      ja: "書類にボールペンでサインします。",
      furigana: [
        { ruby: "書類", rt: "しょるい" },
        { ruby: "にボールペンでサインします。" }
      ],
      romaji: "Shorui ni boorupen de sain shimasu.",
      en: "I sign the document with a ballpoint pen.",
      id: "Saya menandatangani dokumen dengan pulpen."
    }
  },
  "shatsu": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "シャツ" }],
    sentence: {
      ja: "白いシャツを着て出かけます。",
      furigana: [
        { ruby: "白", rt: "しろ" },
        { ruby: "いシャツを" },
        { ruby: "着", rt: "き" },
        { ruby: "て" },
        { ruby: "出", rt: "で" },
        { ruby: "かけます。" }
      ],
      romaji: "Shiroi shatsu wo kite dekakemasu.",
      en: "I wear a white shirt and head out.",
      id: "Saya memakai kemeja putih lalu pergi keluar."
    }
  },
  "supootsu": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "スポーツ" }],
    sentence: {
      ja: "週末に友達とスポーツを楽しみます。",
      furigana: [
        { ruby: "週末", rt: "しゅうまつ" },
        { ruby: "に" },
        { ruby: "友達", rt: "ともだち" },
        { ruby: "とスポーツを" },
        { ruby: "楽", rt: "たの" },
        { ruby: "しみます。" }
      ],
      romaji: "Shuumatsu ni tomodachi to supootsu wo tanoshimimasu.",
      en: "I enjoy sports with friends on the weekend.",
      id: "Saya menikmati olahraga bersama teman di akhir pekan."
    }
  },
  "seetaa": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "セーター" }],
    sentence: {
      ja: "冬は温かいセーターを着ます。",
      furigana: [
        { ruby: "冬", rt: "ふゆ" },
        { ruby: "は" },
        { ruby: "温", rt: "あたた" },
        { ruby: "かいセーターを" },
        { ruby: "着", rt: "き" },
        { ruby: "ます。" }
      ],
      romaji: "Fuyu wa atatakai seetaa wo kimasu.",
      en: "I wear a warm sweater in winter.",
      id: "Saya memakai sweter hangat di musim dingin."
    }
  },
  "soosu": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "ソース" }],
    sentence: {
      ja: "たこ焼きに特製ソースをかけます。",
      furigana: [
        { ruby: "たこ" },
        { ruby: "焼", rt: "や" },
        { ruby: "きに" },
        { ruby: "特製", rt: "とくせい" },
        { ruby: "ソースをかけます。" }
      ],
      romaji: "Takoyaki ni tokusei soosu wo kakemasu.",
      en: "I drizzle special sauce over takoyaki.",
      id: "Saya menuangkan saus khusus ke atas takoyaki."
    }
  },
  "takushii": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "タクシー" }],
    sentence: {
      ja: "駅からホテルまでタクシーで行きます。",
      furigana: [
        { ruby: "駅", rt: "えき" },
        { ruby: "からホテルまでタクシーで" },
        { ruby: "行", rt: "い" },
        { ruby: "きます。" }
      ],
      romaji: "Eki kara hoteru made takushii de ikimasu.",
      en: "I take a taxi from the station to the hotel.",
      id: "Saya naik taksi dari stasiun ke hotel."
    }
  },
  "chiizu": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "チーズ" }],
    sentence: {
      ja: "ピザにとろけるチーズをのせます。",
      furigana: [
        { ruby: "ピザにとろけるチーズをのせます。" }
      ],
      romaji: "Piza ni torokeru chiizu wo nosemasu.",
      en: "I top the pizza with melted cheese.",
      id: "Saya meletakkan keju leleh di atas pizza."
    }
  },
  "tsuaa": {
    kanji: null,
    jlpt: "N4",
    furigana: [{ ruby: "ツアー" }],
    sentence: {
      ja: "京都の観光ツアーに参加します。",
      furigana: [
        { ruby: "京都", rt: "きょうと" },
        { ruby: "の" },
        { ruby: "観光", rt: "かんこう" },
        { ruby: "ツアーに" },
        { ruby: "参加", rt: "さんか" },
        { ruby: "します。" }
      ],
      romaji: "Kyouto no kankou tsuaa ni sanka shimasu.",
      en: "I join a sightseeing tour of Kyoto.",
      id: "Saya mengikuti tur wisata di Kyoto."
    }
  },
  "tesuto": {
    kanji: "試験",
    jlpt: "N5",
    furigana: [{ ruby: "テスト" }],
    sentence: {
      ja: "明日の日本語テストに向けて復習します。",
      furigana: [
        { ruby: "明日", rt: "あした" },
        { ruby: "の" },
        { ruby: "日本語", rt: "にほんご" },
        { ruby: "テストに" },
        { ruby: "向", rt: "む" },
        { ruby: "けて" },
        { ruby: "復習", rt: "ふくしゅう" },
        { ruby: "します。" }
      ],
      romaji: "Ashita no Nihongo tesuto ni mukete fukushuu shimasu.",
      en: "I review for tomorrow's Japanese test.",
      id: "Saya mengulang pelajaran untuk ujian bahasa Jepang besok."
    }
  },
  "tomato": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "トマト" }],
    sentence: {
      ja: "サラダに赤いトマトを入れます。",
      furigana: [
        { ruby: "サラダに" },
        { ruby: "赤", rt: "あか" },
        { ruby: "いトマトを" },
        { ruby: "入", rt: "い" },
        { ruby: "れます。" }
      ],
      romaji: "Sarada ni akai tomato wo iremasu.",
      en: "I add red tomatoes to the salad.",
      id: "Saya memasukkan tomat merah ke dalam salad."
    }
  },
  "naifu": {
    kanji: "包丁",
    jlpt: "N5",
    furigana: [{ ruby: "ナイフ" }],
    sentence: {
      ja: "ナイフとフォークを使って食べます。",
      furigana: [
        { ruby: "ナイフとフォークを" },
        { ruby: "使", rt: "つか" },
        { ruby: "って" },
        { ruby: "食", rt: "た" },
        { ruby: "べます。" }
      ],
      romaji: "Naifu to fooku wo tsukatte tabemasu.",
      en: "I eat using a knife and fork.",
      id: "Saya makan menggunakan pisau dan garpu."
    }
  },
  "nyuusu": {
    kanji: "報道",
    jlpt: "N5",
    furigana: [{ ruby: "ニュース" }],
    sentence: {
      ja: "毎朝テレビでニュースを見ます。",
      furigana: [
        { ruby: "毎朝", rt: "まいあさ" },
        { ruby: "テレビでニュースを" },
        { ruby: "見", rt: "み" },
        { ruby: "ます。" }
      ],
      romaji: "Maiasa terebi de nyuusu wo mimasu.",
      en: "I watch the news on TV every morning.",
      id: "Saya menonton berita di TV setiap pagi."
    }
  },
  "nuudoru": {
    kanji: "麺類",
    jlpt: "N4",
    furigana: [{ ruby: "ヌードル" }],
    sentence: {
      ja: "カップヌードルにお湯を注ぎます。",
      furigana: [
        { ruby: "カップヌードルにお" },
        { ruby: "湯", rt: "ゆ" },
        { ruby: "を" },
        { ruby: "注", rt: "そそ" },
        { ruby: "ぎます。" }
      ],
      romaji: "Kappu nuudoru ni oyu wo sosogimasu.",
      en: "I pour hot water into the cup noodles.",
      id: "Saya menuangkan air panas ke mi instan cangkir."
    }
  },
  "netto": {
    kanji: null,
    jlpt: "N4",
    furigana: [{ ruby: "ネット" }],
    sentence: {
      ja: "ネットでアニメのグッズを注文しました。",
      furigana: [
        { ruby: "ネットでアニメのグッズを" },
        { ruby: "注文", rt: "ちゅうもん" },
        { ruby: "しました。" }
      ],
      romaji: "Netto de anime no guzzu wo chuumon shimashita.",
      en: "I ordered anime merchandise online.",
      id: "Saya memesan merchandise anime di internet."
    }
  },
  "nooto": {
    kanji: "帳面",
    jlpt: "N5",
    furigana: [{ ruby: "ノート" }],
    sentence: {
      ja: "新しいノートに漢字を書きます。",
      furigana: [
        { ruby: "新", rt: "あたら" },
        { ruby: "しいノートに" },
        { ruby: "漢字", rt: "かんじ" },
        { ruby: "を" },
        { ruby: "書", rt: "か" },
        { ruby: "きます。" }
      ],
      romaji: "Atarashii nooto ni kanji wo kakimasu.",
      en: "I write kanji in a new notebook.",
      id: "Saya menulis kanji di buku catatan baru."
    }
  },
  "hanbaagaa": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "ハンバーガー" }],
    sentence: {
      ja: "お昼にハンバーガーとポテトを食べます。",
      furigana: [
        { ruby: "お" },
        { ruby: "昼", rt: "ひる" },
        { ruby: "にハンバーガーとポテトを" },
        { ruby: "食", rt: "た" },
        { ruby: "べます。" }
      ],
      romaji: "Ohiru ni hanbaagaa to poteto wo tabemasu.",
      en: "I eat a hamburger and fries for lunch.",
      id: "Saya makan hamburger dan kentang goreng untuk makan siang."
    }
  },
  "hiiroo": {
    kanji: "英雄",
    jlpt: "Anime",
    furigana: [{ ruby: "ヒーロー" }],
    sentence: {
      ja: "アニメのヒーローが悪者を倒します。",
      furigana: [
        { ruby: "アニメのヒーローが" },
        { ruby: "悪者", rt: "わるもの" },
        { ruby: "を" },
        { ruby: "倒", rt: "たお" },
        { ruby: "します。" }
      ],
      romaji: "Anime no hiiroo ga warumono wo taoshimasu.",
      en: "The anime hero defeats the villain.",
      id: "Pahlawan anime mengalahkan penjahat."
    }
  },
  "furansu": {
    kanji: "仏蘭西",
    jlpt: "N5",
    furigana: [{ ruby: "フランス" }],
    sentence: {
      ja: "フランスのパリに行ってみたいです。",
      furigana: [
        { ruby: "フランスのパリに" },
        { ruby: "行", rt: "い" },
        { ruby: "ってみたいです。" }
      ],
      romaji: "Furansu no Pari ni itte mitai desu.",
      en: "I want to try visiting Paris in France.",
      id: "Saya ingin mencoba pergi ke Paris di Perancis."
    }
  },
  "herumetto": {
    kanji: null,
    jlpt: "N4",
    furigana: [{ ruby: "ヘルメット" }],
    sentence: {
      ja: "自転車に乗るときはヘルメットをかぶります。",
      furigana: [
        { ruby: "自転車", rt: "じてんしゃ" },
        { ruby: "に" },
        { ruby: "乗", rt: "の" },
        { ruby: "るときはヘルメットをかぶります。" }
      ],
      romaji: "Jitensha ni noru toki wa herumetto wo kaburimasu.",
      en: "I wear a helmet when riding a bicycle.",
      id: "Saya memakai helm saat mengendarai sepeda."
    }
  },
  "hoteru": {
    kanji: "旅館",
    jlpt: "N5",
    furigana: [{ ruby: "ホテル" }],
    sentence: {
      ja: "旅行先のホテルを予約しました。",
      furigana: [
        { ruby: "旅行先", rt: "りょこうさき" },
        { ruby: "のホテルを" },
        { ruby: "予約", rt: "よやく" },
        { ruby: "しました。" }
      ],
      romaji: "Ryokousaki no hoteru wo yoyaku shimashita.",
      en: "I reserved a hotel at my travel destination.",
      id: "Saya sudah memesan hotel di tempat tujuan wisata."
    }
  },
  "masuku": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "マスク" }],
    sentence: {
      ja: "風邪を予防するためにマスクを着けます。",
      furigana: [
        { ruby: "風邪", rt: "かぜ" },
        { ruby: "を" },
        { ruby: "予防", rt: "よぼう" },
        { ruby: "するためにマスクを" },
        { ruby: "着", rt: "つ" },
        { ruby: "けます。" }
      ],
      romaji: "Kaze wo yobou suru tame ni masuku wo tsukemasu.",
      en: "I wear a mask to prevent catching a cold.",
      id: "Saya memakai masker untuk mencegah flu."
    }
  },
  "miruku": {
    kanji: "牛乳",
    jlpt: "N5",
    furigana: [{ ruby: "ミルク" }],
    sentence: {
      ja: "ホットコーヒーにミルクを入れます。",
      furigana: [
        { ruby: "ホットコーヒーにミルクを" },
        { ruby: "入", rt: "い" },
        { ruby: "れます。" }
      ],
      romaji: "Hotto koohii ni miruku wo iremasu.",
      en: "I add milk to hot coffee.",
      id: "Saya menuangkan susu ke dalam kopi panas."
    }
  },
  "muubii": {
    kanji: "映画",
    jlpt: "N4",
    furigana: [{ ruby: "ムービー" }],
    sentence: {
      ja: "映画館で新しいムービーを鑑賞します。",
      furigana: [
        { ruby: "映画館", rt: "えいがかん" },
        { ruby: "で" },
        { ruby: "新", rt: "あたら" },
        { ruby: "しいムービーを" },
        { ruby: "鑑賞", rt: "かんしょう" },
        { ruby: "します。" }
      ],
      romaji: "Eigakan de atarashii muubii wo kanshou shimasu.",
      en: "I watch a new movie at the cinema.",
      id: "Saya menonton film baru di bioskop."
    }
  },
  "menyuu": {
    kanji: "献立",
    jlpt: "N5",
    furigana: [{ ruby: "メニュー" }],
    sentence: {
      ja: "レストランでメニューを見て注文します。",
      furigana: [
        { ruby: "レストランでメニューを" },
        { ruby: "見", rt: "み" },
        { ruby: "て" },
        { ruby: "注文", rt: "ちゅうもん" },
        { ruby: "します。" }
      ],
      romaji: "Resutoran de menyuu wo mite chuumon shimasu.",
      en: "I look at the menu at the restaurant and order.",
      id: "Saya melihat menu di restoran lalu memesan."
    }
  },
  "moderu": {
    kanji: "模型",
    jlpt: "N4",
    furigana: [{ ruby: "モデル" }],
    sentence: {
      ja: "最新モデルのスマートフォンを買いました。",
      furigana: [
        { ruby: "最新", rt: "さいしん" },
        { ruby: "モデルのスマートフォンを" },
        { ruby: "買", rt: "か" },
        { ruby: "いました。" }
      ],
      romaji: "Saishin moderu no sumaatofon wo kaimashita.",
      en: "I bought the newest model smartphone.",
      id: "Saya membeli ponsel pintar model terbaru."
    }
  },
  "yaado": {
    kanji: null,
    jlpt: "N4",
    furigana: [{ ruby: "ヤード" }],
    sentence: {
      ja: "アメリカでは長さをヤードで測ることもあります。",
      furigana: [
        { ruby: "アメリカでは" },
        { ruby: "長", rt: "なが" },
        { ruby: "さをヤードで" },
        { ruby: "測", rt: "はか" },
        { ruby: "ることもあります。" }
      ],
      romaji: "Amerika de wa nagasa wo yaado de hakaru koto mo arimasu.",
      en: "In America, length is sometimes measured in yards.",
      id: "Di Amerika, panjang terkadang diukur dengan yard."
    }
  },
  "yuumoa": {
    kanji: "滑稽",
    jlpt: "N4",
    furigana: [{ ruby: "ユーモア" }],
    sentence: {
      ja: "彼はユーモアがあって面白い人です。",
      furigana: [
        { ruby: "彼", rt: "かれ" },
        { ruby: "はユーモアがあって" },
        { ruby: "面白", rt: "おもしろ" },
        { ruby: "い" },
        { ruby: "人", rt: "ひと" },
        { ruby: "です。" }
      ],
      romaji: "Kare wa yuumoa ga atte omoshiroi hito desu.",
      en: "He has good humor and is a fun person.",
      id: "Dia memiliki rasa humor dan orang yang menyenangkan."
    }
  },
  "yooguruto": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "ヨーグルト" }],
    sentence: {
      ja: "朝食にフルーツとヨーグルトを食べます。",
      furigana: [
        { ruby: "朝食", rt: "ちょうしょく" },
        { ruby: "にフルーツとヨーグルトを" },
        { ruby: "食", rt: "た" },
        { ruby: "べます。" }
      ],
      romaji: "Choushoku ni furuutsu to yooguruto wo tabemasu.",
      en: "I eat fruit and yogurt for breakfast.",
      id: "Saya makan buah dan yoghurt untuk sarapan."
    }
  },
  "rajio": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "ラジオ" }],
    sentence: {
      ja: "車の中でラジオを聞きます。",
      furigana: [
        { ruby: "車", rt: "くるま" },
        { ruby: "の" },
        { ruby: "中", rt: "なか" },
        { ruby: "でラジオを" },
        { ruby: "聞", rt: "き" },
        { ruby: "きます。" }
      ],
      romaji: "Kuruma no naka de rajio wo kikimasu.",
      en: "I listen to the radio inside the car.",
      id: "Saya mendengarkan radio di dalam mobil."
    }
  },
  "riidaa": {
    kanji: "指導者",
    jlpt: "N4",
    furigana: [{ ruby: "リーダー" }],
    sentence: {
      ja: "チームのリーダーが目標を決めます。",
      furigana: [
        { ruby: "チームのリーダーが" },
        { ruby: "目標", rt: "もくひょう" },
        { ruby: "を" },
        { ruby: "決", rt: "き" },
        { ruby: "めます。" }
      ],
      romaji: "Chiimu no riidaa ga mokuhyou wo kimemasu.",
      en: "The team leader decides the goals.",
      id: "Pemimpin tim menentukan tujuan."
    }
  },
  "ruuru": {
    kanji: "規則",
    jlpt: "N4",
    furigana: [{ ruby: "ルール" }],
    sentence: {
      ja: "ゲームのルールをみんなで守りましょう。",
      furigana: [
        { ruby: "ゲームのルールをみんなで" },
        { ruby: "守", rt: "まも" },
        { ruby: "りましょう。" }
      ],
      romaji: "Geemu no ruuru wo minna de mamorimashou.",
      en: "Let's all follow the game rules.",
      id: "Mari kita semua mematuhi aturan permainannya."
    }
  },
  "resutoran": {
    kanji: "飲食店",
    jlpt: "N5",
    furigana: [{ ruby: "レストラン" }],
    sentence: {
      ja: "美味しいイタリアンレストランを予約しました。",
      furigana: [
        { ruby: "美味", rt: "おい" },
        { ruby: "しいイタリアンレストランを" },
        { ruby: "予約", rt: "よやく" },
        { ruby: "しました。" }
      ],
      romaji: "Oishii itarian resutoran wo yoyaku shimashita.",
      en: "I booked a delicious Italian restaurant.",
      id: "Saya memesan restoran Italia yang lezat."
    }
  },
  "robotto": {
    kanji: null,
    jlpt: "Anime",
    furigana: [{ ruby: "ロボット" }],
    sentence: {
      ja: "巨大ロボットのアニメに夢中になりました。",
      furigana: [
        { ruby: "巨大", rt: "きょだい" },
        { ruby: "ロボットのアニメに" },
        { ruby: "夢中", rt: "むちゅう" },
        { ruby: "になりました。" }
      ],
      romaji: "Kyodai robotto no anime ni muchuu ni narimashita.",
      en: "I was captivated by the giant mecha robot anime.",
      id: "Saya terpikat oleh anime robot mecha raksasa."
    }
  },
  "wain": {
    kanji: "葡萄酒",
    jlpt: "N5",
    furigana: [{ ruby: "ワイン" }],
    sentence: {
      ja: "夕食に赤ワインを少し飲みます。",
      furigana: [
        { ruby: "夕食", rt: "ゆうしょく" },
        { ruby: "に" },
        { ruby: "赤", rt: "あか" },
        { ruby: "ワインを" },
        { ruby: "少", rt: "すこ" },
        { ruby: "し" },
        { ruby: "飲", rt: "の" },
        { ruby: "みます。" }
      ],
      romaji: "Yuushoku ni aka wain wo sukoshi nomimasu.",
      en: "I drink a little red wine with dinner.",
      id: "Saya minum sedikit anggur merah saat makan malam."
    }
  },
  "wo": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "ヲ" }],
    sentence: {
      ja: "ヲはカタカナの助詞ユニットです。",
      furigana: [
        { ruby: "ヲはカタカナの" },
        { ruby: "助詞", rt: "じょし" },
        { ruby: "ユニットです。" }
      ],
      romaji: "Wo wa Katakana no joshi yunitto desu.",
      en: "'Wo' is the katakana particle glyph.",
      id: "'Wo' adalah bentuk katakana dari partikel."
    }
  },
  "pan": {
    kanji: "麺麭",
    jlpt: "N5",
    furigana: [{ ruby: "パン" }],
    sentence: {
      ja: "朝ごはんに焼きたてのパンを食べます。",
      furigana: [
        { ruby: "朝", rt: "あさ" },
        { ruby: "ごはんに" },
        { ruby: "焼", rt: "や" },
        { ruby: "きたてのパンを" },
        { ruby: "食", rt: "た" },
        { ruby: "べます。" }
      ],
      romaji: "Asagohan ni yakitate no pan wo tabemasu.",
      en: "I eat freshly baked bread for breakfast.",
      id: "Saya makan roti yang baru matang untuk sarapan."
    }
  },
  "gasu": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "ガス" }],
    sentence: {
      ja: "料理が終わったらガスを止めます。",
      furigana: [
        { ruby: "料理", rt: "りょうり" },
        { ruby: "が" },
        { ruby: "終", rt: "お" },
        { ruby: "わったらガスを" },
        { ruby: "止", rt: "と" },
        { ruby: "めます。" }
      ],
      romaji: "Ryouri ga owattara gasu wo tomemasu.",
      en: "I turn off the gas when cooking is done.",
      id: "Setelah selesai memasak, saya mematikan gas."
    }
  },
  "gitaa": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "ギター" }],
    sentence: {
      ja: "放課後にギターの練習をします。",
      furigana: [
        { ruby: "放課後", rt: "ほうかご" },
        { ruby: "にギターの" },
        { ruby: "練習", rt: "れんしゅう" },
        { ruby: "をします。" }
      ],
      romaji: "Houkago ni gitaa no renshuu wo shimasu.",
      en: "I practice guitar after school.",
      id: "Saya berlatih gitar sepulang sekolah."
    }
  },
  "gurasu": {
    kanji: "硝子杯",
    jlpt: "N5",
    furigana: [{ ruby: "グラス" }],
    sentence: {
      ja: "透明なグラスに冷たい水を注ぎます。",
      furigana: [
        { ruby: "透明", rt: "とうめい" },
        { ruby: "なグラスに" },
        { ruby: "冷", rt: "つめ" },
        { ruby: "たい" },
        { ruby: "水", rt: "みず" },
        { ruby: "を" },
        { ruby: "注", rt: "そそ" },
        { ruby: "ぎます。" }
      ],
      romaji: "Toumei na gurasu ni tsumetai mizu wo sosogimasu.",
      en: "I pour cold water into the clear glass.",
      id: "Saya menuangkan air dingin ke dalam gelas bening."
    }
  },
  "geemu": {
    kanji: null,
    jlpt: "Anime",
    furigana: [{ ruby: "ゲーム" }],
    sentence: {
      ja: "友達とオンラインでゲームを対戦します。",
      furigana: [
        { ruby: "友達", rt: "ともだち" },
        { ruby: "とオンラインでゲームを" },
        { ruby: "対戦", rt: "たいせん" },
        { ruby: "します。" }
      ],
      romaji: "Tomodachi to onrain de geemu wo taisen shimasu.",
      en: "I battle friends online in a video game.",
      id: "Saya bermain game tanding online bersama teman."
    }
  },
  "gorufu": {
    kanji: null,
    jlpt: "N4",
    furigana: [{ ruby: "ゴルフ" }],
    sentence: {
      ja: "日曜日にゴルフ場でプレーします。",
      furigana: [
        { ruby: "日曜日", rt: "にちようび" },
        { ruby: "にゴルフ" },
        { ruby: "場", rt: "じょう" },
        { ruby: "でプレーします。" }
      ],
      romaji: "Nichiyoubi ni gorufujou de puree shimasu.",
      en: "I play at the golf course on Sunday.",
      id: "Saya bermain di lapangan golf pada hari Minggu."
    }
  },
  "dezain": {
    kanji: "意匠",
    jlpt: "N4",
    furigana: [{ ruby: "デザイン" }],
    sentence: {
      ja: "この服はレトロなデザインが可愛いです。",
      furigana: [
        { ruby: "この" },
        { ruby: "服", rt: "ふく" },
        { ruby: "はレトロなデザインが" },
        { ruby: "可愛", rt: "かわい" },
        { ruby: "いです。" }
      ],
      romaji: "Kono fuku wa retoro na dezain ga kawaii desu.",
      en: "The retro design of this outfit is cute.",
      id: "Pakaian ini lucu dengan desain retro."
    }
  },
  "juusu": {
    kanji: "果汁",
    jlpt: "N5",
    furigana: [{ ruby: "ジュース" }],
    sentence: {
      ja: "冷たいリンゴジュースを飲みます。",
      furigana: [
        { ruby: "冷", rt: "つめ" },
        { ruby: "たいリンゴジュースを" },
        { ruby: "飲", rt: "の" },
        { ruby: "みます。" }
      ],
      romaji: "Tsumetai ringo juusu wo nomimasu.",
      en: "I drink cold apple juice.",
      id: "Saya minum jus apel dingin."
    }
  },
  "zubon": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "ズボン" }],
    sentence: {
      ja: "青いジーンズのズボンを履きます。",
      furigana: [
        { ruby: "青", rt: "あお" },
        { ruby: "いジーンズのズボンを" },
        { ruby: "履", rt: "は" },
        { ruby: "きます。" }
      ],
      romaji: "Aoi jiinzu no zubon wo hakimasu.",
      en: "I put on blue jeans trousers.",
      id: "Saya memakai celana jin biru."
    }
  },
  "zero": {
    kanji: "零",
    jlpt: "N5",
    furigana: [{ ruby: "ゼロ" }],
    sentence: {
      ja: "テストでカウントダウンがゼロになりました。",
      furigana: [
        { ruby: "テストでカウントダウンがゼロになりました。" }
      ],
      romaji: "Tesuto de kauntodaun ga zero ni narimashita.",
      en: "The countdown reached zero during the test.",
      id: "Hitungan mundur mencapai angka nol saat tes."
    }
  },
  "zonbi": {
    kanji: null,
    jlpt: "Anime",
    furigana: [{ ruby: "ゾンビ" }],
    sentence: {
      ja: "アニメのゾンビ映画を友達と一緒に見ました。",
      furigana: [
        { ruby: "アニメのゾンビ" },
        { ruby: "映画", rt: "えいが" },
        { ruby: "を" },
        { ruby: "友達", rt: "ともだち" },
        { ruby: "と" },
        { ruby: "一緒", rt: "いっしょ" },
        { ruby: "に" },
        { ruby: "見", rt: "み" },
        { ruby: "ました。" }
      ],
      romaji: "Anime no zonbi eiga wo tomodachi to issho ni mimashita.",
      en: "I watched an anime zombie movie with my friends.",
      id: "Saya menonton film zombie anime bersama teman-teman."
    }
  },
  "dansu": {
    kanji: "舞踏",
    jlpt: "N4",
    furigana: [{ ruby: "ダンス" }],
    sentence: {
      ja: "文化祭でアイドルのダンスを披露します。",
      furigana: [
        { ruby: "文化祭", rt: "ぶんかさい" },
        { ruby: "でアイドルのダンスを" },
        { ruby: "披露", rt: "ひろう" },
        { ruby: "します。" }
      ],
      romaji: "Bunkasai de aidoru no dansu wo hirou shimasu.",
      en: "We perform an idol dance at the school festival.",
      id: "Kami menampilkan tarian idola di festival kebudayaan sekolah."
    }
  },
  "hanaji-katakana": {
    kanji: "鼻血",
    jlpt: "Anime",
    furigana: [{ ruby: "ハナヂ" }],
    sentence: {
      ja: "あまりの興奮にハナヂが出そうになりました！",
      furigana: [
        { ruby: "あまりの" },
        { ruby: "興奮", rt: "こうふん" },
        { ruby: "にハナヂが" },
        { ruby: "出", rt: "で" },
        { ruby: "そうになりました！" }
      ],
      romaji: "Amari no koufun ni hanaji ga desou ni narimashita!",
      en: "I was so excited I almost got a nosebleed!",
      id: "Saking gembiranya aku hampir mimisan!"
    }
  },
  "guzzu": {
    kanji: null,
    jlpt: "Anime",
    furigana: [{ ruby: "グッズ" }],
    sentence: {
      ja: "秋葉原で好きなアニメのグッズを買いました。",
      furigana: [
        { ruby: "秋葉原", rt: "あきはばら" },
        { ruby: "で" },
        { ruby: "好", rt: "す" },
        { ruby: "きなアニメのグッズを" },
        { ruby: "買", rt: "か" },
        { ruby: "いました。" }
      ],
      romaji: "Akihabara de sukina anime no guzzu wo kaimashita.",
      en: "I bought goods of my favorite anime in Akihabara.",
      id: "Saya membeli suvenir anime favorit di Akihabara."
    }
  },
  "dezaato": {
    kanji: "甘味",
    jlpt: "N5",
    furigana: [{ ruby: "デザート" }],
    sentence: {
      ja: "食後に甘いデザートを食べます。",
      furigana: [
        { ruby: "食後", rt: "しょくご" },
        { ruby: "に" },
        { ruby: "甘", rt: "あま" },
        { ruby: "いデザートを" },
        { ruby: "食", rt: "た" },
        { ruby: "べます。" }
      ],
      romaji: "Shokugo ni amai dezaato wo tabemasu.",
      en: "I eat sweet dessert after the meal.",
      id: "Saya makan hidangan penutup yang manis setelah makan."
    }
  },
  "doa": {
    kanji: "扉",
    jlpt: "N5",
    furigana: [{ ruby: "ドア" }],
    sentence: {
      ja: "部屋のドアをノックしてください。",
      furigana: [
        { ruby: "部屋", rt: "へや" },
        { ruby: "のドアをノックしてください。" }
      ],
      romaji: "Heya no doa wo nokku shite kudasai.",
      en: "Please knock on the room door.",
      id: "Tolong ketuk pintu kamar."
    }
  },
  "basu": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "バス" }],
    sentence: {
      ja: "毎朝バスに乗って通学します。",
      furigana: [
        { ruby: "毎朝", rt: "まいあさ" },
        { ruby: "バスに" },
        { ruby: "乗", rt: "の" },
        { ruby: "って" },
        { ruby: "通学", rt: "つうがく" },
        { ruby: "します。" }
      ],
      romaji: "Maiasa basu ni notte tsuugaku shimasu.",
      en: "I take the bus to school every morning.",
      id: "Saya naik bus ke sekolah setiap pagi."
    }
  },
  "biiru": {
    kanji: "麦酒",
    jlpt: "N4",
    furigana: [{ ruby: "ビール" }],
    sentence: {
      ja: "仕事の後に冷たいビールで乾杯します。",
      furigana: [
        { ruby: "仕事", rt: "しごと" },
        { ruby: "の" },
        { ruby: "後", rt: "あと" },
        { ruby: "に" },
        { ruby: "冷", rt: "つめ" },
        { ruby: "たいビールで" },
        { ruby: "乾杯", rt: "かんぱい" },
        { ruby: "します。" }
      ],
      romaji: "Shigoto no ato ni tsumetai biiru de kanpai shimasu.",
      en: "We toast with cold beer after work.",
      id: "Kami bersulang dengan bir dingin setelah bekerja."
    }
  },
  "buutsu": {
    kanji: "長靴",
    jlpt: "N4",
    furigana: [{ ruby: "ブーツ" }],
    sentence: {
      ja: "冬の寒い日に革のブーツを履きます。",
      furigana: [
        { ruby: "冬", rt: "ふゆ" },
        { ruby: "の" },
        { ruby: "寒", rt: "さむ" },
        { ruby: "い" },
        { ruby: "日", rt: "ひ" },
        { ruby: "に" },
        { ruby: "革", rt: "かわ" },
        { ruby: "のブーツを" },
        { ruby: "履", rt: "は" },
        { ruby: "きます。" }
      ],
      romaji: "Fuyu no samui hi ni kawa no buutsu wo hakimasu.",
      en: "I wear leather boots on cold winter days.",
      id: "Saya memakai sepatu bot kulit di hari musim dingin yang sejuk."
    }
  },
  "beddo": {
    kanji: "寝台",
    jlpt: "N5",
    furigana: [{ ruby: "ベッド" }],
    sentence: {
      ja: "疲れたのでベッドに入って休みます。",
      furigana: [
        { ruby: "疲", rt: "つか" },
        { ruby: "れたのでベッドに" },
        { ruby: "入", rt: "はい" },
        { ruby: "って" },
        { ruby: "休", rt: "やす" },
        { ruby: "みます。" }
      ],
      romaji: "Tsukareta node beddo ni haitte yasumimasu.",
      en: "I was tired, so I got into bed and rested.",
      id: "Saya lelah, jadi saya berbaring di tempat tidur dan istirahat."
    }
  },
  "booru": {
    kanji: "球",
    jlpt: "N5",
    furigana: [{ ruby: "ボール" }],
    sentence: {
      ja: "グラウンドでサッカーボールを蹴ります。",
      furigana: [
        { ruby: "グラウンドでサッカーボールを" },
        { ruby: "蹴", rt: "け" },
        { ruby: "ります。" }
      ],
      romaji: "Guraundo de sakkaa booru wo kerimasu.",
      en: "I kick the soccer ball on the field.",
      id: "Saya menendang bola sepak di lapangan."
    }
  },
  "pasupooto": {
    kanji: "旅券",
    jlpt: "N5",
    furigana: [{ ruby: "パスポート" }],
    sentence: {
      ja: "空港でパスポートを見せます。",
      furigana: [
        { ruby: "空港", rt: "くうこう" },
        { ruby: "でパスポートを" },
        { ruby: "見", rt: "み" },
        { ruby: "せます。" }
      ],
      romaji: "Kuukou de pasupooto wo misemasu.",
      en: "I present my passport at the airport.",
      id: "Saya memperlihatkan paspor di bandara."
    }
  },
  "piano-katakana": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "ピアノ" }],
    sentence: {
      ja: "コンサートホールでグランドピアノを演奏します。",
      furigana: [
        { ruby: "コンサートホールでグランドピアノを" },
        { ruby: "演奏", rt: "えんそう" },
        { ruby: "します。" }
      ],
      romaji: "Konsaato hooru de gurando piano wo ensou shimasu.",
      en: "I perform on a grand piano in the concert hall.",
      id: "Saya memainkan grand piano di gedung konser."
    }
  },
  "puuru": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "プール" }],
    sentence: {
      ja: "夏休みに学校のプールで泳ぎます。",
      furigana: [
        { ruby: "夏休", rt: "なつやす" },
        { ruby: "みに" },
        { ruby: "学校", rt: "がっこう" },
        { ruby: "のプールで" },
        { ruby: "泳", rt: "およ" },
        { ruby: "ぎます。" }
      ],
      romaji: "Natsuyasumi ni gakkou no puuru de oyogimasu.",
      en: "I swim in the school pool during summer break.",
      id: "Saya berenang di kolam renang sekolah saat liburan musim panas."
    }
  },
  "pen": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "ペン" }],
    sentence: {
      ja: "黒いペンで手紙を書きます。",
      furigana: [
        { ruby: "黒", rt: "くろ" },
        { ruby: "いペンで" },
        { ruby: "手紙", rt: "てがみ" },
        { ruby: "を" },
        { ruby: "書", rt: "か" },
        { ruby: "きます。" }
      ],
      romaji: "Kuroi pen de tegami wo kakimasu.",
      en: "I write a letter with a black pen.",
      id: "Saya menulis surat dengan pulpen hitam."
    }
  },
  "posuto": {
    kanji: "郵便受け",
    jlpt: "N5",
    furigana: [{ ruby: "ポスト" }],
    sentence: {
      ja: "手紙を赤いポストに投函します。",
      furigana: [
        { ruby: "手紙", rt: "てがみ" },
        { ruby: "を" },
        { ruby: "赤", rt: "あか" },
        { ruby: "いポストに" },
        { ruby: "投函", rt: "とうかん" },
        { ruby: "します。" }
      ],
      romaji: "Tegami wo akai posuto ni toukan shimasu.",
      en: "I drop the letter into the red postbox.",
      id: "Saya memasukkan surat ke dalam kotak pos merah."
    }
  },
  "fasshon": {
    kanji: "流行",
    jlpt: "N4",
    furigana: [{ ruby: "ファッション" }],
    sentence: {
      ja: "原宿のユニークなファッションが世界で話題です。",
      furigana: [
        { ruby: "原宿", rt: "はらじゅく" },
        { ruby: "のユニークなファッションが" },
        { ruby: "世界", rt: "せかい" },
        { ruby: "で" },
        { ruby: "話題", rt: "わだい" },
        { ruby: "です。" }
      ],
      romaji: "Harajuku no yuniiku na fasshon ga sekai de wadai desu.",
      en: "Harajuku's unique fashion is talked about worldwide.",
      id: "Gaya busana unik Harajuku menjadi perbincangan di seluruh dunia."
    }
  },
  "firumu": {
    kanji: null,
    jlpt: "N4",
    furigana: [{ ruby: "フィルム" }],
    sentence: {
      ja: "クラシックカメラにフィルムを装填します。",
      furigana: [
        { ruby: "クラシックカメラにフィルムを" },
        { ruby: "装填", rt: "そうてん" },
        { ruby: "します。" }
      ],
      romaji: "Kurashikku kamera ni firumu wo souten shimasu.",
      en: "I load film into the classic camera.",
      id: "Saya memasang rol film ke kamera klasik."
    }
  },
  "fesu": {
    kanji: "祝祭",
    jlpt: "Anime",
    furigana: [{ ruby: "フェス" }],
    sentence: {
      ja: "夏のアニメソングフェスで大盛り上がりしました！",
      furigana: [
        { ruby: "夏", rt: "なつ" },
        { ruby: "のアニメソングフェスで" },
        { ruby: "大盛", rt: "おおも" },
        { ruby: "り" },
        { ruby: "上", rt: "あ" },
        { ruby: "がりしました！" }
      ],
      romaji: "Natsu no anime songu fesu de oomoriagari shimashita!",
      en: "We had a blast at the summer anime song festival!",
      id: "Kami sangat bersemangat di festival lagu anime musim panas!"
    }
  },
  "fooku": {
    kanji: "叉",
    jlpt: "N5",
    furigana: [{ ruby: "フォーク" }],
    sentence: {
      ja: "フォークでパスタを巻いて食べます。",
      furigana: [
        { ruby: "フォークでパスタを" },
        { ruby: "巻", rt: "ま" },
        { ruby: "いて" },
        { ruby: "食", rt: "た" },
        { ruby: "べます。" }
      ],
      romaji: "Fooku de pasuta wo maite tabemasu.",
      en: "I twirl pasta with a fork and eat it.",
      id: "Saya menggulung pasta dengan garpu lalu memakannya."
    }
  },
  "paatii": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "パーティー" }],
    sentence: {
      ja: "友達の誕生日パーティーに招待されました。",
      furigana: [
        { ruby: "友達", rt: "ともだち" },
        { ruby: "の" },
        { ruby: "誕生日", rt: "たんじょうび" },
        { ruby: "パーティーに" },
        { ruby: "招待", rt: "しょうたい" },
        { ruby: "されました。" }
      ],
      romaji: "Tomodachi no tanjoubi paatii ni shoutai saremashita.",
      en: "I was invited to my friend's birthday party.",
      id: "Saya diundang ke pesta ulang tahun teman."
    }
  },
  "birudingu": {
    kanji: "高層ビル",
    jlpt: "N5",
    furigana: [{ ruby: "ビルディング" }],
    sentence: {
      ja: "東京には高いビルディングがたくさん並んでいます。",
      furigana: [
        { ruby: "東京", rt: "とうきょう" },
        { ruby: "には" },
        { ruby: "高", rt: "たか" },
        { ruby: "いビルディングがたくさん" },
        { ruby: "並", rt: "なら" },
        { ruby: "んでいます。" }
      ],
      romaji: "Toukyou ni wa takai birudingu ga takusan narande imasu.",
      en: "Many tall buildings line the streets of Tokyo.",
      id: "Banyak gedung tinggi berjejer di Tokyo."
    }
  },
  "wedingu": {
    kanji: "結婚式",
    jlpt: "N4",
    furigana: [{ ruby: "ウェディング" }],
    sentence: {
      ja: "教会で美しいウェディングドレスを見ました。",
      furigana: [
        { ruby: "教会", rt: "きょうかい" },
        { ruby: "で" },
        { ruby: "美", rt: "うつく" },
        { ruby: "しいウェディングドレスを" },
        { ruby: "見", rt: "み" },
        { ruby: "ました。" }
      ],
      romaji: "Kyoukai de utsukushii wedingu doresu wo mimashita.",
      en: "I saw a beautiful wedding dress at the church.",
      id: "Saya melihat gaun pengantin yang indah di gereja."
    }
  },
  "wiiku": {
    kanji: "週間",
    jlpt: "N4",
    furigana: [{ ruby: "ウィーク" }],
    sentence: {
      ja: "ゴールデンウィークに旅行を計画しています。",
      furigana: [
        { ruby: "ゴールデンウィークに" },
        { ruby: "旅行", rt: "りょこう" },
        { ruby: "を" },
        { ruby: "計画", rt: "けいかく" },
        { ruby: "しています。" }
      ],
      romaji: "Gooruden wiiku ni ryokou wo keikaku shite imasu.",
      en: "I am planning a trip for Golden Week.",
      id: "Saya merencanakan liburan saat Golden Week."
    }
  },
  "vaiorin": {
    kanji: null,
    jlpt: "N4",
    furigana: [{ ruby: "ヴァイオリン" }],
    sentence: {
      ja: "アニメの劇中で美しいヴァイオリンの音が鳴り響きます。",
      furigana: [
        { ruby: "アニメの" },
        { ruby: "劇中", rt: "げきちゅう" },
        { ruby: "で" },
        { ruby: "美", rt: "うつく" },
        { ruby: "しいヴァイオリンの" },
        { ruby: "音", rt: "おと" },
        { ruby: "が" },
        { ruby: "鳴", rt: "な" },
        { ruby: "り" },
        { ruby: "響", rt: "ひび" },
        { ruby: "きます。" }
      ],
      romaji: "Anime no gekichuu de utsukushii vaiorin no oto ga narihibikimasu.",
      en: "The beautiful sound of a violin resounds in the anime.",
      id: "Suara biola yang indah berkumandang di dalam anime."
    }
  },
  "voryuumu": {
    kanji: "音量",
    jlpt: "N4",
    furigana: [{ ruby: "ボリューム" }],
    sentence: {
      ja: "音楽のボリュームを少し上げてください。",
      furigana: [
        { ruby: "音楽", rt: "おんがく" },
        { ruby: "のボリュームを" },
        { ruby: "少", rt: "すこ" },
        { ruby: "し" },
        { ruby: "上", rt: "あ" },
        { ruby: "げてください。" }
      ],
      romaji: "Ongaku no voryuumu wo sukoshi agete kudasai.",
      en: "Please turn up the music volume a little.",
      id: "Tolong besarkan sedikit volume musiknya."
    }
  },
  "anime": {
    kanji: "動画",
    jlpt: "Anime",
    furigana: [{ ruby: "アニメ" }],
    sentence: {
      ja: "日本のアニメを字幕なしで楽しみたいです！",
      furigana: [
        { ruby: "日本", rt: "にほん" },
        { ruby: "のアニメを" },
        { ruby: "字幕", rt: "じまく" },
        { ruby: "なしで" },
        { ruby: "楽", rt: "たの" },
        { ruby: "しみたいです！" }
      ],
      romaji: "Nihon no anime wo jimaku nashi de tanoshimitai desu!",
      en: "I want to enjoy Japanese anime without subtitles!",
      id: "Saya ingin menikmati anime Jepang tanpa terjemahan teks!"
    }
  },
  "koohii": {
    kanji: "珈琲",
    jlpt: "N5",
    furigana: [{ ruby: "コーヒー" }],
    sentence: {
      ja: "朝の目覚ましに温かいコーヒーを飲みます。",
      furigana: [
        { ruby: "朝", rt: "あさ" },
        { ruby: "の" },
        { ruby: "目覚", rt: "めざ" },
        { ruby: "ましに" },
        { ruby: "温", rt: "あたた" },
        { ruby: "かいコーヒーを" },
        { ruby: "飲", rt: "の" },
        { ruby: "みます。" }
      ],
      romaji: "Asa no mezamashi ni atatakai koohii wo nomimasu.",
      en: "I drink warm coffee to wake up in the morning.",
      id: "Saya minum kopi hangat untuk menyegarkan diri di pagi hari."
    }
  },
  "raamen": {
    kanji: "拉麺",
    jlpt: "N5",
    furigana: [{ ruby: "ラーメン" }],
    sentence: {
      ja: "豚骨スープの熱いラーメンを注文します。",
      furigana: [
        { ruby: "豚骨", rt: "とんこつ" },
        { ruby: "スープの" },
        { ruby: "熱", rt: "あつ" },
        { ruby: "いラーメンを" },
        { ruby: "注文", rt: "ちゅうもん" },
        { ruby: "します。" }
      ],
      romaji: "Tonkotsu suupu no atsui raamen wo chuumon shimasu.",
      en: "I order hot tonkotsu broth ramen.",
      id: "Saya memesan semangkuk ramen panas kuah tonkotsu."
    }
  },
  "terebi": {
    kanji: null,
    jlpt: "N5",
    furigana: [{ ruby: "テレビ" }],
    sentence: {
      ja: "リビングのテレビでアニメの最新話を観ます。",
      furigana: [
        { ruby: "リビングのテレビでアニメの" },
        { ruby: "最新話", rt: "さいしんわ" },
        { ruby: "を" },
        { ruby: "観", rt: "み" },
        { ruby: "ます。" }
      ],
      romaji: "Ribingu no terebi de anime no saishinwa wo mimasu.",
      en: "I watch the latest anime episode on the living room TV.",
      id: "Saya menonton episode terbaru anime di TV ruang tamu."
    }
  }
};

// Combine all 161 words
const allMeta = { ...part1, ...katakanaMeta };

const enrichedVocab = rawVocab.map((item) => {
  const meta = allMeta[item.slug];
  if (!meta) {
    console.warn("Missing metadata for:", item.slug);
    return item;
  }
  return {
    ...item,
    kanji: meta.kanji,
    jlpt: meta.jlpt,
    furigana: meta.furigana,
    sentence: meta.sentence
  };
});

fs.writeFileSync("./src/data/vocabulary.json", JSON.stringify(enrichedVocab, null, 2), "utf8");
console.log("Successfully enriched all", enrichedVocab.length, "words in vocabulary.json with Kanji, JLPT, Furigana & Contextual Sentences!");

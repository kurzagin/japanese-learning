import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is required. Run with node --env-file=.env.local");
  process.exit(1);
}

const sql = neon(databaseUrl);

async function run() {
  console.log("Fetching current vocabulary...");
  const current = await sql`SELECT slug, character, romaji, script, kanji, meaning, kanji_options FROM vocabulary;`;
  console.log("Current total:", current.length);

  // 1. Delete duplicates & non-words:
  // - hanaji-katakana (duplicate of hanaji)
  // - wo (non-word)
  // - piano (hiragana duplicate of piano)
  console.log("Deleting duplicate hanaji-katakana and non-word wo...");
  await sql`DELETE FROM vocabulary WHERE slug IN ('hanaji-katakana', 'wo');`;

  console.log("Consolidating piano into katakana piano...");
  await sql`DELETE FROM vocabulary WHERE slug = 'piano';`;
  await sql`UPDATE vocabulary SET slug = 'piano' WHERE slug = 'piano-katakana';`;

  // 2. Fix voryuumu (character to ヴォリューム, romaji to voryūmu, meaning to ja: ヴォリューム)
  console.log("Updating voryuumu...");
  await sql`
    UPDATE vocabulary
    SET character = 'ヴォリューム',
        romaji = 'voryūmu',
        meaning = '{"en":"Volume","id":"Volume suara","ja":"ヴォリューム"}',
        trivia = '{"en":"Everyday Katakana loanword commonly used for sound/audio and modern Japanese conversation.","id":"Kata serapan Katakana yang sangat umum dipakai untuk suara/audio dan percakapan modern bahasa Jepang.","ja":"音量や容量を表す外来語で、現代日本語の日常会話や表記で幅広く使われます。"}',
        furigana = '[{"ruby":"ヴォリューム"}]',
        sentence = '{"ja":"音楽のヴォリュームを少し上げてください。","furigana":[{"ruby":"音楽","rt":"おんがく"},{"ruby":"のヴォリュームを"},{"ruby":"少","rt":"すこ"},{"ruby":"し"},{"ruby":"上","rt":"あ"},{"ruby":"げてください。"}],"romaji":"Ongaku no voryūmu wo sukoshi agete kudasai.","en":"Please turn up the music volume a little.","id":"Tolong besarkan sedikit volume musiknya."}'
    WHERE slug = 'voryuumu';
  `;

  // 3. Fix words with emphasis / extra context
  console.log("Fixing words with emphasis/extra context (sugoi, kawaii, terebi, hon-wo-yomu)...");
  await sql`
    UPDATE vocabulary
    SET meaning = '{"en":"Amazing / Great / Incredible","id":"Hebat / Luar biasa","ja":"すごい (凄い)"}'
    WHERE slug = 'sugoi';
  `;
  await sql`
    UPDATE vocabulary
    SET meaning = '{"en":"Cute / Adorable","id":"Lucu / Imut","ja":"かわいい (可愛い)"}'
    WHERE slug = 'kawaii';
  `;
  await sql`
    UPDATE vocabulary
    SET meaning = '{"en":"Television / TV","id":"Televisi / TV","ja":"テレビ"}'
    WHERE slug = 'terebi';
  `;
  await sql`
    UPDATE vocabulary
    SET character = 'ほんをよむ'
    WHERE slug = 'hon-wo-yomu';
  `;

  // 4. Fix definitions for homophones
  console.log("Fixing homophone definitions (ame, hashi, shiro, hana, kami, kumo)...");
  await sql`
    UPDATE vocabulary
    SET meaning = '{"en":"Rain (雨) / Candy (飴)","id":"Hujan (雨) / Permen (飴)","ja":"雨（天候）・飴（菓子）"}'
    WHERE slug = 'ame';
  `;
  await sql`
    UPDATE vocabulary
    SET meaning = '{"en":"Bridge (橋) / Chopsticks (箸) / Edge (端)","id":"Jembatan (橋) / Sumpit (箸) / Ujung (端)","ja":"橋（建造物）・箸（食器）・端（へり）"}'
    WHERE slug = 'hashi';
  `;
  await sql`
    UPDATE vocabulary
    SET meaning = '{"en":"White (白) / Castle (城)","id":"Putih (白) / Kastil (城)","ja":"白（色）・城（建造物）"}'
    WHERE slug = 'shiro';
  `;
  await sql`
    UPDATE vocabulary
    SET meaning = '{"en":"Flower (花) / Nose (鼻)","id":"Bunga (花) / Hidung (鼻)","ja":"花（植物）・鼻（身体）"}'
    WHERE slug = 'hana';
  `;
  await sql`
    UPDATE vocabulary
    SET meaning = '{"en":"Paper (紙) / Hair (髪) / God (神)","id":"Kertas (紙) / Rambut (髪) / Dewa (神)","ja":"紙（用紙）・髪（頭髪）・神（神仏）"}'
    WHERE slug = 'kami';
  `;
  await sql`
    UPDATE vocabulary
    SET meaning = '{"en":"Cloud (雲) / Spider (蜘蛛)","id":"Awan (雲) / Laba-laba (蜘蛛)","ja":"雲（気象）・蜘蛛（節足動物）"}'
    WHERE slug = 'kumo';
  `;

  // 5. Improve Katakana loanword romaji to Hepburn with macrons
  console.log("Updating Katakana loanwords to standard Hepburn romaji...");
  const hepburnMap = {
    biiru: "bīru",
    booru: "bōru",
    buutsu: "būtsu",
    chiizu: "chīzu",
    dezaato: "dezāto",
    ekoo: "ekō",
    fooku: "fōku",
    geemu: "gēmu",
    gitaa: "gitā",
    hanbaagaa: "hanbāgā",
    hiiroo: "hīrō",
    juusu: "jūsu",
    keeki: "kēki",
    kii: "kī",
    koohii: "kōhī",
    menyuu: "menyū",
    muubii: "mūbī",
    nooto: "nōto",
    nuudoru: "nūdoru",
    nyuusu: "nyūsu",
    paatii: "pātī",
    pasupooto: "pasupōto",
    puuru: "pūru",
    raamen: "rāmen",
    riidaa: "rīdā",
    ruuru: "rūru",
    seetaa: "sētā",
    soosu: "sōsu",
    supootsu: "supōtsu",
    takushii: "takushī",
    tsuaa: "tsuā",
    voryuumu: "voryūmu",
    wiiku: "wīku",
    yaado: "yādo",
    yooguruto: "yōguruto",
    yuumoa: "yūmoa"
  };

  for (const [slug, romaji] of Object.entries(hepburnMap)) {
    await sql`UPDATE vocabulary SET romaji = ${romaji} WHERE slug = ${slug};`;
  }

  const after = await sql`SELECT slug, character, romaji, script, jlpt, meaning FROM vocabulary ORDER BY slug;`;
  console.log("Total words in DB after update:", after.length);

  const jlptCounts = {};
  for (const r of after) {
    jlptCounts[r.jlpt] = (jlptCounts[r.jlpt] || 0) + 1;
  }
  console.log("JLPT breakdown:", jlptCounts);
}

run().catch(console.error);

import fs from "fs";
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not set. Run with node --env-file=.env.local");
  process.exit(1);
}

const sql = neon(databaseUrl);

async function runMigration() {
  console.log("=== PREPARING NEON DATABASE MIGRATION ===");

  // 1. Ensure hint_ja exists in kana table
  await sql`
    ALTER TABLE IF EXISTS kana 
    ADD COLUMN IF NOT EXISTS hint_ja TEXT;
  `;
  console.log("Checked kana table hint_ja column.");

  // 2. Create vocabulary table if not exists
  await sql`
    CREATE TABLE IF NOT EXISTS vocabulary (
      slug TEXT PRIMARY KEY,
      character TEXT NOT NULL,
      romaji TEXT NOT NULL,
      script TEXT NOT NULL,
      kanji TEXT,
      jlpt TEXT,
      primary_kana_id TEXT,
      meaning TEXT NOT NULL,
      trivia TEXT,
      furigana TEXT,
      sentence TEXT,
      kanji_options TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
    );
  `;
  console.log("Created/verified vocabulary table in Neon.");

  // 3. Load normalized vocabulary.json
  const vocabData = JSON.parse(fs.readFileSync("./src/data/vocabulary.json", "utf8"));
  console.log(`Seeding ${vocabData.length} vocabulary records into Neon...`);

  let seeded = 0;
  for (const item of vocabData) {
    await sql`
      INSERT INTO vocabulary (
        slug,
        character,
        romaji,
        script,
        kanji,
        jlpt,
        primary_kana_id,
        meaning,
        trivia,
        furigana,
        sentence,
        kanji_options,
        updated_at
      ) VALUES (
        ${item.slug},
        ${item.character},
        ${item.romaji},
        ${item.script},
        ${item.kanji || null},
        ${item.jlpt || null},
        ${item.primaryKanaId || null},
        ${JSON.stringify(item.meaning)},
        ${item.trivia ? JSON.stringify(item.trivia) : null},
        ${item.furigana ? JSON.stringify(item.furigana) : null},
        ${item.sentence ? JSON.stringify(item.sentence) : null},
        ${item.kanjiOptions ? JSON.stringify(item.kanjiOptions) : null},
        NOW()
      )
      ON CONFLICT (slug) DO UPDATE SET
        character = EXCLUDED.character,
        romaji = EXCLUDED.romaji,
        script = EXCLUDED.script,
        kanji = EXCLUDED.kanji,
        jlpt = EXCLUDED.jlpt,
        primary_kana_id = EXCLUDED.primary_kana_id,
        meaning = EXCLUDED.meaning,
        trivia = EXCLUDED.trivia,
        furigana = EXCLUDED.furigana,
        sentence = EXCLUDED.sentence,
        kanji_options = EXCLUDED.kanji_options,
        updated_at = NOW();
    `;
    seeded++;
  }

  console.log(`Successfully migrated and seeded ${seeded} words to Neon!`);

  // Verify row count
  const countRes = await sql`SELECT COUNT(*)::int as count FROM vocabulary;`;
  console.log(`Neon vocabulary table total rows: ${countRes[0].count}`);
}

runMigration().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});

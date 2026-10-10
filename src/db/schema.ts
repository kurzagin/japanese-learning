import { pgTable, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

// Users table (compatible with Neon Auth)
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Auth user ID from Neon Auth / OAuth
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Stage progression & speed challenge scores
export const userStageProgress = pgTable("user_stage_progress", {
  id: text("id").primaryKey(), // e.g. `${userId}_${stageId}`
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  stageId: text("stage_id").notNull(), // e.g. "hiragana-vowels", "hiragana-k", "katakana-vowels"
  completed: boolean("completed").default(false).notNull(),
  bestDurationMs: integer("best_duration_ms"), // best completed time in milliseconds
  stars: integer("stars").default(0).notNull(), // 1, 2, or 3 stars based on speed & accuracy
  accuracyPercentage: integer("accuracy_percentage").default(0).notNull(),
  attemptsCount: integer("attempts_count").default(0).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Pure Kana primitives table (Hiragana & Katakana letters)
export const kana = pgTable("kana", {
  id: text("id").primaryKey(), // e.g. "h-a", "k-ka"
  script: text("script").notNull(), // "hiragana" | "katakana"
  character: text("character").notNull(), // "あ", "ア"
  romaji: text("romaji").notNull(), // "a", "ka"
  type: text("type").notNull(), // "gojuon" | "dakuon" | "handakuon" | "yoon" | "extended"
  row: text("row").notNull(), // "vowel", "k", "s", etc.
  hintEn: text("hint_en"),
  hintId: text("hint_id"),
  hintJa: text("hint_ja"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});


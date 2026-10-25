import { pgTable, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";

// Users table (profiles mapped to Supabase Auth UID)
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Auth user ID from Supabase Auth (auth.users.id) or guest identifier
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  role: text("role").default("user").notNull(), // 'user' | 'admin'
  preferences: jsonb("preferences").$type<{
    audioQuestions?: boolean;
    [key: string]: any;
  }>().default({}),
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

// Site stats table for persistent counters (such as page visitors)
export const siteStats = pgTable("site_stats", {
  id: text("id").primaryKey(), // e.g. "visitor_counter"
  counter: integer("counter").default(0).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Real Spaced Repetition System (SRS / SM-2) Card Reviews
export const userCardReviews = pgTable("user_card_reviews", {
  id: text("id").primaryKey(), // e.g. `${userId}_${cardId}`
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  cardId: text("card_id").notNull(),
  stageId: text("stage_id").notNull(),
  repetitionCount: integer("repetition_count").default(0).notNull(),
  intervalDays: integer("interval_days").default(0).notNull(),
  easeFactorX100: integer("ease_factor_x100").default(250).notNull(), // 250 = 2.50
  lapses: integer("lapses").default(0).notNull(),
  state: text("state").default("learning").notNull(), // 'learning' | 'review' | 'mastered'
  lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
  nextReviewAt: timestamp("next_review_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

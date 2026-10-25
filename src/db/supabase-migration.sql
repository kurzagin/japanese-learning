-- Supabase Database Schema for SAKANA (User Progress, Preferences & SRS)
-- Static Kana and Vocab remain strictly as JSON in the codebase.

-- 1. Users table (linked to auth.users if registered, or guest identifier)
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' NOT NULL,
  preferences JSONB DEFAULT '{}'::jsonb NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Stage Progression & Speed Challenge Scores
CREATE TABLE IF NOT EXISTS public.user_stage_progress (
  id TEXT PRIMARY KEY, -- e.g. `${userId}_${stageId}`
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  stage_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false NOT NULL,
  best_duration_ms INTEGER,
  stars INTEGER DEFAULT 0 NOT NULL,
  accuracy_percentage INTEGER DEFAULT 0 NOT NULL,
  attempts_count INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Site Persistent Stats / Counters (e.g. Visitor Counter)
CREATE TABLE IF NOT EXISTS public.site_stats (
  id TEXT PRIMARY KEY,
  counter INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Spaced Repetition System (SRS / SM-2) Card Reviews
CREATE TABLE IF NOT EXISTS public.user_card_reviews (
  id TEXT PRIMARY KEY, -- e.g. `${userId}_${cardId}`
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  stage_id TEXT NOT NULL,
  repetition_count INTEGER DEFAULT 0 NOT NULL,
  interval_days INTEGER DEFAULT 0 NOT NULL,
  ease_factor_x100 INTEGER DEFAULT 250 NOT NULL,
  lapses INTEGER DEFAULT 0 NOT NULL,
  state TEXT DEFAULT 'learning' NOT NULL,
  last_reviewed_at TIMESTAMPTZ,
  next_review_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_user_stage_progress_user ON public.user_stage_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_card_reviews_user ON public.user_card_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_user_card_reviews_due ON public.user_card_reviews(user_id, next_review_at);

-- Optional: Auto-create public.users record when a new user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users (uncomment if running inside Supabase SQL Editor with superuser permissions)
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

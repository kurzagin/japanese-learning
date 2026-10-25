"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { DOCS_TOPICS } from "@/data/docsTopics";
import {
  BookOpen,
  Sparkles,
  Trophy,
  Gamepad2,
  Volume2,
  Code,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export function DocsHubClient() {
  const { locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const topicContent: Record<
    string,
    { title: string; desc: string; highlights: string[] }
  > = {
    "srs-methodology": {
      title: "SRS & Memory Retention Science",
      desc: "How SM-2 algorithmic scheduling works, why cards re-queue on 'Again', ease factors, lapse penalties, and reaching 21-day Mastery.",
      highlights: [
        "SM-2 interval expansion formula",
        "The 4-button decision matrix (Again, Hard, Good, Easy)",
        "Why 'Again' loops cards to end of current study deck",
        "21-day Mastery graduation threshold",
      ],
    },
    progression: {
      title: "Dual-Pillar Framework & Progression",
      desc: "Why study mode schedules retention but doesn't unlock stages. Speed Sprint challenges (<1.5s/kana), reflex tests, and Boss Checkpoints.",
      highlights: [
        "Study vs. Speed Sprint distinct roles",
        "Target reflex benchmark: < 1.5 seconds per kana",
        "Boss Checkpoint milestone gates",
        "Unlock dependencies across Hiragana, Katakana & Words",
      ],
    },
    "arcade-engine": {
      title: "Arcade Engine & Adaptive Survival",
      desc: "Deep dive into the 30-letter Survival Arcade: dynamic error weighting, shield lives, combo streaks, and automatic resting of mastered kana.",
      highlights: [
        "Dynamic weakness weighting algorithm (up to 5x spawn chance)",
        "Auto-exclusion of 100% mastered characters",
        "3 Shield Lives and combo multipliers",
        "Anti-clumping sequence generation",
      ],
    },
    "audio-phonetics": {
      title: "Audio Engine & Japanese Phonetics",
      desc: "Native Japanese speech synthesis (TTS), Japanese Mora timing, Pitch accents, and foreign loanword Katakana combinations.",
      highlights: [
        "Calibrated native speech model at 0.85x speed",
        "Mora timing vs. English syllables",
        "Pitch accent fundamentals (Heiban, Odaka, etc.)",
        "Foreign loanword Katakana (Fa, Ti, She, Je)",
      ],
    },
    api: {
      title: "Developer REST API Console",
      desc: "Interactive REST API playground for developers. Access structured Hiragana and Katakana character primitives, romaji, and pronunciation audio endpoints.",
      highlights: [
        "GET /api/v1/kana endpoint reference",
        "Filter by script, phonetic type, and minimal mode",
        "Interactive test bench with live JSON responses",
        "Copyable cURL and JavaScript Fetch code snippets",
      ],
    },
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="border-b-2 border-[#000080] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#800000] uppercase font-mono">
          <span>◆ SAKANA KNOWLEDGE BASE</span>
          <span>//</span>
          <span>DOCUMENTATION &amp; LEARNER MANUAL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#000080] mt-1 tracking-tight">
          System Documentation &amp; Learning Science
        </h1>
        <p className="text-sm text-[#444] mt-2 max-w-3xl leading-relaxed">
          Welcome to the comprehensive SaKana guide. Learn how our spaced repetition memory model (SM-2),
          arcade reflex drills, native Japanese TTS audio, and progression gates work together to build
          effortless Japanese recognition.
        </p>
      </div>

      {/* Quick Answer Banner for Common Questions */}
      <div className="p-4 bg-[#fff8e7] border-2 border-[#b8860b] shadow-sm">
        <div className="flex items-start gap-2.5">
          <Zap className="w-5 h-5 text-[#b8860b] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-xs font-bold text-[#800000] block uppercase font-mono">
              Quick Answers: Frequently Asked Concepts
            </strong>
            <ul className="text-xs text-[#333] space-y-1 list-disc pl-4">
              <li>
                <strong>Why does clicking &quot;Again&quot; add the card back?</strong> In modern SRS (like Anki &amp; SM-2), failed cards enter an intra-day working-memory step (&lt; 10m) and re-queue in your active hand so you successfully recall them before leaving.
              </li>
              <li>
                <strong>Why is &quot;Mastered in SRS&quot; at 0?</strong> Cards only graduate to &quot;Mastered&quot; once their spacing interval reaches <strong>21 days or more</strong> without forgetting.
              </li>
              <li>
                <strong>Why doesn&apos;t Study mode unlock the next stage?</strong> Study mode builds long-term memory; unlocking requires passing the <strong>Speed Sprint Challenge</strong> (&lt; 1.5s/kana) to build instant reflex recognition.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {DOCS_TOPICS.filter((t) => t.slug !== "").map((topic) => {
          const detail = topicContent[topic.id];
          if (!detail) return null;

          return (
            <Link
              key={topic.id}
              href={`${prefix}/docs${topic.slug}`}
              className="p-4 border-2 border-[#808080] bg-[#fdfdfb] hover:bg-[#fffff0] hover:border-[#000080] transition-colors flex flex-col justify-between group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#666] mb-1.5">
                  <span className="uppercase text-[#000080] font-bold">
                    {topic.category.toUpperCase()} // {topic.readTime}
                  </span>
                  <span className="text-[#888]">READ MANUAL &gt;&gt;</span>
                </div>
                <h2 className="text-base font-bold text-[#000080] group-hover:underline">
                  {detail.title}
                </h2>
                <p className="text-xs text-[#555] mt-1.5 leading-relaxed">
                  {detail.desc}
                </p>

                <div className="mt-3 pt-2.5 border-t border-[#e0e0e0] space-y-1">
                  {detail.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#444]">
                      <span className="text-[#008000] font-bold">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-2 flex items-center justify-between text-xs font-bold text-[#000080]">
                <span>Explore Chapter</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

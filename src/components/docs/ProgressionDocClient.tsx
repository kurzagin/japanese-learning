"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Trophy, Zap, Shield, Lock, CheckCircle2, ArrowRight } from "lucide-react";

export function ProgressionDocClient() {
  const { locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="border-b-2 border-[#000080] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#800000] uppercase font-mono">
          <span>◆ PROGRESSION ARCHITECTURE</span>
          <span>//</span>
          <span>DUAL-PILLAR FRAMEWORK</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#fa624d] mt-1 tracking-tight">
          Study SRS vs. Speed Sprint Challenges
        </h1>
        <p className="text-sm text-[#444] mt-2 leading-relaxed">
          Why completing a Study deck schedules retention but does not unlock stages, and how our &lt;1.5s
          reflex test unlocks subsequent sectors and Boss Gates.
        </p>
      </div>

      {/* The Dual Pillar Concept */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border-2 border-[#000080] bg-[#eef3f8]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#fa624d] uppercase font-mono mb-2">
            <span className="w-2.5 h-2.5 bg-[#fa624d]"></span>
            <span>Pillar 1: Flashcard SRS Study</span>
          </div>
          <p className="text-xs text-[#333] leading-relaxed">
            <strong>Goal: Long-term memory encoding.</strong> Study mode is completely untimed. It pairs
            stroke order animations, audio pronunciation, and visual mnemonics.
          </p>
          <div className="mt-3 text-[11px] text-[#555] bg-white p-2 border border-[#b8c8d8]">
            ✓ Untimed recall<br />
            ✓ Schedules SM-2 interval days in the database<br />
            ✗ Does <em>not</em> mark the sector as cleared
          </div>
        </div>

        <div className="p-4 border-2 border-[#cc0000] bg-[#fff5f5]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#fa624d] uppercase font-mono mb-2">
            <Zap className="w-3.5 h-3.5 fill-[#cc0000]" />
            <span>Pillar 2: Speed Sprint Challenge</span>
          </div>
          <p className="text-xs text-[#333] leading-relaxed">
            <strong>Goal: Rapid subconscious reflex recognition.</strong> When reading manga or subtitles,
            you cannot spend 3 seconds sounding out each letter. You must recognize it instantly.
          </p>
          <div className="mt-3 text-[11px] text-[#555] bg-white p-2 border border-[#e8b8b8]">
            ✓ Timed reflex drill (&lt; 1.5s per character)<br />
            ✓ Requires $\ge 80\%$ accuracy to pass<br />
            ✓ Optional Listening Sprint: audio questions auto-pause timer during playback<br />
            ✓ <strong>Unlocks the next sector</strong>
          </div>
        </div>
      </div>

      {/* Multimodal Question Mechanics in Speed Sprint */}
      <section className="space-y-3 pt-4">
        <h2 className="text-lg font-bold text-[#fa624d] flex items-center gap-2 border-b border-stone-200 pb-1">
          <Zap className="w-5 h-5 text-[#fa624d]" />
          <span>Multimodal Sprint Mechanics &amp; Audio Drills</span>
        </h2>
        <p className="text-xs text-[#333] leading-relaxed">
          Speed Sprint tests are engineered for balanced neural wiring. They test both visual orthography and optional ear-to-script phonetic decoding without unfair speed penalties:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-[#f5f5f0] border border-stone-200 space-y-1">
            <div className="font-bold text-[#fa624d] font-mono">1. Visual Recognition (Default)</div>
            <ul className="list-disc pl-4 space-y-1 text-[#333] text-[11px]">
              <li><strong>Kana ➔ Romaji:</strong> See target kana, pick corresponding romaji pronunciation.</li>
              <li><strong>Romaji ➔ Kana:</strong> See Latin romanization, pick the correct native kana shape.</li>
            </ul>
          </div>
          <div className="p-3 bg-[#f5f5f0] border border-stone-200 space-y-1">
            <div className="font-bold text-[#008000] font-mono">2. Auditory Recall (Optional Toggle)</div>
            <ul className="list-disc pl-4 space-y-1 text-[#333] text-[11px]">
              <li><strong>Audio ➔ Kana:</strong> Listen to authentic Japanese audio, select target kana.</li>
              <li><strong>Audio ➔ Romaji:</strong> Listen to audio, select romaji spelling.</li>
              <li><strong>Automatic Timer Pausing:</strong> The countdown timer pauses completely while audio is playing and resumes the instant speech finishes.</li>
              <li><strong>Fair Replay [R]:</strong> Replay button and keyboard shortcut <code>[R]</code> also pause the clock so learners are never penalized for re-listening.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Boss Checkpoint Gates */}
      <section className="space-y-3 pt-4">
        <h2 className="text-lg font-bold text-[#fa624d] flex items-center gap-2 border-b border-stone-200 pb-1">
          <Trophy className="w-5 h-5 text-[#800000]" />
          <span>Boss Checkpoints: Cumulative Milestones</span>
        </h2>
        <p className="text-xs text-[#333] leading-relaxed">
          Throughout Hiragana and Katakana, sectors are divided into blocks. At the end of every block sits
          a <strong>Boss Checkpoint</strong> (e.g. <em>Hiragana Checkpoint 1: Vowels to T-Row</em>).
        </p>
        <div className="p-3 bg-[#f5f5f0] border border-stone-200 text-xs space-y-2">
          <div className="font-bold text-[#800000] uppercase font-mono">
            Boss Gate Rules:
          </div>
          <ul className="list-disc pl-4 space-y-1 text-[#333]">
            <li>
              <strong>Prerequisite Requirement:</strong> A Boss Checkpoint remains locked until <em>every</em> individual stage in its block has been cleared with passing speed.
            </li>
            <li>
              <strong>Cumulative Test Pool:</strong> Questions are randomly drawn from all characters across the entire block.
            </li>
            <li>
              <strong>Arcade Gate Key:</strong> Clearing Boss Checkpoints 1 &amp; 2 unlocks the <strong>30-Kana Survival Arcade</strong>.
            </li>
          </ul>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="mt-8 pt-4 border-t-2 border-stone-200 flex justify-between items-center text-xs">
        <Link
          href={`${prefix}/docs/srs-methodology`}
          className="font-bold text-[#fa624d] hover:underline flex items-center gap-1"
        >
          &lt;&lt; SRS &amp; Intervals
        </Link>
        <Link
          href={`${prefix}/docs/arcade-engine`}
          className="font-bold text-[#fa624d] hover:underline flex items-center gap-1"
        >
          <span>Arcade Engine &amp; Survival</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

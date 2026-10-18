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
        <h1 className="text-2xl sm:text-3xl font-black text-[#000080] mt-1 tracking-tight">
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
          <div className="flex items-center gap-2 text-xs font-bold text-[#000080] uppercase font-mono mb-2">
            <span className="w-2.5 h-2.5 bg-[#000080]"></span>
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
          <div className="flex items-center gap-2 text-xs font-bold text-[#cc0000] uppercase font-mono mb-2">
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
            ✓ <strong>Unlocks the next sector</strong>
          </div>
        </div>
      </div>

      {/* Boss Checkpoint Gates */}
      <section className="space-y-3 pt-4">
        <h2 className="text-lg font-bold text-[#000080] flex items-center gap-2 border-b border-[#c0c0c0] pb-1">
          <Trophy className="w-5 h-5 text-[#800000]" />
          <span>Boss Checkpoints: Cumulative Milestones</span>
        </h2>
        <p className="text-xs text-[#333] leading-relaxed">
          Throughout Hiragana and Katakana, sectors are divided into blocks. At the end of every block sits
          a <strong>Boss Checkpoint</strong> (e.g. <em>Hiragana Checkpoint 1: Vowels to T-Row</em>).
        </p>
        <div className="p-3 bg-[#f5f5f0] border border-[#808080] text-xs space-y-2">
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
      <div className="mt-8 pt-4 border-t-2 border-[#808080] flex justify-between items-center text-xs">
        <Link
          href={`${prefix}/docs/srs-methodology`}
          className="font-bold text-[#000080] hover:underline flex items-center gap-1"
        >
          &lt;&lt; SRS &amp; Intervals
        </Link>
        <Link
          href={`${prefix}/docs/arcade-engine`}
          className="font-bold text-[#000080] hover:underline flex items-center gap-1"
        >
          <span>Arcade Engine &amp; Survival</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

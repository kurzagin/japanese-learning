"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SrsSimulator } from "./SrsSimulator";
import { Sparkles, ArrowRight, ShieldAlert, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export function SrsDocClient() {
  const { locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Chapter Header */}
      <div className="border-b-2 border-[#000080] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#800000] uppercase font-mono">
          <span>◆ CORE ALGORITHM</span>
          <span>//</span>
          <span>SPACED REPETITION SYSTEM</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#000080] mt-1 tracking-tight">
          SM-2 Memory Intervals &amp; Retention Science
        </h1>
        <p className="text-sm text-[#444] mt-2 leading-relaxed">
          How SaKana uses spaced intervals, ease factors, lapse penalties, and short-term working memory
          loops to turn newly seen Japanese characters into permanent long-term memory.
        </p>
      </div>

      {/* Interactive Simulator Component */}
      <SrsSimulator />

      {/* Section 1: Why Cards Re-Queue on Again */}
      <section className="space-y-3 pt-2">
        <h2 className="text-lg font-bold text-[#000080] flex items-center gap-2 border-b border-[#c0c0c0] pb-1">
          <Clock className="w-5 h-5 text-[#800000]" />
          <span>1. Why clicking &quot;Again&quot; adds the card back into your current hand</span>
        </h2>
        <p className="text-xs text-[#333] leading-relaxed">
          When you press <strong>Again (1)</strong> on a card, you are telling the system that you
          blacked out or misidentified the character. In standard Spaced Repetition (like SuperMemo and Anki),
          failed cards do <em>not</em> immediately disappear to tomorrow.
        </p>
        <div className="p-3 bg-[#f5f5f0] border border-[#808080] space-y-2 text-xs">
          <div className="font-bold text-[#800000] uppercase font-mono">
            The Two-Tier Scheduling Model:
          </div>
          <ol className="list-decimal pl-4 space-y-1.5 text-[#333]">
            <li>
              <strong>Intra-Day Working Memory Step (&lt; 10m):</strong> If you fail a card, your brain
              has not yet encoded its visual components. The card is pushed to the <strong>end of the
              active queue</strong> so you re-encounter it within the same study session.
            </li>
            <li>
              <strong>Long-Term Spacing Step (1d, 3d, 7d):</strong> Once you correctly recall the card
              with <strong>Good (3)</strong> or <strong>Easy (4)</strong>, it graduates out of the active
              session and is scheduled for future days.
            </li>
          </ol>
        </div>
      </section>

      {/* Section 2: The 4 Ratings Breakdown */}
      <section className="space-y-3 pt-4">
        <h2 className="text-lg font-bold text-[#000080] flex items-center gap-2 border-b border-[#c0c0c0] pb-1">
          <Sparkles className="w-5 h-5 text-[#000080]" />
          <span>2. The 4-Rating Decision Matrix</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-[#808080] bg-white">
            <thead className="bg-[#e0ded8] text-[#000080] font-mono text-[11px] border-b border-[#808080]">
              <tr>
                <th className="p-2 text-left border-r border-[#808080]">Rating</th>
                <th className="p-2 text-left border-r border-[#808080]">Interval Impact</th>
                <th className="p-2 text-left border-r border-[#808080]">Ease Factor (EF)</th>
                <th className="p-2 text-left">When to choose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d0d0d0]">
              <tr>
                <td className="p-2 font-bold text-[#800000] border-r border-[#808080] whitespace-nowrap">
                  1. Again
                </td>
                <td className="p-2 font-mono text-[#800000] border-r border-[#808080]">
                  Reset to 0d (&lt;10m)
                </td>
                <td className="p-2 font-mono border-r border-[#808080]">- 0.20 (Lapse recorded)</td>
                <td className="p-2 text-[#444]">
                  Blackout, wrong character, or severe hesitation.
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-[#b85d00] border-r border-[#808080] whitespace-nowrap">
                  2. Hard
                </td>
                <td className="p-2 font-mono border-r border-[#808080]">
                  Grows by ×1.2
                </td>
                <td className="p-2 font-mono border-r border-[#808080]">- 0.15</td>
                <td className="p-2 text-[#444]">
                  Recalled correctly, but took significant cognitive effort or mental mnemonic digging.
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-[#006600] border-r border-[#808080] whitespace-nowrap">
                  3. Good
                </td>
                <td className="p-2 font-mono text-[#006600] border-r border-[#808080]">
                  1d ➔ 3d ➔ (d × EF)
                </td>
                <td className="p-2 font-mono border-r border-[#808080]">Unchanged</td>
                <td className="p-2 text-[#444]">
                  Standard successful recall at a natural pace.
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-[#000080] border-r border-[#808080] whitespace-nowrap">
                  4. Easy
                </td>
                <td className="p-2 font-mono text-[#000080] border-r border-[#808080]">
                  4d ➔ 6d ➔ (d × EF × 1.3)
                </td>
                <td className="p-2 font-mono border-r border-[#808080]">+ 0.15 (Max 3.00)</td>
                <td className="p-2 text-[#444]">
                  Instantaneous effortless recall. Character felt obvious.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Reaching 21-Day Mastery */}
      <section className="space-y-3 pt-4">
        <h2 className="text-lg font-bold text-[#000080] flex items-center gap-2 border-b border-[#c0c0c0] pb-1">
          <CheckCircle2 className="w-5 h-5 text-[#006600]" />
          <span>3. What does &quot;MASTERED IN SRS&quot; mean?</span>
        </h2>
        <p className="text-xs text-[#333] leading-relaxed">
          When you view the Dashboard, you might notice <strong>MASTERED IN SRS: 0</strong> even after
          studying 35 characters. This is normal and intentional!
        </p>
        <div className="p-3 bg-[#eef8ee] border border-[#006600] text-xs space-y-2">
          <p className="text-[#004400]">
            In SaKana, a character is only promoted from <span className="font-mono font-bold">&quot;review&quot;</span> to{" "}
            <span className="font-mono font-bold text-[#006600]">&quot;mastered&quot;</span> when its scheduled interval
            reaches <strong>21 days or more</strong> without forgetting.
          </p>
          <div className="font-mono text-[11px] text-[#222] bg-white p-2 border border-[#80c080]">
            Progression curve: Day 1 (1d) ➔ Day 2 (3d) ➔ Day 5 (8d) ➔ Day 13 (21d+ [MASTERED])
          </div>
          <p className="text-[11px] text-[#555]">
            Once a card is Mastered, the adaptive Kana Survival Arcade rests the card from daily reflex
            loops so drills can focus on characters you still struggle with.
          </p>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="mt-8 pt-4 border-t-2 border-[#808080] flex justify-between items-center text-xs">
        <Link
          href={`${prefix}/docs`}
          className="font-bold text-[#000080] hover:underline flex items-center gap-1"
        >
          &lt;&lt; Manual Overview
        </Link>
        <Link
          href={`${prefix}/docs/progression`}
          className="font-bold text-[#000080] hover:underline flex items-center gap-1"
        >
          <span>Progression &amp; Speed Sprints</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

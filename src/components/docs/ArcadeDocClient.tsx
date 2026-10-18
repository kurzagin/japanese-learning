"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Gamepad2, ShieldAlert, Zap, Star, ArrowRight, Flame } from "lucide-react";

export function ArcadeDocClient() {
  const { locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="border-b-2 border-[#000080] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#800000] uppercase font-mono">
          <span>◆ GAME ENGINE</span>
          <span>//</span>
          <span>ADAPTIVE REFLEX DRILL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#000080] mt-1 tracking-tight">
          Arcade Engine &amp; Dynamic Weakness Weighting
        </h1>
        <p className="text-sm text-[#444] mt-2 leading-relaxed">
          How the 30-Kana Survival Arcade uses your historical SRS error rates to dynamically spawn troubled
          characters more frequently while resting mastered kana.
        </p>
      </div>

      {/* Dynamic Weighting Algorithm Breakdown */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#000080] flex items-center gap-2 border-b border-[#c0c0c0] pb-1">
          <Flame className="w-5 h-5 text-[#cc0000]" />
          <span>Dynamic Weakness Weighting</span>
        </h2>
        <p className="text-xs text-[#333] leading-relaxed">
          Standard flashcards shuffle items purely at random. In SaKana&apos;s arcade mode, characters are assigned
          a dynamic spawn probability weight calculated from their live database record:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-[#808080] bg-white">
            <thead className="bg-[#e0ded8] text-[#000080] font-mono text-[11px] border-b border-[#808080]">
              <tr>
                <th className="p-2 text-left border-r border-[#808080]">Character Status</th>
                <th className="p-2 text-left border-r border-[#808080]">Calculated Weight</th>
                <th className="p-2 text-left">Behavior in Arcade Loop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d0d0d0]">
              <tr>
                <td className="p-2 font-bold text-[#cc0000] border-r border-[#808080]">
                  High Lapses (&ge; 2 lapses or learning state)
                </td>
                <td className="p-2 font-mono text-[#cc0000] font-bold border-r border-[#808080]">
                  Weight: 5
                </td>
                <td className="p-2 text-[#333]">
                  <strong>5× spawn rate</strong>. Appears repeatedly in the 30-letter stream until reflex accuracy solidifies.
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-[#b85d00] border-r border-[#808080]">
                  Mild Trouble (1 lapse)
                </td>
                <td className="p-2 font-mono text-[#b85d00] font-bold border-r border-[#808080]">
                  Weight: 3
                </td>
                <td className="p-2 text-[#333]">
                  <strong>3× spawn rate</strong>. Reinforces recent hiccups before they become bad memory habits.
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-[#333] border-r border-[#808080]">
                  Standard Unlocked Character
                </td>
                <td className="p-2 font-mono border-r border-[#808080]">
                  Weight: 1 or 2
                </td>
                <td className="p-2 text-[#333]">
                  Standard background presence to maintain baseline recall.
                </td>
              </tr>
              <tr className="bg-[#eef8ee]">
                <td className="p-2 font-bold text-[#006600] border-r border-[#808080]">
                  100% Mastered (&ge; 21d interval &amp; 0 active lapses)
                </td>
                <td className="p-2 font-mono text-[#006600] font-bold border-r border-[#808080]">
                  Weight: 0
                </td>
                <td className="p-2 text-[#006600]">
                  <strong>Rested (Excluded from loop)</strong>. Saves valuable drill time for letters you still need practice with.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Survival Mechanics */}
      <section className="space-y-3 pt-4">
        <h2 className="text-lg font-bold text-[#000080] flex items-center gap-2 border-b border-[#c0c0c0] pb-1">
          <ShieldAlert className="w-5 h-5 text-[#800000]" />
          <span>Shield Lives &amp; Combo Multipliers</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 border border-[#808080] bg-[#fdfdfb]">
            <strong className="text-[#800000] block uppercase font-mono mb-1">
              3 Shield Lives
            </strong>
            <p className="text-[#555] leading-relaxed">
              You begin each arcade run with 3 shield lives. An incorrect click depletes 1 shield and triggers
              an instant red alert penalty. If shields hit 0, the survival run concludes.
            </p>
          </div>
          <div className="p-3 border border-[#808080] bg-[#fdfdfb]">
            <strong className="text-[#000080] block uppercase font-mono mb-1">
              Combo Multipliers
            </strong>
            <p className="text-[#555] leading-relaxed">
              Answering rapidly without misses builds consecutive streak combos ($1\times \to 2\times \to 5\times$),
              yielding high scores and bonus mastery points.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="mt-8 pt-4 border-t-2 border-[#808080] flex justify-between items-center text-xs">
        <Link
          href={`${prefix}/docs/progression`}
          className="font-bold text-[#000080] hover:underline flex items-center gap-1"
        >
          &lt;&lt; Progression &amp; Gates
        </Link>
        <Link
          href={`${prefix}/docs/audio-phonetics`}
          className="font-bold text-[#000080] hover:underline flex items-center gap-1"
        >
          <span>Audio &amp; Phonetics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

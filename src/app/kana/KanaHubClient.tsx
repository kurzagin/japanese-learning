"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { HIRAGANA_PRIMITIVES, KATAKANA_PRIMITIVES, KanaCharacter, KanaType } from "@/data/kana";
import { getKanaSlug } from "@/lib/kana-seo";
import { useLanguage } from "@/context/LanguageContext";
import { PronounceButton } from "@/components/PronounceButton";
import { Search, Sparkles, BookOpen, Volume2, ArrowRight } from "lucide-react";

export default function KanaHubClient() {
  const { locale } = useLanguage();
  const [activeScript, setActiveScript] = useState<"hiragana" | "katakana">("hiragana");
  const [activeType, setActiveType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const kanaList = useMemo(() => {
    return activeScript === "hiragana" ? HIRAGANA_PRIMITIVES : KATAKANA_PRIMITIVES;
  }, [activeScript]);

  const filteredKana = useMemo(() => {
    return kanaList.filter((k) => {
      if (activeType !== "all" && k.type !== activeType) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesRomaji = k.romaji.toLowerCase().includes(query);
        const matchesChar = k.character.includes(query);
        const matchesHint = (k.hint[locale] || k.hint.en || "").toLowerCase().includes(query);
        return matchesRomaji || matchesChar || matchesHint;
      }
      return true;
    });
  }, [kanaList, activeType, searchQuery, locale]);

  const types: { id: string; label: string }[] = [
    { id: "all", label: "All Types" },
    { id: "gojuon", label: "Gojūon (Basic 46)" },
    { id: "dakuon", label: "Dakuon (Voiced)" },
    { id: "handakuon", label: "Handakuon (P-row)" },
    { id: "yoon", label: "Yōon (Combinations)" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle="KANA DIRECTORY" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
        {/* Banner */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-4 text-center relative overflow-hidden shadow-xs">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>Complete Japanese Kana Reference Hub</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#000080] mt-1 tracking-wider">
            JAPANESE KANA MATRIX (五十音図)
          </h1>
          <p className="text-xs sm:text-sm text-[#404040] font-medium mt-1 max-w-2xl mx-auto">
            Browse through 200+ authentic Hiragana and Katakana characters. Click any card to view detailed stroke counts, clear pronunciation audio, example words, and mnemonics.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="border border-[#808080] bg-[#f0f0f0] p-3 shadow-inner flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Script Switcher */}
          <div className="flex items-center gap-1 w-full md:w-auto">
            <button
              onClick={() => setActiveScript("hiragana")}
              className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-bold border transition-colors ${
                activeScript === "hiragana"
                  ? "bg-[#000080] text-white border-t-[#000040] border-l-[#000040] border-b-white border-r-white"
                  : "bg-[#d4d0c8] text-black border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#e4e0d8]"
              }`}
            >
              HIRAGANA (ひらがな)
            </button>
            <button
              onClick={() => setActiveScript("katakana")}
              className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-bold border transition-colors ${
                activeScript === "katakana"
                  ? "bg-[#000080] text-white border-t-[#000040] border-l-[#000040] border-b-white border-r-white"
                  : "bg-[#d4d0c8] text-black border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#e4e0d8]"
              }`}
            >
              KATAKANA (カタカナ)
            </button>
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveType(t.id)}
                className={`px-2.5 py-1 text-[11px] font-mono border whitespace-nowrap ${
                  activeType === t.id
                    ? "bg-[#202020] text-white border-t-black border-l-black border-b-white border-r-white font-bold"
                    : "bg-[#d4d0c8] text-black border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#e4e0d8]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search romaji, kana, hint..."
              className="w-full bg-white text-xs px-2.5 py-1.5 pl-8 border-t-2 border-l-2 border-[#404040] border-b border-r border-white font-mono outline-none"
            />
            <Search className="w-3.5 h-3.5 text-[#808080] absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Counter Info */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#555] px-1">
          <span>Showing {filteredKana.length} of {kanaList.length} characters</span>
          <span>Script: <strong className="uppercase text-[#000080]">{activeScript}</strong></span>
        </div>

        {/* Kana Matrix Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
          {filteredKana.map((k) => {
            const slug = getKanaSlug(k);
            const detailUrl = `/kana/${k.script}/${slug}`;
            const hintText = k.hint[locale] || k.hint.en || "";

            return (
              <div
                key={k.id}
                className="bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] p-2 flex flex-col justify-between hover:bg-[#e2dfd7] transition-all group shadow-xs"
              >
                {/* Character header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#800000] uppercase">
                    {k.type}
                  </span>
                  <PronounceButton text={k.character} size="sm" />
                </div>

                {/* Big Glyph Link */}
                <Link
                  href={detailUrl}
                  className="my-2 text-center block group-hover:scale-105 transition-transform"
                >
                  <div className="text-3xl sm:text-4xl font-black text-[#000080] leading-tight font-sans">
                    {k.character}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#cc0000] mt-0.5">
                    {k.romaji}
                  </div>
                </Link>

                {/* Quick Hint & Detail Link */}
                <div className="pt-1.5 border-t border-[#808080]/30 text-[10px] flex items-center justify-between">
                  <span className="line-clamp-1 text-[#555] italic pr-1">
                    {hintText}
                  </span>
                  <Link
                    href={detailUrl}
                    className="shrink-0 text-[#000080] font-bold hover:underline flex items-center"
                    title={`View ${k.character} (${k.romaji}) details`}
                  >
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredKana.length === 0 && (
          <div className="border border-[#808080] bg-white p-8 text-center text-sm font-mono text-[#666]">
            No characters found matching &quot;{searchQuery}&quot;. Try searching with romaji like &quot;ka&quot; or &quot;shi&quot;.
          </div>
        )}

        {/* SEO Educational Text Section */}
        <section className="border border-[#808080] bg-[#fff] p-4 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#c0c0c0] pb-2">
            <BookOpen className="w-4 h-4 text-[#000080]" />
            <h2 className="text-sm sm:text-base font-bold text-[#000080] uppercase">
              Understanding Japanese Kana (Hiragana & Katakana)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-[#333]">
            <div>
              <h3 className="font-bold text-[#800000] mb-1">Hiragana (ひらがな)</h3>
              <p>
                Hiragana is the foundational Japanese phonetic script consisting of 46 primary Gojūon sounds, plus voiced (Dakuon) and combination (Yōon) characters. It is used for native Japanese words, grammar particles (は, が, を), and verb and adjective inflections (okurigana).
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#800000] mb-1">Katakana (カタカナ)</h3>
              <p>
                Katakana features sharper, more angular strokes and represents the exact same 46 sound units as Hiragana. It is primarily used for foreign loanwords (gairaigo), scientific terminology, onomatopoeia, and company or product branding in anime and tech.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { VocabWord, JlptCategoryMeta } from "@/lib/vocab-seo";
import { useLanguage } from "@/context/LanguageContext";
import { PronounceButton } from "@/components/PronounceButton";
import { Search, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
  category: JlptCategoryMeta;
  words: VocabWord[];
  counts: { total: number; n5: number; n4: number; anime: number };
}

export default function JlptCategoryClient({ category, words, counts }: Props) {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeScript, setActiveScript] = useState<"all" | "hiragana" | "katakana">("all");

  const catTitle = category.title[locale] || category.title.en;
  const catTagline = category.tagline[locale] || category.tagline.en;
  const catDesc = category.description[locale] || category.description.en;

  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      if (activeScript !== "all" && w.script !== activeScript) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchRomaji = w.romaji.toLowerCase().includes(query);
        const matchChar = w.character.includes(query);
        const meaning = w.meaning[locale] || w.meaning.en;
        const matchMeaning = meaning.toLowerCase().includes(query);
        return matchRomaji || matchChar || matchMeaning;
      }
      return true;
    });
  }, [words, activeScript, searchQuery, locale]);

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle={catTitle.toUpperCase()} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Link
            href={prefix || "/"}
            className="text-[#000080] hover:underline flex items-center gap-1 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.nav.home}</span>
          </Link>
          <span className="text-[#888]">/</span>
          <Link href={`${prefix}/words`} className="text-[#000080] hover:underline font-bold">
            {t.wordsHub.breadcrumbWords}
          </Link>
          <span className="text-[#888]">/</span>
          <span className="text-[#800000] font-bold uppercase">{category.jlpt}</span>
        </div>

        {/* Hero Banner */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-4 sm:p-6 text-center relative overflow-hidden shadow-xs space-y-2">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>{catTagline}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#000080] tracking-wide">
            {t.jlptCategory.wordsCountHeader(catTitle, words.length)}
          </h1>
          <p className="text-xs sm:text-sm text-[#404040] font-medium max-w-2xl mx-auto">
            {catDesc}
          </p>

          {/* Quick Category Switcher */}
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs font-bold">
            <Link
              href={`${prefix}/words/category/n5`}
              className={`px-3 py-1 border border-[#808080] ${
                category.key === "n5" ? "bg-[#000080] text-white" : "bg-[#d4d0c8] text-black hover:bg-white"
              }`}
            >
              {t.wordsHub.jlptN5Btn(counts.n5)}
            </Link>
            <Link
              href={`${prefix}/words/category/n4`}
              className={`px-3 py-1 border border-[#808080] ${
                category.key === "n4" ? "bg-[#000080] text-white" : "bg-[#d4d0c8] text-black hover:bg-white"
              }`}
            >
              {t.wordsHub.jlptN4Btn(counts.n4)}
            </Link>
            <Link
              href={`${prefix}/words/category/anime`}
              className={`px-3 py-1 border border-[#808080] ${
                category.key === "anime" ? "bg-[#800000] text-white" : "bg-[#d4d0c8] text-black hover:bg-white"
              }`}
            >
              {t.wordsHub.animePopBtn(counts.anime)}
            </Link>
            <Link
              href={`${prefix}/words`}
              className="px-3 py-1 border border-[#808080] bg-[#d4d0c8] text-black hover:bg-white"
            >
              {t.jlptCategory.allWordsBtn(counts.total)}
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="border border-[#808080] bg-white p-3 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs text-xs font-mono">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="font-bold text-[#000080] mr-1">{t.jlptCategory.scriptFilterLabel}</span>
            {(["all", "hiragana", "katakana"] as const).map((sc) => (
              <button
                key={sc}
                onClick={() => setActiveScript(sc)}
                className={`px-3 py-1 text-xs font-bold border transition-colors ${
                  activeScript === sc
                    ? "bg-[#000080] text-white border-[#000040]"
                    : "bg-[#d4d0c8] text-black border-[#808080] hover:bg-[#e0dcd0]"
                }`}
              >
                {sc === "all" ? t.jlptCategory.allFilter : sc === "hiragana" ? t.wordsHub.hiraganaTab : t.wordsHub.katakanaTab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#666] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.jlptCategory.searchPlaceholder}
              className="w-full pl-8 pr-3 py-1 bg-[#fdfdfd] border-t border-l border-[#808080] border-b border-r border-[#d4d0c8] text-xs font-mono outline-none focus:bg-white"
            />
          </div>
        </div>

        {/* Word Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredWords.map((w) => {
            const localizedMeaning = w.meaning[locale] || w.meaning.en;

            return (
              <div
                key={w.slug}
                className="bg-white border-2 border-[#808080] hover:border-[#000080] p-3 flex flex-col justify-between transition-colors shadow-xs group"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 border uppercase font-mono ${
                      w.script === "hiragana"
                        ? "bg-[#000080] text-white border-[#000080]"
                        : "bg-[#800000] text-white border-[#800000]"
                    }`}
                  >
                    {w.script.slice(0, 4)}
                  </span>
                  <PronounceButton
                    text={w.character}
                    size="sm"
                    className="p-1 hover:bg-black/10 rounded-sm"
                  />
                </div>

                <div className="my-2 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#000080] tracking-wide group-hover:scale-105 transition-transform">
                    {w.character}
                  </div>
                  {w.kanjiOptions && w.kanjiOptions.length > 0 ? (
                    <div className="text-xs text-[#800000] font-mono mt-0.5 font-bold">
                      [{w.kanjiOptions.map((o) => o.kanji).join("・")}]
                    </div>
                  ) : w.kanji && w.kanji !== w.character ? (
                    <div className="text-xs text-[#800000] font-mono mt-0.5">
                      [{w.kanji}]
                    </div>
                  ) : null}
                  <div className="text-xs font-mono text-[#cc0000] font-bold mt-1">
                    {w.romaji}
                  </div>
                  <div className="text-[11px] text-[#333] font-medium mt-1 line-clamp-1">
                    {localizedMeaning}
                  </div>
                </div>

                <Link
                  href={`${prefix}/words/${w.slug}`}
                  className="mt-2 w-full py-1 text-[11px] font-bold text-center bg-white border border-[#808080] hover:bg-[#000080] hover:text-white flex items-center justify-center gap-1 transition-colors"
                >
                  <span>{t.jlptCategory.learnWordBtn}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            );
          })}
        </div>

        {filteredWords.length === 0 && (
          <div className="border border-[#808080] bg-white p-8 text-center text-xs text-[#666] font-mono">
            {t.jlptCategory.noResults(searchQuery)}
          </div>
        )}
      </main>
    </div>
  );
}

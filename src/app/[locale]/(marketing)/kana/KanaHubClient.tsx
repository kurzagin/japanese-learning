"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { KanaCharacter, KanaType } from "@/types/kana";
import { getKanaSlug } from "@/lib/kana-seo";
import { useLanguage } from "@/context/LanguageContext";
import { PronounceButton } from "@/components/PronounceButton";
import { Search, Sparkles, BookOpen, Volume2, ArrowRight } from "lucide-react";

export default function KanaHubClient({ allKana = [] }: { allKana?: KanaCharacter[] }) {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const [activeScript, setActiveScript] = useState<"hiragana" | "katakana">("hiragana");
  const [activeType, setActiveType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const kanaList = useMemo(() => {
    return allKana.filter((k) => k.script === activeScript);
  }, [activeScript, allKana]);

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
    { id: "all", label: t.kanaHub.allTypes },
    { id: "gojuon", label: t.kanaHub.gojuon },
    { id: "dakuon", label: t.kanaHub.dakuon },
    { id: "handakuon", label: t.kanaHub.handakuon },
    { id: "yoon", label: t.kanaHub.yoon },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-black">
      <RetroNavbar currentSubtitle={t.kanaHub.subtitle} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
        {/* Banner */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-4 text-center relative overflow-hidden shadow-xs">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>{t.kanaHub.badge}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#fa624d] mt-1 tracking-wider">
            {t.kanaHub.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#404040] font-medium mt-1 max-w-2xl mx-auto">
            {t.kanaHub.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 pt-2 border-t border-[#800000]/20 text-xs font-mono">
            <Link
              href={`${prefix}/compare`}
              className="px-3 py-1 bg-[#fa624d] text-white font-bold border-t border-l border-[#4040ff] border-b border-r border-[#000040] hover:bg-[#0000a0] flex items-center gap-1.5"
            >
              <span>{t.kanaHub.lookalikeBtn}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href={`${prefix}/tools/hiragana-chart-pdf`}
              className="px-3 py-1 bg-[#800000] text-white font-bold border-t border-l border-[#ff8080] border-b border-r border-[#400000] hover:bg-[#a00000] flex items-center gap-1.5"
            >
              <span>{t.kanaHub.hiraganaPdfBtn}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href={`${prefix}/tools/katakana-chart-pdf`}
              className="px-3 py-1 bg-[#800000] text-white font-bold border-t border-l border-[#ff8080] border-b border-r border-[#400000] hover:bg-[#a00000] flex items-center gap-1.5"
            >
              <span>{t.kanaHub.katakanaPdfBtn}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Quick Category Hub Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 pt-2 border-t border-[#800000]/10 text-[10px] font-mono">
            <span className="font-bold text-[#800000] uppercase mr-1">{t.kanaHub.browseCategoriesLabel}</span>
            <Link
              href={`${prefix}/kana/hiragana/category/gojuon`}
              className="px-2 py-0.5 bg-white border border-stone-200 text-[#fa624d] hover:underline font-bold"
            >
              {t.kanaHub.hiraganaGojuonBadge}
            </Link>
            <Link
              href={`${prefix}/kana/hiragana/category/dakuon`}
              className="px-2 py-0.5 bg-white border border-stone-200 text-[#fa624d] hover:underline font-bold"
            >
              {t.kanaHub.hiraganaDakuonBadge}
            </Link>
            <Link
              href={`${prefix}/kana/hiragana/category/yoon`}
              className="px-2 py-0.5 bg-white border border-stone-200 text-[#fa624d] hover:underline font-bold"
            >
              {t.kanaHub.hiraganaYoonBadge}
            </Link>
            <Link
              href={`${prefix}/kana/katakana/category/gojuon`}
              className="px-2 py-0.5 bg-white border border-stone-200 text-[#fa624d] hover:underline font-bold"
            >
              {t.kanaHub.katakanaGojuonBadge}
            </Link>
            <Link
              href={`${prefix}/kana/katakana/category/extended`}
              className="px-2 py-0.5 bg-white border border-stone-200 text-[#fa624d] hover:underline font-bold"
            >
              {t.kanaHub.katakanaExtendedBadge}
            </Link>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="border border-stone-200 bg-[#f0f0f0] p-3 shadow-inner flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Script Switcher */}
          <div className="flex items-center gap-1 w-full md:w-auto">
            <button
              onClick={() => setActiveScript("hiragana")}
              className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-bold border transition-colors ${
                activeScript === "hiragana"
                  ? "bg-[#fa624d] text-white border-t-[#000040] border-l-[#000040] border-b-white border-r-white"
                  : "bg-stone-100 text-black border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#e4e0d8]"
              }`}
            >
              {t.kanaHub.hiraganaTab}
            </button>
            <button
              onClick={() => setActiveScript("katakana")}
              className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-bold border transition-colors ${
                activeScript === "katakana"
                  ? "bg-[#fa624d] text-white border-t-[#000040] border-l-[#000040] border-b-white border-r-white"
                  : "bg-stone-100 text-black border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#e4e0d8]"
              }`}
            >
              {t.kanaHub.katakanaTab}
            </button>
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none">
            {types.map((typeItem) => (
              <button
                key={typeItem.id}
                onClick={() => setActiveType(typeItem.id)}
                className={`px-2.5 py-1 text-[11px] font-mono border whitespace-nowrap ${
                  activeType === typeItem.id
                    ? "bg-[#202020] text-white border-t-black border-l-black border-b-white border-r-white font-bold"
                    : "bg-stone-100 text-black border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#e4e0d8]"
                }`}
              >
                {typeItem.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.kanaHub.searchPlaceholder}
              className="w-full bg-white text-xs px-2.5 py-1.5 pl-8 border-t-2 border-l-2 border-[#404040] border-b border-r border-white font-mono outline-none"
            />
            <Search className="w-3.5 h-3.5 text-[#808080] absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Counter Info */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#555] px-1">
          <span>{t.kanaHub.showingCount(filteredKana.length, kanaList.length)}</span>
          <span>{t.kanaHub.scriptLabel} <strong className="uppercase text-[#fa624d]">{activeScript}</strong></span>
        </div>

        {/* Kana Matrix Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
          {filteredKana.map((k) => {
            const slug = getKanaSlug(k);
            const detailUrl = `${prefix}/kana/${k.script}/${slug}`;
            const hintText = k.hint[locale] || k.hint.en || "";

            return (
              <div
                key={k.id}
                className="bg-stone-100 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] p-2 flex flex-col justify-between hover:bg-[#e2dfd7] transition-all group shadow-xs"
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
                  <div className="text-3xl sm:text-4xl font-black text-[#fa624d] leading-tight font-sans">
                    {k.character}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#fa624d] mt-0.5">
                    {k.romaji}
                  </div>
                </Link>

                {/* Quick Hint & Detail Link */}
                <div className="pt-1.5 border-t border-stone-200/30 text-[10px] flex items-center justify-between">
                  <span className="line-clamp-1 text-[#555] italic pr-1">
                    {hintText}
                  </span>
                  <Link
                    href={detailUrl}
                    className="shrink-0 text-[#fa624d] font-bold hover:underline flex items-center"
                    title={`${t.kanaHub.viewDetails}: ${k.character} (${k.romaji})`}
                  >
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredKana.length === 0 && (
          <div className="border border-stone-200 bg-white p-8 text-center text-sm font-mono text-[#666]">
            {t.kanaHub.noResults(searchQuery)}
          </div>
        )}

        {/* SEO Educational Text & FAQ Section */}
        <section className="border border-stone-200 bg-[#fff] p-4 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
            <BookOpen className="w-4 h-4 text-[#fa624d]" />
            <h2 className="text-sm sm:text-base font-bold text-[#fa624d] uppercase">
              {t.kanaHub.eduTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-[#333]">
            <div>
              <h3 className="font-bold text-[#800000] mb-1">{t.kanaHub.hiraganaEduTitle}</h3>
              <p>
                {t.kanaHub.hiraganaEduText}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#800000] mb-1">{t.kanaHub.katakanaEduTitle}</h3>
              <p>
                {t.kanaHub.katakanaEduText}
              </p>
            </div>
          </div>

          {/* Quick FAQ Section */}
          <div className="pt-4 border-t border-[#e0ded0] space-y-2.5">
            <h3 className="text-xs font-bold text-[#fa624d] uppercase flex items-center gap-1.5">
              <span>{t.kanaHub.faqTitle}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] sm:text-xs">
              <div className="p-3 bg-[#fafafa] border border-[#e8e6d8]">
                <strong className="text-[#800000] block mb-1">{t.kanaHub.faq1Q}</strong>
                <p className="text-[#555] leading-relaxed">
                  {t.kanaHub.faq1A}
                </p>
              </div>
              <div className="p-3 bg-[#fafafa] border border-[#e8e6d8]">
                <strong className="text-[#800000] block mb-1">{t.kanaHub.faq2Q}</strong>
                <p className="text-[#555] leading-relaxed">
                  {t.kanaHub.faq2ABefore}<Link href={`${prefix}/compare`} className="text-[#fa624d] font-bold underline">{t.kanaHub.faq2ALink}</Link>{t.kanaHub.faq2AAfter}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

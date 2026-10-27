"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { KanaCharacter } from "@/types/kana";
import { getKanaSlug, KANA_CATEGORIES } from "@/lib/kana-seo";
import { useLanguage } from "@/context/LanguageContext";
import { PronounceButton } from "@/components/PronounceButton";
import { Search, Sparkles, BookOpen, ArrowRight } from "lucide-react";

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
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    return kanaList.filter((k) => {
      if (activeType !== "all" && k.type !== activeType) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const normQuery = normalize(query);
        const matchesRomaji =
          k.romaji.toLowerCase().includes(query) ||
          normalize(k.romaji).includes(normQuery);
        const matchesChar = k.character.includes(query);
        const matchesAliases = k.aliases?.some((a) => {
          const aNorm = normalize(a);
          if (normQuery.length <= 2) {
            return aNorm === normQuery || aNorm.startsWith(normQuery);
          }
          return aNorm.includes(normQuery);
        });
        const matchesHint =
          normQuery.length >= 3 &&
          Object.values(k.hint).some((h) =>
            normalize(h).includes(normQuery)
          );
        return matchesRomaji || matchesChar || matchesAliases || matchesHint;
      }
      return true;
    });
  }, [kanaList, activeType, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const k of allKana) {
      const key = `${k.script}-${k.type}`;
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return counts;
  }, [allKana]);

  const types: { id: string; label: string }[] = [
    { id: "all", label: t.kanaHub.allTypes },
    { id: "gojuon", label: t.kanaHub.gojuon },
    { id: "dakuon", label: t.kanaHub.dakuon },
    { id: "handakuon", label: t.kanaHub.handakuon },
    { id: "yoon", label: t.kanaHub.yoon },
    ...(activeScript === "katakana"
      ? [{ id: "extended", label: t.kanaHub.extended }]
      : []),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle={t.kanaHub.subtitle} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
        {/* Banner */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-4 text-center relative overflow-hidden shadow-xs">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>{t.kanaHub.badge}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#000080] mt-1 tracking-wider">
            {t.kanaHub.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#404040] font-medium mt-1 max-w-2xl mx-auto">
            {t.kanaHub.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 pt-2 border-t border-[#800000]/20 text-xs font-mono">
            <Link
              href={`${prefix}/compare`}
              className="px-3 py-1 bg-[#000080] text-white font-bold border-t border-l border-[#4040ff] border-b border-r border-[#000040] hover:bg-[#0000a0] flex items-center gap-1.5"
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
            {KANA_CATEGORIES.map((c) => (
              <Link
                key={`${c.script}-${c.category}`}
                href={`${prefix}/kana/${c.script}/category/${c.category}`}
                className="px-2 py-0.5 bg-white border border-[#808080] text-[#000080] hover:underline font-bold"
              >
                {t.kanaHub.categoryBadge(c.script, c.category, categoryCounts[`${c.script}-${c.category}`] ?? 0)}
              </Link>
            ))}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="border border-[#808080] bg-white p-3 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Script Switcher */}
          <div className="flex items-center gap-1 w-full md:w-auto font-mono text-xs">
            <button
              onClick={() => {
                setActiveScript("hiragana");
                if (activeType === "extended") setActiveType("all");
              }}
              className={`flex-1 md:flex-none px-3.5 py-1 text-xs font-bold border transition-colors ${
                activeScript === "hiragana"
                  ? "bg-[#000080] text-white border-[#000040]"
                  : "bg-[#d4d0c8] text-black border-[#808080] hover:bg-[#e0dcd0]"
              }`}
            >
              {t.kanaHub.hiraganaTab}
            </button>
            <button
              onClick={() => setActiveScript("katakana")}
              className={`flex-1 md:flex-none px-3.5 py-1 text-xs font-bold border transition-colors ${
                activeScript === "katakana"
                  ? "bg-[#000080] text-white border-[#000040]"
                  : "bg-[#d4d0c8] text-black border-[#808080] hover:bg-[#e0dcd0]"
              }`}
            >
              {t.kanaHub.katakanaTab}
            </button>
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none font-mono">
            {types.map((typeItem) => (
              <button
                key={typeItem.id}
                onClick={() => setActiveType(typeItem.id)}
                className={`px-2.5 py-1 text-xs border whitespace-nowrap font-bold ${
                  activeType === typeItem.id
                    ? "bg-[#000080] text-white border-[#000040]"
                    : "bg-[#d4d0c8] text-black border-[#808080] hover:bg-[#e0dcd0]"
                }`}
              >
                {typeItem.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.kanaHub.searchPlaceholder}
              className="w-full pl-8 pr-3 py-1 text-xs bg-[#fdfdfd] border-t border-l border-[#808080] border-b border-r border-[#d4d0c8] font-mono outline-none focus:bg-white"
            />
          </div>
        </div>

        {/* Counter Info */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#555] px-1">
          <span>{t.kanaHub.showingCount(filteredKana.length, kanaList.length)}</span>
          <span>{t.kanaHub.scriptLabel} <strong className="uppercase text-[#000080]">{activeScript}</strong></span>
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
                className="bg-white border-2 border-[#808080] p-2 flex flex-col justify-between hover:border-[#000080] transition-colors group shadow-xs"
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
                <div className="pt-1.5 border-t border-[#eee] text-[10px] flex items-center justify-between">
                  <span className="line-clamp-1 text-[#555] italic pr-1">
                    {hintText}
                  </span>
                  <Link
                    href={detailUrl}
                    className="shrink-0 text-[#000080] font-bold hover:underline flex items-center"
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
          <div className="border border-[#808080] bg-white p-8 text-center text-sm font-mono text-[#666]">
            {t.kanaHub.noResults(searchQuery)}
          </div>
        )}

        {/* SEO Educational Text & FAQ Section */}
        <section className="border border-[#808080] bg-[#fff] p-4 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#c0c0c0] pb-2">
            <BookOpen className="w-4 h-4 text-[#000080]" />
            <h2 className="text-sm sm:text-base font-bold text-[#000080] uppercase">
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
            <h3 className="text-xs font-bold text-[#000080] uppercase flex items-center gap-1.5">
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
                  {t.kanaHub.faq2ABefore}<Link href={`${prefix}/compare`} className="text-[#000080] font-bold underline">{t.kanaHub.faq2ALink}</Link>{t.kanaHub.faq2AAfter}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

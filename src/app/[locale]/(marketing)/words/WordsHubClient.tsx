"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { VocabWord } from "@/types/vocab";
import { useLanguage } from "@/context/LanguageContext";
import { PronounceButton } from "@/components/PronounceButton";
import { Search, Sparkles, BookOpen, ArrowRight, ArrowLeft } from "lucide-react";

export default function WordsHubClient({ initialWords = [] }: { initialWords?: VocabWord[] }) {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const [activeScript, setActiveScript] = useState<"all" | "hiragana" | "katakana">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const n5Count = useMemo(() => initialWords.filter((w) => w.jlpt === "N5").length, [initialWords]);
  const n4Count = useMemo(() => initialWords.filter((w) => w.jlpt === "N4").length, [initialWords]);
  const animeCount = useMemo(() => initialWords.filter((w) => w.jlpt === "Anime").length, [initialWords]);

  const filteredWords = useMemo(() => {
    const normalizeRomaji = (str: string) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/aa/g, "a")
        .replace(/ii/g, "i")
        .replace(/uu/g, "u")
        .replace(/ee/g, "e")
        .replace(/oo/g, "o")
        .replace(/ou/g, "o");

    return initialWords.filter((w) => {
      if (activeScript !== "all" && w.script !== activeScript) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const normQuery = normalizeRomaji(query);
        const normRomaji = normalizeRomaji(w.romaji);
        const matchRomaji = w.romaji.toLowerCase().includes(query) || normRomaji.includes(normQuery);
        const matchChar = w.character.includes(query);
        const matchKanji = w.kanji?.includes(query);
        const matchKanjiOptions = w.kanjiOptions?.some((o) => o.kanji.includes(query));
        const meaning = w.meaning[locale] || w.meaning.en;
        const matchMeaning = meaning.toLowerCase().includes(query);
        return matchRomaji || matchChar || matchKanji || matchKanjiOptions || matchMeaning;
      }
      return true;
    });
  }, [activeScript, searchQuery, locale, initialWords]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-black">
      <RetroNavbar currentSubtitle={t.wordsHub.subtitle} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Link
            href={prefix || "/"}
            className="text-[#fa624d] hover:underline flex items-center gap-1 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.nav.home}</span>
          </Link>
          <span className="text-[#888]">/</span>
          <span className="text-[#800000] font-bold uppercase">{t.wordsHub.breadcrumbWords}</span>
        </div>

        {/* Hero Header Banner */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-4 sm:p-6 text-center relative overflow-hidden shadow-xs space-y-2">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>{t.wordsHub.badge}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#fa624d] tracking-wide">
            {t.wordsHub.title(initialWords.length)}
          </h1>
          <p className="text-xs sm:text-sm text-[#404040] font-medium max-w-2xl mx-auto">
            {t.wordsHub.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 pt-2 border-t border-[#800000]/20 text-xs font-mono">
            <Link
              href={`${prefix}/words/category/n5`}
              className="px-2.5 py-1 bg-[#fff] text-[#fa624d] font-bold border border-[#000080] hover:bg-[#eef3f8]"
            >
              {t.wordsHub.jlptN5Btn(n5Count)}
            </Link>
            <Link
              href={`${prefix}/words/category/n4`}
              className="px-2.5 py-1 bg-[#fff] text-[#fa624d] font-bold border border-[#000080] hover:bg-[#eef3f8]"
            >
              {t.wordsHub.jlptN4Btn(n4Count)}
            </Link>
            <Link
              href={`${prefix}/words/category/anime`}
              className="px-2.5 py-1 bg-[#fff] text-[#800000] font-bold border border-[#800000] hover:bg-[#fff0f0]"
            >
              {t.wordsHub.animePopBtn(animeCount)}
            </Link>
            <Link
              href={`${prefix}/kana`}
              className="px-2.5 py-1 bg-[#fa624d] text-white font-bold border-t border-l border-[#4040ff] border-b border-r border-[#000040] hover:bg-[#0000a0] flex items-center gap-1.5"
            >
              <span>{t.wordsHub.kanaMatrixBtn}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href={`${prefix}/compare`}
              className="px-2.5 py-1 bg-stone-100 text-black font-bold border-t border-l border-white border-b border-r border-[#404040] hover:bg-[#e4e0d8] flex items-center gap-1.5"
            >
              <span>{t.wordsHub.lookalikesBtn}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="border border-stone-200 bg-white p-3 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Script Tabs */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveScript("all")}
              className={`px-3 py-1 border font-bold ${
                activeScript === "all"
                  ? "bg-[#fa624d] text-white border-[#000040]"
                  : "bg-stone-100 text-black border-stone-200 hover:bg-[#e0dcd0]"
              }`}
            >
              {t.wordsHub.allTab(initialWords.length)}
            </button>
            <button
              type="button"
              onClick={() => setActiveScript("hiragana")}
              className={`px-3 py-1 border font-bold ${
                activeScript === "hiragana"
                  ? "bg-[#fa624d] text-white border-[#000040]"
                  : "bg-stone-100 text-black border-stone-200 hover:bg-[#e0dcd0]"
              }`}
            >
              {t.wordsHub.hiraganaTab}
            </button>
            <button
              type="button"
              onClick={() => setActiveScript("katakana")}
              className={`px-3 py-1 border font-bold ${
                activeScript === "katakana"
                  ? "bg-[#fa624d] text-white border-[#000040]"
                  : "bg-stone-100 text-black border-stone-200 hover:bg-[#e0dcd0]"
              }`}
            >
              {t.wordsHub.katakanaTab}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.wordsHub.searchPlaceholder}
              className="w-full pl-8 pr-3 py-1 text-xs bg-[#fdfdfd] border-t border-l border-stone-200 border-b border-r border-[#d4d0c8] font-mono outline-none focus:bg-white"
            />
          </div>
        </div>

        {/* Word Card Grid */}
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {filteredWords.map((word) => {
            const wordMeaning = word.meaning[locale] || word.meaning.en;

            return (
              <div
                key={word.slug}
                className="bg-white border-2 border-stone-200 p-2.5 hover:border-[#000080] transition-colors flex flex-col justify-between shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#800000] uppercase mb-1">
                    <span className="font-bold">{word.script.slice(0, 4)}</span>
                    <PronounceButton text={word.character} size="sm" />
                  </div>

                  <Link href={`${prefix}/words/${word.slug}`} className="block text-center py-1">
                    <div className="text-2xl sm:text-3xl font-black text-[#fa624d] group-hover:scale-105 transition-transform font-sans">
                      {word.character}
                    </div>
                    {word.kanjiOptions && word.kanjiOptions.length > 0 ? (
                      <div className="text-xs text-[#800000] font-mono mt-0.5 font-bold">
                        [{word.kanjiOptions.map((o) => o.kanji).join("・")}]
                      </div>
                    ) : word.kanji && word.kanji !== word.character ? (
                      <div className="text-xs text-[#800000] font-mono mt-0.5">
                        [{word.kanji}]
                      </div>
                    ) : null}
                    <div className="text-xs font-mono font-bold text-[#fa624d] mt-0.5">
                      {word.romaji}
                    </div>
                  </Link>
                </div>

                <div className="mt-2 pt-1.5 border-t border-[#eee] text-center">
                  <div className="text-[11px] text-[#444] font-medium truncate" title={wordMeaning}>
                    {wordMeaning}
                  </div>
                  <Link
                    href={`${prefix}/words/${word.slug}`}
                    className="inline-flex items-center gap-0.5 text-[10px] text-[#fa624d] font-bold group-hover:underline mt-1"
                  >
                    <span>{t.wordsHub.breakdownLink}</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Educational SEO & Study Guide Section */}
        <section className="border border-stone-200 bg-white p-4 sm:p-6 space-y-4 shadow-xs mt-6">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
            <BookOpen className="w-4 h-4 text-[#fa624d]" />
            <h2 className="text-sm sm:text-base font-bold text-[#fa624d] uppercase">
              {t.wordsHub.eduTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-[#444]">
            <div className="p-3 bg-[#faf9f5] border border-[#e8e6d8]">
              <strong className="text-[#800000] block mb-1">{t.wordsHub.edu1Title}</strong>
              <p>
                {t.wordsHub.edu1Desc}
              </p>
            </div>
            <div className="p-3 bg-[#faf9f5] border border-[#e8e6d8]">
              <strong className="text-[#800000] block mb-1">{t.wordsHub.edu2Title}</strong>
              <p>
                {t.wordsHub.edu2Desc}
              </p>
            </div>
            <div className="p-3 bg-[#faf9f5] border border-[#e8e6d8]">
              <strong className="text-[#800000] block mb-1">{t.wordsHub.edu3Title}</strong>
              <p>
                {t.wordsHub.edu3Desc}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

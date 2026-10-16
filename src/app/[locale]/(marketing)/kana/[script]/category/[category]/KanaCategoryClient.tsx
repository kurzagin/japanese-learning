"use client";

import React from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { KanaCharacter } from "@/data/kana";
import { KanaCategoryInfo, getKanaSlug } from "@/lib/kana-seo";
import { useLanguage } from "@/context/LanguageContext";
import { PronounceButton } from "@/components/PronounceButton";
import { ArrowLeft, BookOpen, Sparkles, ArrowRight, Layers } from "lucide-react";

interface Props {
  catInfo: KanaCategoryInfo;
  characters: KanaCharacter[];
}

export default function KanaCategoryClient({ catInfo, characters }: Props) {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const title = catInfo.title[locale] || catInfo.title.en;
  const description = catInfo.description[locale] || catInfo.description.en;
  const explanation = catInfo.explanation[locale] || catInfo.explanation.en;

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle={catInfo.script.toUpperCase()} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Link
            href={`${prefix}/kana`}
            className="text-[#000080] hover:underline flex items-center gap-1 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.kanaCategory.breadcrumbHub}</span>
          </Link>
          <span className="text-[#888]">/</span>
          <span className="uppercase text-[#800000] font-bold">
            {catInfo.script}
          </span>
          <span className="text-[#888]">/</span>
          <span className="text-black font-bold uppercase">{catInfo.category}</span>
        </div>

        {/* Hero Banner */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-4 sm:p-6 text-center relative overflow-hidden shadow-xs space-y-2">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>{catInfo.script} • {catInfo.category}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#000080] tracking-wide">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-[#404040] font-medium max-w-2xl mx-auto">
            {description}
          </p>

          <div className="pt-2 text-xs font-mono flex items-center justify-center gap-3 text-[#000080]">
            <span className="font-bold bg-[#eef3f8] px-2.5 py-1 border border-[#000080]/30">
              {t.kanaCategory.countBadge(characters.length)}
            </span>
          </div>
        </div>

        {/* Educational Explainer Section */}
        <section className="border border-[#808080] bg-white p-4 sm:p-5 shadow-inner space-y-2">
          <div className="flex items-center gap-2 border-b border-[#c0c0c0] pb-1.5">
            <BookOpen className="w-4 h-4 text-[#000080]" />
            <h2 className="text-xs sm:text-sm font-bold text-[#000080] uppercase tracking-wider">
              {t.kanaCategory.aboutSetTitle}
            </h2>
          </div>
          <p className="text-xs leading-relaxed text-[#333]">
            {explanation}
          </p>
        </section>

        {/* Character Grid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#000080] uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>{t.kanaCategory.rosterTitle}</span>
            </h3>
            <span className="text-[11px] font-mono text-[#666]">
              {t.kanaCategory.rosterHint}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
            {characters.map((k) => {
              const slug = getKanaSlug(k);
              const detailUrl = `${prefix}/kana/${k.script}/${slug}`;
              const hintText = k.hint[locale] || k.hint.en || "";

              return (
                <div
                  key={k.id}
                  className="bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] p-3 flex flex-col justify-between hover:bg-[#e2dfd7] transition-all group shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#800000] uppercase">
                      {k.row || k.type}
                    </span>
                    <PronounceButton text={k.character} size="sm" />
                  </div>

                  <Link
                    href={detailUrl}
                    className="my-2.5 text-center block group-hover:scale-105 transition-transform"
                  >
                    <div className="text-3xl sm:text-4xl font-black text-[#000080] leading-tight font-sans">
                      {k.character}
                    </div>
                    <div className="text-xs font-mono font-bold text-[#cc0000] mt-0.5">
                      {k.romaji}
                    </div>
                  </Link>

                  <div className="pt-2 border-t border-[#808080]/30 text-[10px] flex items-center justify-between">
                    <span className="line-clamp-1 text-[#555] italic pr-1">
                      {hintText}
                    </span>
                    <Link
                      href={detailUrl}
                      className="shrink-0 text-[#000080] font-bold hover:underline flex items-center"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4 text-center">
          <Link
            href={`${prefix}/kana`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4d0c8] text-black font-bold border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#e4e0d8] text-xs font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.kanaCategory.returnBtn}</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

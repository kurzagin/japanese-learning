"use client";

import React from "react";
import Link from "next/link";
import { KanaCharacter } from "@/types/kana";
import { ComparisonPair, getKanaSlug } from "@/lib/kana-seo";
import { RetroNavbar } from "@/components/RetroNavbar";
import { PronounceButton } from "@/components/PronounceButton";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Layers,
  Play,
  ArrowRight,
} from "lucide-react";

interface KanaCompareClientProps {
  comparison: ComparisonPair;
  kana1: KanaCharacter;
  kana2: KanaCharacter;
  kana3?: KanaCharacter;
  k1Strokes: number | null;
  k2Strokes: number | null;
  k3Strokes?: number | null;
}

export default function KanaCompareClient({
  comparison,
  kana1,
  kana2,
  kana3,
  k1Strokes,
  k2Strokes,
  k3Strokes,
}: KanaCompareClientProps) {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const scriptName = comparison.script === "hiragana" ? "Hiragana" : "Katakana";

  const differences = comparison.keyDifferences[locale] || comparison.keyDifferences.en;
  const tip = comparison.visualTip[locale] || comparison.visualTip.en;
  const secondDisplay = kana3
    ? locale === "ja"
      ? `${kana2.character}」と「${kana3.character}`
      : `${kana2.character} vs ${kana3.character}`
    : kana2.character;

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar
        currentSubtitle={t.compareDetail.subtitle(
          kana1.character,
          kana3 ? `${kana2.character} vs ${kana3.character}` : kana2.character
        )}
      />

      <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-mono">
          <Link
            href={`${prefix}/kana`}
            className="inline-flex items-center gap-1.5 text-[#000080] font-bold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.compareDetail.backToMatrix}</span>
          </Link>
          <span className="text-[#666] uppercase">
            {scriptName} &gt; {comparison.slug}
          </span>
        </div>

        {/* Hero Header */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-4 sm:p-6 text-center shadow-xs">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>{t.compareDetail.badge}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#000080] tracking-wide">
            {t.compareDetail.title(kana1.character, secondDisplay)}
          </h1>
          <p className="text-xs sm:text-sm text-[#404040] font-medium mt-1 max-w-xl mx-auto">
            {t.compareDetail.description(scriptName)}
          </p>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className={`grid grid-cols-1 ${kana3 ? "sm:grid-cols-3" : "sm:grid-cols-2"} gap-4`}>
          {/* Card 1 */}
          <div className="border-2 border-[#000080] bg-white p-5 text-center flex flex-col items-center justify-between shadow-xs">
            <div className="w-full">
              <span className="text-[10px] font-mono font-bold text-[#800000] uppercase tracking-wider block">
                {t.compareDetail.char1Label}
              </span>
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#f5f5f5] border border-[#000080] mx-auto mt-2 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl font-black text-[#000080]">
                  {kana1.character}
                </span>
              </div>
              <div className="text-2xl font-mono font-black text-[#cc0000] mt-2">
                /{kana1.romaji}/
              </div>
              <div className="mt-2">
                <PronounceButton text={kana1.character} label={t.kanaDetail.listen} size="sm" />
              </div>
            </div>

            <div className="w-full mt-4 pt-3 border-t border-[#eee] text-xs space-y-1">
              <div className="font-mono text-[#555]">
                {t.compareDetail.strokesLabel} <strong>{k1Strokes ?? t.compareDetail.standardStrokes}</strong>
              </div>
              <div className="italic text-[#444] text-[11px] line-clamp-2">
                &ldquo;{kana1.hint[locale] || kana1.hint.en}&rdquo;
              </div>
              <Link
                href={`${prefix}/kana/${kana1.script}/${getKanaSlug(kana1)}`}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#000080] hover:underline pt-1"
              >
                <span>{t.compareDetail.fullProfileLink(kana1.character)}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border-2 border-[#800000] bg-white p-5 text-center flex flex-col items-center justify-between shadow-xs">
            <div className="w-full">
              <span className="text-[10px] font-mono font-bold text-[#800000] uppercase tracking-wider block">
                {t.compareDetail.char2Label}
              </span>
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#f5f5f5] border border-[#800000] mx-auto mt-2 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl font-black text-[#800000]">
                  {kana2.character}
                </span>
              </div>
              <div className="text-2xl font-mono font-black text-[#cc0000] mt-2">
                /{kana2.romaji}/
              </div>
              <div className="mt-2">
                <PronounceButton text={kana2.character} label={t.kanaDetail.listen} size="sm" />
              </div>
            </div>

            <div className="w-full mt-4 pt-3 border-t border-[#eee] text-xs space-y-1">
              <div className="font-mono text-[#555]">
                {t.compareDetail.strokesLabel} <strong>{k2Strokes ?? t.compareDetail.standardStrokes}</strong>
              </div>
              <div className="italic text-[#444] text-[11px] line-clamp-2">
                &ldquo;{kana2.hint[locale] || kana2.hint.en}&rdquo;
              </div>
              <Link
                href={`${prefix}/kana/${kana2.script}/${getKanaSlug(kana2)}`}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#800000] hover:underline pt-1"
              >
                <span>{t.compareDetail.fullProfileLink(kana2.character)}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Optional Card 3 (for 3-way comparison wa-vs-re-vs-ne) */}
          {kana3 && (
            <div className="border-2 border-[#006600] bg-white p-5 text-center flex flex-col items-center justify-between shadow-xs">
              <div className="w-full">
                <span className="text-[10px] font-mono font-bold text-[#006600] uppercase tracking-wider block">
                  {t.compareDetail.char2Label.replace("2", "3")}
                </span>
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#f5f5f5] border border-[#006600] mx-auto mt-2 flex items-center justify-center">
                  <span className="text-5xl sm:text-6xl font-black text-[#006600]">
                    {kana3.character}
                  </span>
                </div>
                <div className="text-2xl font-mono font-black text-[#cc0000] mt-2">
                  /{kana3.romaji}/
                </div>
                <div className="mt-2">
                  <PronounceButton text={kana3.character} label={t.kanaDetail.listen} size="sm" />
                </div>
              </div>

              <div className="w-full mt-4 pt-3 border-t border-[#eee] text-xs space-y-1">
                <div className="font-mono text-[#555]">
                  {t.compareDetail.strokesLabel} <strong>{k3Strokes ?? t.compareDetail.standardStrokes}</strong>
                </div>
                <div className="italic text-[#444] text-[11px] line-clamp-2">
                  &ldquo;{kana3.hint[locale] || kana3.hint.en}&rdquo;
                </div>
                <Link
                  href={`${prefix}/kana/${kana3.script}/${getKanaSlug(kana3)}`}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006600] hover:underline pt-1"
                >
                  <span>{t.compareDetail.fullProfileLink(kana3.character)}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Breakdown Points */}
        <div className="border border-[#808080] bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#e0e0e0] pb-2 text-[#000080] font-bold text-xs uppercase">
            <Layers className="w-4 h-4" />
            <span>{t.compareDetail.keyDifferencesTitle}</span>
          </div>

          <ul className="space-y-2 text-xs text-[#333]">
            {differences.map((diff, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#008000] shrink-0 mt-0.5" />
                <span>{diff}</span>
              </li>
            ))}
          </ul>

          {/* Memory Rule / Mnemonic Banner */}
          <div className="bg-[#fff9e6] border border-[#ffcc00] p-3 text-xs flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-[#cc6600] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#800000] block mb-0.5 font-mono">
                {t.compareDetail.memoryTrickLabel}
              </strong>
              <p className="text-[#333] italic font-medium">{tip}</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="border-2 border-[#000080] bg-[#e8f0fe] p-4 text-center space-y-2 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-[#000080]">
            {t.compareDetail.ctaTitle}
          </h3>
          <p className="text-xs text-[#444] max-w-lg mx-auto">
            {t.compareDetail.ctaDesc}
          </p>
          <div className="pt-1">
            <Link
              href={`${prefix}/dashboard`}
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#000080] text-white text-xs font-bold border-t-2 border-l-2 border-[#4040ff] border-b-2 border-r-2 border-[#000040] shadow-sm hover:bg-[#0000a0]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{t.compareDetail.ctaBtn}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

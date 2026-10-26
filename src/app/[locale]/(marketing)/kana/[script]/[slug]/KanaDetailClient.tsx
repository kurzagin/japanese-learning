"use client";

import React from "react";
import Link from "next/link";
import { KanaCharacter } from "@/types/kana";
import { CURATED_COMPARISONS, getKanaSlug, KanaOrigin } from "@/lib/kana-seo";
import { RetroNavbar } from "@/components/RetroNavbar";
import { PronounceButton } from "@/components/PronounceButton";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
  Play,
  CheckCircle,
  Scroll,
} from "lucide-react";

interface KanaDetailClientProps {
  kana: KanaCharacter;
  slug: string;
  strokeCount: number | null;
  sampleWord: { jp: string; en: string; id: string; ja: string; slug?: string } | null;
  confusedKana: KanaCharacter[];
  origin?: KanaOrigin | null;
}

export default function KanaDetailClient({
  kana,
  strokeCount,
  sampleWord,
  confusedKana,
  origin,
}: KanaDetailClientProps) {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const scriptName = kana.script === "hiragana" ? "Hiragana" : "Katakana";
  const localizedHint = kana.hint[locale] || kana.hint.en;

  const sampleMeaning = sampleWord
    ? sampleWord[locale] || sampleWord.en
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle={`${scriptName.toUpperCase()} // ${kana.character}`} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between text-xs font-mono">
          <Link
            href={`${prefix}/kana`}
            className="inline-flex items-center gap-1.5 text-[#000080] font-bold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.kanaDetail.returnToMatrix}</span>
          </Link>
          <span className="text-[#666] uppercase">
            {kana.script} &gt; {kana.type} &gt; {kana.romaji}
          </span>
        </div>

        {/* Main Hero Card */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-5 sm:p-8 text-center relative shadow-xs">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>{t.kanaDetail.badge}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
          </div>

          {/* Large Glyph Display */}
          <div className="my-3 flex flex-col items-center justify-center">
            <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white border-2 border-[#000080] flex items-center justify-center shadow-inner rounded-xs">
              <span className="text-6xl sm:text-7xl font-black text-[#000080] font-sans select-all">
                {kana.character}
              </span>
            </div>

            {/* Pronunciation & Audio Trigger */}
            <div className="mt-4 flex items-center gap-3">
              <div className="text-2xl sm:text-3xl font-mono font-black text-[#cc0000]">
                /{kana.romaji}/
              </div>
              <PronounceButton
                text={kana.character}
                label={t.kanaDetail.listen}
                size="md"
              />
            </div>
          </div>

          {/* Meta Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] font-mono">
            <span className="bg-[#000080] text-white px-3 py-1 font-bold">
              {t.kanaDetail.scriptLabel}: {scriptName}
            </span>
            <span className="bg-[#202020] text-white px-3 py-1">
              {t.kanaDetail.classLabel}: {kana.type.toUpperCase()}
            </span>
            <span className="bg-[#d4d0c8] text-black border border-[#808080] px-3 py-1">
              {t.kanaDetail.rowLabel}: {kana.row.toUpperCase()}
            </span>
            {strokeCount !== null && (
              <span className="bg-[#006600] text-white px-3 py-1 font-bold">
                {t.kanaDetail.strokes(strokeCount)}
              </span>
            )}
          </div>
        </div>

        {/* Two-Column Details Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mnemonic / Memory Aid */}
          <div className="border border-[#808080] bg-white p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-[#e0e0e0] pb-2 text-[#000080] font-bold text-xs uppercase">
                <HelpCircle className="w-4 h-4 text-[#ff9900]" />
                <span>{t.kanaDetail.mnemonicTitle}</span>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-[#333] leading-relaxed italic">
                &ldquo;{localizedHint}&rdquo;
              </p>
            </div>
            <div className="mt-4 text-[11px] font-mono text-[#777] bg-[#f8f8f8] p-2 border border-[#eee]">
              {t.kanaDetail.mnemonicTip}
            </div>
          </div>

          {/* Historical Origin / Man'yōgana with Furigana */}
          {origin ? (
            <div className="border border-[#808080] bg-white p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-[#e0e0e0] pb-2 text-[#800000] font-bold text-xs uppercase">
                  <Scroll className="w-4 h-4 text-[#800000]" />
                  <span>{t.kanaDetail.originTitle}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#fff8e7] border border-[#800000] flex items-center justify-center shrink-0">
                    <ruby className="text-3xl font-black text-[#800000] font-sans">
                      {origin.kanji}
                      <rt className="text-[10px] font-mono font-normal text-[#000080]">
                        {origin.reading}
                      </rt>
                    </ruby>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#000080]">
                      {t.kanaDetail.evolvedFromKanji(origin.kanji, origin.reading)}
                    </div>
                    <p className="text-[11px] text-[#555] mt-1 leading-snug">
                      {origin.notes[locale] || origin.notes.en}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-[10px] font-mono text-[#800000] bg-[#fff0f0] p-1.5 border border-[#ffcccc]">
                {t.kanaDetail.originFooter}
              </div>
            </div>
          ) : (
            /* Standard Elementary Example Word fallback */
            <div className="border border-[#808080] bg-white p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-[#e0e0e0] pb-2 text-[#000080] font-bold text-xs uppercase">
                  <BookOpen className="w-4 h-4 text-[#006600]" />
                  <span>{t.kanaDetail.vocabTitle}</span>
                </div>

                {sampleWord ? (
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between">
                      {sampleWord.slug ? (
                        <Link
                          href={`${prefix}/words/${sampleWord.slug}`}
                          className="text-xl font-bold text-[#000080] hover:underline"
                        >
                          {sampleWord.jp}
                        </Link>
                      ) : (
                        <span className="text-xl font-bold text-[#000080]">
                          {sampleWord.jp}
                        </span>
                      )}
                      <PronounceButton
                        text={sampleWord.jp.split(" ")[0]}
                        size="sm"
                      />
                    </div>
                    <div className="text-xs text-[#555] font-mono">
                      {t.kanaDetail.vocabMeaning} <strong>{sampleMeaning}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 text-xs text-[#666]">
                    {t.kanaDetail.vocabDefault}
                  </div>
                )}
              </div>

              <div className="mt-4 text-[11px] font-mono text-[#006600] bg-[#f0fff0] p-2 border border-[#c0e0c0] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{t.kanaDetail.standardSyllabusBadge}</span>
              </div>
            </div>
          )}
        </div>

        {/* Standard Elementary Example Word Row if Origin was rendered */}
        {origin && sampleWord && (
          <div className="border border-[#808080] bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-2">
              <div className="flex items-center gap-2 text-[#000080] font-bold text-xs uppercase">
                <BookOpen className="w-4 h-4 text-[#006600]" />
                <span>{t.kanaDetail.elementaryVocabTitle}</span>
              </div>
              <PronounceButton
                text={sampleWord.jp.split(" ")[0]}
                size="sm"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                {sampleWord.slug ? (
                  <Link
                    href={`${prefix}/words/${sampleWord.slug}`}
                    className="block text-xl font-bold text-[#000080] hover:underline"
                  >
                    {sampleWord.jp}
                  </Link>
                ) : (
                  <div className="text-xl font-bold text-[#000080]">
                    {sampleWord.jp}
                  </div>
                )}
                <div className="text-xs text-[#555] font-mono mt-0.5">
                  {t.kanaDetail.vocabMeaning} <strong>{sampleMeaning}</strong>
                </div>
              </div>
              <div className="text-[11px] font-mono text-[#006600] bg-[#f0fff0] px-2.5 py-1 border border-[#c0e0c0]">
                {t.kanaDetail.standardSyllabusBadge}
              </div>
            </div>
          </div>
        )}

        {/* Easily Confused Characters Section */}
        {confusedKana.length > 0 && (
          <div className="border border-[#808080] bg-[#fff] p-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#e0e0e0] pb-2 text-[#800000] font-bold text-xs uppercase">
              <Layers className="w-4 h-4 text-[#cc0000]" />
              <span>{t.kanaDetail.confusedTitle}</span>
            </div>
            <p className="text-xs text-[#555] mt-2 mb-3">
              {t.kanaDetail.confusedSubtitle(kana.character)}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {confusedKana.map((ck) => {
                const ckSlug = getKanaSlug(ck);
                const pairMatch = CURATED_COMPARISONS.find((c) => {
                  const ids = [c.kana1Id, c.kana2Id, c.kana3Id].filter(Boolean);
                  return ids.includes(kana.id) && ids.includes(ck.id);
                });
                const targetHref = pairMatch
                  ? `${prefix}/compare/${pairMatch.slug}`
                  : `${prefix}/kana/${ck.script}/${ckSlug}`;
                return (
                  <Link
                    key={ck.id}
                    href={targetHref}
                    className="p-2.5 bg-[#f5f5f5] hover:bg-[#e8f0fe] border border-[#ccc] flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="text-2xl font-black text-[#000080] group-hover:scale-110 transition-transform">
                        {ck.character}
                      </div>
                      <div className="text-[11px] font-mono font-bold text-[#cc0000]">
                        /{ck.romaji}/
                      </div>
                    </div>
                    <span className="text-[10px] text-[#000080] font-mono font-bold underline">
                      {t.kanaDetail.compareBtn}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Interactive CTA to existing Study Engine */}
        <div className="border-2 border-[#000080] bg-[#e8f0fe] p-4 sm:p-6 text-center space-y-3 shadow-xs">
          <h3 className="text-base sm:text-lg font-black text-[#000080] tracking-wide">
            {t.kanaDetail.ctaTitle(kana.character)}
          </h3>
          <p className="text-xs text-[#333] max-w-xl mx-auto">
            {t.kanaDetail.ctaSubtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              href={`${prefix}/dashboard`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#000080] text-white text-xs font-bold border-t-2 border-l-2 border-[#4040ff] border-b-2 border-r-2 border-[#000040] shadow-sm hover:bg-[#0000a0] transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{t.kanaDetail.startDrillBtn}</span>
            </Link>
            <Link
              href={`${prefix}/kana`}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#d4d0c8] text-black text-xs font-bold border-t border-l border-white border-b border-r border-[#404040] hover:bg-[#e4e0d8] transition-colors"
            >
              <span>{t.kanaDetail.browseAllBtn}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

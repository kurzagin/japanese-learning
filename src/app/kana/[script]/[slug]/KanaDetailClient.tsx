"use client";

import React from "react";
import Link from "next/link";
import { KanaCharacter } from "@/data/kana";
import { getKanaSlug } from "@/lib/kana-seo";
import { RetroNavbar } from "@/components/RetroNavbar";
import { PronounceButton } from "@/components/PronounceButton";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
  Play,
  Share2,
  CheckCircle,
} from "lucide-react";

interface KanaDetailClientProps {
  kana: KanaCharacter;
  slug: string;
  strokeCount: number | null;
  sampleWord: { jp: string; en: string; id: string; ja: string } | null;
  confusedKana: KanaCharacter[];
}

export default function KanaDetailClient({
  kana,
  slug,
  strokeCount,
  sampleWord,
  confusedKana,
}: KanaDetailClientProps) {
  const { locale } = useLanguage();
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
            href="/kana"
            className="inline-flex items-center gap-1.5 text-[#000080] font-bold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO KANA MATRIX</span>
          </Link>
          <span className="text-[#666] uppercase">
            {kana.script} &gt; {kana.type} &gt; {kana.romaji}
          </span>
        </div>

        {/* Main Hero Card */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-5 sm:p-8 text-center relative shadow-xs">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>Official Standard Japanese Character Profile</span>
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
                label="LISTEN"
                size="md"
              />
            </div>
          </div>

          {/* Meta Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] font-mono">
            <span className="bg-[#000080] text-white px-3 py-1 font-bold">
              Script: {scriptName}
            </span>
            <span className="bg-[#202020] text-white px-3 py-1">
              Class: {kana.type.toUpperCase()}
            </span>
            <span className="bg-[#d4d0c8] text-black border border-[#808080] px-3 py-1">
              Row: {kana.row.toUpperCase()}
            </span>
            {strokeCount !== null && (
              <span className="bg-[#006600] text-white px-3 py-1 font-bold">
                {strokeCount} Stroke{strokeCount > 1 ? "s" : ""}
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
                <span>Visual Mnemonic & Memory Aid</span>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-[#333] leading-relaxed italic">
                &ldquo;{localizedHint}&rdquo;
              </p>
            </div>
            <div className="mt-4 text-[11px] font-mono text-[#777] bg-[#f8f8f8] p-2 border border-[#eee]">
              Tip: Associate the shape with this visual image in your mind to recall it in less than 0.5s during drills.
            </div>
          </div>

          {/* Standard Elementary Example Word */}
          <div className="border border-[#808080] bg-white p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-[#e0e0e0] pb-2 text-[#000080] font-bold text-xs uppercase">
                <BookOpen className="w-4 h-4 text-[#006600]" />
                <span>Vocabulary Example</span>
              </div>

              {sampleWord ? (
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#000080]">
                      {sampleWord.jp}
                    </span>
                    <PronounceButton
                      text={sampleWord.jp.split(" ")[0]}
                      size="sm"
                    />
                  </div>
                  <div className="text-xs text-[#555] font-mono">
                    Meaning: <strong>{sampleMeaning}</strong>
                  </div>
                </div>
              ) : (
                <div className="mt-3 text-xs text-[#666]">
                  Standard elemental sound used in hundreds of essential everyday Japanese words.
                </div>
              )}
            </div>

            <div className="mt-4 text-[11px] font-mono text-[#006600] bg-[#f0fff0] p-2 border border-[#c0e0c0] flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Standard Ministry of Education phonetic syllabus</span>
            </div>
          </div>
        </div>

        {/* Easily Confused Characters Section */}
        {confusedKana.length > 0 && (
          <div className="border border-[#808080] bg-[#fff] p-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#e0e0e0] pb-2 text-[#800000] font-bold text-xs uppercase">
              <Layers className="w-4 h-4 text-[#cc0000]" />
              <span>Frequently Confused Lookalikes</span>
            </div>
            <p className="text-xs text-[#555] mt-2 mb-3">
              Learners often confuse <strong>{kana.character}</strong> with the following characters. Compare their nuances:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {confusedKana.map((ck) => {
                const ckSlug = getKanaSlug(ck);
                return (
                  <Link
                    key={ck.id}
                    href={`/kana/${ck.script}/${ckSlug}`}
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
                      Compare &rarr;
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
            READY TO DRILL &apos;{kana.character}&apos; AT ARCADE SPEED?
          </h3>
          <p className="text-xs text-[#333] max-w-xl mx-auto">
            Reading Japanese isn&apos;t just about memorization — it&apos;s about fast visual reflexes. Test your speed in the SaKana Dojo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#000080] text-white text-xs font-bold border-t-2 border-l-2 border-[#4040ff] border-b-2 border-r-2 border-[#000040] shadow-sm hover:bg-[#0000a0] transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>START PRACTICE DRILL</span>
            </Link>
            <Link
              href="/kana"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#d4d0c8] text-black text-xs font-bold border-t border-l border-white border-b border-r border-[#404040] hover:bg-[#e4e0d8] transition-colors"
            >
              <span>BROWSE ALL CHARACTERS</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

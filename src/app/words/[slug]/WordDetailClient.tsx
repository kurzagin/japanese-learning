"use client";

import React from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { VocabWord } from "@/lib/vocab-seo";
import { KanaCharacter } from "@/data/kana";
import { getKanaSlug } from "@/lib/kana-seo";
import { useLanguage } from "@/context/LanguageContext";
import { PronounceButton } from "@/components/PronounceButton";
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Tag,
  Compass,
} from "lucide-react";

interface Props {
  word: VocabWord;
  constituentKana: KanaCharacter[];
  relatedWords: VocabWord[];
}

export default function WordDetailClient({
  word,
  constituentKana,
  relatedWords,
}: Props) {
  const { locale } = useLanguage();

  const meaningText = word.meaning[locale] || word.meaning.en;
  const triviaText = word.trivia ? (word.trivia[locale] || word.trivia.en) : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle={word.romaji.toUpperCase()} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Link
            href="/kana"
            className="text-[#000080] hover:underline flex items-center gap-1 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>KANA HUB</span>
          </Link>
          <span className="text-[#888]">/</span>
          <span className="text-[#800000] font-bold uppercase">{word.script}</span>
          <span className="text-[#888]">/</span>
          <span className="text-black font-bold">{word.romaji}</span>
        </div>

        {/* Word Hero Card */}
        <div className="bg-[#fff8e7] border-2 border-[#800000] p-6 shadow-xs text-center space-y-4 relative overflow-hidden">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>Japanese Vocabulary Word • {word.script}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
          </div>

          <div className="space-y-1">
            <div className="text-5xl sm:text-7xl font-black text-[#000080] font-sans tracking-wide">
              {word.character}
            </div>
            <div className="text-lg sm:text-xl font-mono font-bold text-[#cc0000]">
              {word.romaji}
            </div>
          </div>

          {/* Audio Pronunciation Button */}
          <div className="flex justify-center pt-1">
            <PronounceButton text={word.character} size="md" />
          </div>

          {/* Meaning Banner */}
          <div className="border border-[#808080] bg-[#f0f0f0] p-3 max-w-md mx-auto shadow-inner space-y-1">
            <div className="text-[10px] uppercase font-bold text-[#666] tracking-wider">
              Meaning / Translation
            </div>
            <div className="text-base sm:text-lg font-bold text-[#000080]">
              {meaningText}
            </div>
            {locale !== "en" && (
              <div className="text-xs text-[#555] font-mono">
                EN: {word.meaning.en}
              </div>
            )}
          </div>

          {/* Trivia Note if available */}
          {triviaText && (
            <div className="text-xs text-[#555] italic max-w-lg mx-auto bg-white/60 p-2.5 border border-[#800000]/20 rounded-xs">
              💡 {triviaText}
            </div>
          )}
        </div>

        {/* Constituent Kana Breakdown Card */}
        <div className="bg-white border border-[#808080] p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-[#c0c0c0] pb-2">
            <BookOpen className="w-4 h-4 text-[#000080]" />
            <h2 className="text-xs sm:text-sm font-bold text-[#000080] uppercase tracking-wider">
              Character Breakdown (Spelling Guide)
            </h2>
          </div>
          <p className="text-xs text-[#555]">
            Click any character below to learn its stroke order, audio, and mnemonics:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {constituentKana.map((k) => {
              const slug = getKanaSlug(k);
              const kanaUrl = `/kana/${k.script}/${slug}`;

              return (
                <Link
                  key={k.id}
                  href={kanaUrl}
                  className="bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] p-3 text-center hover:bg-[#e2dfd7] transition-all group block shadow-xs"
                >
                  <div className="text-3xl font-black text-[#000080] group-hover:scale-105 transition-transform font-sans">
                    {k.character}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#cc0000] mt-1">
                    {k.romaji}
                  </div>
                  <div className="text-[10px] text-[#555] mt-1 font-mono uppercase flex items-center justify-center gap-1">
                    <span>Stroke Order</span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#000080]" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Related Words Section */}
        {relatedWords.length > 0 && (
          <div className="bg-[#f8f8f8] border border-[#808080] p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-[#c0c0c0] pb-2">
              <Compass className="w-4 h-4 text-[#800000]" />
              <h2 className="text-xs sm:text-sm font-bold text-[#800000] uppercase tracking-wider">
                Related {word.script === "hiragana" ? "Hiragana" : "Katakana"} Words
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {relatedWords.map((rw) => (
                <Link
                  key={rw.slug}
                  href={`/words/${rw.slug}`}
                  className="bg-white border border-[#c0c0c0] p-2.5 text-center hover:border-[#000080] hover:bg-[#eef3f8] transition-colors block"
                >
                  <div className="text-lg font-bold text-[#000080] font-sans">
                    {rw.character}
                  </div>
                  <div className="text-[11px] font-mono text-[#cc0000] font-bold">
                    {rw.romaji}
                  </div>
                  <div className="text-[10px] text-[#666] truncate mt-0.5">
                    {rw.meaning.en}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="pt-2 text-center">
          <Link
            href="/kana"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4d0c8] text-black font-bold border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#e4e0d8] text-xs font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO KANA HUB</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

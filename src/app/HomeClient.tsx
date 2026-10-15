"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { RetroWebring } from "@/components/RetroWebring";
import { useLanguage } from "@/context/LanguageContext";
import { Play, Sparkles, Star } from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Atomically increment and get updated count from DB on page load / refresh
    fetch("/api/visitors", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && typeof data.count === "number") {
          setVisitorCount(data.count);
        }
      })
      .catch((err) => {
        console.error("Failed to update visitor counter:", err);
      });
  }, []);

  const formattedCount =
    visitorCount !== null
      ? String(visitorCount).padStart(6, "0")
      : "------";

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      {/* Full-width Sticky Retro Navbar */}
      <RetroNavbar />

      {/* Edge-to-Edge Responsive Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
        {/* Header Banner */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-4 text-center relative overflow-hidden shadow-xs">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5">
            <Star className="w-3 h-3 fill-[#ff9900] text-[#ff9900]" />
            <span>{t.home.welcomeBadge}</span>
            <Star className="w-3 h-3 fill-[#ff9900] text-[#ff9900]" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#000080] mt-1.5 tracking-wider flex items-center justify-center gap-2">
            <span>魚 SAKANA 魚</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#cc0000] font-bold mt-1">
            〜 {t.home.tagline} 〜
          </p>
          <p className="text-[11px] sm:text-xs text-[#555] mt-1 font-mono">
            [ {t.home.subTagline} ]
          </p>
        </div>

        {/* Real Visitor Counter Stored in DB with Retro Flash */}
        <div className="border border-[#808080] bg-[#f0f0f0] px-3 sm:px-4 py-2 flex items-center justify-between text-xs shadow-inner">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-bold text-[#000080] flex items-center gap-1.5">
              <span className="text-[#ff0055] animate-retro-blink font-black">●</span>
              {t.home.counterLabel}
            </span>
            <span className="bg-black text-[#00ff66] font-mono px-2 py-0.5 border border-[#808080] text-xs sm:text-sm font-bold tracking-widest shadow-inner">
              {formattedCount}
            </span>
            <span className="animate-retro-blink-fast text-[9px] font-bold px-1.5 bg-[#ffff00] text-[#800000] border border-[#800000] hidden sm:inline-block">
              [LIVE!]
            </span>
          </div>
          <div className="text-[11px] text-[#555] font-mono flex items-center gap-1.5">
            <span className="text-[#008800] font-bold">ONLINE</span> // SAKANA
          </div>
        </div>

        {/* Authentic Retro Marquee Ticker */}
        <div className="border border-[#808080] bg-[#000040] text-[#ffff00] text-[11px] font-mono py-1.5 px-3 overflow-hidden flex items-center shadow-inner">
          <span className="shrink-0 bg-[#ff0000] text-white px-1.5 font-bold text-[9px] mr-2.5 animate-retro-blink">
            NEWS
          </span>
          <div className="w-full overflow-hidden whitespace-nowrap">
            <div className="animate-retro-ticker">
              {t.home.ticker}
            </div>
          </div>
        </div>

        {/* Main Content Area: Quick Actions & Rules */}
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Quick Actions & Rules */}
          <div className="space-y-4">
            {/* Quick Enter Action Banner */}
            <div className="border-2 border-dashed border-[#000080] bg-[#eef3f8] p-4 sm:p-5 text-center space-y-3.5 shadow-xs">
              <div className="text-xs sm:text-sm font-bold text-[#000080] flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ff9900]" />
                <span>{t.home.startSessionBanner}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-8 py-2.5 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs sm:text-sm text-black flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
                >
                  <Play className="w-4 h-4 fill-[#000080] text-[#000080]" />
                  <span>{t.home.ctaEnter}</span>
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-xs font-bold text-[#333] cursor-pointer transition-colors"
                >
                  {t.home.ctaLogin}
                </Link>
              </div>
            </div>

            {/* Guidelines / Method Table */}
            <div className="border border-[#808080] bg-white shadow-xs">
              <div className="bg-[#000080] text-white px-3 py-1.5 text-xs font-bold flex items-center justify-between">
                <span>◆ {t.home.ruleTitle}</span>
                <span className="text-[10px] text-[#ffff00] font-mono">{t.home.ruleTag}</span>
              </div>
              
              <div className="divide-y divide-[#d0d0d0] text-xs">
                <div className="p-3 flex items-start gap-2.5 bg-[#fafafa]">
                  <span className="text-[#cc0000] font-bold font-mono">【1】</span>
                  <div>
                    <strong className="text-[#000080] text-xs sm:text-sm">{t.home.rule1Title}:</strong>
                    <p className="text-[11px] sm:text-xs text-[#444] mt-0.5 leading-relaxed">
                      {t.home.rule1Desc}
                    </p>
                  </div>
                </div>

                <div className="p-3 flex items-start gap-2.5 bg-white">
                  <span className="text-[#cc0000] font-bold font-mono">【2】</span>
                  <div>
                    <strong className="text-[#000080] text-xs sm:text-sm">{t.home.rule2Title}:</strong>
                    <p className="text-[11px] sm:text-xs text-[#444] mt-0.5 leading-relaxed">
                      {t.home.rule2Desc}
                    </p>
                  </div>
                </div>

                <div className="p-3 flex items-start gap-2.5 bg-[#fafafa]">
                  <span className="text-[#cc0000] font-bold font-mono">【3】</span>
                  <div>
                    <strong className="text-[#000080] text-xs sm:text-sm">{t.home.rule3Title}:</strong>
                    <p className="text-[11px] sm:text-xs text-[#444] mt-0.5 leading-relaxed">
                      {t.home.rule3Desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Federated Webring Panel */}
            <RetroWebring />

            {/* Programmatic SEO Link Hub & Learning Pathways */}
            <div className="border border-[#808080] bg-white p-4 shadow-xs space-y-4">
              <div className="bg-[#000080] text-white px-3 py-1.5 text-xs font-bold flex items-center justify-between">
                <span>◆ LEARNING MATRIX & DIRECTORIES</span>
                <span className="text-[10px] text-[#00ff66] font-mono">EXPLORE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Kana Hub Links */}
                <div className="border border-[#d0cebf] p-3 bg-[#faf9f5] flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="font-bold text-[#000080] flex items-center gap-1.5">
                      <span className="text-[#800000]">あ</span>
                      <span>KANA ALPHABETS</span>
                    </div>
                    <p className="text-[11px] text-[#555] leading-snug">
                      Complete 46 Gojūon primitives, Dakuon &amp; Yōon combination charts with audio.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#e0ded0] flex flex-col gap-1 text-[11px]">
                    <Link href="/kana" className="text-[#000080] hover:underline font-bold">
                      &rarr; Full Kana Matrix Hub
                    </Link>
                    <Link href="/kana/hiragana/category/gojuon" className="text-[#555] hover:underline">
                      &bull; Hiragana Basic (46)
                    </Link>
                    <Link href="/kana/katakana/category/gojuon" className="text-[#555] hover:underline">
                      &bull; Katakana Basic (46)
                    </Link>
                  </div>
                </div>

                {/* Vocabulary Directory Links */}
                <div className="border border-[#d0cebf] p-3 bg-[#faf9f5] flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="font-bold text-[#000080] flex items-center gap-1.5">
                      <span className="text-[#800000]">語</span>
                      <span>ANIME &amp; CORE VOCABULARY</span>
                    </div>
                    <p className="text-[11px] text-[#555] leading-snug">
                      161 words: iconic anime reactions, loanwords, and essential daily Japanese with audio.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#e0ded0] flex flex-col gap-1 text-[11px]">
                    <Link href="/words" className="text-[#000080] hover:underline font-bold">
                      &rarr; 161-Word Directory
                    </Link>
                    <Link href="/words/sakana" className="text-[#555] hover:underline">
                      &bull; さかな (Fish / SaKana)
                    </Link>
                    <Link href="/words/neko" className="text-[#555] hover:underline">
                      &bull; ねこ (Cat / Anime Companion)
                    </Link>
                    <Link href="/words/arigatou" className="text-[#555] hover:underline">
                      &bull; ありがとう (Thank you)
                    </Link>
                  </div>
                </div>

                {/* Confused Pairs / Lookalikes */}
                <div className="border border-[#d0cebf] p-3 bg-[#faf9f5] flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="font-bold text-[#000080] flex items-center gap-1.5">
                      <span className="text-[#800000]">対</span>
                      <span>LOOKALIKE GUIDES</span>
                    </div>
                    <p className="text-[11px] text-[#555] leading-snug">
                      Side-by-side visual difference guides for the most confusing Japanese characters.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#e0ded0] flex flex-col gap-1 text-[11px]">
                    <Link href="/compare" className="text-[#000080] hover:underline font-bold">
                      &rarr; 18 Lookalike Pairs
                    </Link>
                    <Link href="/compare/shi-vs-tsu" className="text-[#555] hover:underline">
                      &bull; シ vs ツ (Shi vs Tsu)
                    </Link>
                    <Link href="/compare/so-vs-n" className="text-[#555] hover:underline">
                      &bull; ソ vs ン (So vs N)
                    </Link>
                    <Link href="/compare/sa-vs-ki" className="text-[#555] hover:underline">
                      &bull; さ vs き (Sa vs Ki)
                    </Link>
                  </div>
                </div>
              </div>

              {/* Utility Tools Link */}
              <div className="bg-[#f0f4f8] p-2.5 border border-[#d0d8e8] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                <span className="text-[#000080] font-bold">
                  Free Japanese Romanization Tool:
                </span>
                <Link
                  href="/tools/romaji-to-kana"
                  className="px-3 py-1 bg-[#000080] text-white font-bold text-[11px] hover:bg-[#0000a0]"
                >
                  Romaji ⇄ Hiragana &amp; Katakana Converter &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Docked Footer & Status Bar */}
      <footer className="border-t border-[#808080] bg-[#d4d0c8] px-3 sm:px-6 py-2 text-[11px] text-[#404040] flex items-center justify-between font-mono shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00aa00]"></span>
          <span>SAKANA READY</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="hidden sm:inline">SAKANA PROJECT // KANA SPEED DRILL FOR ANIME FANS</span>
          <span className="border-l border-[#808080] pl-2 font-mono">UTF-8 // MULTILINGUAL</span>
        </div>
      </footer>
    </div>
  );
}

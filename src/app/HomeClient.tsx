"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { BottomNav } from "@/components/BottomNav";
import { useLanguage } from "@/context/LanguageContext";
import { Play, Sparkles, BookOpen, Grid, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";

export function ModernFooter() {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <footer className="border-t border-stone-200/80 bg-white/50 backdrop-blur-xs py-8 px-4 sm:px-6 lg:px-8 mt-12 pb-20 sm:pb-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#fa624d] animate-subtle-pulse inline-block" />
          <span className="font-semibold text-stone-800">SaKana (魚)</span>
          <span>— Fast Kana Mastery for Anime Fans</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <Link href={`${prefix}/about`} className="hover:text-[#fa624d] transition-colors">
            {t.nav.about}
          </Link>
          <Link href={`${prefix}/docs`} className="hover:text-[#fa624d] transition-colors">
            {t.nav.docs}
          </Link>
          <Link href={`${prefix}/tools/hiragana-chart-pdf`} className="hover:text-[#fa624d] transition-colors">
            PDF Chart
          </Link>
          <span>© {new Date().getFullYear()} SaKana</span>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const { t, locale } = useLanguage();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const prefix = locale === "en" ? "" : `/${locale}`;

  useEffect(() => {
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
    visitorCount !== null ? visitorCount.toLocaleString() : "--";

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-stone-900">
      <RetroNavbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Modern Minimalist Hero */}
        <section className="text-center space-y-5 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff5f2] border border-[#ffd5cc] text-[#fa624d] text-xs font-semibold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fa624d] animate-subtle-pulse" />
            <span>{t.home.welcomeBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 max-w-3xl mx-auto leading-tight">
            <span>{t.home.heroTitle}</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {t.home.tagline} — <span className="text-stone-500 font-normal">{t.home.subTagline}</span>
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`${prefix}/dashboard`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl bg-[#fa624d] hover:bg-[#e84630] text-white font-semibold text-sm shadow-md shadow-[#fa624d]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{t.home.ctaEnter}</span>
            </Link>
            <Link
              href={`${prefix}/kana`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-semibold text-sm border border-stone-200/80 shadow-xs transition-colors"
            >
              <Grid className="w-4 h-4 text-[#fa624d]" />
              <span>{t.nav.kana}</span>
            </Link>
          </div>

          {/* Minimalist Counter / Live Metric */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-stone-100/70 text-[11px] text-stone-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{t.home.counterLabel}:</span>
            <span className="font-semibold text-stone-900">{formattedCount} learners</span>
          </div>
        </section>

        {/* 3 Core Rules / Value Pillars */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs space-y-2 hover:border-[#ffd5cc] transition-colors">
            <div className="w-7 h-7 rounded-lg bg-[#fff5f2] text-[#fa624d] flex items-center justify-center text-xs font-bold">
              01
            </div>
            <h3 className="font-bold text-stone-900 text-sm">{t.home.rule1Title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t.home.rule1Desc}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs space-y-2 hover:border-[#ffd5cc] transition-colors">
            <div className="w-7 h-7 rounded-lg bg-[#fff5f2] text-[#fa624d] flex items-center justify-center text-xs font-bold">
              02
            </div>
            <h3 className="font-bold text-stone-900 text-sm">{t.home.rule2Title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t.home.rule2Desc}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs space-y-2 hover:border-[#ffd5cc] transition-colors">
            <div className="w-7 h-7 rounded-lg bg-[#fff5f2] text-[#fa624d] flex items-center justify-center text-xs font-bold">
              03
            </div>
            <h3 className="font-bold text-stone-900 text-sm">{t.home.rule3Title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t.home.rule3Desc}</p>
          </div>
        </section>

        {/* Exploratory Pathways Grid */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-stone-900">{t.home.directoriesTitle}</h2>
            <span className="text-xs text-stone-500">{t.home.exploreTag}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Kana Directory */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#fff5f2] text-[#fa624d] flex items-center justify-center font-bold text-sm">
                    あ
                  </span>
                  <h3 className="font-semibold text-stone-900 text-sm">{t.home.kanaTitle}</h3>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{t.home.kanaDesc}</p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-stone-100 text-xs">
                <Link
                  href={`${prefix}/kana`}
                  className="flex items-center justify-between font-semibold text-[#fa624d] hover:text-[#e84630] py-1"
                >
                  <span>{t.home.kanaFullLink}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`${prefix}/kana/hiragana/category/gojuon`}
                  className="block text-stone-600 hover:text-stone-900 py-0.5"
                >
                  {t.home.hiraganaBasicLink}
                </Link>
                <Link
                  href={`${prefix}/kana/katakana/category/gojuon`}
                  className="block text-stone-600 hover:text-stone-900 py-0.5"
                >
                  {t.home.katakanaBasicLink}
                </Link>
              </div>
            </div>

            {/* Vocabulary Directory */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#fff5f2] text-[#fa624d] flex items-center justify-center font-bold text-sm">
                    語
                  </span>
                  <h3 className="font-semibold text-stone-900 text-sm">{t.home.vocabTitle}</h3>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{t.home.vocabDesc}</p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-stone-100 text-xs">
                <Link
                  href={`${prefix}/words`}
                  className="flex items-center justify-between font-semibold text-[#fa624d] hover:text-[#e84630] py-1"
                >
                  <span>{t.home.vocabFullLink}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`${prefix}/words/category/anime`}
                  className="block text-stone-600 hover:text-stone-900 py-0.5"
                >
                  {t.home.animeVocabLink}
                </Link>
                <Link
                  href={`${prefix}/words/category/n5`}
                  className="block text-stone-600 hover:text-stone-900 py-0.5"
                >
                  {t.home.jlptN5Link}
                </Link>
              </div>
            </div>

            {/* Lookalike Pairs */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#fff5f2] text-[#fa624d] flex items-center justify-center font-bold text-sm">
                    対
                  </span>
                  <h3 className="font-semibold text-stone-900 text-sm">{t.home.lookalikeTitle}</h3>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{t.home.lookalikeDesc}</p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-stone-100 text-xs">
                <Link
                  href={`${prefix}/compare`}
                  className="flex items-center justify-between font-semibold text-[#fa624d] hover:text-[#e84630] py-1"
                >
                  <span>{t.home.lookalikeFullLink}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`${prefix}/compare/shi-vs-tsu`}
                  className="block text-stone-600 hover:text-stone-900 py-0.5"
                >
                  {t.home.shiVsTsuLink}
                </Link>
                <Link
                  href={`${prefix}/compare/so-vs-n`}
                  className="block text-stone-600 hover:text-stone-900 py-0.5"
                >
                  {t.home.soVsNLink}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Minimal FAQ Accordion */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-stone-900">{t.home.faqTitle}</h2>
            <span className="text-xs text-stone-500">{t.home.faqTag}</span>
          </div>

          <div className="space-y-2.5">
            {[
              { q: t.home.faq1Q, a: t.home.faq1A },
              { q: t.home.faq2Q, a: t.home.faq2A },
              { q: t.home.faq3Q, a: t.home.faq3A },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group p-4 rounded-xl bg-white border border-stone-200/70 shadow-xs open:bg-[#fffdfc] transition-all"
              >
                <summary className="font-semibold text-stone-800 text-xs sm:text-sm cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-[#fa624d] text-base group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-2.5 text-xs text-stone-500 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <ModernFooter />
      <BottomNav />
    </div>
  );
}

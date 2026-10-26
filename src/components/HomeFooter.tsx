"use client";

import Link from "next/link";
import { FishIcon } from "@/components/FishIcon";
import { useLanguage } from "@/context/LanguageContext";
import {
  Wrench,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  Star,
  ExternalLink,
  Code2,
} from "lucide-react";

export function HomeFooter() {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const GITHUB_REPO_URL = "https://github.com/kurzagin/japanese-learning";

  const navGroups = [
    {
      title: t.home.footerNavToolsTitle,
      icon: Wrench,
      links: [
        { href: `${prefix}/compare`, label: t.home.footerLinkCompare, external: false },
        { href: `${prefix}/tools/romaji-to-kana`, label: t.home.footerLinkConverter, external: false },
        { href: `${prefix}/tools/hiragana-chart-pdf`, label: t.home.footerLinkHiraganaPdf, external: false },
        { href: `${prefix}/tools/katakana-chart-pdf`, label: t.home.footerLinkKatakanaPdf, external: false },
      ],
    },
    {
      title: t.home.footerNavDocsTitle,
      icon: BookOpen,
      links: [
        { href: `${prefix}/docs`, label: t.home.footerLinkDocs, external: false },
        { href: `${prefix}/docs/srs-methodology`, label: t.home.footerLinkSrs, external: false },
        { href: `${prefix}/docs/audio-phonetics`, label: t.home.footerLinkAudio, external: false },
        { href: `${prefix}/docs/arcade-engine`, label: t.home.footerLinkArcade, external: false },
        { href: `${prefix}/docs/api`, label: t.home.footerLinkApi, external: false },
      ],
    },
    {
      title: t.home.footerNavCurriculumTitle,
      icon: GraduationCap,
      links: [
        { href: `${prefix}/kana/hiragana/category/gojuon`, label: t.home.footerLinkHiraganaBasic, external: false },
        { href: `${prefix}/kana/katakana/category/gojuon`, label: t.home.footerLinkKatakanaBasic, external: false },
        { href: `${prefix}/words/category/n5`, label: t.home.footerLinkJlptN5, external: false },
        { href: `${prefix}/words/category/anime`, label: t.home.footerLinkAnimeVocab, external: false },
      ],
    },
    {
      title: t.home.footerNavAboutTitle,
      icon: ShieldCheck,
      links: [
        { href: `${prefix}/about`, label: t.home.footerLinkAbout, external: false },
        { href: `${prefix}/login`, label: t.home.footerLinkLogin, external: false },
        { href: `${prefix}/privacy`, label: t.home.footerLinkPrivacy, external: false },
        { href: `${prefix}/tos`, label: t.home.footerLinkTos, external: false },
        { href: GITHUB_REPO_URL, label: t.home.footerLinkGithub, external: true },
      ],
    },
  ];

  return (
    <footer
      aria-label="Site Footer"
      className="border-t-2 border-t-white border-b-2 border-b-[#404040] bg-[#d4d0c8] text-black mt-6 shrink-0 shadow-xs"
    >
      {/* Upper Content: Brand, Short Description, and SEO Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Brand Identity & Comprehensive Short Description */}
        <section
          aria-labelledby="footer-brand-title"
          className="border border-[#808080] bg-white p-4 sm:p-5 shadow-inner"
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2.5">
                <div className="bg-[#000080] p-1.5 border border-[#000040] shadow-xs shrink-0">
                  <FishIcon className="w-5 h-5 text-[#ffff00]" />
                </div>
                <div>
                  <h2
                    id="footer-brand-title"
                    className="text-base sm:text-lg font-black text-[#000080] tracking-wide"
                  >
                    {t.home.footerBrand}
                  </h2>
                  <p className="text-[10px] font-bold text-[#800000] font-mono tracking-wider uppercase">
                    [ {t.home.footerBadge} ]
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#333] leading-relaxed pt-1 font-sans">
                {t.home.footerDescription}
              </p>
            </div>

            {/* Feature badges for high SEO authority & Trust Signals */}
            <div className="flex flex-wrap lg:flex-col gap-1.5 shrink-0 text-[10px] font-mono self-start">
              <span className="bg-[#ece9d8] border border-[#a09e90] px-2 py-0.5 text-[#000080] font-bold">
                ✓ SM-2 Spaced Repetition
              </span>
              <span className="bg-[#ece9d8] border border-[#a09e90] px-2 py-0.5 text-[#000080] font-bold">
                ✓ Native Japanese TTS Audio
              </span>
              <span className="bg-[#ece9d8] border border-[#a09e90] px-2 py-0.5 text-[#000080] font-bold">
                ✓ 100% Free & Open Access
              </span>
              <span className="bg-[#ece9d8] border border-[#a09e90] px-2 py-0.5 text-[#000080] font-bold">
                ✓ JLPT N5 Vocabulary
              </span>
            </div>
          </div>
        </section>

        {/* GitHub Open Source & Star Call-To-Action Banner */}
        <section
          aria-label="GitHub Open Source Project"
          className="border-2 border-[#000080] bg-[#eef3f8] p-3.5 sm:p-4 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-[#000080]">
                <Code2 className="w-4 h-4 text-[#000080] shrink-0" />
                <span>{t.home.footerStarCtaTitle}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#444] max-w-2xl leading-relaxed">
                {t.home.footerStarCtaDesc}
              </p>
            </div>

            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star SaKana on GitHub (opens in new tab)"
              className="shrink-0 px-4 py-2 bg-[#ffff00] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#ffea4d] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-xs font-black text-[#000080] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 fill-[#ff9900] text-[#cc7a00]" />
              <span>{t.home.footerStarCtaBtn}</span>
              <ExternalLink className="w-3 h-3 text-[#000080]/70" />
            </a>
          </div>
        </section>

        {/* Important Navigation Columns (Excluding Bottom Bar items: Home, Dashboard, Kana, Words, Arcade) */}
        <nav
          aria-label="Footer Navigation"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs"
        >
          {navGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className="border border-[#808080] bg-[#ece9d8] flex flex-col shadow-xs"
              >
                {/* Header Window Title Bar */}
                <div className="bg-[#000080] text-white px-2.5 py-1 text-xs font-bold flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-[#ffff00]" />
                    <span>{group.title}</span>
                  </div>
                  <span className="text-[10px] text-[#e0e0ff] font-mono">
                    SAKANA
                  </span>
                </div>

                {/* Link list */}
                <ul className="divide-y divide-[#d0cebf] bg-white flex-1 text-xs">
                  {group.links.map((link) => {
                    if (link.external) {
                      return (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between px-2.5 py-2 text-[#000080] hover:bg-[#000080] hover:text-[#ffff00] transition-colors font-medium"
                          >
                            <span className="truncate pr-1">{link.label}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#808080] group-hover:text-[#ffff00] shrink-0" />
                          </a>
                        </li>
                      );
                    }
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group flex items-center justify-between px-2.5 py-2 text-[#000080] hover:bg-[#000080] hover:text-[#ffff00] transition-colors font-medium"
                        >
                          <span className="truncate pr-1">{link.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#808080] group-hover:text-[#ffff00] shrink-0" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Docked Status & Copyright Bar */}
      <div className="border-t border-[#808080] bg-[#c0bca8] px-3 sm:px-6 py-2.5 text-[11px] text-[#333] flex flex-wrap items-center justify-between gap-2 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00aa00] animate-pulse"></span>
          <span className="font-bold">{t.home.footerStatus}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="hidden sm:inline">{t.home.footerTagline}</span>
          <span className="border-l border-[#808080] pl-2">
            {t.home.footerEncoding}
          </span>
        </div>
      </div>
    </footer>
  );
}

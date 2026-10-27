"use client";

import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { HomeFooter } from "@/components/HomeFooter";
import { useLanguage } from "@/context/LanguageContext";
import { tosTranslations } from "@/data/legal/tos";
import {
  Scale,
  Code,
  ExternalLink,
} from "lucide-react";

export default function TosClient() {
  const { locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const GITHUB_REPO_URL = "https://github.com/kurzagin/japanese-learning";
  const t = tosTranslations[locale] || tosTranslations.en;

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle={t.windowSubtitle} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Window Container */}
        <div className="border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#d4d0c8] p-1 shadow-md">
          <div className="bg-[#000080] text-white px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#ffff00]" />
              <span className="font-bold text-xs sm:text-sm tracking-wide">
                {t.notepadTitle}
              </span>
            </div>
            <span className="text-[10px] text-[#e0e0ff] font-mono">
              {t.notepadTag}
            </span>
          </div>

          <div className="bg-white p-4 sm:p-6 space-y-6 border border-[#808080] text-xs sm:text-sm text-[#222]">
            {/* Top Overview Banner */}
            <div className="border-b border-[#808080] pb-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#000080]">
                  {t.bannerTitle}
                </h1>
                <span className="bg-[#ffff00] border border-[#808080] text-[#800000] font-mono text-[10px] font-bold px-2 py-0.5">
                  {t.bannerEffective}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                {t.bannerLead.welcome}
                <strong>{t.bannerLead.brand}</strong>
                {t.bannerLead.availableAt}
                {t.bannerLead.termsAgreement}
              </p>
            </div>

            {/* Section 1: Acceptance of Terms */}
            <div className="space-y-2">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>{t.section1Title}</span>
              </div>
              <p className="text-xs text-[#444] leading-relaxed">
                {t.section1Desc}
              </p>
            </div>

            {/* Section 2: Educational Mission & Free Access */}
            <div className="space-y-2">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>{t.section2Title}</span>
              </div>
              <p className="text-xs text-[#444] leading-relaxed">
                {t.section2Desc.part1}
                <strong>{t.section2Desc.freeHighlight}</strong>
              </p>
            </div>

            {/* Section 3: Guest Usage & Authenticated Accounts */}
            <div className="space-y-3">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>{t.section3Title}</span>
              </div>

              <div className="space-y-2 text-xs text-[#444] leading-relaxed">
                <p>
                  <strong>{t.section3Items.guestTitle}</strong>
                  {t.section3Items.guestDesc}
                </p>
                <p>
                  <strong>{t.section3Items.registeredTitle}</strong>
                  {t.section3Items.registeredDesc}
                </p>
                <p>
                  <strong>{t.section3Items.migrationTitle}</strong>
                  {t.section3Items.migrationDesc}
                </p>
              </div>
            </div>

            {/* Section 4: Acceptable Use Policy */}
            <div className="space-y-2">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>{t.section4Title}</span>
              </div>
              <div className="space-y-2 text-xs text-[#444] leading-relaxed">
                <p>{t.section4Lead}</p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-[11px] font-mono text-[#333]">
                  {t.section4List.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 5: Open Source & Intellectual Property */}
            <div className="space-y-3">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>{t.section5Title}</span>
              </div>
              <div className="border border-[#808080] bg-[#faf8f0] p-3 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#000080]">
                  <Code className="w-4 h-4 text-[#000080]" />
                  <span>{t.section5Badge}</span>
                </div>
                <p className="text-[11px] text-[#444] leading-relaxed">
                  {t.section5Desc1.part1}
                  <strong>{t.section5Desc1.licenseHighlight}</strong>
                  {t.section5Desc1.part2}
                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#000080] font-bold underline inline-flex items-center gap-0.5"
                  >
                    <span>{t.section5Desc1.repoLinkText}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {t.section5Desc1.part3}
                </p>
                <p className="text-[11px] text-[#555] leading-relaxed">
                  {t.section5Desc2}
                </p>
              </div>
            </div>

            {/* Section 6: Third-Party Services & Links */}
            <div className="space-y-2">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>{t.section6Title}</span>
              </div>
              <p className="text-xs text-[#444] leading-relaxed">
                {t.section6Desc}
              </p>
            </div>

            {/* Section 7: Disclaimers & Limitation of Liability */}
            <div className="space-y-2">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>{t.section7Title}</span>
              </div>
              <div className="p-3 bg-[#f5f5f5] border border-[#d0d0d0] text-[11px] font-mono text-[#555] leading-relaxed">
                {t.section7Disclaimer}
              </div>
            </div>

            {/* Section 8: Changes & Updates */}
            <div className="space-y-2">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>{t.section8Title}</span>
              </div>
              <p className="text-xs text-[#444] leading-relaxed">
                {t.section8Desc}
              </p>
            </div>

            {/* Quick Links Footer Bar */}
            <div className="pt-4 border-t border-[#808080] flex flex-wrap items-center justify-between gap-3 text-xs">
              <Link
                href={`${prefix}/privacy`}
                className="text-[#000080] font-bold hover:underline flex items-center gap-1"
              >
                {t.footerPrivacyLink}
              </Link>
              <Link
                href={`${prefix}/`}
                className="px-3 py-1 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#e4e0d8] font-bold text-black"
              >
                {t.footerHomeBtn}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}

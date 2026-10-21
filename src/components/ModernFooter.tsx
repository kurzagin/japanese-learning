"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

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
          <span>© 2026 SaKana</span>
        </div>
      </div>
    </footer>
  );
}

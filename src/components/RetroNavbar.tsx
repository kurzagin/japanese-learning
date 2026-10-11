"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FishIcon } from "@/components/FishIcon";
import { useLanguage, LanguageSelector } from "@/context/LanguageContext";

interface RetroNavbarProps {
  currentSubtitle?: string;
}

export function RetroNavbar({ currentSubtitle }: RetroNavbarProps) {
  const { t } = useLanguage();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/dashboard", label: t.nav.dashboard },
    { href: "/study/hiragana-vowels", label: t.nav.study },
  ];

  return (
    <div>
      {/* Title Bar with Fish Icon & SaKana Branding (Clean, no fake -, X, []) */}
      <div className="bg-[#000080] text-white px-2.5 py-1.5 flex items-center justify-between select-none">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <FishIcon className="w-4 h-4 text-[#ffff00]" />
          <span className="font-bold text-xs tracking-wider">
            {t.nav.brand}
            {currentSubtitle ? ` - ${currentSubtitle}` : ""}
          </span>
        </Link>
        <div className="text-[10px] text-[#e0e0ff] hidden sm:block font-mono">
          魚 SAKANA
        </div>
      </div>

      {/* Real Retro Navigation Bar */}
      <div className="border-b border-[#808080] bg-[#ece9d8] px-2 py-1.5 sm:py-1 text-[11px] flex items-center justify-between gap-1.5 sm:gap-2 text-black">
        <nav className="flex items-center gap-1 sm:gap-2 shrink-0" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1 sm:py-0.5 border text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-[#000080] text-white border-t-[#000040] border-l-[#000040] border-b-white border-r-white"
                    : "bg-[#d4d0c8] text-black border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#e4e0d8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="shrink-0">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}

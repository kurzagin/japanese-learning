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
    { href: "/kana", label: t.nav.kana },
    { href: "/dashboard", label: t.nav.dashboard },
    { href: "/about", label: t.nav.about },
    { href: "/docs", label: t.nav.docs },
  ];

  return (
    <header className="w-full shrink-0 sticky top-0 z-50 shadow-xs border-b border-[#808080]">
      {/* Title Bar with Fish Icon & SaKana Branding */}
      <div className="bg-[#000080] text-white px-3 sm:px-6 py-2 flex items-center justify-between select-none">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <FishIcon className="w-4 h-4 text-[#ffff00]" />
          <span className="font-bold text-xs sm:text-sm tracking-wider">
            {t.nav.brand}
            {currentSubtitle ? ` - ${currentSubtitle}` : ""}
          </span>
        </Link>
        <div className="text-[11px] text-[#e0e0ff] hidden sm:flex items-center gap-3 font-mono">
          <span>魚 SAKANA // RETRO SPEED DRILL</span>
          <span className="text-[#00ff66]">● ONLINE</span>
        </div>
      </div>

      {/* Real Retro Navigation Bar */}
      <div className="bg-[#ece9d8] px-3 sm:px-6 py-1.5 text-[11px] sm:text-xs flex items-center justify-between gap-2 text-black">
        <nav className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto scrollbar-none" aria-label="Main Navigation">
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
    </header>
  );
}

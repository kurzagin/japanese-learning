"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FishIcon } from "@/components/FishIcon";
import { useLanguage, LanguageSelector } from "@/context/LanguageContext";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  Grid,
  Gamepad2,
  GitCompare,
  ArrowLeftRight,
  Info,
  BookOpen,
  FileDown,
} from "lucide-react";

interface RetroNavbarProps {
  currentSubtitle?: string;
}

export function RetroNavbar({ currentSubtitle }: RetroNavbarProps) {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getLocalizedHref = (path: string) => {
    if (locale === "en") return path;
    return path === "/" ? `/${locale}` : `/${locale}${path}`;
  };

  const navLinks = [
    { href: getLocalizedHref("/"), rawPath: "/", label: t.nav.home, icon: Home },
    { href: getLocalizedHref("/dashboard"), rawPath: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: getLocalizedHref("/kana"), rawPath: "/kana", label: t.nav.kana, icon: Grid },
    { href: getLocalizedHref("/words"), rawPath: "/words", label: t.nav.words, icon: BookOpen },
    { href: getLocalizedHref("/minigame"), rawPath: "/minigame", label: t.nav.arcade, icon: Gamepad2 },
    { href: getLocalizedHref("/compare"), rawPath: "/compare", label: t.nav.compare, icon: GitCompare },
    { href: getLocalizedHref("/tools/romaji-to-kana"), rawPath: "/tools/romaji-to-kana", label: t.nav.converter, icon: ArrowLeftRight },
    { href: getLocalizedHref("/tools/hiragana-chart-pdf"), rawPath: "/tools/hiragana-chart-pdf", label: t.nav.pdfCharts, icon: FileDown },
    { href: getLocalizedHref("/about"), rawPath: "/about", label: t.nav.about, icon: Info },
    { href: getLocalizedHref("/docs"), rawPath: "/docs", label: t.nav.docs, icon: BookOpen },
  ];

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close when clicking outside menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Lock body scroll optionally or keep accessible
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="w-full shrink-0 sticky top-0 z-50 border-b border-[#808080] shadow-xs select-none">
      {/* OS Title Bar */}
      <div className="bg-[#000080] text-white px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-2">
        <Link
          href={getLocalizedHref("/")}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity min-w-0"
        >
          <FishIcon className="w-4 h-4 text-[#ffff00] shrink-0" />
          <span className="font-bold text-xs sm:text-sm tracking-wider truncate">
            {t.nav.brand}
            {currentSubtitle ? ` - ${currentSubtitle}` : ""}
          </span>
        </Link>

        {/* Right side status & controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-[11px] text-[#e0e0ff] hidden md:flex items-center gap-3 font-mono">
            <span>魚 SAKANA // JAPANESE SPEED DRILL</span>
            <span className="text-[#00ff66]">● ONLINE</span>
          </div>

          {/* Mobile-only quick Language & Menu toggles */}
          <div className="flex sm:hidden items-center gap-1.5">
            <LanguageSelector />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
              aria-expanded={mobileMenuOpen}
              className={`flex items-center gap-1 px-2 py-1 text-[11px] font-bold border transition-colors ${
                mobileMenuOpen
                  ? "bg-[#000080] text-white border-t-[#000040] border-l-[#000040] border-b-white border-r-white"
                  : "bg-[#d4d0c8] text-black border-t-white border-l-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white"
              }`}
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-3.5 h-3.5 text-white" />
                  <span>{t.nav.close}</span>
                </>
              ) : (
                <>
                  <Menu className="w-3.5 h-3.5 text-black" />
                  <span>{t.nav.menu}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Bar (≥ sm) */}
      <div className="hidden sm:flex bg-[#ece9d8] px-4 sm:px-6 py-1.5 text-xs items-center justify-between gap-2 text-black border-t border-white">
        <nav
          className="flex items-center gap-1.5 lg:gap-2 flex-wrap"
          aria-label={t.nav.mainNavigation}
        >
          {navLinks.map((item) => {
            const isActive =
              item.rawPath === "/"
                ? pathname === item.href
                : pathname === item.href || (pathname?.startsWith(item.href + "/") ?? false);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-2.5 py-1 border text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-[#000080] text-white border-t-[#000040] border-l-[#000040] border-b-white border-r-white"
                    : "bg-[#d4d0c8] text-black border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#e4e0d8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#ffff00]" : "text-[#404040]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="shrink-0">
          <LanguageSelector />
        </div>
      </div>

      {/* Mobile Window Popup Menu (< sm) */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="sm:hidden absolute top-full left-0 right-0 bg-[#d4d0c8] border-b-2 border-r-2 border-[#404040] border-l border-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50"
        >
          {/* Menu Title Header */}
          <div className="bg-[#808080] text-white text-[11px] font-bold px-3 py-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FishIcon className="w-3.5 h-3.5 text-[#ffff00]" />
              <span>{t.nav.mainNavigation}</span>
            </span>
            <span className="text-[10px] text-[#e0e0e0] font-mono">SAKANA OS</span>
          </div>

          {/* Menu Items List with Accessible Touch Targets */}
          <div className="p-2 space-y-1">
            {navLinks.map((item) => {
              const isActive =
                item.rawPath === "/"
                  ? pathname === item.href
                  : pathname === item.href || (pathname?.startsWith(item.href + "/") ?? false);

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-xs font-semibold border transition-colors ${
                    isActive
                      ? "bg-[#000080] text-white border-t-[#000040] border-l-[#000040] border-b-white border-r-white"
                      : "bg-[#ece9d8] text-black border-t-white border-l-white border-b-[#808080] border-r-[#808080] hover:bg-[#ffffff] active:bg-[#c0c0c0]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-[#ffff00]" : "text-[#000080]"
                    }`}
                  />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <span className="text-[10px] font-mono text-[#ffff00]">
                      ●
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

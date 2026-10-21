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
  Settings,
} from "lucide-react";
import { PreferencesModal } from "@/components/PreferencesModal";

interface RetroNavbarProps {
  currentSubtitle?: string;
}

export function RetroNavbar({ currentSubtitle }: RetroNavbarProps) {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="w-full shrink-0 sticky top-0 z-50 bg-[#fdfbf7]/80 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={getLocalizedHref("/")}
              className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#fa624d] to-[#ff8572] flex items-center justify-center text-white shadow-sm shadow-[#fa624d]/20 transition-transform group-hover:scale-105">
                <FishIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-baseline gap-1.5 truncate">
                <span className="font-extrabold text-base tracking-tight text-stone-900">
                  SaKana
                </span>
                <span className="text-xs font-semibold text-[#fa624d]">魚</span>
                {currentSubtitle && (
                  <span className="text-xs text-stone-400 font-medium truncate hidden md:inline">
                    / {currentSubtitle}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label={t.nav.mainNavigation}
          >
            {navLinks.slice(0, 7).map((item) => {
              const isActive =
                item.rawPath === "/"
                  ? pathname === item.href
                  : pathname === item.href || (pathname?.startsWith(item.href + "/") ?? false);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? "bg-[#fff5f2] text-[#fa624d] font-semibold"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSelector />

            <button
              type="button"
              onClick={() => setPreferencesOpen(true)}
              aria-label={t.nav.preferences}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100/80 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden border-t border-stone-200 bg-[#fdfbf7] px-4 py-3 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <div className="grid grid-cols-2 gap-1.5 py-1">
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
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-[#fff5f2] text-[#fa624d] font-semibold"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#fa624d]" : "text-stone-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
      />
    </header>
  );
}

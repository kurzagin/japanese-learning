"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Home, LayoutDashboard, Grid, Gamepad2, BookOpen } from "lucide-react";

export function BottomNav() {
  const { t, locale } = useLanguage();
  const pathname = usePathname();

  const getLocalizedHref = (path: string) => {
    if (locale === "en") return path;
    return path === "/" ? `/${locale}` : `/${locale}${path}`;
  };

  const navItems = [
    { href: getLocalizedHref("/"), rawPath: "/", label: t.nav.home, icon: Home },
    { href: getLocalizedHref("/dashboard"), rawPath: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: getLocalizedHref("/kana"), rawPath: "/kana", label: t.nav.kana, icon: Grid },
    { href: getLocalizedHref("/words"), rawPath: "/words", label: t.nav.words, icon: BookOpen },
    { href: getLocalizedHref("/minigame"), rawPath: "/minigame", label: t.nav.arcade, icon: Gamepad2 },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            item.rawPath === "/"
              ? pathname === item.href
              : pathname === item.href || (pathname?.startsWith(item.href + "/") ?? false);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? "text-[#fa624d] font-semibold"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? "bg-[#fff5f2] scale-110" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

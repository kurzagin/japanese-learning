"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, TranslationSchema, translations } from "@/data/i18n";
import { LOCALES, DEFAULT_LOCALE, isValidLocale } from "@/lib/seo/locale";

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: translations.en,
});

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Detect locale from current route segment first, then initialLocale, then fallback
  const detectLocaleFromPath = (path: string | null): Locale => {
    if (!path) return initialLocale || DEFAULT_LOCALE;
    const segments = path.split("/").filter(Boolean);
    const firstSegment = segments[0];
    if (firstSegment && isValidLocale(firstSegment)) {
      return firstSegment;
    }
    return initialLocale || DEFAULT_LOCALE;
  };

  const [locale, setLocaleState] = useState<Locale>(() => detectLocaleFromPath(pathname));

  // Sync state whenever pathname changes
  useEffect(() => {
    const detected = detectLocaleFromPath(pathname);
    setLocaleState(detected);
  }, [pathname]);

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    setLocaleState(newLocale);
    try {
      localStorage.setItem("sakana_locale", newLocale);
    } catch {}

    // Calculate target route with new locale prefix
    if (!pathname) return;
    const segments = pathname.split("/").filter(Boolean);
    const hasLocalePrefix = segments.length > 0 && isValidLocale(segments[0]);
    const pureSegments = hasLocalePrefix ? segments.slice(1) : segments;
    const purePath = pureSegments.length > 0 ? `/${pureSegments.join("/")}` : "/";

    let targetUrl: string;
    if (newLocale === DEFAULT_LOCALE) {
      targetUrl = purePath;
    } else {
      targetUrl = purePath === "/" ? `/${newLocale}` : `/${newLocale}${purePath}`;
    }

    router.push(targetUrl);
  };

  const t = translations[locale] || translations.en;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageSelector() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-[11px] font-mono">
      <Globe className="w-3.5 h-3.5 text-[#fa624d] shrink-0" />
      <div className="relative inline-block">
        <select
          value={locale}
          aria-label={t.nav.selectLanguage}
          onChange={(e) => setLocale(e.target.value as Locale)}
          className="appearance-none bg-stone-100 text-black text-[11px] sm:text-xs font-bold py-1 sm:py-0.5 pl-1.5 pr-4 sm:pr-5 border-t border-l border-white border-b-[#404040] border-r-[#404040] outline-none cursor-pointer hover:bg-[#e4e0d8] focus:bg-white"
        >
          {LOCALES.map((loc) => (
            <option key={loc} value={loc}>
              {loc.toUpperCase()}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-[7px] sm:text-[8px] text-black font-bold">
          ▼
        </div>
      </div>
    </div>
  );
}

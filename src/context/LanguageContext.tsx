"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { Locale, TranslationSchema, translations } from "@/data/i18n";

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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("sakana_locale") as Locale | null;
    if (saved && (saved === "en" || saved === "id" || saved === "ja")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (loc: Locale) => {
    setLocaleState(loc);
    localStorage.setItem("sakana_locale", loc);
  };

  const t = translations[locale];

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
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-[11px] font-mono select-none">
      <Globe className="w-3.5 h-3.5 text-[#000080] shrink-0" />
      <div className="relative inline-block">
        <select
          value={locale}
          aria-label="Select language"
          onChange={(e) => setLocale(e.target.value as Locale)}
          className="appearance-none bg-[#d4d0c8] text-black text-[11px] sm:text-xs font-bold py-1 sm:py-0.5 pl-1.5 pr-4 sm:pr-5 border-t border-l border-white border-b-[#404040] border-r-[#404040] outline-none cursor-pointer hover:bg-[#e4e0d8] focus:bg-white"
        >
          <option value="en">EN</option>
          <option value="id">ID</option>
          <option value="ja">JA</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-[7px] sm:text-[8px] text-black font-bold">
          ▼
        </div>
      </div>
    </div>
  );
}

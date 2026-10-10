"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
    <div className="flex items-center gap-1 text-[10px] font-mono select-none">
      <span className="text-[#555] hidden sm:inline">LANG:</span>
      {(["en", "id", "ja"] as Locale[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLocale(lang)}
          className={`px-1.5 py-0.5 border uppercase ${
            locale === lang
              ? "bg-[#000080] text-white border-[#000080] font-bold"
              : "bg-[#d4d0c8] text-black border-white border-b-[#404040] border-r-[#404040] hover:bg-[#c0bca8]"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

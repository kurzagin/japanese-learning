"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { PronounceButton } from "@/components/PronounceButton";
import { romajiToHiragana, romajiToKatakana } from "@/lib/converter";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Volume2,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export default function RomajiConverterClient() {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const [inputRomaji, setInputRomaji] = useState("konnichiwa, arigatou");
  const [smartParticles, setSmartParticles] = useState(true);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const hiraganaResult = romajiToHiragana(inputRomaji, smartParticles);
  const katakanaResult = romajiToKatakana(inputRomaji, smartParticles);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const samplePresets = [
    { label: t.converter.presetGreetings, val: "konnichiwa, arigatou" },
    { label: t.converter.presetTopic, val: "watashi wa gakusei desu" },
    { label: t.converter.presetAnime, val: "ore wa kaizoku ou ni naru otoko da" },
    { label: t.converter.presetSmallTsu, val: "chotto matte kudasai" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle={t.converter.subtitle} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4">
        {/* Banner */}
        <div className="border-2 border-[#800000] bg-[#fff8e7] p-4 sm:p-6 text-center shadow-xs">
          <div className="text-[10px] text-[#800000] font-bold tracking-widest flex items-center justify-center gap-1.5 uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>{t.converter.badge}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#000080] tracking-wide">
            {t.converter.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#404040] font-medium mt-1 max-w-xl mx-auto">
            {t.converter.description}
          </p>
        </div>

        {/* Converter Tool Area */}
        <div className="border border-[#808080] bg-white p-4 sm:p-6 shadow-xs space-y-4">
          {/* Input Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="romaji-input"
                className="text-xs font-mono font-bold text-[#000080] uppercase"
              >
                {t.converter.inputLabel}
              </label>
              <button
                type="button"
                onClick={() => setInputRomaji("")}
                className="text-[11px] text-[#cc0000] font-mono hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> {t.converter.clearBtn}
              </button>
            </div>
            <textarea
              id="romaji-input"
              rows={3}
              value={inputRomaji}
              onChange={(e) => setInputRomaji(e.target.value)}
              placeholder={t.converter.placeholder}
              className="w-full bg-[#fafafa] text-sm p-3 border-t-2 border-l-2 border-[#404040] border-b border-r border-white font-mono outline-none focus:bg-white"
            />
            {/* Smart Particle Converter Toggle */}
            <div className="mt-2 flex items-center justify-between text-[11px] font-mono bg-[#f0f4f8] p-2 border border-[#d0d8e8]">
              <label className="flex items-center gap-2 cursor-pointer text-[#000080] font-semibold">
                <input
                  type="checkbox"
                  checked={smartParticles}
                  onChange={(e) => setSmartParticles(e.target.checked)}
                  className="cursor-pointer"
                />
                <span>{t.converter.smartParticleLabel}</span>
              </label>
              <span className="text-[#666] hidden sm:inline">{t.converter.grammarStandardBadge}</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <span className="text-[#666] text-[11px]">{t.converter.quickSamplesLabel}</span>
            {samplePresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setInputRomaji(preset.val)}
                className="px-2 py-0.5 bg-[#ece9d8] hover:bg-[#e0dcd0] border border-[#999] text-[11px] cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Output Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Hiragana Result Card */}
            <div className="border-2 border-[#000080] bg-[#f8faff] p-4 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-[#d0e0ff] pb-2 mb-3">
                  <span className="font-bold text-xs text-[#000080] font-mono">
                    {t.converter.hiraganaHeader}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {hiraganaResult && (
                      <PronounceButton text={hiraganaResult} size="sm" />
                    )}
                    <button
                      type="button"
                      onClick={() => handleCopy(hiraganaResult, "hira")}
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono border border-[#808080] bg-[#d4d0c8] hover:bg-[#e4e0d8] active:translate-y-0.5"
                    >
                      {copiedType === "hira" ? (
                        <>
                          <Check className="w-3 h-3 text-[#008000]" /> {t.converter.copied}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> {t.converter.copy}
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-xl sm:text-2xl font-black text-[#000080] font-sans min-h-[50px] break-words select-all">
                  {hiraganaResult || (
                    <span className="text-[#aaa] text-sm font-normal italic">
                      {t.converter.waitingInput}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#555] mt-3 pt-2 border-t border-[#e0e8ff]">
                {t.converter.hiraganaFooter}
              </div>
            </div>

            {/* Katakana Result Card */}
            <div className="border-2 border-[#800000] bg-[#fffaf8] p-4 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-[#ffd0d0] pb-2 mb-3">
                  <span className="font-bold text-xs text-[#800000] font-mono">
                    {t.converter.katakanaHeader}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {katakanaResult && (
                      <PronounceButton text={katakanaResult} size="sm" />
                    )}
                    <button
                      type="button"
                      onClick={() => handleCopy(katakanaResult, "kata")}
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono border border-[#808080] bg-[#d4d0c8] hover:bg-[#e4e0d8] active:translate-y-0.5"
                    >
                      {copiedType === "kata" ? (
                        <>
                          <Check className="w-3 h-3 text-[#008000]" /> {t.converter.copied}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> {t.converter.copy}
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-xl sm:text-2xl font-black text-[#800000] font-sans min-h-[50px] break-words select-all">
                  {katakanaResult || (
                    <span className="text-[#aaa] text-sm font-normal italic">
                      {t.converter.waitingInput}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#555] mt-3 pt-2 border-t border-[#ffe0e0]">
                {t.converter.katakanaFooter}
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content for SEO */}
        <div className="border border-[#808080] bg-white p-5 shadow-xs space-y-3 text-xs text-[#333]">
          <div className="flex items-center gap-2 border-b border-[#eee] pb-2 text-[#000080] font-bold uppercase">
            <BookOpen className="w-4 h-4" />
            <span>{t.converter.eduTitle}</span>
          </div>
          <p className="leading-relaxed">
            {t.converter.eduLead}
          </p>
          <ul className="list-disc pl-5 space-y-1 font-mono text-[11px]">
            <li>{t.converter.eduRule1}</li>
            <li>{t.converter.eduRule2}</li>
            <li>{t.converter.eduRule3}</li>
            <li>{t.converter.eduRule4}</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="border-2 border-[#000080] bg-[#e8f0fe] p-4 text-center space-y-2 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-[#000080]">
            {t.converter.ctaTitle}
          </h3>
          <p className="text-xs text-[#444] max-w-lg mx-auto">
            {t.converter.ctaDesc}
          </p>
          <div className="pt-1">
            <Link
              href={`${prefix}/dashboard`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#000080] text-white text-xs font-bold border-t-2 border-l-2 border-[#4040ff] border-b-2 border-r-2 border-[#000040] shadow-sm hover:bg-[#0000a0]"
            >
              <span>{t.converter.ctaBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

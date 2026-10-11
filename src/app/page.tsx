"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { useLanguage } from "@/context/LanguageContext";
import { Play } from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Atomically increment and get updated count from DB on page load / refresh
    fetch("/api/visitors", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && typeof data.count === "number") {
          setVisitorCount(data.count);
        }
      })
      .catch((err) => {
        console.error("Failed to update visitor counter:", err);
      });
  }, []);

  const formattedCount =
    visitorCount !== null
      ? String(visitorCount).padStart(6, "0")
      : "------";

  return (
    <div className="min-h-screen py-4 px-2 sm:px-6 flex flex-col items-center justify-between">
      {/* Outer Retro Container Box with Windows 98/2000 3D border */}
      <div className="w-full max-w-xl bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] shadow-md flex flex-col">
        
        {/* Real Retro Navbar & SaKana Branding */}
        <RetroNavbar />

        {/* Content Body */}
        <div className="p-3 sm:p-4 bg-white text-black space-y-4">
          
          {/* Header Banner */}
          <div className="border-2 border-[#800000] bg-[#fff8e7] p-3 text-center">
            <div className="text-[10px] text-[#800000] font-bold tracking-widest">
              ★★★ {t.home.welcomeBadge} ★★★
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#000080] mt-1 tracking-wider">
              魚 SAKANA 魚
            </h1>
            <p className="text-xs text-[#cc0000] font-bold mt-0.5">
              〜 {t.home.tagline} 〜
            </p>
            <p className="text-[11px] text-[#555] mt-1">
              [ {t.home.subTagline} ]
            </p>
          </div>

          {/* Real Visitor Counter Stored in DB */}
          <div className="border border-[#808080] bg-[#f0f0f0] px-2 py-1 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#000080]">{t.home.counterLabel}</span>
              <span className="bg-black text-[#00ff00] font-mono px-1.5 py-0.5 border border-[#808080] text-xs font-bold tracking-widest">
                {formattedCount}
              </span>
            </div>
            <div className="text-[10px] text-[#555] font-mono">
              ONLINE // SAKANA-NET
            </div>
          </div>

          {/* Quick Enter Action Banner */}
          <div className="border-2 border-dashed border-[#000080] bg-[#eef3f8] p-3 text-center space-y-2">
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-2 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-black flex items-center justify-center gap-1.5 shadow"
              >
                <Play className="w-3.5 h-3.5 fill-[#000080] text-[#000080]" />
                <span>{t.home.ctaEnter}</span>
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-4 py-2 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] text-xs font-bold text-[#333]"
              >
                {t.home.ctaLogin}
              </Link>
            </div>
          </div>

          {/* Guidelines / Method Table */}
          <div className="border border-[#808080]">
            <div className="bg-[#000080] text-white px-2 py-1 text-xs font-bold flex items-center justify-between">
              <span>◆ {t.home.ruleTitle}</span>
              <span className="text-[10px] text-[#ffff00]">{t.home.ruleTag}</span>
            </div>
            
            <div className="divide-y divide-[#d0d0d0] text-xs">
              <div className="p-2.5 flex items-start gap-2 bg-[#fafafa]">
                <span className="text-[#cc0000] font-bold">【1】</span>
                <div>
                  <strong className="text-[#000080]">{t.home.rule1Title}:</strong>
                  <p className="text-[11px] text-[#444] mt-0.5">
                    {t.home.rule1Desc}
                  </p>
                </div>
              </div>

              <div className="p-2.5 flex items-start gap-2 bg-white">
                <span className="text-[#cc0000] font-bold">【2】</span>
                <div>
                  <strong className="text-[#000080]">{t.home.rule2Title}:</strong>
                  <p className="text-[11px] text-[#444] mt-0.5">
                    {t.home.rule2Desc}
                  </p>
                </div>
              </div>

              <div className="p-2.5 flex items-start gap-2 bg-[#fafafa]">
                <span className="text-[#cc0000] font-bold">【3】</span>
                <div>
                  <strong className="text-[#000080]">{t.home.rule3Title}:</strong>
                  <p className="text-[11px] text-[#444] mt-0.5">
                    {t.home.rule3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Windows Status Bar */}
        <div className="border-t border-[#808080] bg-[#ece9d8] px-2 py-0.5 text-[10px] text-[#404040] flex items-center justify-between">
          <span>Ready.</span>
          <span className="border-l border-[#808080] pl-2 font-mono">UTF-8 // MULTILINGUAL</span>
        </div>

      </div>

      <footer className="mt-3 text-[10px] text-[#666] text-center font-mono">
        SAKANA PROJECT // JAPANESE READING SPEED DRILL
      </footer>
    </div>
  );
}

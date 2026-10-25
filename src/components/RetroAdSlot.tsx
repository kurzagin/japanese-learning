"use client";

import React, { useEffect } from "react";

interface RetroAdSlotProps {
  slotId?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  label?: string;
}

/**
 * Retro-styled Ad container matching Windows 95 / Web 1.0 aesthetic.
 * Blends naturally with retro borders, header tags, and bevels.
 */
export function RetroAdSlot({
  slotId,
  format = "auto",
  className = "",
  label = "SPONSORED / 広告",
}: RetroAdSlotProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Push ad if adsbygoogle is loaded
        const win = window as unknown as { adsbygoogle?: unknown[] };
        win.adsbygoogle = win.adsbygoogle || [];
        win.adsbygoogle.push({});
      }
    } catch {
      // Ignore ads push errors (common in development / adblock)
    }
  }, []);

  const client = "ca-pub-6604416528217447";

  return (
    <div
      className={`border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#d4d0c8] p-1 shadow-xs ${className}`}
    >
      {/* Vintage Window/Banner Label Header */}
      <div className="bg-[#808080] text-[#ffff00] px-2 py-0.5 text-[9px] font-bold font-mono tracking-wider flex items-center justify-between mb-1">
        <span>[ {label} ]</span>
        <span className="text-[8px] text-white/80">SAKANA WEB NETWORK</span>
      </div>

      {/* Ad Inset Content Box */}
      <div className="border border-[#808080] bg-[#f0f0f0] p-1 flex items-center justify-center min-h-[90px] overflow-hidden">
        {slotId ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={client}
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        ) : (
          /* Fallback placeholder when no specific slot ID is set (or during dev) */
          <div className="text-center py-2 px-3 text-[#555] font-mono text-[11px] space-y-1">
            <div className="font-bold text-[#000080]">★ SUPPORT SAKANA FREE JAPANESE ★</div>
            <div className="text-[10px] text-stone-600">
              Community supported • 100% Free Kana & Vocab training
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

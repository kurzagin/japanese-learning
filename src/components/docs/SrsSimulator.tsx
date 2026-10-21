"use client";

import React, { useState, useMemo } from "react";
import { calculateSrsReview, formatIntervalPreview, SrsRating } from "@/lib/srs";
import { Sparkles, RotateCcw, Clock, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function SrsSimulator() {
  const [currentInterval, setCurrentInterval] = useState<number>(0);
  const [easeFactor, setEaseFactor] = useState<number>(2.5);
  const [repetitionCount, setRepetitionCount] = useState<number>(0);
  const [lapses, setLapses] = useState<number>(0);
  const [history, setHistory] = useState<
    Array<{ rating: SrsRating; label: string; resultingDays: number; ef: number }>
  >([]);

  const handleSimulate = (rating: SrsRating) => {
    const record = {
      cardId: "demo-card",
      stageId: "demo-stage",
      repetitionCount,
      intervalDays: currentInterval,
      easeFactor,
      lapses,
      state: (currentInterval >= 21 ? "mastered" : "review") as "learning" | "review" | "mastered",
      nextReviewAt: new Date().toISOString(),
    };

    const result = calculateSrsReview(record, rating);

    const ratingLabels: Record<SrsRating, string> = {
      1: "Again (Failure)",
      2: "Hard",
      3: "Good",
      4: "Easy",
    };

    setHistory((prev) => [
      ...prev,
      {
        rating,
        label: ratingLabels[rating],
        resultingDays: result.intervalDays,
        ef: result.easeFactor,
      },
    ]);

    setCurrentInterval(result.intervalDays);
    setEaseFactor(result.easeFactor);
    setRepetitionCount(result.repetitionCount);
    setLapses(result.lapses);
  };

  const handleReset = () => {
    setCurrentInterval(0);
    setEaseFactor(2.5);
    setRepetitionCount(0);
    setLapses(0);
    setHistory([]);
  };

  const stateLabel = useMemo(() => {
    if (currentInterval >= 21) return { text: "MASTERED", color: "#006600", bg: "#eef8ee" };
    if (currentInterval > 0) return { text: "REVIEW", color: "#000080", bg: "#eef3f8" };
    return { text: "LEARNING (<10m)", color: "#800000", bg: "#fff0f0" };
  }, [currentInterval]);

  return (
    <div className="my-6 border-2 border-[#000080] bg-[#fdfdfb] p-4 sm:p-5 shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#fa624d] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#fa624d]" />
            <span>Interactive SM-2 Interval Simulator</span>
          </div>
          <p className="text-xs text-[#555] mt-0.5">
            Test how different ratings alter intervals, ease factor, and progression to 21-day Mastery.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="self-start sm:self-auto px-2 py-1 bg-stone-100 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] text-[11px] font-bold text-[#800000] flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Real-time State Board */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
        <div className="p-2 border border-stone-200 bg-white">
          <span className="block text-[10px] text-[#888] font-mono uppercase">Current Interval</span>
          <strong className="text-base font-bold text-[#fa624d]">
            {formatIntervalPreview(currentInterval)}
          </strong>
          <span className="block text-[9px] text-[#666]">
            ({currentInterval} full days)
          </span>
        </div>

        <div className="p-2 border border-stone-200 bg-white">
          <span className="block text-[10px] text-[#888] font-mono uppercase">Ease Factor (EF)</span>
          <strong className="text-base font-bold text-[#333]">
            {easeFactor.toFixed(2)}
          </strong>
          <span className="block text-[9px] text-[#666]">
            (Base: 2.50, Min: 1.30)
          </span>
        </div>

        <div className="p-2 border border-stone-200 bg-white">
          <span className="block text-[10px] text-[#888] font-mono uppercase">Repetitions / Lapses</span>
          <strong className="text-base font-bold text-[#333]">
            {repetitionCount} <span className="text-xs text-[#888]">reps</span> / <span className="text-[#fa624d]">{lapses}</span>
          </strong>
          <span className="block text-[9px] text-[#666]">
            (Lapses drop EF by 0.20)
          </span>
        </div>

        <div
          className="p-2 border border-stone-200 flex flex-col justify-center"
          style={{ backgroundColor: stateLabel.bg }}
        >
          <span className="block text-[10px] text-[#888] font-mono uppercase">Card Status</span>
          <strong className="text-sm font-black" style={{ color: stateLabel.color }}>
            {stateLabel.text}
          </strong>
          <span className="text-[9px] text-[#555]">
            {currentInterval >= 21 ? "✓ 100% Retained" : "Active spacing"}
          </span>
        </div>
      </div>

      {/* Simulator Rating Buttons */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-[#333] block">
          Choose a rating to simulate a review:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Rating 1: Again */}
          <button
            type="button"
            onClick={() => handleSimulate(1)}
            className="p-2 bg-stone-100 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-center cursor-pointer"
          >
            <span className="block text-[10px] text-[#800000] font-mono font-bold">&lt; 10m (Re-queue)</span>
            <span className="block text-xs font-black text-[#800000]">1. Again</span>
            <span className="block text-[9px] text-[#666]">Resets to 0d &amp; EF -0.2</span>
          </button>

          {/* Rating 2: Hard */}
          <button
            type="button"
            onClick={() => handleSimulate(2)}
            className="p-2 bg-stone-100 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-center cursor-pointer"
          >
            <span className="block text-[10px] text-[#b85d00] font-mono font-bold">× 1.2 Multiplier</span>
            <span className="block text-xs font-black text-[#b85d00]">2. Hard</span>
            <span className="block text-[9px] text-[#666]">Mild growth &amp; EF -0.15</span>
          </button>

          {/* Rating 3: Good */}
          <button
            type="button"
            onClick={() => handleSimulate(3)}
            className="p-2 bg-stone-100 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-center cursor-pointer"
          >
            <span className="block text-[10px] text-[#006600] font-mono font-bold">Standard SM-2</span>
            <span className="block text-xs font-black text-[#006600]">3. Good</span>
            <span className="block text-[9px] text-[#666]">1d → 3d → (d × EF)</span>
          </button>

          {/* Rating 4: Easy */}
          <button
            type="button"
            onClick={() => handleSimulate(4)}
            className="p-2 bg-stone-100 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-center cursor-pointer"
          >
            <span className="block text-[10px] text-[#fa624d] font-mono font-bold">Rapid Leap</span>
            <span className="block text-xs font-black text-[#fa624d]">4. Easy</span>
            <span className="block text-[9px] text-[#666]">4d → 6d → (d × EF × 1.3)</span>
          </button>
        </div>
      </div>

      {/* Review Trail History */}
      {history.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[#d0d0d0]">
          <span className="text-[10px] font-bold text-[#555] uppercase block mb-1.5 font-mono">
            Review Timeline Simulation Log:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <span className="px-1.5 py-0.5 bg-[#e0e0e0] border border-stone-200 text-[10px] text-[#333]">
              Day 0: Intro
            </span>
            {history.map((h, i) => (
              <React.Fragment key={i}>
                <ArrowRight className="w-3 h-3 text-[#888]" />
                <span
                  className={`px-1.5 py-0.5 border text-[10px] font-bold ${
                    h.rating === 1
                      ? "bg-[#fff0f0] border-[#cc0000] text-[#fa624d]"
                      : h.resultingDays >= 21
                      ? "bg-[#eef8ee] border-[#008000] text-[#008000]"
                      : "bg-[#eef3f8] border-[#000080] text-[#fa624d]"
                  }`}
                >
                  Step {i + 1}: {h.label} ➔ {formatIntervalPreview(h.resultingDays)}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

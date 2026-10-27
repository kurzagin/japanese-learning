"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { useLanguage } from "@/context/LanguageContext";
import { Stage } from "@/data/stages";
import { Lock, ArrowLeft, ArrowRight, ShieldAlert, BookOpen, Play, Check } from "lucide-react";

interface StageLockedViewProps {
  requiredStages?: Stage[];
  customMessage?: string;
  isArcade?: boolean;
  progress?: Record<string, { completed?: boolean }>;
}

export function StageLockedView({
  requiredStages = [],
  customMessage,
  isArcade = false,
  progress,
}: StageLockedViewProps) {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const [localProgress, setLocalProgress] = useState<Record<string, { completed?: boolean }>>(
    progress || {}
  );

  useEffect(() => {
    if (progress && Object.keys(progress).length > 0) {
      setLocalProgress(progress);
      return;
    }
    try {
      const saved = localStorage.getItem("sakana_progress");
      if (saved) {
        setLocalProgress(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, [progress]);

  const clearedCount = requiredStages.filter((s) => Boolean(localProgress[s.id]?.completed)).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle={t.lockedStage.title} />

      <main className="flex-1 w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-8 flex flex-col justify-center">
        {/* Retro Window Container */}
        <div className="border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#d4d0c8] shadow-md">
          {/* Window Header */}
          <div className="bg-[#800000] text-white px-2.5 sm:px-3 py-1.5 flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 tracking-wider font-mono">
              <ShieldAlert className="w-4 h-4 text-[#ffff00] animate-pulse shrink-0" />
              <span className="truncate">{t.lockedStage.badge}</span>
            </span>
            <span className="text-[10px] text-[#ffcccc] font-mono shrink-0 ml-2">
              {t.lockedStage.lockedCode}
            </span>
          </div>

          {/* Window Body */}
          <div className="p-3.5 sm:p-6 bg-white border border-[#808080] m-1.5 sm:m-2 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 sm:p-3 bg-[#fff0f0] border-2 border-[#cc0000] text-[#cc0000] shrink-0">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <h1 className="text-sm sm:text-base md:text-lg font-black text-[#800000] uppercase font-mono tracking-wide break-words">
                  {t.lockedStage.title}
                </h1>
                <p className="text-xs text-[#555] leading-relaxed break-words">
                  {customMessage || (isArcade ? t.lockedStage.arcadeDesc : t.lockedStage.desc)}
                </p>
              </div>
            </div>

            {/* Prerequisite Stages List */}
            {requiredStages.length > 0 && (
              <div className="border border-[#b0b0b0] bg-[#fffbf0] p-2.5 sm:p-3 space-y-2.5">
                <div className="text-[11px] font-bold text-[#b35900] uppercase font-mono flex items-center justify-between">
                  <span>{t.lockedStage.requiredStageLabel}</span>
                  {requiredStages.length > 1 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white border border-[#d4d0c8] text-[#555]">
                      {clearedCount}/{requiredStages.length} {t.dashboard.cleared}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {requiredStages.map((reqStage) => {
                    const isCompleted = Boolean(localProgress[reqStage.id]?.completed);
                    const isBoss = Boolean(reqStage.isBossStage);

                    return (
                      <div
                        key={reqStage.id}
                        className={`p-2.5 sm:p-3 border transition-colors ${
                          isCompleted
                            ? "border-[#a3d9a5] bg-[#f4fbf4] border-l-4 border-l-[#008000]"
                            : isBoss
                            ? "border-[#e0b0b0] bg-white border-l-4 border-l-[#800000]"
                            : "border-[#d4d0c8] bg-white border-l-4 border-l-[#000080]"
                        }`}
                      >
                        {/* Top: Title & Status */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {isBoss && (
                                <span className="bg-[#800000] text-white text-[9px] font-mono font-bold px-1.5 py-0.2 uppercase shrink-0">
                                  {t.dashboard.statusBoss}
                                </span>
                              )}
                              <span className="font-bold text-xs sm:text-sm text-[#000080] break-words">
                                {reqStage.name[locale]}
                              </span>
                            </div>
                            {reqStage.depthName && (
                              <div className="text-[10px] font-mono text-[#888]">
                                {reqStage.depthName[locale]}
                              </div>
                            )}
                          </div>

                          {/* Status Badge */}
                          {isCompleted ? (
                            <span className="bg-[#e6ffe6] text-[#008000] border border-[#008000] text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 uppercase shrink-0 flex items-center gap-1">
                              <Check className="w-3 h-3 text-[#008000]" />
                              <span>{t.dashboard.statusDone}</span>
                            </span>
                          ) : (
                            <span className="bg-[#fff0f0] text-[#cc0000] border border-[#cc0000] text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 uppercase shrink-0 flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5 text-[#cc0000]" />
                              <span>{t.dashboard.statusLocked}</span>
                            </span>
                          )}
                        </div>

                        {/* Kana Chips or Description */}
                        {reqStage.cards && reqStage.cards.length > 0 ? (
                          <div className="my-2 p-1.5 bg-[#f9f8f4] border border-[#e5e2d6]">
                            <div className="flex flex-wrap items-center gap-1">
                              {reqStage.cards.map((card, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1 bg-white border border-[#d4d0c8] text-xs font-bold font-mono text-[#222] shadow-xs"
                                >
                                  {card.character}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-[11px] text-[#666] my-1.5 leading-snug break-words">
                            {reqStage.description[locale]}
                          </div>
                        )}

                        {/* Responsive Action Buttons */}
                        <div className="pt-2 border-t border-[#e8e8e8] flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-1.5">
                          <Link
                            href={`${prefix}/study/${reqStage.id}`}
                            className="w-full sm:w-auto px-3 py-1.5 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-[11px] font-bold text-[#000080] flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-[#000080]" />
                            <span>{t.dashboard.studyBtn}</span>
                          </Link>

                          <Link
                            href={`${prefix}/test/${reqStage.id}`}
                            className={`w-full sm:w-auto px-3.5 py-1.5 border-t-2 border-l-2 border-white border-b-2 border-r-2 font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-xs active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white ${
                              isCompleted
                                ? "bg-[#d4d0c8] text-[#333] border-[#404040] hover:bg-[#c0bca8]"
                                : isBoss
                                ? "bg-[#800000] text-white border-b-[#400000] border-r-[#400000] hover:bg-[#a00000]"
                                : "bg-[#000080] text-white border-b-[#000040] border-r-[#000040] hover:bg-[#0000a0]"
                            }`}
                          >
                            <Play className={`w-3.5 h-3.5 ${isCompleted ? "fill-[#333]" : "fill-white"}`} />
                            <span>
                              {isBoss
                                ? `${t.dashboard.statusBoss} ${t.dashboard.sprintBtn}`
                                : t.dashboard.sprintBtn}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-[#e0e0e0] flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
              <Link
                href={`${prefix}/dashboard`}
                className="w-full sm:w-auto px-4 py-2 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-black flex items-center justify-center gap-1.5 shadow"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.lockedStage.backDashboardBtn}</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { useLanguage } from "@/context/LanguageContext";
import { Stage } from "@/data/stages";
import { Lock, ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react";

interface StageLockedViewProps {
  requiredStages?: Stage[];
  customMessage?: string;
  isArcade?: boolean;
}

export function StageLockedView({
  requiredStages,
  customMessage,
  isArcade = false,
}: StageLockedViewProps) {
  const { t, locale } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle={t.lockedStage.title} />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 flex flex-col justify-center">
        {/* Retro Window Container */}
        <div className="border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#d4d0c8] shadow-md">
          {/* Window Header */}
          <div className="bg-[#800000] text-white px-3 py-1.5 flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 tracking-wider font-mono">
              <ShieldAlert className="w-4 h-4 text-[#ffff00] animate-pulse" />
              <span>{t.lockedStage.badge}</span>
            </span>
            <span className="text-[10px] text-[#ffcccc] font-mono">{t.lockedStage.lockedCode}</span>
          </div>

          {/* Window Body */}
          <div className="p-6 bg-white border border-[#808080] m-2 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-[#fff0f0] border-2 border-[#cc0000] text-[#cc0000] shrink-0">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-base sm:text-lg font-black text-[#800000] uppercase font-mono tracking-wide">
                  {t.lockedStage.title}
                </h1>
                <p className="text-xs text-[#555] leading-relaxed">
                  {customMessage || (isArcade ? t.lockedStage.arcadeDesc : t.lockedStage.desc)}
                </p>
              </div>
            </div>

            {/* Prerequisite Stages List */}
            {requiredStages && requiredStages.length > 0 && (
              <div className="border border-[#b0b0b0] bg-[#fffbf0] p-3 space-y-2">
                <div className="text-[11px] font-bold text-[#b35900] uppercase font-mono flex items-center gap-1">
                  <span>{t.lockedStage.requiredStageLabel}</span>
                </div>
                <div className="space-y-1.5">
                  {requiredStages.map((reqStage) => (
                    <div
                      key={reqStage.id}
                      className="p-2 border border-[#d4d0c8] bg-white flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-[#000080] truncate">
                          {reqStage.name[locale]}
                        </div>
                        <div className="text-[10px] text-[#777] truncate">
                          {reqStage.description[locale]}
                        </div>
                      </div>
                      <Link
                        href={`/study/${reqStage.id}`}
                        className="px-2.5 py-1 bg-[#d4d0c8] border-t border-l border-white border-b border-r-[#404040] hover:bg-[#c0bca8] text-[10px] font-bold text-[#000080] flex items-center gap-1 shrink-0"
                      >
                        <span>{t.lockedStage.goToRequiredBtn}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 border-t border-[#e0e0e0] flex flex-col sm:flex-row items-center justify-end gap-2">
              <Link
                href="/dashboard"
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

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RetroNavbar } from "@/components/RetroNavbar";
import { PreferencesModal } from "@/components/PreferencesModal";
import { Stage, isArcadeUnlocked } from "@/data/stages";
import { useLanguage } from "@/context/LanguageContext";
import { Play, BookOpen, RotateCw, Gamepad2, Sparkles, Lock, Zap, Star, Check, Settings, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { syncGuestDataToAccount } from "@/lib/guest-sync";

export default function DashboardClient({ stages = [] }: { stages?: Stage[] }) {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const [userEmail, setUserEmail] = useState<string>("guest@sakanajp.site");
  const [progress, setProgress] = useState<Record<string, { completed: boolean; bestSec?: number; stars: number }>>({});
  const [srsSummary, setSrsSummary] = useState<{ dueCount: number; masteredCount: number; totalStudied: number }>({
    dueCount: 0,
    masteredCount: 0,
    totalStudied: 0,
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut();
      setProgress({});
      setSrsSummary({ dueCount: 0, masteredCount: 0, totalStudied: 0 });
      setUserEmail("guest@sakanajp.site");
    } catch (e) {
      console.error("Sign out error:", e);
    } finally {
      router.push(`${prefix}/login`);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("sakana_user_email") || "guest@sakanajp.site";
    setUserEmail(savedEmail);

    // 1. Initial instant load from localStorage
    const savedProgress = localStorage.getItem("sakana_progress");
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        const normalized: Record<string, { completed: boolean; bestSec?: number; stars: number }> = {};
        Object.entries(parsed).forEach(([k, v]: [string, any]) => {
          normalized[k] = {
            completed: Boolean(v?.completed),
            stars: v?.stars || 0,
            bestSec: v?.bestSec ?? (v?.bestDurationMs ? Math.round((v.bestDurationMs / 1000) * 10) / 10 : undefined),
          };
        });
        setProgress(normalized);
      } catch {}
    }

    // 2. Fetch live progress & SRS from Neon Postgres ONLY for logged-in accounts
    if (savedEmail && savedEmail !== "guest@sakanajp.site") {
      const initAccountData = async () => {
        // Run safe guest-to-account migration if there is unsynced guest data in localStorage
        await syncGuestDataToAccount(savedEmail);

        fetch(`/api/progress?userId=${encodeURIComponent(savedEmail)}`)
          .then((res) => res.json())
          .then((json) => {
            if (json.success && Array.isArray(json.data)) {
              const remoteProgress: Record<string, { completed: boolean; bestSec?: number; stars: number }> = {};
              json.data.forEach((row: any) => {
                remoteProgress[row.stageId] = {
                  completed: row.completed,
                  stars: row.stars,
                  bestSec: row.bestDurationMs ? Math.round((row.bestDurationMs / 1000) * 10) / 10 : undefined,
                };
              });
              setProgress((prev) => ({ ...prev, ...remoteProgress }));
              try {
                localStorage.setItem("sakana_progress", JSON.stringify(remoteProgress));
              } catch {}
            }
          })
          .catch((err) => console.error("Error fetching Neon progress:", err));

        fetch(`/api/srs?userId=${encodeURIComponent(savedEmail)}`)
          .then((res) => res.json())
          .then((json) => {
            if (json.success && json.summary) {
              setSrsSummary(json.summary);
            }
          })
          .catch((err) => console.error("Error fetching SRS summary:", err));
      };

      initAccountData();
    } else {
      // For guests: calculate SRS due summary purely from local browser storage
      try {
        const localSrs = localStorage.getItem("sakana_srs_records");
        if (localSrs) {
          const records: Record<string, any> = JSON.parse(localSrs);
          const now = new Date();
          let dueCount = 0;
          let masteredCount = 0;
          const totalStudied = Object.keys(records).length;

          Object.values(records).forEach((r) => {
            if (r.nextReviewAt && new Date(r.nextReviewAt) <= now) {
              dueCount++;
            }
            if (r.state === "mastered" || (r.intervalDays && r.intervalDays >= 21)) {
              masteredCount++;
            }
          });

          setSrsSummary({ dueCount, masteredCount, totalStudied });
        }
      } catch {}
    }
  }, []);

  const completedList = Object.values(progress).filter((p) => p.completed);
  const completedCount = completedList.length;
  const stagesWithSpeed = completedList.filter((p) => typeof p.bestSec === "number" && (p.bestSec as number) > 0);
  const avgSpeedSec =
    stagesWithSpeed.length > 0
      ? (stagesWithSpeed.reduce((acc, curr) => acc + (curr.bestSec || 0), 0) / stagesWithSpeed.length).toFixed(1)
      : null;
  const totalStages = stages.length;

  const categories: Array<{
    title: string;
    sub: string;
    color: string;
    stages: Stage[];
  }> = [
    {
      title: t.dashboard.sec1Title,
      sub: t.dashboard.sec1Sub,
      color: "#000080",
      stages: stages.filter((s) => s.category === "hiragana"),
    },
    {
      title: t.dashboard.sec2Title,
      sub: t.dashboard.sec2Sub,
      color: "#006600",
      stages: stages.filter((s) => s.category === "katakana"),
    },
    {
      title: t.dashboard.sec3Title,
      sub: t.dashboard.sec3Sub,
      color: "#800000",
      stages: stages.filter((s) => s.category === "words"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      {/* Full-width Sticky Retro Navbar */}
      <RetroNavbar currentSubtitle={t.dashboard.windowTitle} />

      {/* Edge-to-Edge Responsive Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
        {/* User Info Bar */}
        <div className="border border-[#808080] bg-[#d4d0c8] px-3 py-1.5 text-xs flex items-center justify-between gap-2 text-black shadow-xs">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <span className="font-bold text-[#000080] shrink-0">{t.dashboard.operator}:</span>
            <span className="bg-white px-2 py-0.5 border border-[#808080] text-[11px] sm:text-xs font-mono font-bold truncate">
              {userEmail}
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => setPreferencesOpen(true)}
              title={t.nav.preferences}
              aria-label={t.nav.preferences}
              className="p-1 sm:px-2 sm:py-0.5 border bg-[#d4d0c8] text-[#000080] hover:text-[#cc0000] border-t-white border-l-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white flex items-center gap-1 cursor-pointer shrink-0 font-bold"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">[{t.nav.preferences}]</span>
            </button>
            {userEmail !== "guest@sakanajp.site" && (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                title={t.nav.logout}
                aria-label={t.nav.logout}
                className="p-1 sm:px-2 sm:py-0.5 border bg-[#d4d0c8] text-[#cc0000] hover:text-[#990000] border-t-white border-l-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white flex items-center gap-1 cursor-pointer disabled:opacity-50 shrink-0 font-bold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">[{t.nav.logout}]</span>
              </button>
            )}
          </div>
        </div>

        {/* Desktop 2-Column Workstation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Stats, SRS Retention & Arcade */}
          <div className="lg:col-span-4 space-y-4">

          
          {/* Status Matrix Board */}
          <div className="border border-[#808080] bg-[#f5f5f0] p-2.5">
            <div className="text-[10px] font-bold text-[#000080] uppercase border-b border-[#808080] pb-1 flex justify-between items-center">
              <span className="flex items-center gap-1">
                <span className="animate-star-twinkle text-[#ff00ff]">✦</span>
                <span>◆ {t.dashboard.statsTitle}</span>
              </span>
              <span className="text-[#cc0000] font-mono text-[9px] bg-[#fff0f0] border border-[#ffcccc] px-1">
                {t.dashboard.standard}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-2 text-xs">
              <div className="bg-black text-[#00ff66] border border-[#808080] p-1.5 font-mono shadow-inner">
                <span className="block text-[9px] text-[#888]">{t.dashboard.cleared}</span>
                <strong className="text-sm">
                  {completedCount} / {totalStages}
                </strong>
              </div>
              <div className="bg-black text-[#ffcc00] border border-[#808080] p-1.5 font-mono shadow-inner">
                <span className="block text-[9px] text-[#888]">{t.dashboard.speed}</span>
                <strong className="text-sm">
                  {avgSpeedSec ? `${avgSpeedSec}s` : "--"}
                </strong>
              </div>
              <div className="bg-black text-[#00ffff] border border-[#808080] p-1.5 font-mono shadow-inner">
                <span className="block text-[9px] text-[#888]">{t.dashboard.mastery}</span>
                <strong className="text-sm flex items-center justify-center gap-1">
                  <span>{Math.round((completedCount / totalStages) * 100)}%</span>
                  {completedCount === totalStages && (
                    <Star className="w-3.5 h-3.5 fill-[#ffff00] text-[#ffff00] inline" />
                  )}
                </strong>
              </div>
            </div>
          </div>

          {/* SRS Due Review Center */}
          <div className="border border-[#808080] bg-[#f5f5f0] p-2.5">
            <div className="text-[10px] font-bold text-[#000080] uppercase border-b border-[#808080] pb-1 flex justify-between items-center">
              <span className="flex items-center gap-1">
                {srsSummary.dueCount > 0 ? (
                  <span className="w-2 h-2 rounded-full bg-[#ff0000] inline-block animate-pulse"></span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[#008000] inline-block"></span>
                )}
                <span>{t.dashboard.srsDueTitle}</span>
              </span>
              <span className="font-mono text-[9px] text-[#555]">
                {t.dashboard.srsMastered}: {srsSummary.masteredCount}
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs">
                {srsSummary.dueCount > 0 ? (
                  <div>
                    <span className="font-bold text-[#cc0000] flex items-center gap-1.5">
                      <span className="animate-retro-blink bg-[#ff0000] text-white px-1 py-0.2 text-[9px] font-mono">
                        {t.common.dueNow}
                      </span>
                      <Zap className="w-3.5 h-3.5 fill-[#cc0000] text-[#cc0000]" />
                      <span>{srsSummary.dueCount} {t.dashboard.srsDueDesc}</span>
                    </span>
                    <span className="text-[11px] text-[#555] block mt-0.5">
                      {t.common.dueReinforcementNote}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="font-bold text-[#006600] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-[#00aa00]" />
                      <span>{t.dashboard.allCaughtUp}</span>
                    </span>
                    <span className="text-[11px] text-[#555] block">
                      {srsSummary.totalStudied > 0
                        ? t.common.srsTrackingNote(srsSummary.totalStudied)
                        : t.common.srsEmptyNote}
                    </span>
                  </div>
                )}
              </div>

              {srsSummary.dueCount > 0 && (
                <Link
                  href={`${prefix}/study/srs-due`}
                  className="px-3 py-1.5 bg-[#ffff00] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#800000] hover:bg-[#fff066] active:border-t-[#800000] active:border-l-[#800000] active:border-b-white active:border-r-white font-black text-xs text-[#800000] flex items-center justify-center gap-1 shadow whitespace-nowrap animate-pulse"
                >
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.dashboard.startSrsReview} ({srsSummary.dueCount})</span>
                </Link>
              )}
            </div>
          </div>

          {/* Optional Intermission Arcade Section */}
          {(() => {
            const arcadeUnlocked = isArcadeUnlocked(progress);
            return (
              <div
                className={`border-2 p-2.5 shadow-sm transition-colors ${
                  arcadeUnlocked
                    ? "border-[#ff9900] bg-[#fffdf0]"
                    : "border-[#a0a0a0] bg-[#f5f5f5]"
                }`}
              >
                <div
                  className={`text-[10px] font-bold uppercase border-b pb-1 flex justify-between items-center ${
                    arcadeUnlocked
                      ? "text-[#b35900] border-[#e6b800]"
                      : "text-[#777] border-[#ccc]"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {arcadeUnlocked ? (
                      <Sparkles className="w-3.5 h-3.5 text-[#ff6600]" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-[#888]" />
                    )}
                    <span>{t.minigame.optionalBannerTitle}</span>
                  </span>
                  <span
                    className={`text-[9px] px-1 font-mono uppercase border ${
                      arcadeUnlocked
                        ? "bg-[#fff0e0] border-[#ffcc80] text-[#cc6600]"
                        : "bg-[#e8e8e8] border-[#ccc] text-[#888]"
                    }`}
                  >
                    {arcadeUnlocked ? t.dashboard.optionalDrillBadge : t.minigame.arcadeLockedBadge}
                  </span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="text-xs text-[#555]">
                    <p className="text-[11px] leading-snug">
                      {arcadeUnlocked
                        ? t.minigame.optionalBannerDesc
                        : t.minigame.arcadeLockedDesc}
                    </p>
                  </div>

                  {arcadeUnlocked ? (
                    <Link
                      href={`${prefix}/minigame`}
                      className="px-3 py-1.5 bg-[#ffff00] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#800000] hover:bg-[#fff066] active:border-t-[#800000] active:border-l-[#800000] active:border-b-white active:border-r-white font-black text-xs text-[#800000] flex items-center justify-center gap-1.5 shadow whitespace-nowrap shrink-0"
                    >
                      <Gamepad2 className="w-3.5 h-3.5 text-[#800000]" />
                      <span>{t.minigame.startArcadeBtn}</span>
                    </Link>
                  ) : (
                    <div className="px-3 py-1.5 bg-[#d4d0c8] border border-[#a0a0a0] font-bold text-xs text-[#888] flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap shrink-0 cursor-not-allowed">
                      <Lock className="w-3.5 h-3.5 text-[#888]" />
                      <span>{t.dashboard.statusLocked}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
          </div>

          {/* Right Column: Stages by Category */}
          <div className="lg:col-span-8 space-y-4">
            {categories.map((cat, catIdx) => (
              <div key={catIdx} className="border border-[#808080] bg-[#ece9d8]">
                {/* Sector Header */}
                <div
                  style={{ backgroundColor: cat.color }}
                  className="text-white px-2.5 py-1.5 text-xs font-bold flex items-center justify-between"
                >
                  <span className="tracking-wide uppercase font-mono">{cat.title}</span>
                  <span className="text-[10px] text-[#ffff00] font-mono">{cat.sub}</span>
                </div>

                {/* Stages Responsive Grid */}
                <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {cat.stages.map((stage, stageIdx) => {
                    const stageProgress = progress[stage.id];
                    const isCompleted = !!stageProgress?.completed;

                    let isUnlocked = false;
                    if (stage.unlockedByDefault || stageIdx === 0 || isCompleted) {
                      isUnlocked = true;
                    } else if (stage.isBossStage && stage.requiredStageIds) {
                      // Boss stage requires all preceding stages in its block to be completed
                      isUnlocked = stage.requiredStageIds.every((reqId) => !!progress[reqId]?.completed);
                    } else {
                      // Normal stage requires the previous stage to be completed
                      const prevStage = stageIdx > 0 ? cat.stages[stageIdx - 1] : null;
                      isUnlocked = prevStage ? !!progress[prevStage.id]?.completed : false;
                    }

                    const isBoss = !!stage.isBossStage;

                    return (
                      <div
                        key={stage.id}
                        className={`p-2.5 border border-t-white border-l-white border-b-[#808080] border-r-[#808080] flex flex-col justify-between gap-2 transition-colors ${
                          isBoss
                            ? isCompleted
                              ? "bg-[#fff0f5] border-l-4 border-l-[#800080]"
                              : isUnlocked
                              ? "bg-[#fff8dc] border-l-4 border-l-[#cc0000]"
                              : "bg-[#f2f2f2] border-l-4 border-l-[#888] text-[#888]"
                            : isCompleted
                            ? "bg-[#f0fff0]"
                            : isUnlocked
                            ? "bg-white hover:bg-[#fffae6]"
                            : "bg-[#f5f5f5] text-[#888]"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="font-bold font-mono text-[10px] mt-0.5 shrink-0">
                            {isCompleted ? (
                              <span className={isBoss ? "text-[#800080] flex items-center gap-0.5" : "text-[#008000] flex items-center gap-0.5"}>
                                {isBoss && <Star className="w-3 h-3 fill-[#800080] inline" />}
                                <span>{isBoss ? t.dashboard.statusWon : t.dashboard.statusDone}</span>
                              </span>
                            ) : isUnlocked ? (
                              <span className={isBoss ? "text-[#cc0000] font-black flex items-center gap-0.5" : "text-[#000080]"}>
                                {isBoss && <Zap className="w-3 h-3 fill-[#cc0000] inline" />}
                                <span>{isBoss ? t.dashboard.statusBoss : t.dashboard.statusReady}</span>
                              </span>
                            ) : (
                              <span className="text-[#888] flex items-center gap-0.5">
                                <Lock className="w-2.5 h-2.5 inline" />
                                <span>{t.dashboard.statusLocked}</span>
                              </span>
                            )}
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className={`font-bold text-xs truncate flex items-center gap-1.5 ${isUnlocked ? (isBoss ? "text-[#990000]" : "text-black") : "text-[#777]"}`}>
                              <span className="truncate">{stage.name[locale]}</span>
                              {isBoss && (
                                <span className="bg-[#cc0000] text-white text-[8px] px-1 py-0.2 font-mono uppercase shrink-0">
                                  {t.dashboard.statusBoss}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#555] mt-0.5 line-clamp-1">
                              {stage.description[locale]}
                            </div>
                            {stageProgress?.bestSec && (
                              <div className="text-[10px] text-[#006600] font-mono mt-0.5">
                                {t.common.best}: {stageProgress.bestSec}s
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons: [LEARN] + [CHALLENGE] */}
                        <div className="flex items-center gap-1.5 pt-1 border-t border-[#e8e8e8] justify-end">
                          {isUnlocked ? (
                            <>
                              <Link
                                href={`${prefix}/study/${stage.id}`}
                                className="px-2 py-0.5 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-[11px] text-[#000080] flex items-center gap-1 shadow-xs cursor-pointer"
                              >
                                <BookOpen className="w-3 h-3 text-[#000080]" />
                                <span>{t.dashboard.studyBtn}</span>
                              </Link>

                              <Link
                                href={`${prefix}/test/${stage.id}`}
                                className={`px-2 py-0.5 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-[11px] flex items-center gap-1 shadow-xs cursor-pointer ${
                                  isBoss ? "text-[#800000] bg-[#ffe4e1] border-[#800000]" : "text-[#cc0000]"
                                }`}
                              >
                                <Play className={`w-3 h-3 ${isBoss ? "fill-[#800000]" : "fill-[#cc0000]"}`} />
                                <span>{isBoss ? t.dashboard.statusBoss : t.dashboard.sprintBtn}</span>
                              </Link>
                            </>
                          ) : (
                            <span className="text-[10px] text-[#999] font-mono py-0.5 flex items-center gap-1">
                              <Lock className="w-3 h-3 text-[#999] inline" />
                              <span>{isBoss ? t.common.beatTwoStagesFirst : t.dashboard.statusLocked}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Docked Retro Footer & Status Bar */}
      <footer className="border-t border-[#808080] bg-[#d4d0c8] px-3 sm:px-6 py-2 text-[11px] text-[#404040] flex items-center justify-between font-mono shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00aa00]"></span>
          <span>SAKANA DOJO // {t.common.systemOnline}</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="hidden sm:inline">{t.dashboard.footerTagline}</span>
          <span className="border-l border-[#808080] pl-2 font-mono">{t.dashboard.footerReady}</span>
        </div>
      </footer>
      <PreferencesModal
        isOpen={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
      />
    </div>
  );
}

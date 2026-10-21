"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RetroNavbar } from "@/components/RetroNavbar";
import { BottomNav } from "@/components/BottomNav";
import { ModernFooter } from "@/components/ModernFooter";
import { PreferencesModal } from "@/components/PreferencesModal";
import { Stage, isArcadeUnlocked } from "@/data/stages";
import { useLanguage } from "@/context/LanguageContext";
import { Play, BookOpen, RotateCw, Gamepad2, Sparkles, Lock, Zap, Star, Check, Settings, LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

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
    } catch (e) {
      console.error("Sign out error:", e);
    } finally {
      router.push(`${prefix}/login`);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("sakana_user_email") || "guest@sakanajp.site";
    setUserEmail(savedEmail);

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

    if (savedEmail && savedEmail !== "guest@sakanajp.site") {
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
    } else {
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
            if (r.intervalDays && r.intervalDays >= 21) {
              masteredCount++;
            }
          });

          setSrsSummary({ dueCount, masteredCount, totalStudied });
        }
      } catch {}
    }
  }, []);

  const totalStages = stages.length;
  const completedStages = Object.values(progress).filter((p) => p.completed);
  const completedCount = completedStages.length;
  const stagesWithSpeed = completedStages.filter((p) => typeof p.bestSec === "number");
  const avgSpeedSec =
    stagesWithSpeed.length > 0
      ? (stagesWithSpeed.reduce((acc, curr) => acc + (curr.bestSec || 0), 0) / stagesWithSpeed.length).toFixed(1)
      : null;

  const categories: Array<{
    title: string;
    sub: string;
    color: string;
    stages: Stage[];
  }> = [
    {
      title: t.dashboard.sec1Title,
      sub: t.dashboard.sec1Sub,
      color: "#fa624d",
      stages: stages.filter((s) => s.category === "hiragana"),
    },
    {
      title: t.dashboard.sec2Title,
      sub: t.dashboard.sec2Sub,
      color: "#ea580c",
      stages: stages.filter((s) => s.category === "katakana"),
    },
    {
      title: t.dashboard.sec3Title,
      sub: t.dashboard.sec3Sub,
      color: "#db2777",
      stages: stages.filter((s) => s.category === "words"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-stone-900">
      <RetroNavbar currentSubtitle={t.dashboard.windowTitle} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* User Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-stone-200/70 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fff5f2] text-[#fa624d] flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-stone-900">{userEmail}</span>
                {userEmail === "guest@sakanajp.site" ? (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    Guest Mode
                  </span>
                ) : (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Synced
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500">
                {t.dashboard.operator}: <strong className="text-stone-700">{userEmail}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreferencesOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-medium text-stone-700 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t.nav.preferences}</span>
            </button>
            {userEmail !== "guest@sakanajp.site" && (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-medium transition-colors disabled:opacity-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.nav.logout}</span>
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Metrics & Actions */}
          <div className="lg:col-span-4 space-y-4">
            {/* Stats Metric Box */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xs text-stone-500 uppercase tracking-wider">
                  {t.dashboard.statsTitle}
                </h3>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#fff5f2] text-[#fa624d]">
                  {t.dashboard.standard}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="block text-[10px] text-stone-400 font-medium">{t.dashboard.cleared}</span>
                  <strong className="text-base font-extrabold text-stone-900">
                    {completedCount}/{totalStages}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="block text-[10px] text-stone-400 font-medium">{t.dashboard.speed}</span>
                  <strong className="text-base font-extrabold text-stone-900">
                    {avgSpeedSec ? `${avgSpeedSec}s` : "--"}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="block text-[10px] text-stone-400 font-medium">{t.dashboard.mastery}</span>
                  <strong className="text-base font-extrabold text-[#fa624d]">
                    {Math.round((completedCount / (totalStages || 1)) * 100)}%
                  </strong>
                </div>
              </div>
            </div>

            {/* SRS Review Station */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      srsSummary.dueCount > 0 ? "bg-[#fa624d] animate-subtle-pulse" : "bg-emerald-500"
                    }`}
                  />
                  <h3 className="font-semibold text-xs text-stone-800">{t.dashboard.srsDueTitle}</h3>
                </div>
                <span className="text-[11px] text-stone-400">
                  {t.dashboard.srsMastered}: {srsSummary.masteredCount}
                </span>
              </div>

              <div className="pt-1 space-y-2">
                <div>
                  {srsSummary.dueCount > 0 ? (
                    <div>
                      <span className="font-bold text-[#fa624d] flex items-center gap-1.5 text-xs">
                        <Zap className="w-3.5 h-3.5 fill-[#fa624d]" />
                        <span>{srsSummary.dueCount} {t.dashboard.srsDueDesc}</span>
                      </span>
                      <span className="text-[11px] text-stone-500 block mt-0.5">
                        {t.common.dueReinforcementNote}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-semibold text-emerald-600 flex items-center gap-1 text-xs">
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.dashboard.allCaughtUp}</span>
                      </span>
                      <span className="text-[11px] text-stone-400 block mt-0.5">
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
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#fa624d] hover:bg-[#e84630] text-white font-semibold text-xs shadow-xs transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{t.dashboard.startSrsReview} ({srsSummary.dueCount})</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Arcade Minigame Box */}
            {(() => {
              const arcadeUnlocked = isArcadeUnlocked(progress);
              return (
                <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-[#fa624d]" />
                      <h3 className="font-semibold text-xs text-stone-800">{t.minigame.optionalBannerTitle}</h3>
                    </div>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                        arcadeUnlocked ? "bg-amber-50 text-amber-700" : "bg-stone-100 text-stone-400"
                      }`}
                    >
                      {arcadeUnlocked ? t.dashboard.optionalDrillBadge : t.minigame.arcadeLockedBadge}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed">
                    {arcadeUnlocked ? t.minigame.optionalBannerDesc : t.minigame.arcadeLockedDesc}
                  </p>

                  <div className="pt-1">
                    {arcadeUnlocked ? (
                      <Link
                        href={`${prefix}/minigame`}
                        className="inline-flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs transition-colors"
                      >
                        <Gamepad2 className="w-3.5 h-3.5" />
                        <span>{t.minigame.startArcadeBtn}</span>
                      </Link>
                    ) : (
                      <div className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-stone-100 text-stone-400 font-medium text-xs">
                        <Lock className="w-3.5 h-3.5" />
                        <span>{t.dashboard.statusLocked}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Right Column: Stage Sectors */}
          <div className="lg:col-span-8 space-y-6">
            {categories.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-3">
                {/* Sector Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#fa624d]" />
                    <h2 className="font-bold text-sm text-stone-900 tracking-tight">{cat.title}</h2>
                  </div>
                  <span className="text-xs text-stone-400">{cat.sub}</span>
                </div>

                {/* Grid of Stages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cat.stages.map((stage, stageIdx) => {
                    const stageProgress = progress[stage.id];
                    const isCompleted = !!stageProgress?.completed;

                    let isUnlocked = false;
                    if (stage.unlockedByDefault || stageIdx === 0 || isCompleted) {
                      isUnlocked = true;
                    } else if (stage.isBossStage && stage.requiredStageIds) {
                      isUnlocked = stage.requiredStageIds.every((reqId) => !!progress[reqId]?.completed);
                    } else {
                      const prevStage = stageIdx > 0 ? cat.stages[stageIdx - 1] : null;
                      isUnlocked = prevStage ? !!progress[prevStage.id]?.completed : false;
                    }

                    const isBoss = !!stage.isBossStage;

                    return (
                      <div
                        key={stage.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                          isBoss
                            ? isCompleted
                              ? "bg-purple-50/50 border-purple-200"
                              : isUnlocked
                              ? "bg-amber-50/50 border-amber-300 shadow-sm"
                              : "bg-stone-50 border-stone-200 text-stone-400"
                            : isCompleted
                            ? "bg-[#fff9f8] border-[#ffd5cc]"
                            : isUnlocked
                            ? "bg-white border-stone-200/80 hover:border-[#ffd5cc] shadow-xs"
                            : "bg-stone-50/60 border-stone-200/50 text-stone-400"
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-1.5 font-bold text-xs">
                              {isCompleted ? (
                                <span className="inline-flex items-center gap-1 text-emerald-600">
                                  <Check className="w-3.5 h-3.5" />
                                  <span>{isBoss ? t.dashboard.statusWon : t.dashboard.statusDone}</span>
                                </span>
                              ) : isUnlocked ? (
                                <span className={`inline-flex items-center gap-1 ${isBoss ? "text-amber-600" : "text-[#fa624d]"}`}>
                                  {isBoss && <Zap className="w-3.5 h-3.5 fill-amber-500" />}
                                  <span>{isBoss ? t.dashboard.statusBoss : t.dashboard.statusReady}</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-stone-400">
                                  <Lock className="w-3 h-3" />
                                  <span>{t.dashboard.statusLocked}</span>
                                </span>
                              )}
                            </div>

                            {isBoss && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                                Boss
                              </span>
                            )}
                          </div>

                          <h3
                            className={`font-semibold text-sm ${
                              isUnlocked ? "text-stone-900" : "text-stone-400"
                            }`}
                          >
                            {stage.name[locale]}
                          </h3>

                          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                            {stage.description[locale]}
                          </p>

                          {stageProgress?.bestSec && (
                            <div className="text-[11px] text-emerald-600 font-medium mt-1">
                              {t.common.best}: {stageProgress.bestSec}s
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                          {isUnlocked ? (
                            <>
                              <Link
                                href={`${prefix}/study/${stage.id}`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>{t.dashboard.studyBtn}</span>
                              </Link>
                              <Link
                                href={`${prefix}/test/${stage.id}`}
                                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors ${
                                  isBoss
                                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                                    : "bg-[#fa624d] hover:bg-[#e84630] text-white"
                                }`}
                              >
                                <Play className="w-3.5 h-3.5 fill-white" />
                                <span>{isBoss ? t.dashboard.statusBoss : t.dashboard.sprintBtn}</span>
                              </Link>
                            </>
                          ) : (
                            <span className="text-xs text-stone-400 flex items-center gap-1 py-1">
                              <Lock className="w-3 h-3" />
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

      <ModernFooter />
      <BottomNav />
      <PreferencesModal
        isOpen={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
      />
    </div>
  );
}

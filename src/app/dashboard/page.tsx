"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RetroNavbar } from "@/components/RetroNavbar";
import { STAGES, Stage } from "@/data/stages";
import { useLanguage } from "@/context/LanguageContext";
import { Play, BookOpen, RotateCw } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [userEmail, setUserEmail] = useState<string>("guest@sakana.net");
  const [progress, setProgress] = useState<Record<string, { completed: boolean; bestSec?: number; stars: number }>>({});
  const [srsSummary, setSrsSummary] = useState<{ dueCount: number; masteredCount: number; totalStudied: number }>({
    dueCount: 0,
    masteredCount: 0,
    totalStudied: 0,
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut();
    } catch (e) {
      console.error("Sign out error:", e);
    } finally {
      router.push("/login");
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("sakana_user_email") || "guest@sakana.net";
    setUserEmail(savedEmail);

    // 1. Initial instant load from localStorage
    const savedProgress = localStorage.getItem("sakana_progress");
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch {}
    }

    // 2. Fetch live progress from Neon Postgres
    const fetchEmail = savedEmail || "guest@sakana.net";
    fetch(`/api/progress?userId=${encodeURIComponent(fetchEmail)}`)
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

    // 3. Fetch SRS due summary from Neon Postgres
    fetch(`/api/srs?userId=${encodeURIComponent(fetchEmail)}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.summary) {
          setSrsSummary(json.summary);
        }
      })
      .catch((err) => console.error("Error fetching SRS summary:", err));
  }, []);

  const completedList = Object.values(progress).filter((p) => p.completed);
  const completedCount = completedList.length;
  const stagesWithSpeed = completedList.filter((p) => typeof p.bestSec === "number" && (p.bestSec as number) > 0);
  const avgSpeedSec =
    stagesWithSpeed.length > 0
      ? (stagesWithSpeed.reduce((acc, curr) => acc + (curr.bestSec || 0), 0) / stagesWithSpeed.length).toFixed(1)
      : null;
  const totalStages = STAGES.length;

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
      stages: STAGES.filter((s) => s.category === "hiragana"),
    },
    {
      title: t.dashboard.sec2Title,
      sub: t.dashboard.sec2Sub,
      color: "#006600",
      stages: STAGES.filter((s) => s.category === "katakana"),
    },
    {
      title: t.dashboard.sec3Title,
      sub: t.dashboard.sec3Sub,
      color: "#800000",
      stages: STAGES.filter((s) => s.category === "words"),
    },
  ];

  return (
    <div className="min-h-screen py-4 px-2 sm:px-6 flex flex-col items-center">
      {/* Outer Retro Container */}
      <div className="w-full max-w-xl bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] shadow-md flex flex-col">
        
        {/* Retro Navbar & SaKana Branding */}
        <RetroNavbar currentSubtitle={t.dashboard.windowTitle} />

        {/* User Info Bar */}
        <div className="border-b border-[#808080] bg-[#ece9d8] px-2 py-1 text-[11px] flex items-center justify-between text-black">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#000080]">{t.dashboard.operator}</span>
            <span className="bg-white px-1.5 border border-[#808080] text-[10px]">
              {userEmail}
            </span>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-[10px] text-[#000080] hover:text-[#cc0000] underline cursor-pointer disabled:opacity-50"
          >
            [{t.nav.logout}]
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-4 bg-white text-black space-y-4">
          
          {/* Status Matrix Board */}
          <div className="border border-[#808080] bg-[#f5f5f0] p-2.5">
            <div className="text-[10px] font-bold text-[#000080] uppercase border-b border-[#808080] pb-1 flex justify-between">
              <span>◆ {t.dashboard.statsTitle}</span>
              <span className="text-[#cc0000]">{t.dashboard.standard}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-2 text-xs">
              <div className="bg-white border border-[#c0c0c0] p-1.5">
                <span className="block text-[10px] text-[#666]">{t.dashboard.cleared}</span>
                <strong className="text-[#000080] text-sm">
                  {completedCount} / {totalStages}
                </strong>
              </div>
              <div className="bg-white border border-[#c0c0c0] p-1.5">
                <span className="block text-[10px] text-[#666]">{t.dashboard.speed}</span>
                <strong className="text-[#cc0000] text-sm">
                  {avgSpeedSec ? `${avgSpeedSec}s` : "--"}
                </strong>
              </div>
              <div className="bg-white border border-[#c0c0c0] p-1.5">
                <span className="block text-[10px] text-[#666]">{t.dashboard.mastery}</span>
                <strong className="text-[#006600] text-sm">
                  {Math.round((completedCount / totalStages) * 100)}%
                </strong>
              </div>
            </div>
          </div>

          {/* SRS Due Review Center */}
          <div className="border border-[#808080] bg-[#f5f5f0] p-2.5">
            <div className="text-[10px] font-bold text-[#000080] uppercase border-b border-[#808080] pb-1 flex justify-between items-center">
              <span>◆ {t.dashboard.srsDueTitle}</span>
              <span className="font-mono text-[9px] text-[#555]">
                {t.dashboard.srsMastered}: {srsSummary.masteredCount}
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs">
                {srsSummary.dueCount > 0 ? (
                  <div>
                    <span className="font-bold text-[#cc0000]">
                      ⚡ {srsSummary.dueCount} {t.dashboard.srsDueDesc}
                    </span>
                    <span className="text-[11px] text-[#555] block">
                      SM-2 memory intervals require retention reinforcement.
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="font-bold text-[#006600]">
                      ✓ {t.dashboard.allCaughtUp}
                    </span>
                    <span className="text-[11px] text-[#555] block">
                      {srsSummary.totalStudied > 0
                        ? `${srsSummary.totalStudied} characters tracked in SRS active retention.`
                        : "Start learning characters in the stages below to populate your retention schedule."}
                    </span>
                  </div>
                )}
              </div>

              {srsSummary.dueCount > 0 && (
                <Link
                  href="/study/srs-due"
                  className="px-3 py-1.5 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-[#800000] flex items-center justify-center gap-1 shadow whitespace-nowrap"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{t.dashboard.startSrsReview} ({srsSummary.dueCount})</span>
                </Link>
              )}
            </div>
          </div>

          {/* Stages by Category */}
          <div className="space-y-4">
            {categories.map((cat, catIdx) => (
              <div key={catIdx} className="border border-[#808080]">
                {/* Sector Header */}
                <div
                  style={{ backgroundColor: cat.color }}
                  className="text-white px-2 py-1 text-xs font-bold flex items-center justify-between"
                >
                  <span>{cat.title}</span>
                  <span className="text-[10px] text-[#ffff00] font-mono">{cat.sub}</span>
                </div>

                {/* Stages List */}
                <div className="divide-y divide-[#d0d0d0] text-xs">
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
                        className={`p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                          isBoss
                            ? isCompleted
                              ? "bg-[#fff0f5] border-l-4 border-l-[#800080]"
                              : isUnlocked
                              ? "bg-[#fff8dc] border-l-4 border-l-[#cc0000] animate-pulse-slow"
                              : "bg-[#f2f2f2] border-l-4 border-l-[#888] text-[#888]"
                            : isCompleted
                            ? "bg-[#f0fff0]"
                            : isUnlocked
                            ? "bg-white hover:bg-[#fffae6]"
                            : "bg-[#f5f5f5] text-[#888]"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="font-bold font-mono text-[11px] mt-0.5">
                            {isCompleted ? (
                              <span className={isBoss ? "text-[#800080]" : "text-[#008000]"}>
                                {isBoss ? "★ DEFEATED" : t.dashboard.statusDone}
                              </span>
                            ) : isUnlocked ? (
                              <span className={isBoss ? "text-[#cc0000] font-black" : "text-[#000080]"}>
                                {isBoss ? "⚡ CHALLENGE" : t.dashboard.statusReady}
                              </span>
                            ) : (
                              <span className="text-[#888]">{t.dashboard.statusLocked}</span>
                            )}
                          </span>

                          <div>
                            <div className={`font-bold flex items-center gap-1.5 ${isUnlocked ? (isBoss ? "text-[#990000]" : "text-black") : "text-[#777]"}`}>
                              <span>{stage.name[locale]}</span>
                              {isBoss && (
                                <span className="bg-[#cc0000] text-white text-[9px] px-1 py-0.2 font-mono uppercase rounded-xs">
                                  BOSS GATE
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#555] mt-0.5">
                              {stage.description[locale]}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons: [LEARN / BELAJAR] + [CHALLENGE / TEST] */}
                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                          {isUnlocked ? (
                            <>
                              {/* Learn Mode Button (SRS repetition, untimed) */}
                              <Link
                                href={`/study/${stage.id}`}
                                className="px-2.5 py-1 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-[#000080] flex items-center gap-1 shadow"
                              >
                                <BookOpen className="w-3 h-3 text-[#000080]" />
                                <span>{t.dashboard.studyBtn}</span>
                              </Link>

                              {/* Timed Challenge Button */}
                              <Link
                                href={`/test/${stage.id}`}
                                className={`px-2.5 py-1 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs flex items-center gap-1 shadow ${
                                  isBoss ? "text-[#800000] bg-[#ffe4e1] border-[#800000]" : "text-[#cc0000]"
                                }`}
                              >
                                <Play className={`w-3 h-3 ${isBoss ? "fill-[#800000]" : "fill-[#cc0000]"}`} />
                                <span>{isBoss ? "BOSS FIGHT" : t.dashboard.sprintBtn}</span>
                              </Link>
                            </>
                          ) : (
                            <span className="text-[10px] text-[#999] font-mono">
                              {isBoss ? "🔒 BEAT 2 STAGES FIRST" : t.dashboard.statusLocked}
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

        {/* Bottom Windows Control Bar */}
        <div className="border-t border-[#808080] bg-[#ece9d8] p-2 flex items-center justify-between text-xs">
          <Link
            href="/"
            className="px-3 py-1 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] text-black font-bold text-xs hover:bg-[#c0bca8]"
          >
            &lt;&lt; {t.nav.back}
          </Link>

          <Link
            href="/study/hiragana-vowels"
            className="px-4 py-1 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] text-[#000080] font-black text-xs hover:bg-[#c0bca8] flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#000080]" />
            <span>{t.dashboard.studyBtn}: {t.dashboard.sec1Title}</span>
          </Link>
        </div>

      </div>

      <footer className="mt-3 text-[10px] text-[#666] text-center font-mono">
        SAKANA DOJO // SYSTEM ONLINE // MULTILINGUAL
      </footer>
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { RetroNavbar } from "@/components/RetroNavbar";
import { useLanguage } from "@/context/LanguageContext";
import { STAGES, StudyCard } from "@/data/stages";
import { SrsCardRecord } from "@/lib/srs";
import {
  MinigameCard,
  buildMinigameQueue,
  getUnlockedCardsUpToStage,
} from "@/lib/minigame";
import {
  Heart,
  Zap,
  RotateCw,
  Award,
  AlertTriangle,
  Shield,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function MinigamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, locale } = useLanguage();

  const fromStageId = searchParams.get("from") || "";
  const nextStageId = searchParams.get("next") || "";

  // Progress and SRS states
  const [progress, setProgress] = useState<Record<string, { completed: boolean }>>({});
  const [srsRecords, setSrsRecords] = useState<Record<string, SrsCardRecord>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Gameplay session
  const [sessionKey, setSessionKey] = useState(0);
  const [queue, setQueue] = useState<MinigameCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctAnswered, setCorrectAnswered] = useState(0);
  const [status, setStatus] = useState<"ready" | "playing" | "passed" | "failed">("ready");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [recentlyRequeued, setRecentlyRequeued] = useState<string | null>(null);

  // 1. Load progress and SRS records
  useEffect(() => {
    const savedProgress = localStorage.getItem("sakana_progress");
    let progMap: Record<string, { completed: boolean }> = {};
    if (savedProgress) {
      try {
        progMap = JSON.parse(savedProgress);
        setProgress(progMap);
      } catch {}
    }

    const savedEmail = localStorage.getItem("sakana_user_email") || "guest@sakana.net";

    if (savedEmail && savedEmail !== "guest@sakana.net") {
      fetch(`/api/srs?userId=${encodeURIComponent(savedEmail)}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data)) {
            const map: Record<string, SrsCardRecord> = {};
            json.data.forEach((r: SrsCardRecord) => {
              map[r.cardId] = r;
            });
            setSrsRecords(map);
          }
        })
        .catch((e) => console.error("Error loading SRS in minigame:", e))
        .finally(() => setIsLoading(false));
    } else {
      try {
        const localSrs = localStorage.getItem("sakana_srs_records");
        if (localSrs) {
          setSrsRecords(JSON.parse(localSrs));
        }
      } catch {}
      setIsLoading(false);
    }
  }, []);

  // 2. Build 30-letter queue once progress & SRS are ready
  const eligibleCards = useMemo(() => {
    const cards = getUnlockedCardsUpToStage(fromStageId || "hiragana-vowels", progress);
    if (cards.length > 0) return cards;

    // Fallback: use first 2 stages (vowels + k-row = 10 cards)
    const firstTwoStages = STAGES.filter(
      (s) => s.category === "hiragana" && !s.isBossStage
    ).slice(0, 2);
    return firstTwoStages.flatMap((s) => s.cards);
  }, [fromStageId, progress]);

  useEffect(() => {
    if (!isLoading && eligibleCards.length > 0) {
      const generatedQueue = buildMinigameQueue(eligibleCards, srsRecords, 30);
      setQueue(generatedQueue);
      setCurrentIndex(0);
      setScore(0);
      setCombo(0);
      setMaxCombo(0);
      setLives(3);
      setTotalAnswered(0);
      setCorrectAnswered(0);
      setStatus("playing");
      setIsAnswered(false);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  }, [isLoading, eligibleCards, srsRecords, sessionKey]);

  // Current Card
  const currentCard = queue[currentIndex];

  // Build 4 multiple choice options (Romaji)
  const currentOptions = useMemo(() => {
    if (!currentCard) return [];

    const correctAnswer = currentCard.romaji;
    const distractors = Array.from(
      new Set(
        eligibleCards
          .map((c) => c.romaji)
          .filter((r) => r !== correctAnswer)
      )
    );

    // Shuffle and pick 3
    const shuffledDistractors = [...distractors].sort(() => 0.5 - Math.random()).slice(0, 3);
    const rawChoices = [correctAnswer, ...shuffledDistractors];

    // Seeded random shuffle
    return [...rawChoices].sort(() => 0.5 - Math.random());
  }, [currentCard, eligibleCards]);

  const correctIndex = useMemo(() => {
    if (!currentCard || currentOptions.length === 0) return -1;
    return currentOptions.indexOf(currentCard.romaji);
  }, [currentCard, currentOptions]);

  // Handle Option Select
  const handleSelectOption = useCallback(
    (index: number) => {
      if (isAnswered || status !== "playing" || !currentCard) return;

      const correct = index === correctIndex;
      setSelectedOption(index);
      setIsAnswered(true);
      setIsCorrect(correct);
      setTotalAnswered((prev) => prev + 1);

      if (correct) {
        setCorrectAnswered((prev) => prev + 1);
        const newCombo = combo + 1;
        setCombo(newCombo);
        setMaxCombo((prev) => Math.max(prev, newCombo));
        setScore((prev) => prev + 100 + newCombo * 20);
        setRecentlyRequeued(null);
      } else {
        // Penalty: lose 1 life, reset combo
        const newLives = lives - 1;
        setLives(newLives);
        setCombo(0);
        setRecentlyRequeued(currentCard.character);

        // Dynamically re-queue the missed card 4-6 cards later!
        setQueue((prevQueue) => {
          const updated = [...prevQueue];
          const insertPos = Math.min(updated.length, currentIndex + 5);
          updated.splice(insertPos, 0, currentCard);
          return updated;
        });

        if (newLives <= 0) {
          setTimeout(() => {
            setStatus("failed");
          }, 400);
          return;
        }
      }

      // Advance after quick arcade feedback (250ms)
      setTimeout(() => {
        if (currentIndex + 1 < queue.length) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
          setIsAnswered(false);
          setIsCorrect(null);
        } else {
          // Finished all 30!
          setStatus("passed");
        }
      }, 250);
    },
    [isAnswered, status, currentCard, correctIndex, combo, lives, currentIndex, queue.length]
  );

  // Keyboard shortcut listener 1-4
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== "playing" || isAnswered) return;
      const keyMap: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3 };
      if (e.key in keyMap) {
        const optionIdx = keyMap[e.key];
        if (optionIdx < currentOptions.length) {
          handleSelectOption(optionIdx);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, isAnswered, currentOptions.length, handleSelectOption]);

  const restartGame = () => {
    setSessionKey((prev) => prev + 1);
  };

  const accuracyPercent =
    totalAnswered > 0 ? Math.round((correctAnswered / totalAnswered) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      {/* Full-width Sticky Retro Navbar */}
      <RetroNavbar currentSubtitle={t.minigame.windowTitle} />

      {/* Edge-to-Edge Responsive Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 flex flex-col justify-center">
        {/* Top Retro Banner */}
        <div className="bg-[#000080] text-white px-3.5 py-2 flex items-center justify-between text-xs font-bold border border-[#808080] shadow-xs">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#ffff00] animate-pulse" />
            <span>{t.minigame.badge}</span>
          </span>
          <span className="text-[#ffff00] font-mono text-xs">
            {currentIndex + 1} / {queue.length || 30}
          </span>
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 bg-white flex flex-col min-h-[460px] border border-[#808080] shadow-xs">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center font-mono text-xs text-[#555]">
              INITIALIZING ADAPTIVE 30-KANA ARCADE POOL...
            </div>
          ) : status === "playing" && currentCard ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
              {/* Main Gameplay Column */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                {/* Heads-Up Display (Lives, Combo, Score) */}
                <div className="grid grid-cols-3 gap-2 bg-[#f4f4f4] border border-[#b0b0b0] p-2 text-xs font-mono mb-3">
                  {/* Lives / Shields */}
                  <div className="flex items-center justify-center gap-1 text-[#cc0000] font-bold">
                    <Shield className="w-4 h-4 fill-[#cc0000]" />
                    <span>
                      {"❤️".repeat(Math.max(0, lives))}
                      {"🖤".repeat(Math.max(0, 3 - lives))}
                    </span>
                  </div>

                {/* Combo Counter */}
                <div className="text-center">
                  <span className="text-[10px] text-[#777] block">{t.minigame.combo}</span>
                  <span className={`text-base font-black ${combo > 3 ? "text-[#e67300] animate-pulse" : "text-[#000080]"}`}>
                    {combo}x
                  </span>
                </div>

                {/* Score */}
                <div className="text-center">
                  <span className="text-[10px] text-[#777] block">{t.minigame.score}</span>
                  <span className="text-base font-bold text-[#008000]">{score}</span>
                </div>
              </div>

              {/* Weak spot alert banner */}
              {recentlyRequeued && (
                <div className="mb-2 bg-[#fff2e6] border border-[#ff9900] px-2 py-1 text-[11px] font-bold text-[#cc6600] flex items-center justify-center gap-1.5 animate-bounce">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{t.minigame.troubleWarning}</span>
                </div>
              )}

              {/* Center Stage: Target Kana Letter */}
              <div className="flex-1 flex flex-col items-center justify-center py-4 bg-gradient-to-b from-[#fafafa] to-[#f0f0f0] border-2 border-[#808080] shadow-inner mb-4 relative overflow-hidden">
                {/* Indicator badge if this is a troubled kana */}
                {currentCard.lapseCount > 0 && (
                  <span className="absolute top-2 right-2 bg-[#cc0000] text-white text-[9px] px-1.5 py-0.5 font-mono uppercase font-bold tracking-wider">
                    TARGET: WEAK SPOT
                  </span>
                )}

                <div className="text-7xl sm:text-8xl font-black text-black select-none tracking-normal font-sans py-2 animate-fade-in">
                  {currentCard.character}
                </div>

                <div className="text-[11px] text-[#555] font-mono mt-1">
                  {t.minigame.pressToAnswer}
                </div>
              </div>

              {/* 4 Choices Grid (Romaji) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {currentOptions.map((opt, idx) => {
                  const isThisSelected = selectedOption === idx;
                  const isThisCorrect = idx === correctIndex;

                  let btnBg = "bg-[#d4d0c8] hover:bg-[#c0bca8] text-black";
                  if (isAnswered) {
                    if (isThisCorrect) {
                      btnBg = "bg-[#008000] text-white border-green-800 animate-pulse";
                    } else if (isThisSelected) {
                      btnBg = "bg-[#cc0000] text-white border-red-800";
                    } else {
                      btnBg = "bg-[#e0ded6] text-[#888] opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`p-3 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] shadow active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-mono font-bold text-base flex items-center justify-between transition-colors ${btnBg}`}
                    >
                      <span className="w-5 h-5 rounded-xs bg-black text-[#00ff66] text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-lg tracking-wider">{opt}</span>
                      <span className="w-5" />
                    </button>
                  );
                })}
              </div>

              {/* Progress Bar (0 to 30) */}
              <div className="mt-3 bg-[#e0ded6] border border-[#808080] h-2 w-full overflow-hidden">
                <div
                  className="bg-[#000080] h-full transition-all duration-200"
                  style={{
                    width: `${Math.min(100, ((currentIndex + 1) / queue.length) * 100)}%`,
                  }}
                />
              </div>
              </div>
              </div>

              {/* Desktop Arcade Cabinet Sidebar */}
              <div className="lg:col-span-4 hidden lg:flex flex-col justify-between border border-[#808080] bg-[#ece9d8] p-3.5 text-xs space-y-3">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#000080] border-b border-[#808080] pb-1.5 flex items-center justify-between">
                    <span>◆ ARCADE CABINET CONTROLS</span>
                    <span className="text-[10px] bg-[#ffff00] text-[#800000] border border-[#800000] px-1 font-bold">
                      COIN OP
                    </span>
                  </div>

                  {/* Hotkeys */}
                  <div className="space-y-1.5 font-mono text-[11px] bg-white p-2.5 border border-[#808080]">
                    <div className="flex justify-between items-center py-0.5 border-b border-[#eee]">
                      <span className="text-[#000080]">TOP-LEFT:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">1</kbd>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-[#eee]">
                      <span className="text-[#000080]">TOP-RIGHT:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">2</kbd>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-[#eee]">
                      <span className="text-[#000080]">BOTTOM-LEFT:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">3</kbd>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#000080]">BOTTOM-RIGHT:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">4</kbd>
                    </div>
                  </div>

                  {/* Rules & Telemetry */}
                  <div className="space-y-1 text-[11px] font-mono bg-[#fdfdfb] p-2.5 border border-[#808080]">
                    <div className="font-bold text-[#b35900] text-[10px] uppercase mb-1">
                      Arcade Rules:
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">Remaining:</span>
                      <span className="font-bold">{queue.length - currentIndex} kana</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">Combo Multiplier:</span>
                      <span className="font-bold text-[#e67300]">{combo > 1 ? `${combo}x BOOST` : "1.0x"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">Requeued Cards:</span>
                      <span className="font-bold text-[#cc0000]">{Math.max(0, totalAnswered - correctAnswered)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="w-full py-1.5 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-[#000080] flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Exit Arcade</span>
                </Link>
              </div>
            </div>
          ) : status === "passed" ? (
            /* Victory Screen */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-4">
              <div className="w-16 h-16 border-2 border-[#008000] bg-[#eeffee] flex items-center justify-center text-[#008000] shadow-md animate-bounce">
                <Award className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <h2 className="text-xl font-black text-[#008000] tracking-wide">
                  {t.minigame.victoryTitle}
                </h2>
                <p className="text-xs text-[#555] mt-1 max-w-sm">
                  {t.minigame.victoryDesc}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 w-full max-w-sm bg-[#f4f4f4] border border-[#b0b0b0] p-2.5 text-xs font-mono">
                <div className="p-1 text-center">
                  <div className="text-[10px] text-[#777]">{t.minigame.score}</div>
                  <div className="text-base font-bold text-[#000080]">{score}</div>
                </div>
                <div className="p-1 text-center">
                  <div className="text-[10px] text-[#777]">{t.minigame.bestCombo}</div>
                  <div className="text-base font-bold text-[#e67300]">{maxCombo}x</div>
                </div>
                <div className="p-1 text-center">
                  <div className="text-[10px] text-[#777]">{t.minigame.accuracy}</div>
                  <div className="text-base font-bold text-[#008000]">{accuracyPercent}%</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-xs space-y-2 pt-2">
                {nextStageId ? (
                  <Link
                    href={`/study/${nextStageId}`}
                    className="w-full py-2.5 px-4 bg-[#ffff00] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#800000] hover:bg-[#fff066] font-black text-xs text-[#800000] flex items-center justify-center gap-2 shadow"
                  >
                    <span>{t.minigame.nextStageBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    className="w-full py-2.5 px-4 bg-[#ffff00] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#800000] hover:bg-[#fff066] font-black text-xs text-[#800000] flex items-center justify-center gap-2 shadow"
                  >
                    <span>{t.minigame.backDashboard}</span>
                  </Link>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={restartGame}
                    className="py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] font-bold text-xs text-[#000080] flex items-center justify-center gap-1 shadow"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{t.minigame.playAgainBtn}</span>
                  </button>

                  <Link
                    href="/dashboard"
                    className="py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] font-bold text-xs text-black flex items-center justify-center shadow"
                  >
                    <span>{t.nav.dashboard}</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Defeat Screen (0 lives) */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-4">
              <div className="w-16 h-16 border-2 border-[#cc0000] bg-[#ffeeee] flex items-center justify-center text-[#cc0000] shadow-md">
                <AlertTriangle className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <h2 className="text-xl font-black text-[#cc0000]">
                  {t.minigame.defeatTitle}
                </h2>
                <p className="text-xs text-[#555] mt-1 max-w-sm">
                  {t.minigame.defeatDesc}
                </p>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-2 gap-2 w-full max-w-xs bg-[#f4f4f4] border border-[#b0b0b0] p-2 text-xs font-mono">
                <div className="p-1 text-center">
                  <div className="text-[10px] text-[#777]">{t.minigame.score}</div>
                  <div className="text-base font-bold text-[#cc0000]">{score}</div>
                </div>
                <div className="p-1 text-center">
                  <div className="text-[10px] text-[#777]">{t.minigame.accuracy}</div>
                  <div className="text-base font-bold text-[#555]">{accuracyPercent}%</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-xs space-y-2 pt-2">
                <button
                  type="button"
                  onClick={restartGame}
                  className="w-full py-2 px-4 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] font-bold text-xs text-[#cc0000] flex items-center justify-center gap-2 shadow"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{t.minigame.playAgainBtn}</span>
                </button>

                {nextStageId && (
                  <Link
                    href={`/study/${nextStageId}`}
                    className="w-full py-2 px-4 bg-[#f0f0f0] border border-[#808080] hover:bg-[#e0ded6] font-bold text-xs text-[#000080] flex items-center justify-center gap-1 shadow"
                  >
                    <span>{t.minigame.nextStageBtn}</span>
                  </Link>
                )}

                <Link
                  href="/dashboard"
                  className="block py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] font-bold text-xs text-black shadow text-center"
                >
                  <span>{t.nav.dashboard}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Docked Retro Footer */}
      <footer className="border-t border-[#808080] bg-[#d4d0c8] px-3 sm:px-6 py-2 text-[11px] text-[#404040] flex items-center justify-between font-mono shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#cc0000]"></span>
          <span>ARCADE SURVIVAL MODE</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span>ADAPTIVE RETENTION POOL</span>
          <span className="border-l border-[#808080] pl-2 font-mono">LIVES: {lives} / 3</span>
        </div>
      </footer>
    </div>
  );
}

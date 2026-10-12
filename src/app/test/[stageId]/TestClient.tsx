"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { STAGES, Stage, StudyCard } from "@/data/stages";
import { RetroNavbar } from "@/components/RetroNavbar";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, RotateCw, Check, Play, BookOpen, AlertCircle, Zap, Award } from "lucide-react";

export type QuestionType = "kana_to_romaji" | "romaji_to_kana";

interface TestQuestion {
  card: StudyCard;
  type: QuestionType;
  prompt: string;
  subPrompt?: string;
  options: string[]; // 4 choices (romaji or kana depending on question type)
  correctIndex: number;
}

export default function TestClient({ stageId }: { stageId: string }) {
  const { t, locale } = useLanguage();

  const stage = useMemo(() => STAGES.find((s) => s.id === stageId) || STAGES[0], [stageId]);
  const timeLimit = stage?.targetDurationSeconds || 15;

  const [testSession, setTestSession] = useState(0);

  // Generate randomized questions and 4 options for each card (random mix of Kana->Romaji and Romaji->Kana)
  const questions: TestQuestion[] = useMemo(() => {
    if (!stage?.cards || stage.cards.length === 0) return [];

    // All available distractor answers from the same category and global fallback
    const sameCategoryCards = STAGES.filter((s) => s.category === stage.category).flatMap((s) => s.cards);
    const allStageCards = STAGES.flatMap((s) => s.cards);

    // Shuffle cards so question order is random rather than fixed (a -> i -> u -> e -> o)
    const shuffledCards = [...stage.cards].sort(() => 0.5 - Math.random());

    return shuffledCards.map((card) => {
      // Randomly pick question type: 50% chance Kana -> Romaji, 50% chance Romaji -> Kana
      const type: QuestionType = Math.random() < 0.5 ? "kana_to_romaji" : "romaji_to_kana";

      const isKanaToRomaji = type === "kana_to_romaji";
      const prompt = isKanaToRomaji ? card.character : card.romaji;
      const correctAnswer = isKanaToRomaji ? card.romaji : card.character;

      // 1. Distractors from the CURRENT stage first
      const stageDistractors = Array.from(
        new Set(
          stage.cards
            .map((c) => (isKanaToRomaji ? c.romaji : c.character))
            .filter((ans) => ans !== correctAnswer)
        )
      );

      // 2. Fallback distractors from the same category if current stage has fewer than 3 other cards
      const categoryDistractors = Array.from(
        new Set(
          sameCategoryCards
            .map((c) => (isKanaToRomaji ? c.romaji : c.character))
            .filter((ans) => ans !== correctAnswer && !stageDistractors.includes(ans))
        )
      );

      // 3. Fallback from any cards across all stages if still needed
      const globalDistractors = Array.from(
        new Set(
          allStageCards
            .map((c) => (isKanaToRomaji ? c.romaji : c.character))
            .filter((ans) => ans !== correctAnswer && !stageDistractors.includes(ans) && !categoryDistractors.includes(ans))
        )
      );

      const shuffledStageDistractors = [...stageDistractors].sort(() => 0.5 - Math.random());
      const shuffledCategoryDistractors = [...categoryDistractors].sort(() => 0.5 - Math.random());
      const shuffledGlobalDistractors = [...globalDistractors].sort(() => 0.5 - Math.random());

      const selectedOthers = [
        ...shuffledStageDistractors,
        ...shuffledCategoryDistractors,
        ...shuffledGlobalDistractors,
      ].slice(0, 3);

      // Create 4 choices and shuffle
      const rawChoices = [correctAnswer, ...selectedOthers];
      const choices = [...rawChoices].sort(() => 0.5 - Math.random());
      const correctIndex = choices.indexOf(correctAnswer);

      return {
        card,
        type,
        prompt,
        options: choices,
        correctIndex,
      };
    });
  }, [stage, testSession]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  // Timer states
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [status, setStatus] = useState<"playing" | "passed" | "failed">("playing");
  const [failureReason, setFailureReason] = useState<"timeout" | "accuracy">("timeout");

  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start countdown on mount or reset
  const resetTest = useCallback(() => {
    setTestSession((prev) => prev + 1);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setCorrectCount(0);
    setTimeLeft(timeLimit);
    setElapsedMs(0);
    setStatus("playing");
    setFailureReason("timeout");
    startTimeRef.current = Date.now();
  }, [timeLimit]);

  useEffect(() => {
    resetTest();
  }, [resetTest]);

  // Handle countdown interval
  useEffect(() => {
    if (status !== "playing") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      setElapsedMs(elapsed);

      const remaining = Math.max(0, timeLimit - elapsed / 1000);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        setFailureReason("timeout");
        setStatus("failed");
        clearInterval(timerRef.current!);
      }
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, timeLimit]);

  // Persist result when finished
  const finalizeResult = useCallback(
    (passed: boolean, finalElapsedMs: number, finalCorrect: number) => {
      const accuracy = Math.round((finalCorrect / Math.max(1, questions.length)) * 100);
      const isSpeedGoalMet = finalElapsedMs / 1000 <= timeLimit;
      const stars = passed && isSpeedGoalMet && accuracy === 100 ? 3 : passed ? 2 : 1;

      // Local storage persistence
      try {
        const stored = JSON.parse(localStorage.getItem("sakana_progress") || "{}");
        const prevBest = stored[stageId]?.bestDurationMs;
        const newBest = prevBest ? Math.min(prevBest, finalElapsedMs) : finalElapsedMs;

        stored[stageId] = {
          completed: passed || stored[stageId]?.completed,
          stars: Math.max(stars, stored[stageId]?.stars || 0),
          bestDurationMs: newBest,
        };
        localStorage.setItem("sakana_progress", JSON.stringify(stored));
      } catch {}

      // Neon Database Sync (only for logged-in accounts)
      const userEmail = typeof window !== "undefined"
        ? localStorage.getItem("sakana_user_email") || "guest@sakana.net"
        : "guest@sakana.net";

      if (userEmail && userEmail !== "guest@sakana.net") {
        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userEmail,
            stageId,
            completed: passed,
            stars,
            durationMs: finalElapsedMs,
            accuracyPercentage: accuracy,
          }),
        }).catch((err) => console.error("Neon progress sync error:", err));
      }
    },
    [stageId, timeLimit, questions.length]
  );

  const handleSelectOption = useCallback(
    (index: number) => {
      if (isAnswered || status !== "playing") return;

      const currentQ = questions[currentIndex];
      if (!currentQ) return;

      const correct = index === currentQ.correctIndex;
      setSelectedOption(index);
      setIsAnswered(true);
      setIsCorrect(correct);

      const newCorrectCount = correct ? correctCount + 1 : correctCount;
      if (correct) {
        setCorrectCount((prev) => prev + 1);
      }

      // Short delay before advancing
      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
          setIsAnswered(false);
          setIsCorrect(null);
        } else {
          // Finished all questions
          const totalElapsed = Date.now() - startTimeRef.current;
          const isTimeOk = totalElapsed / 1000 <= timeLimit;
          const isAccuracyOk = (newCorrectCount / questions.length) >= 0.8;
          const passed = isTimeOk && isAccuracyOk;

          if (!passed) {
            setFailureReason(!isTimeOk ? "timeout" : "accuracy");
          }
          setStatus(passed ? "passed" : "failed");
          finalizeResult(passed, totalElapsed, newCorrectCount);
        }
      }, 350);
    },
    [isAnswered, status, questions, currentIndex, correctCount, timeLimit, finalizeResult]
  );

  // Keyboard shortcut listener for numbers 1 to 4
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== "playing" || isAnswered) return;
      if (e.key === "1") handleSelectOption(0);
      else if (e.key === "2") handleSelectOption(1);
      else if (e.key === "3") handleSelectOption(2);
      else if (e.key === "4") handleSelectOption(3);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, isAnswered, handleSelectOption]);

  const currentQ = questions[currentIndex];
  const stageDisplayName = stage.name[locale];
  const isBoss = !!stage.isBossStage;
  const timeBarPercent = Math.max(0, Math.min(100, (timeLeft / timeLimit) * 100));

  // Determine next stage
  const currentStageIndex = STAGES.findIndex((s) => s.id === stageId);
  const nextStage = currentStageIndex >= 0 && currentStageIndex + 1 < STAGES.length ? STAGES[currentStageIndex + 1] : null;

  return (
    <div className="min-h-screen py-4 px-2 sm:px-6 flex flex-col items-center justify-between">
      {/* Outer Windows Container */}
      <div className={`w-full max-w-xl bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] shadow-md flex flex-col ${
        isBoss ? "ring-2 ring-[#cc0000]" : ""
      }`}>
        {/* Retro Navbar */}
        <RetroNavbar currentSubtitle={`${isBoss ? "⚔️ BOSS BATTLE" : t.test.windowTitle} - ${stageDisplayName}`} />

        {/* Top Info Bar */}
        <div className={`border-b border-[#808080] px-2 py-1 text-[11px] flex items-center justify-between text-black ${
          isBoss ? "bg-[#ffe4e1]" : "bg-[#ece9d8]"
        }`}>
          <Link
            href="/dashboard"
            className="text-[#000080] underline hover:text-[#cc0000] flex items-center gap-1 text-[10px]"
          >
            <ArrowLeft className="w-3 h-3" /> {t.test.backToDashboard}
          </Link>
          <span className={`font-mono text-[10px] uppercase font-bold ${isBoss ? "text-[#990000]" : "text-[#555]"}`}>
            {isBoss ? "⚡ BOSS CHECKPOINT" : stageDisplayName}
          </span>
        </div>

        {/* Test Header with Countdown Meter */}
        <div className={`${isBoss ? "bg-[#fff0f0]" : "bg-[#fff8e7]"} border-b border-[#808080] px-3 py-2`}>
          <div className="flex items-center justify-between text-xs">
            <span className={`font-bold flex items-center gap-1 font-mono ${isBoss ? "text-[#800000]" : "text-[#cc0000]"}`}>
              <Zap className="w-3.5 h-3.5 fill-current" />
              {isBoss ? "BOSS CHALLENGE REFLEX TEST" : t.test.testBadge}
            </span>
            <div className="font-mono text-xs font-bold flex items-center gap-2">
              <span className="text-[#555]">{t.test.timeRemaining}:</span>
              <span
                className={`text-sm px-1.5 py-0.5 border ${
                  timeLeft <= 5
                    ? "bg-[#cc0000] text-white animate-pulse"
                    : "bg-white text-[#cc0000] border-[#808080]"
                }`}
              >
                {timeLeft.toFixed(1)}s
              </span>
            </div>
          </div>

          {/* Retro Win98 Style Progress Bar */}
          <div className="w-full h-3 bg-[#e0e0e0] border border-[#808080] mt-1.5 p-0.5 flex">
            <div
              className={`h-full transition-all duration-100 ${
                timeLeft <= 5 ? "bg-[#cc0000]" : "bg-[#000080]"
              }`}
              style={{ width: `${timeBarPercent}%` }}
            />
          </div>
        </div>

        {/* Play Area */}
        <div className="p-4 bg-white text-black min-h-[380px] flex flex-col justify-between">
          {status === "playing" && currentQ ? (
            <>
              {/* Question progress */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-[#d0d0d0] pb-2">
                <span className="text-[#000080] font-bold">
                  {t.test.questionProgress}: {currentIndex + 1} / {questions.length}
                </span>
                <span className="text-[#888] text-[10px] hidden sm:inline">
                  {t.test.choosePrompt}
                </span>
              </div>

              {/* Character / Romaji Prompt Card */}
              <div className="my-4 py-8 px-4 border-2 border-[#000080] bg-[#f8f9fa] flex flex-col items-center justify-center text-center shadow-inner relative">
                <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 border border-[#808080] bg-[#ece9d8] text-[#333] uppercase">
                  {currentQ.type === "kana_to_romaji" ? "Kana ➔ Romaji" : "Romaji ➔ Kana"}
                </span>
                <div
                  className={`font-bold select-none tracking-tight ${
                    currentQ.type === "kana_to_romaji"
                      ? "text-7xl sm:text-8xl font-serif text-[#000080]"
                      : "text-6xl sm:text-7xl font-mono text-[#cc0000] lowercase"
                  }`}
                >
                  {currentQ.prompt}
                </div>
              </div>

              {/* 4 Choices Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {currentQ.options.map((option, idx) => {
                  let buttonColor = "bg-[#d4d0c8] text-black hover:bg-[#c0bca8]";
                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      buttonColor = "bg-[#008000] text-white";
                    } else if (idx === selectedOption) {
                      buttonColor = "bg-[#cc0000] text-white";
                    }
                  }

                  const isKanaChoice = currentQ.type === "romaji_to_kana";

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`py-3 px-3 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-sm flex items-center justify-between shadow ${buttonColor}`}
                    >
                      <span className="font-mono text-xs px-1.5 py-0.5 bg-black/10 rounded">
                        {idx + 1}
                      </span>
                      <span
                        className={
                          isKanaChoice
                            ? "text-2xl font-serif text-center flex-1"
                            : "font-mono text-base uppercase text-center flex-1"
                        }
                      >
                        {option}
                      </span>
                      <span className="w-4" />
                    </button>
                  );
                })}
              </div>
            </>
          ) : status === "passed" ? (
            /* Passed Screen */
            <div className="p-4 flex flex-col items-center justify-center text-center my-auto space-y-4">
              <div className="w-14 h-14 border-2 border-[#008000] bg-[#eef8ee] flex items-center justify-center text-[#008000] shadow">
                <Award className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#008000] tracking-wide">
                  {t.test.passTitle}
                </h2>
                <p className="text-xs text-[#555] mt-1 max-w-sm">
                  {t.test.passDesc}
                </p>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-2 gap-2 w-full max-w-xs bg-[#f4f4f4] border border-[#b0b0b0] p-2 text-xs font-mono">
                <div className="p-1 text-center">
                  <div className="text-[10px] text-[#777]">{t.test.yourTime}</div>
                  <div className="text-base font-bold text-[#000080]">
                    {(elapsedMs / 1000).toFixed(1)}s
                  </div>
                </div>
                <div className="p-1 text-center">
                  <div className="text-[10px] text-[#777]">{t.test.accuracy}</div>
                  <div className="text-base font-bold text-[#008000]">
                    {Math.round((correctCount / questions.length) * 100)}%
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-xs space-y-2 pt-2">
                {/* 2-Boss Milestone Bonus Arcade Banner */}
                {isBoss && stage.id.match(/-boss-([0-9]+)/) && parseInt(stage.id.match(/-boss-([0-9]+)/)![1], 10) % 2 === 0 && (
                  <div className="bg-[#fff9e6] border-2 border-[#ff9900] p-2.5 mb-2 shadow text-left">
                    <div className="text-[11px] font-black text-[#b35900] flex items-center gap-1">
                      <span className="animate-star-twinkle text-[#ff6600]">✦</span>
                      <span>{t.test.bonusUnlockedTitle}</span>
                    </div>
                    <p className="text-[10px] text-[#666] mt-0.5 leading-snug">
                      {t.test.bonusUnlockedDesc}
                    </p>
                    <Link
                      href={`/minigame?from=${stage.id}&next=${nextStage ? nextStage.id : ""}`}
                      className="mt-2 w-full py-2 px-3 bg-[#ffff00] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#800000] hover:bg-[#fff066] font-black text-xs text-[#800000] flex items-center justify-center gap-1.5 shadow"
                    >
                      <span>{t.test.playMinigameBtn}</span>
                    </Link>
                  </div>
                )}

                {nextStage && (
                  <Link
                    href={`/study/${nextStage.id}`}
                    className="w-full py-2 px-4 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] font-bold text-xs text-[#000080] flex items-center justify-center gap-2 shadow"
                  >
                    <span>
                      {isBoss && stage.id.match(/-boss-([0-9]+)/) && parseInt(stage.id.match(/-boss-([0-9]+)/)![1], 10) % 2 === 0
                        ? t.test.skipMinigameBtn
                        : t.test.nextStageBtn}
                    </span>
                  </Link>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={resetTest}
                    className="py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] font-bold text-xs text-[#cc0000] flex items-center justify-center gap-1.5 shadow"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{t.test.tryAgainBtn}</span>
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
            /* Failed / Time Expired Screen */
            <div className="p-4 flex flex-col items-center justify-center text-center my-auto space-y-4">
              <div className="w-14 h-14 border-2 border-[#cc0000] bg-[#ffeeee] flex items-center justify-center text-[#cc0000] shadow">
                <AlertCircle className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#cc0000]">
                  {failureReason === "accuracy" ? t.test.failWrongTitle : t.test.failTitle}
                </h2>
                <p className="text-xs text-[#555] mt-1 max-w-sm">
                  {failureReason === "accuracy" ? t.test.failWrongDesc : t.test.failDesc}
                </p>
              </div>

              {/* Stats Box on Failure */}
              <div className="grid grid-cols-2 gap-2 w-full max-w-xs bg-[#f4f4f4] border border-[#b0b0b0] p-2 text-xs font-mono">
                <div className="p-1 text-center">
                  <div className="text-[10px] text-[#777]">{t.test.yourTime}</div>
                  <div className={`text-base font-bold ${elapsedMs / 1000 <= timeLimit ? "text-[#008000]" : "text-[#cc0000]"}`}>
                    {(elapsedMs / 1000).toFixed(1)}s
                  </div>
                </div>
                <div className="p-1 text-center">
                  <div className="text-[10px] text-[#777]">{t.test.accuracy}</div>
                  <div className={`text-base font-bold ${Math.round((correctCount / questions.length) * 100) >= 80 ? "text-[#008000]" : "text-[#cc0000]"}`}>
                    {Math.round((correctCount / questions.length) * 100)}%
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-xs space-y-2 pt-2">
                <button
                  type="button"
                  onClick={resetTest}
                  className="w-full py-2.5 px-4 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] font-black text-xs text-[#cc0000] flex items-center justify-center gap-2 shadow"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>{t.test.tryAgainBtn}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/study/${stage.id}`}
                    className="py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] font-bold text-xs text-[#000080] flex items-center justify-center gap-1 shadow"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t.test.studyFirstBtn}</span>
                  </Link>

                  <Link
                    href="/dashboard"
                    className="py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] font-bold text-xs text-black flex items-center justify-center shadow"
                  >
                    <span>{t.nav.dashboard}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Windows Control Bar */}
        <div className="border-t border-[#808080] bg-[#ece9d8] p-2 flex items-center justify-between text-xs">
          <Link
            href="/dashboard"
            className="px-3 py-1 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] text-black font-bold text-xs hover:bg-[#c0bca8]"
          >
            &lt;&lt; {t.nav.back}
          </Link>
          <span className="text-[10px] text-[#555] font-mono">
            {t.test.targetSpeed}: &lt; {timeLimit}s
          </span>
        </div>
      </div>
    </div>
  );
}

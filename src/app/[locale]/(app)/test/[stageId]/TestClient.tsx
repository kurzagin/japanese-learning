"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { STAGES, Stage, StudyCard, getStageUnlockStatus, STAGES_BY_ID } from "@/data/stages";
import { RetroNavbar } from "@/components/RetroNavbar";
import { StageLockedView } from "@/components/StageLockedView";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, RotateCw, Check, Play, BookOpen, AlertCircle, Zap, Award, Swords, Sparkles, Volume2, VolumeX } from "lucide-react";

export type QuestionType =
  | "kana_to_romaji"
  | "romaji_to_kana"
  | "audio_to_kana"
  | "audio_to_romaji";

interface TestQuestion {
  card: StudyCard;
  type: QuestionType;
  prompt: string;
  subPrompt?: string;
  options: string[]; // 4 choices (pure kana or pure romaji)
  correctIndex: number;
}

export default function TestClient({
  stageId,
  initialStage,
  allStages = [],
}: {
  stageId: string;
  initialStage?: Stage;
  allStages?: Stage[];
}) {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const stage = useMemo(
    () => initialStage || allStages.find((s) => s.id === stageId) || allStages[0],
    [initialStage, allStages, stageId]
  );
  const timeLimit = stage?.targetDurationSeconds || 15;

  const [testSession, setTestSession] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Sync audioEnabled from localStorage and listen to preference changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sakana_test_enable_audio");
      if (saved !== null) {
        setAudioEnabled(saved === "true");
      }
      const handlePrefChange = () => {
        const updated = localStorage.getItem("sakana_test_enable_audio");
        if (updated !== null) {
          setAudioEnabled(updated === "true");
        }
      };
      window.addEventListener("sakana_preferences_changed", handlePrefChange);
      return () => window.removeEventListener("sakana_preferences_changed", handlePrefChange);
    }
  }, []);

  const toggleAudioPreference = useCallback(() => {
    const nextVal = !audioEnabled;
    setAudioEnabled(nextVal);
    if (typeof window !== "undefined") {
      localStorage.setItem("sakana_test_enable_audio", String(nextVal));
      window.dispatchEvent(new Event("sakana_preferences_changed"));
    }
    // Re-generate questions with new preference
    setTestSession((prev) => prev + 1);
  }, [audioEnabled]);

  // Generate randomized questions and 4 options for each card (random mix of Kana->Romaji, Romaji->Kana, and Audio->Kana+Romaji)
  const questions: TestQuestion[] = useMemo(() => {
    if (!stage?.cards || stage.cards.length === 0) return [];

    // All available distractor cards from the same category and global fallback
    const sameCategoryCards = allStages.filter((s) => s.category === stage.category).flatMap((s) => s.cards);
    const allStageCards = allStages.flatMap((s) => s.cards);

    // Shuffle cards so question order is random rather than fixed
    const shuffledCards = [...stage.cards].sort(() => 0.5 - Math.random());

    return shuffledCards.map((card) => {
      // Pick question type
      let type: QuestionType;
      if (audioEnabled) {
        const rand = Math.random();
        if (rand < 0.35) {
          type = "kana_to_romaji";
        } else if (rand < 0.70) {
          type = "romaji_to_kana";
        } else if (rand < 0.85) {
          type = "audio_to_kana";
        } else {
          type = "audio_to_romaji";
        }
      } else {
        type = Math.random() < 0.5 ? "kana_to_romaji" : "romaji_to_kana";
      }

      // Determine prompt & whether the answer choices should be Kana or Romaji
      const isAudio = type === "audio_to_kana" || type === "audio_to_romaji";
      const choicesAreKana = type === "romaji_to_kana" || type === "audio_to_kana";

      const prompt = isAudio
        ? card.character // Spoken Japanese sound
        : type === "kana_to_romaji"
        ? card.character
        : card.romaji;

      const correctAnswer = choicesAreKana ? card.character : card.romaji;

      // 1. Distractors from CURRENT stage first
      const stageDistractors = Array.from(
        new Set(
          stage.cards
            .map((c) => (choicesAreKana ? c.character : c.romaji))
            .filter((ans) => ans !== correctAnswer)
        )
      );

      // 2. Fallback distractors from same category
      const categoryDistractors = Array.from(
        new Set(
          sameCategoryCards
            .map((c) => (choicesAreKana ? c.character : c.romaji))
            .filter((ans) => ans !== correctAnswer && !stageDistractors.includes(ans))
        )
      );

      // 3. Fallback from any cards across all stages
      const globalDistractors = Array.from(
        new Set(
          allStageCards
            .map((c) => (choicesAreKana ? c.character : c.romaji))
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
  }, [stage, testSession, audioEnabled, allStages]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const [progress, setProgress] = useState<Record<string, { completed?: boolean }>>({});
  const [isCheckingUnlock, setIsCheckingUnlock] = useState(true);

  // Load progress to verify whether stage is unlocked
  useEffect(() => {
    let progMap: Record<string, { completed?: boolean }> = {};
    const savedProgress = localStorage.getItem("sakana_progress");
    if (savedProgress) {
      try {
        progMap = JSON.parse(savedProgress);
        setProgress(progMap);
      } catch {}
    }

    const email =
      typeof window !== "undefined"
        ? localStorage.getItem("sakana_user_email") || "guest@sakanajp.site"
        : "guest@sakanajp.site";

    if (email && email !== "guest@sakanajp.site") {
      fetch(`/api/progress?userId=${encodeURIComponent(email)}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data)) {
            const remoteProg: Record<string, { completed?: boolean }> = {};
            json.data.forEach((r: any) => {
              remoteProg[r.stageId] = { completed: r.completed };
            });
            setProgress((prev) => ({ ...prev, ...remoteProg }));
          }
        })
        .catch((e) => console.error("Error loading progress in test:", e))
        .finally(() => setIsCheckingUnlock(false));
    } else {
      setIsCheckingUnlock(false);
    }
  }, []);

  // Timer states
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [status, setStatus] = useState<"playing" | "passed" | "failed">("playing");
  const [failureReason, setFailureReason] = useState<"timeout" | "accuracy">("timeout");

  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio pause tracking
  const pauseStartTimeRef = useRef<number | null>(null);
  const accumulatedPausedMsRef = useRef<number>(0);

  const pauseTimer = useCallback(() => {
    if (pauseStartTimeRef.current === null) {
      pauseStartTimeRef.current = Date.now();
    }
  }, []);

  const resumeTimer = useCallback(() => {
    if (pauseStartTimeRef.current !== null) {
      const pausedDuration = Date.now() - pauseStartTimeRef.current;
      accumulatedPausedMsRef.current += pausedDuration;
      pauseStartTimeRef.current = null;
    }
  }, []);

  // Web Speech playback with automatic timer pause & resume
  const playQuestionAudio = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsAudioPlaying(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      pauseTimer();
      setIsAudioPlaying(true);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;

      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find((v) => v.lang.startsWith("ja") || v.lang.includes("JP"));
      if (jaVoice) {
        utterance.voice = jaVoice;
      }

      utterance.onstart = () => {
        pauseTimer();
        setIsAudioPlaying(true);
      };

      utterance.onend = () => {
        resumeTimer();
        setIsAudioPlaying(false);
      };

      utterance.onerror = () => {
        resumeTimer();
        setIsAudioPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      resumeTimer();
      setIsAudioPlaying(false);
    }
  }, [pauseTimer, resumeTimer]);

  // Start countdown on mount or reset
  const resetTest = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
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
    setIsAudioPlaying(false);
    pauseStartTimeRef.current = null;
    accumulatedPausedMsRef.current = 0;
    startTimeRef.current = Date.now();
  }, [timeLimit]);

  useEffect(() => {
    resetTest();
  }, [resetTest]);

  // Trigger audio playback whenever an audio question is active
  useEffect(() => {
    if (status !== "playing") return;
    const currentQ = questions[currentIndex];
    const isAudioQ = currentQ && (currentQ.type === "audio_to_kana" || currentQ.type === "audio_to_romaji");
    if (isAudioQ) {
      playQuestionAudio(currentQ.prompt);
    } else {
      resumeTimer();
      setIsAudioPlaying(false);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentIndex, status, questions, playQuestionAudio, resumeTimer]);

  // Handle countdown interval (pauses elapsed accumulation while audio plays)
  useEffect(() => {
    if (status !== "playing") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      // If currently paused for audio, do not advance active elapsed timer
      if (pauseStartTimeRef.current !== null) {
        return;
      }

      const now = Date.now();
      const rawElapsed = now - startTimeRef.current;
      const netElapsed = Math.max(0, rawElapsed - accumulatedPausedMsRef.current);
      setElapsedMs(netElapsed);

      const remaining = Math.max(0, timeLimit - netElapsed / 1000);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        setFailureReason("timeout");
        setStatus("failed");
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
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
        ? localStorage.getItem("sakana_user_email") || "guest@sakanajp.site"
        : "guest@sakanajp.site";

      if (userEmail && userEmail !== "guest@sakanajp.site") {
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
          if (pauseStartTimeRef.current !== null) {
            accumulatedPausedMsRef.current += Date.now() - pauseStartTimeRef.current;
            pauseStartTimeRef.current = null;
          }
          const rawTotal = Date.now() - startTimeRef.current;
          const totalElapsed = Math.max(0, rawTotal - accumulatedPausedMsRef.current);
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

  // Keyboard shortcut listener for numbers 1 to 4 and R for audio replay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== "playing") return;
      if (e.key === "r" || e.key === "R") {
        const q = questions[currentIndex];
        if (q && (q.type === "audio_to_kana" || q.type === "audio_to_romaji")) {
          e.preventDefault();
          playQuestionAudio(q.prompt);
          return;
        }
      }
      if (isAnswered) return;
      if (e.key === "1") handleSelectOption(0);
      else if (e.key === "2") handleSelectOption(1);
      else if (e.key === "3") handleSelectOption(2);
      else if (e.key === "4") handleSelectOption(3);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, isAnswered, handleSelectOption, questions, currentIndex, playQuestionAudio]);

  const currentQ = questions[currentIndex];
  const stageDisplayName = stage.name[locale];
  const isBoss = !!stage.isBossStage;
  const timeBarPercent = Math.max(0, Math.min(100, (timeLeft / timeLimit) * 100));

  // Determine next stage
  const currentStageIndex = allStages.findIndex((s) => s.id === stageId);
  const nextStage = currentStageIndex >= 0 && currentStageIndex + 1 < allStages.length ? allStages[currentStageIndex + 1] : null;

  // Check if test stage is locked
  if (!isCheckingUnlock) {
    const unlockStatus = getStageUnlockStatus(stage.id, progress, allStages);
    if (!unlockStatus.isUnlocked) {
      const requiredStages: Stage[] = [];
      if (unlockStatus.requiredStage) {
        requiredStages.push(unlockStatus.requiredStage);
      } else if (unlockStatus.requiredStageIds) {
        unlockStatus.requiredStageIds.forEach((id) => {
          const s = allStages.find((st) => st.id === id) || STAGES_BY_ID.get(id);
          if (s) requiredStages.push(s);
        });
      }
      return <StageLockedView requiredStages={requiredStages} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      {/* Full-width Sticky Retro Navbar */}
      <RetroNavbar currentSubtitle={`${isBoss ? t.common.bossBattleTest : t.test.windowTitle} - ${stageDisplayName}`} />

      {/* Edge-to-Edge Responsive Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 flex flex-col justify-center">
        {/* Top Info Bar */}
        <div className={`border border-[#808080] px-3.5 py-2 text-xs flex items-center justify-between text-black shadow-xs ${
          isBoss ? "bg-[#ffe4e1]" : "bg-[#d4d0c8]"
        }`}>
          <Link
            href={`${prefix}/dashboard`}
            className="text-[#000080] underline hover:text-[#cc0000] flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> {t.test.backToDashboard}
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAudioPreference}
              className={`px-2 py-0.5 text-[10px] font-mono font-bold border border-t-white border-l-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white flex items-center gap-1 ${
                audioEnabled ? "bg-[#008000] text-white" : "bg-[#d4d0c8] text-[#555]"
              }`}
              title="Toggle audio questions"
            >
              {audioEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
              <span>{audioEnabled ? t.test.audioQuestionsOn : t.test.audioQuestionsOff}</span>
            </button>
            <span className={`font-mono text-xs uppercase font-bold flex items-center gap-1 ${isBoss ? "text-[#990000]" : "text-[#555]"}`}>
              {isBoss && <Swords className="w-3.5 h-3.5 inline" />}
              <span>{isBoss ? t.common.bossCheckpoint : stageDisplayName}</span>
            </span>
          </div>
        </div>

        {/* Test Header with Countdown Meter */}
        <div className={`${isBoss ? "bg-[#fff0f0] border-2 border-[#cc0000]" : "bg-[#fff8e7] border border-[#808080]"} p-3 shadow-xs`}>
          <div className="flex items-center justify-between text-xs">
            <span className={`font-bold flex items-center gap-1 font-mono ${isBoss ? "text-[#800000]" : "text-[#cc0000]"}`}>
              <Zap className="w-3.5 h-3.5 fill-current" />
              {isBoss ? t.common.bossBattleTest : t.test.testBadge}
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
        <div className="p-3 sm:p-5 bg-white text-black min-h-[380px] flex flex-col justify-between">
          {status === "playing" && currentQ ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Main Test Column */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-3">

              {/* Question progress & Audio Status Indicator */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-[#d0d0d0] pb-2">
                <span className="text-[#000080] font-bold">
                  {t.test.questionProgress}: {currentIndex + 1} / {questions.length}
                </span>
                {(currentQ.type === "audio_to_kana" || currentQ.type === "audio_to_romaji") && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 border flex items-center gap-1 ${
                      isAudioPlaying
                        ? "bg-[#ffffcc] text-[#996600] border-[#996600] animate-pulse"
                        : "bg-[#eef8ee] text-[#008000] border-[#008000]"
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isAudioPlaying ? t.test.audioPlayingStatus : t.test.audioReadyStatus}</span>
                  </span>
                )}
                <span className="text-[#888] text-[10px] hidden sm:inline">
                  {t.test.choosePrompt}
                </span>
              </div>

              {/* Character / Romaji / Audio Prompt Card */}
              <div className="my-4 py-8 px-4 border-2 border-[#000080] bg-[#f8f9fa] flex flex-col items-center justify-center text-center shadow-inner relative min-h-[170px]">
                <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 border border-[#808080] bg-[#ece9d8] text-[#333] uppercase">
                  {currentQ.type === "kana_to_romaji"
                    ? t.test.kanaToRomajiBadge
                    : currentQ.type === "romaji_to_kana"
                    ? t.test.romajiToKanaBadge
                    : currentQ.type === "audio_to_kana"
                    ? t.test.audioToKanaBadge
                    : t.test.audioToRomajiBadge}
                </span>

                {currentQ.type === "audio_to_kana" || currentQ.type === "audio_to_romaji" ? (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <button
                      type="button"
                      onClick={() => playQuestionAudio(currentQ.prompt)}
                      className={`w-20 h-20 rounded-full border-2 border-[#000080] flex items-center justify-center shadow-md transition-all ${
                        isAudioPlaying
                          ? "bg-[#000080] text-white scale-105 animate-pulse"
                          : "bg-[#e0e0ff] text-[#000080] hover:bg-[#000080] hover:text-white"
                      }`}
                      aria-label={t.test.audioReplayBtn}
                    >
                      <Volume2 className="w-10 h-10" />
                    </button>
                    <div className="text-xs font-mono font-bold text-[#555]">
                      {t.test.audioListeningPrompt}
                    </div>
                    <button
                      type="button"
                      onClick={() => playQuestionAudio(currentQ.prompt)}
                      className="px-2.5 py-1 text-[11px] font-bold font-mono bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white flex items-center gap-1 text-[#000080]"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>{t.test.audioReplayBtn}</span>
                    </button>
                  </div>
                ) : (
                  <div
                    className={`font-bold tracking-tight ${
                      currentQ.type === "kana_to_romaji"
                        ? "text-7xl sm:text-8xl font-serif text-[#000080]"
                        : "text-6xl sm:text-7xl font-mono text-[#cc0000] lowercase"
                    }`}
                  >
                    {currentQ.prompt}
                  </div>
                )}
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

                  const isKanaChoice =
                    currentQ.type === "romaji_to_kana" || currentQ.type === "audio_to_kana";

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
              </div>

              {/* Desktop Test Workstation Telemetry */}
              <div className="lg:col-span-4 hidden lg:flex flex-col justify-between border border-[#808080] bg-[#ece9d8] p-3.5 text-xs space-y-3">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#000080] border-b border-[#808080] pb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-[#000080]" />
                      <span>{t.common.arcadeControls}</span>
                    </span>
                    <span className="text-[10px] bg-white border border-[#808080] px-1 font-mono">
                      {t.common.hotkeys}
                    </span>
                  </div>

                  {/* Hotkeys */}
                  <div className="space-y-1.5 font-mono text-[11px] bg-white p-2.5 border border-[#808080]">
                    <div className="flex justify-between items-center py-0.5 border-b border-[#eee]">
                      <span className="text-[#000080]">1:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">1</kbd>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-[#eee]">
                      <span className="text-[#000080]">2:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">2</kbd>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-[#eee]">
                      <span className="text-[#000080]">3:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">3</kbd>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-[#eee]">
                      <span className="text-[#000080]">4:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">4</kbd>
                    </div>
                    <div className="flex justify-between items-center py-0.5 text-[#555]">
                      <span className="text-[#000080]">REPLAY AUDIO:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">R</kbd>
                    </div>
                  </div>

                  {/* Benchmark */}
                  <div className="space-y-1 text-[11px] font-mono bg-[#fdfdfb] p-2.5 border border-[#808080]">
                    <div className="font-bold text-[#cc0000] text-[10px] uppercase mb-1">
                      {t.common.telemetry}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">{t.common.remaining}:</span>
                      <span className="font-bold">{questions.length - currentIndex}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">{t.common.correctCount}</span>
                      <span className="font-bold text-[#008000]">{correctCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">{t.common.accuracyTarget}</span>
                      <span className="font-bold">{t.common.accuracyTargetVal}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`${prefix}/study/${stage.id}`}
                  className="w-full py-1.5 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-[#000080] flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t.common.reviewStudyDeck}</span>
                </Link>
              </div>
            </div>
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
                      <Sparkles className="w-3.5 h-3.5 text-[#ff6600]" />
                      <span>{t.test.bonusUnlockedTitle}</span>
                    </div>
                    <p className="text-[10px] text-[#666] mt-0.5 leading-snug">
                      {t.test.bonusUnlockedDesc}
                    </p>
                    <Link
                      href={`${prefix}/minigame?from=${stage.id}&next=${nextStage ? nextStage.id : ""}`}
                      className="mt-2 w-full py-2 px-3 bg-[#ffff00] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#800000] hover:bg-[#fff066] font-black text-xs text-[#800000] flex items-center justify-center gap-1.5 shadow"
                    >
                      <span>{t.test.playMinigameBtn}</span>
                    </Link>
                  </div>
                )}

                {nextStage && (
                  <Link
                    href={`${prefix}/study/${nextStage.id}`}
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
                    href={`${prefix}/dashboard`}
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
                    href={`${prefix}/study/${stage.id}`}
                    className="py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] font-bold text-xs text-[#000080] flex items-center justify-center gap-1 shadow"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t.test.studyFirstBtn}</span>
                  </Link>

                  <Link
                    href={`${prefix}/dashboard`}
                    className="py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] font-bold text-xs text-black flex items-center justify-center shadow"
                  >
                    <span>{t.nav.dashboard}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Docked Retro Footer */}
      <footer className="border-t border-[#808080] bg-[#d4d0c8] px-3 sm:px-6 py-2 text-[11px] text-[#404040] flex items-center justify-between font-mono shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#cc0000]"></span>
          <span className="flex items-center gap-1">
            {isBoss && <Swords className="w-3 h-3 text-[#cc0000] inline" />}
            <span>{isBoss ? t.common.bossBattleTest : t.common.arcadeSpeedChallenge}</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span>{t.common.targetSpeed}: &lt; {timeLimit}s</span>
          <span className="border-l border-[#808080] pl-2">{stageDisplayName}</span>
        </div>
      </footer>
    </div>
  );
}

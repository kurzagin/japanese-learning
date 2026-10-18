"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { STAGES, Stage, StudyCard, getStageUnlockStatus, STAGES_BY_ID } from "@/data/stages";
import { RetroNavbar } from "@/components/RetroNavbar";
import { StageLockedView } from "@/components/StageLockedView";
import { PronounceButton } from "@/components/PronounceButton";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, RotateCw, Check, Play, BookOpen, Clock, Sparkles, Zap, Star, Volume2 } from "lucide-react";
import {
  SrsRating,
  SrsCardRecord,
  createDefaultSrsCard,
  calculateSrsReview,
  getRatingPreviews,
} from "@/lib/srs";

export default function StudyClient({
  stageId,
  initialStage,
  allStages = [],
}: {
  stageId: string;
  initialStage?: Stage | null;
  allStages?: Stage[];
}) {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const isDueReviewMode = stageId === "srs-due";
  const stage = useMemo(
    () =>
      initialStage !== undefined
        ? initialStage
        : allStages.find((s) => s.id === stageId) || (isDueReviewMode ? null : allStages[0]),
    [initialStage, allStages, stageId, isDueReviewMode]
  );

  const [queue, setQueue] = useState<StudyCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [againCount, setAgainCount] = useState(0);
  const [sessionReviewedCount, setSessionReviewedCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [srsRecords, setSrsRecords] = useState<Record<string, SrsCardRecord>>({});
  const [isLoadingDue, setIsLoadingDue] = useState(isDueReviewMode);
  const [userEmail, setUserEmail] = useState<string>("guest@sakanajp.site");

  const [progress, setProgress] = useState<Record<string, { completed?: boolean }>>({});
  const [isCheckingUnlock, setIsCheckingUnlock] = useState(!isDueReviewMode);

  // Load user email, progress, and SRS states
  useEffect(() => {
    const email =
      typeof window !== "undefined"
        ? localStorage.getItem("sakana_user_email") || "guest@sakanajp.site"
        : "guest@sakanajp.site";
    setUserEmail(email);

    // Initial load from localStorage
    let progMap: Record<string, { completed?: boolean }> = {};
    const savedProgress = localStorage.getItem("sakana_progress");
    if (savedProgress) {
      try {
        progMap = JSON.parse(savedProgress);
        setProgress(progMap);
      } catch {}
    }

    let localMap: Record<string, SrsCardRecord> = {};
    const localSrs = localStorage.getItem("sakana_srs_records");
    if (localSrs) {
      try {
        localMap = JSON.parse(localSrs);
        setSrsRecords(localMap);
      } catch {}
    }

    if (email && email !== "guest@sakanajp.site") {
      // Load remote progress for accurate unlock state
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
        .catch((e) => console.error("Error loading progress:", e))
        .finally(() => setIsCheckingUnlock(false));

      // Load from DB for logged in accounts
      const endpoint = isDueReviewMode
        ? `/api/srs?userId=${encodeURIComponent(email)}&due=true`
        : `/api/srs?userId=${encodeURIComponent(email)}&stageId=${encodeURIComponent(stageId)}`;

      fetch(endpoint)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data)) {
            const map: Record<string, SrsCardRecord> = {};
            json.data.forEach((r: SrsCardRecord) => {
              map[r.cardId] = r;
            });
            setSrsRecords((prev) => ({ ...prev, ...map }));

            if (isDueReviewMode) {
              const allCardsMap = new Map<string, StudyCard>();
              allStages.forEach((s) => {
                s.cards.forEach((c) => allCardsMap.set(c.id, c));
              });

              const dueCards: StudyCard[] = [];
              json.data.forEach((r: SrsCardRecord) => {
                const card = allCardsMap.get(r.cardId);
                if (card) dueCards.push(card);
              });

              setQueue(dueCards);
              setIsLoadingDue(false);
            }
          } else if (isDueReviewMode) {
            setIsLoadingDue(false);
          }
        })
        .catch((err) => {
          console.error("SRS fetch error:", err);
          if (isDueReviewMode) setIsLoadingDue(false);
        });
    } else {
      // For guest mode: resolve due cards completely from local storage
      if (isDueReviewMode) {
        const allCardsMap = new Map<string, StudyCard>();
        allStages.forEach((s) => {
          s.cards.forEach((c) => allCardsMap.set(c.id, c));
        });

        const now = new Date();
        const dueCards: StudyCard[] = [];
        Object.values(localMap).forEach((r) => {
          if (r.nextReviewAt && new Date(r.nextReviewAt) <= now) {
            const card = allCardsMap.get(r.cardId);
            if (card) dueCards.push(card);
          }
        });

        setQueue(dueCards);
        setIsLoadingDue(false);
      }
      setIsCheckingUnlock(false);
    }
  }, [stageId, isDueReviewMode]);

  // If normal stage, initialize queue from stage cards
  useEffect(() => {
    if (!isDueReviewMode && stage?.cards) {
      setQueue([...stage.cards]);
      setCurrentIndex(0);
      setIsFlipped(false);
      setCompleted(false);
      setAgainCount(0);
      setSessionReviewedCount(0);
      setStartTime(Date.now());
    }
  }, [stage, isDueReviewMode]);

  const currentCard = queue[currentIndex];

  const currentSrsRecord = useMemo(() => {
    if (!currentCard) return null;
    return (
      srsRecords[currentCard.id] ||
      createDefaultSrsCard(currentCard.id, stage?.id || "hiragana-vowels", userEmail)
    );
  }, [currentCard, srsRecords, stage, userEmail]);

  const previews = useMemo(() => {
    if (!currentSrsRecord) return { 1: "< 10m", 2: "1d", 3: "1d", 4: "4d" };
    return getRatingPreviews(currentSrsRecord);
  }, [currentSrsRecord]);

  const handleRating = useCallback(
    (rating: SrsRating) => {
      if (!currentCard || !currentSrsRecord) return;

      const cardStageId = stage?.id || currentSrsRecord.stageId || "hiragana-vowels";
      const result = calculateSrsReview(currentSrsRecord, rating);

      // Build updated record
      const updatedRecord: SrsCardRecord = {
        ...currentSrsRecord,
        repetitionCount: result.repetitionCount,
        intervalDays: result.intervalDays,
        easeFactor: result.easeFactor,
        lapses: result.lapses,
        state: result.state,
        lastReviewedAt: new Date().toISOString(),
        nextReviewAt: result.nextReviewAt.toISOString(),
      };

      // 1. Update React state & localStorage immediately
      setSrsRecords((prev) => {
        const next = { ...prev, [currentCard.id]: updatedRecord };
        try {
          localStorage.setItem("sakana_srs_records", JSON.stringify(next));
        } catch {}
        return next;
      });

      // 2. Persist to Neon DB (only for logged-in accounts)
      if (userEmail && userEmail !== "guest@sakanajp.site") {
        fetch("/api/srs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userEmail,
            cardId: currentCard.id,
            stageId: cardStageId,
            rating,
          }),
        }).catch((err) => console.error("SRS review persist error:", err));
      }

      setSessionReviewedCount((prev) => prev + 1);

      // If rating === 1 (Again), push to end of active study queue so learner sees it again
      if (rating === 1) {
        setQueue((prev) => [...prev, currentCard]);
        setAgainCount((prev) => prev + 1);
      }

      // Advance
      setIsFlipped(false);
      if (currentIndex + 1 < queue.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCompleted(true);
        // Note: Completing the study deck schedules SRS intervals, but does NOT mark the stage as completed or unlock the next stage.
        // Stage completion and unlocking requires passing the Speed Sprint Challenge (/test/[stageId]) with required accuracy & speed.
      }
    },
    [
      currentCard,
      currentSrsRecord,
      stage,
      userEmail,
      currentIndex,
      queue,
      startTime,
      isDueReviewMode,
    ]
  );

  const playCardAudio = useCallback(
    (textToSpeak?: string) => {
      const targetText = textToSpeak || currentCard?.character;
      if (!targetText) return;
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(targetText);
        utterance.lang = "ja-JP";
        utterance.rate = 0.85;
        const voices = window.speechSynthesis.getVoices();
        const jaVoice = voices.find(
          (v) => v.lang.startsWith("ja") || v.lang.includes("JP")
        );
        if (jaVoice) {
          utterance.voice = jaVoice;
        }
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error("Audio playback error:", err);
      }
    },
    [currentCard]
  );

  // Keyboard shortcuts: Space/Enter = flip; 1 = Again, 2 = Hard, 3 = Good, 4 = Easy; R = Replay Audio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (completed) return;
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        playCardAudio();
      } else if (isFlipped) {
        if (e.key === "1") {
          e.preventDefault();
          handleRating(1);
        } else if (e.key === "2") {
          e.preventDefault();
          handleRating(2);
        } else if (e.key === "3") {
          e.preventDefault();
          handleRating(3);
        } else if (e.key === "4") {
          e.preventDefault();
          handleRating(4);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, completed, handleRating, playCardAudio]);

  const restartStudy = () => {
    if (stage?.cards) {
      setQueue([...stage.cards]);
      setCurrentIndex(0);
      setIsFlipped(false);
      setCompleted(false);
      setAgainCount(0);
      setSessionReviewedCount(0);
      setStartTime(Date.now());
    }
  };

  if (isLoadingDue) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center font-mono text-xs">
        {t.common.loadingDueSrs}
      </div>
    );
  }

  if (isDueReviewMode && queue.length === 0 && !completed) {
    return (
      <div className="min-h-screen py-4 px-2 sm:px-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] shadow-md p-4 space-y-4 text-center">
          <RetroNavbar currentSubtitle={t.study.srsReviewCenter} />
          <div className="bg-white p-6 border border-[#808080] space-y-3">
            <Sparkles className="w-10 h-10 text-[#008000] mx-auto" />
            <h2 className="text-sm font-bold text-[#000080]">
              {t.dashboard.allCaughtUp}
            </h2>
            <p className="text-xs text-[#555]">
              {t.study.srsAllCaughtUpDesc}
            </p>
            <div className="pt-2">
              <Link
                href={`${prefix}/dashboard`}
                className="inline-block py-1.5 px-4 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] font-bold text-xs text-black"
              >
                &lt;&lt; {t.study.backDashboard}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stage && !isDueReviewMode) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center font-mono text-xs">
        {t.common.stageNotFound}
      </div>
    );
  }

  // Check if stage is locked
  if (!isDueReviewMode && stage && !isCheckingUnlock) {
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

  const currentHint = currentCard?.hint?.[locale];
  const currentSampleMeaning = currentCard?.sampleWordMeaning?.[locale];
  const stageDisplayName = isDueReviewMode ? t.study.srsDueReviewsTitle : stage!.name[locale];
  const stageDepthName = isDueReviewMode ? t.study.dailyRetentionQueue : stage!.depthName[locale];

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      {/* Full-width Sticky Retro Navbar */}
      <RetroNavbar currentSubtitle={`${t.study.windowTitle} - ${stageDisplayName}`} />

      {/* Edge-to-Edge Responsive Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 flex flex-col justify-center">
        {/* Top Info Bar */}
        <div className="border border-[#808080] bg-[#d4d0c8] px-3.5 py-2 text-xs flex items-center justify-between text-black shadow-xs">
          <Link
            href={`${prefix}/dashboard`}
            className="text-[#000080] underline hover:text-[#cc0000] flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> {t.study.backDashboard}
          </Link>
          <span className="font-mono text-xs text-[#555] uppercase font-bold">
            {stageDisplayName}
          </span>
        </div>

        {/* Mode Notice Banner */}
        <div className="bg-[#fff8e7] border border-[#808080] p-3 text-center text-xs shadow-xs">
          <span className="font-bold text-[#800000] text-xs sm:text-sm">{t.study.studyBadge}</span>
          <span className="text-[11px] sm:text-xs text-[#555] block mt-0.5">
            {stageDepthName} {stage ? `// ${stage.description[locale]}` : ""}
          </span>
        </div>

        {/* Card Screen Body */}
        <div className="p-4 sm:p-6 bg-white text-black min-h-[380px] flex flex-col justify-between border border-[#808080] shadow-xs">
          {!completed && currentCard ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Main Study Deck Column */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-2">

              {/* Card Header Status with Windows 98 Segmented Progress Bar */}
              <div className="space-y-1.5 border-b border-[#d0d0d0] pb-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-[#000080] font-bold">
                      {t.study.progress}: {currentIndex + 1} / {queue.length}
                    </span>
                    {/* SRS Status Pill */}
                    <span className="text-[10px] px-1.5 py-0.2 border border-[#808080] bg-[#f0f0f0] text-[#333]">
                      {currentSrsRecord?.repetitionCount === 0 ? (
                        <span className="text-[#cc0000] font-bold animate-retro-blink">{t.study.newBadge}</span>
                      ) : (
                        `${currentSrsRecord?.state.toUpperCase()} (int: ${currentSrsRecord?.intervalDays}d)`
                      )}
                    </span>
                  </div>
                  <span className="text-[#888] text-[10px] hidden sm:inline">
                    {t.study.hotkeyHint}
                  </span>
                </div>

                {/* Windows 98 Segmented Chunky Progress Meter */}
                <div className="w-full bg-[#c0c0c0] p-[2px] border-t border-l border-[#808080] border-b border-r border-white flex gap-[2px] h-3.5 overflow-hidden">
                  {Array.from({ length: queue.length }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 transition-none ${
                        idx <= currentIndex
                          ? "bg-[#000080]"
                          : "bg-[#e0e0e0]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Flashcard Box */}
              <div
                onClick={() => setIsFlipped((prev) => !prev)}
                className="my-3 p-5 border-2 border-dashed border-[#000080] bg-[#fdfdfb] hover:bg-[#fffff0] cursor-pointer flex flex-col items-center justify-center text-center transition-colors min-h-[220px]"
              >
                {/* Primary Japanese Character / Word */}
                <div className="flex flex-col items-center justify-center my-1">
                  <div className="text-6xl sm:text-7xl font-bold font-serif text-[#000080] tracking-tight">
                    {currentCard.character}
                  </div>
                  <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                    <PronounceButton text={currentCard.character} size="sm" label="AUDIO (R)" />
                  </div>
                </div>

                {!isFlipped ? (
                  <div className="text-xs text-[#888] mt-3 font-mono">
                    {t.study.flipPrompt}
                  </div>
                ) : (
                  <div className="w-full mt-2 pt-3 border-t border-[#d0d0d0] text-center space-y-2.5">
                    {/* Native Japanese Sample Word & Reading */}
                    <div className="bg-[#eef3f8] border border-[#b8c8d8] p-2 text-xs">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] text-[#000080] font-bold">
                          ◆ {t.study.sampleWord}
                        </span>
                        <div onClick={(e) => e.stopPropagation()}>
                          <PronounceButton
                            text={currentCard.sampleWordJp.split(" ")[0]}
                            size="sm"
                          />
                        </div>
                      </div>
                      <div className="text-sm font-bold text-[#000080] mt-0.5">
                        {currentCard.sampleWordJp}
                      </div>
                      <div className="text-[11px] text-[#555]">
                        ({currentSampleMeaning})
                      </div>
                    </div>

                    {/* Romaji helper */}
                    <div className="text-[11px] text-[#666] font-mono">
                      <span>{t.study.romajiLabel} </span>
                      <strong className="text-[#cc0000]">/{currentCard.romaji}/</strong>
                    </div>

                    {/* Mnemonic / Hint */}
                    {currentHint && (
                      <div className="p-2 border border-[#d0d0d0] bg-[#fff8e7] text-[11px] text-[#555] text-left">
                        <strong className="text-[#800000] block">{t.study.mnemonic}</strong>
                        {currentHint}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Real SRS 4-Rating Response Buttons */}
              <div className="pt-2">
                {!isFlipped ? (
                  <button
                    type="button"
                    onClick={() => setIsFlipped(true)}
                    className="w-full py-2 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-black cursor-pointer"
                  >
                    {t.study.flipPrompt}
                  </button>
                ) : (
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    {/* 1: Again */}
                    <button
                      type="button"
                      onClick={() => handleRating(1)}
                      className="py-1.5 px-1 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-center cursor-pointer flex flex-col items-center justify-center"
                    >
                      <span className="text-[10px] text-[#888] font-mono">
                        {previews[1]}
                      </span>
                      <span className="font-bold text-xs text-[#800000]">
                        1. {t.study.againBtn}
                      </span>
                    </button>

                    {/* 2: Hard */}
                    <button
                      type="button"
                      onClick={() => handleRating(2)}
                      className="py-1.5 px-1 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-center cursor-pointer flex flex-col items-center justify-center"
                    >
                      <span className="text-[10px] text-[#888] font-mono">
                        {previews[2]}
                      </span>
                      <span className="font-bold text-xs text-[#b85d00]">
                        2. {t.study.hardBtn}
                      </span>
                    </button>

                    {/* 3: Good */}
                    <button
                      type="button"
                      onClick={() => handleRating(3)}
                      className="py-1.5 px-1 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-center cursor-pointer flex flex-col items-center justify-center"
                    >
                      <span className="text-[10px] text-[#888] font-mono">
                        {previews[3]}
                      </span>
                      <span className="font-bold text-xs text-[#006600]">
                        3. {t.study.goodBtn}
                      </span>
                    </button>

                    {/* 4: Easy */}
                    <button
                      type="button"
                      onClick={() => handleRating(4)}
                      className="py-1.5 px-1 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-center cursor-pointer flex flex-col items-center justify-center"
                    >
                      <span className="text-[10px] text-[#888] font-mono">
                        {previews[4]}
                      </span>
                      <span className="font-bold text-xs text-[#000080]">
                        4. {t.study.easyBtn}
                      </span>
                    </button>
                  </div>
                )}
              </div>
              </div>

              {/* Desktop Flight Deck / Workstation Panel */}
              <div className="lg:col-span-4 hidden lg:flex flex-col justify-between border border-[#808080] bg-[#ece9d8] p-3.5 text-xs space-y-3">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#000080] border-b border-[#808080] pb-1.5 flex items-center justify-between">
                    <span>{t.common.workstationCommands}</span>
                    <span className="text-[10px] bg-white border border-[#808080] px-1 font-mono">
                      {t.common.hotkeys}
                    </span>
                  </div>

                  {/* Hotkeys Legend */}
                  <div className="space-y-1.5 font-mono text-[11px] bg-white p-2.5 border border-[#808080]">
                    <div className="flex justify-between items-center py-0.5 border-b border-[#eee]">
                      <span className="text-[#555]">{t.common.flipCard}</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">SPACE</kbd>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-[#eee]">
                      <span className="text-[#800000]">{t.study.againBtn.toUpperCase()}:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">1</kbd>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-[#eee]">
                      <span className="text-[#b85d00]">{t.study.hardBtn.toUpperCase()}:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">2</kbd>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-[#eee]">
                      <span className="text-[#006600]">{t.study.goodBtn.toUpperCase()}:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">3</kbd>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-[#eee]">
                      <span className="text-[#000080]">{t.study.easyBtn.toUpperCase()}:</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">4</kbd>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#555]">{t.common.replayAudio}</span>
                      <kbd className="bg-[#e0e0e0] px-1.5 py-0.2 border border-[#808080] text-[10px] font-bold">R</kbd>
                    </div>
                  </div>

                  {/* Session Metrics */}
                  <div className="space-y-1 text-[11px] font-mono bg-[#fdfdfb] p-2.5 border border-[#808080]">
                    <div className="font-bold text-[#000080] text-[10px] uppercase mb-1">
                      {t.common.telemetry}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">{t.common.remaining}:</span>
                      <span className="font-bold">{queue.length - currentIndex}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">{t.common.lapses}</span>
                      <span className="font-bold text-[#cc0000]">{againCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">{t.common.intervalDays}</span>
                      <span className="font-bold">{currentSrsRecord?.intervalDays ?? 0} d</span>
                    </div>
                  </div>
                </div>

                {stage && (
                  <Link
                    href={`${prefix}/test/${stage.id}`}
                    className="w-full py-1.5 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-[#cc0000] flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 fill-[#cc0000]" />
                    <span>{t.common.jumpToSpeedSprint}</span>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            /* Completed Screen */
            <div className="p-4 flex flex-col items-center justify-center text-center my-auto space-y-4">
              <div className="relative">
                <Star className="absolute -top-2 -left-3 w-4 h-4 fill-[#ff00ff] text-[#ff00ff] animate-pulse" />
                <Star className="absolute -bottom-1 -right-3 w-4 h-4 fill-[#ffff00] text-[#ffff00] animate-pulse" />
                <div className="w-14 h-14 border-2 border-[#006600] bg-[#eef8ee] flex items-center justify-center text-[#006600] shadow">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#800000]">
                  <Star className="w-3 h-3 fill-[#800000]" />
                  <span>{t.common.stageComplete}</span>
                  <Star className="w-3 h-3 fill-[#800000]" />
                </div>
                <h2 className="text-lg font-black text-[#000080] mt-0.5">
                  {t.study.completeTitle}
                </h2>
                <p className="text-xs text-[#555] mt-1 max-w-sm">
                  {t.study.completeDesc}
                </p>
                <p className="text-[11px] text-[#006600] mt-1.5 font-mono bg-[#f0fff0] border border-[#a0e0a0] py-0.5 px-2 inline-block">
                  {t.study.srsScheduledNote}
                </p>
              </div>

              <div className="w-full space-y-2 pt-2">
                {stage && (
                  <Link
                    href={`${prefix}/test/${stage.id}`}
                    className="w-full py-2.5 px-4 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-black text-xs text-[#cc0000] flex items-center justify-center gap-2 shadow"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#cc0000]" />
                    <span>{t.study.readyChallengeBtn}</span>
                  </Link>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {!isDueReviewMode && (
                    <button
                      type="button"
                      onClick={restartStudy}
                      className="py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] text-xs font-bold text-black"
                    >
                      {t.study.repeatStudyBtn}
                    </button>
                  )}

                  <Link
                    href={`${prefix}/dashboard`}
                    className={`py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] text-xs font-bold text-black flex items-center justify-center ${
                      isDueReviewMode ? "col-span-2" : ""
                    }`}
                  >
                    {t.nav.back}
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
          <span className="w-2 h-2 rounded-full bg-[#00aa00]"></span>
          <span>{stageDisplayName}</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span>{t.study.footerSrsReviews} {sessionReviewedCount}</span>
          <span className="border-l border-[#808080] pl-2">{t.study.footerLapses} {againCount}</span>
        </div>
      </footer>
    </div>
  );
}

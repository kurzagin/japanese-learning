"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { STAGES, Stage, StudyCard } from "@/data/stages";
import { RetroNavbar } from "@/components/RetroNavbar";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, RotateCw, Check, Play, BookOpen, Clock, Sparkles } from "lucide-react";
import {
  SrsRating,
  SrsCardRecord,
  createDefaultSrsCard,
  calculateSrsReview,
  getRatingPreviews,
} from "@/lib/srs";

export default function StudyClient({ stageId }: { stageId: string }) {
  const { t, locale } = useLanguage();

  const isDueReviewMode = stageId === "srs-due";
  const stage = useMemo(
    () => STAGES.find((s) => s.id === stageId) || (isDueReviewMode ? null : STAGES[0]),
    [stageId, isDueReviewMode]
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
  const [userEmail, setUserEmail] = useState<string>("guest@sakana.net");

  // Load user email and SRS states
  useEffect(() => {
    const email =
      typeof window !== "undefined"
        ? localStorage.getItem("sakana_user_email") || "guest@sakana.net"
        : "guest@sakana.net";
    setUserEmail(email);

    // Initial load from localStorage
    let localMap: Record<string, SrsCardRecord> = {};
    const localSrs = localStorage.getItem("sakana_srs_records");
    if (localSrs) {
      try {
        localMap = JSON.parse(localSrs);
        setSrsRecords(localMap);
      } catch {}
    }

    if (email && email !== "guest@sakana.net") {
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
              STAGES.forEach((s) => {
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
        STAGES.forEach((s) => {
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
      if (userEmail && userEmail !== "guest@sakana.net") {
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
        const sessionDurationMs = Math.max(1000, Date.now() - startTime);

        // If in standard stage, mark stage progress
        if (!isDueReviewMode && stage) {
          try {
            const stored = JSON.parse(localStorage.getItem("sakana_progress") || "{}");
            stored[stage.id] = {
              completed: true,
              stars: 3,
              bestDurationMs: sessionDurationMs,
            };
            localStorage.setItem("sakana_progress", JSON.stringify(stored));
          } catch {}

          if (userEmail && userEmail !== "guest@sakana.net") {
            fetch("/api/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: userEmail,
                stageId: stage.id,
                completed: true,
                stars: 3,
                durationMs: sessionDurationMs,
                accuracyPercentage: 100,
              }),
            }).catch((err) => console.error("Neon progress sync error:", err));
          }
        }
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

  // Keyboard shortcuts: Space/Enter = flip; 1 = Again, 2 = Hard, 3 = Good, 4 = Easy
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (completed) return;
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
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
  }, [isFlipped, completed, handleRating]);

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
        LOADING DUE SRS CARDS...
      </div>
    );
  }

  if (isDueReviewMode && queue.length === 0 && !completed) {
    return (
      <div className="min-h-screen py-4 px-2 sm:px-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] shadow-md p-4 space-y-4 text-center">
          <RetroNavbar currentSubtitle="SRS Review Center" />
          <div className="bg-white p-6 border border-[#808080] space-y-3">
            <Sparkles className="w-10 h-10 text-[#008000] mx-auto" />
            <h2 className="text-sm font-bold text-[#000080]">
              {t.dashboard.allCaughtUp}
            </h2>
            <p className="text-xs text-[#555]">
              {locale === "ja"
                ? "すべての文字の記憶保持インターバルは順調です。復習時期が来るとここに現れます。"
                : locale === "id"
                ? "Semua memori karakter berada dalam jadwal aman. Kartu baru akan muncul di sini saat tiba waktunya."
                : "All studied characters are currently in healthy memory retention intervals. Cards will appear here when due."}
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard"
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
        STAGE NOT FOUND.
      </div>
    );
  }

  const currentHint = currentCard?.hint?.[locale];
  const currentSampleMeaning = currentCard?.sampleWordMeaning?.[locale];
  const stageDisplayName = isDueReviewMode ? "SRS Due Reviews" : stage!.name[locale];
  const stageDepthName = isDueReviewMode ? "Daily Retention Queue" : stage!.depthName[locale];

  return (
    <div className="min-h-screen py-4 px-2 sm:px-6 flex flex-col items-center justify-between">
      {/* Outer Windows 98/2000 Container */}
      <div className="w-full max-w-xl bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] shadow-md flex flex-col">
        {/* Retro Navbar */}
        <RetroNavbar currentSubtitle={`${t.study.windowTitle} - ${stageDisplayName}`} />

        {/* Top Info Bar */}
        <div className="border-b border-[#808080] bg-[#ece9d8] px-2 py-1 text-[11px] flex items-center justify-between text-black">
          <Link
            href="/dashboard"
            className="text-[#000080] underline hover:text-[#cc0000] flex items-center gap-1 text-[10px]"
          >
            <ArrowLeft className="w-3 h-3" /> {t.study.backDashboard}
          </Link>
          <span className="font-mono text-[10px] text-[#555] uppercase">
            {stageDisplayName}
          </span>
        </div>

        {/* Mode Notice Banner */}
        <div className="bg-[#fff8e7] border-b border-[#808080] px-3 py-1.5 text-center text-xs">
          <span className="font-bold text-[#800000]">{t.study.studyBadge}</span>
          <span className="text-[11px] text-[#555] block">
            {stageDepthName} {stage ? `// ${stage.description[locale]}` : ""}
          </span>
        </div>

        {/* Card Screen Body */}
        <div className="p-4 bg-white text-black min-h-[380px] flex flex-col justify-between">
          {!completed && currentCard ? (
            <>
              {/* Card Header Status */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-[#d0d0d0] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#000080] font-bold">
                    {t.study.progress}: {currentIndex + 1} / {queue.length}
                  </span>
                  {/* SRS Status Pill */}
                  <span className="text-[10px] px-1.5 py-0.2 border border-[#808080] bg-[#f0f0f0] text-[#333]">
                    {currentSrsRecord?.repetitionCount === 0
                      ? "NEW"
                      : `${currentSrsRecord?.state.toUpperCase()} (int: ${currentSrsRecord?.intervalDays}d)`}
                  </span>
                </div>
                <span className="text-[#888] text-[10px] hidden sm:inline">
                  [ SPACE: FLIP // 1-4: RATE ]
                </span>
              </div>

              {/* Flashcard Box */}
              <div
                onClick={() => setIsFlipped((prev) => !prev)}
                className="my-3 p-5 border-2 border-dashed border-[#000080] bg-[#fdfdfb] hover:bg-[#fffff0] cursor-pointer flex flex-col items-center justify-center text-center transition-colors min-h-[220px]"
              >
                {/* Primary Japanese Character / Word */}
                <div className="text-6xl sm:text-7xl font-bold font-serif text-[#000080] select-none my-1 tracking-tight">
                  {currentCard.character}
                </div>

                {!isFlipped ? (
                  <div className="text-xs text-[#888] mt-3 font-mono">
                    {t.study.flipPrompt}
                  </div>
                ) : (
                  <div className="w-full mt-2 pt-3 border-t border-[#d0d0d0] text-center space-y-2.5">
                    {/* Native Japanese Sample Word & Reading */}
                    <div className="bg-[#eef3f8] border border-[#b8c8d8] p-2 text-xs">
                      <span className="text-[10px] text-[#000080] font-bold block">
                        ◆ {t.study.sampleWord}
                      </span>
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
            </>
          ) : (
            /* Completed Screen */
            <div className="p-4 flex flex-col items-center justify-center text-center my-auto space-y-4">
              <div className="w-12 h-12 border-2 border-[#006600] bg-[#eef8ee] flex items-center justify-center text-[#006600]">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>

              <div>
                <h2 className="text-base font-bold text-[#000080]">
                  {t.study.completeTitle}
                </h2>
                <p className="text-xs text-[#555] mt-1 max-w-sm">
                  {t.study.completeDesc}
                </p>
                <p className="text-[11px] text-[#006600] mt-1 font-mono">
                  {t.study.srsScheduledNote}
                </p>
              </div>

              <div className="w-full space-y-2 pt-2">
                {stage && (
                  <Link
                    href={`/test/${stage.id}`}
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
                    href="/dashboard"
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

        {/* Windows Status Footer */}
        <div className="border-t border-[#808080] bg-[#ece9d8] px-2 py-0.5 text-[10px] text-[#404040] flex items-center justify-between">
          <span>{stageDisplayName}</span>
          <span className="font-mono">
            SRS REVIEWS: {sessionReviewedCount} // LAPSES: {againCount}
          </span>
        </div>
      </div>
    </div>
  );
}

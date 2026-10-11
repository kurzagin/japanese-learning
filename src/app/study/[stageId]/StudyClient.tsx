"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { STAGES, Stage, StudyCard } from "@/data/stages";
import { RetroNavbar } from "@/components/RetroNavbar";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, RotateCw, Check, Play, BookOpen } from "lucide-react";

export default function StudyClient({ stageId }: { stageId: string }) {
  const { t, locale } = useLanguage();

  const stage = STAGES.find((s) => s.id === stageId) || STAGES[0];
  const [queue, setQueue] = useState<StudyCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [againCount, setAgainCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Initialize card queue from stage cards
  useEffect(() => {
    if (stage?.cards) {
      setQueue([...stage.cards]);
      setCurrentIndex(0);
      setIsFlipped(false);
      setCompleted(false);
      setAgainCount(0);
      setStartTime(Date.now());
    }
  }, [stage]);

  // Keyboard shortcut: Space / Enter to flip, 1 for Again, 2 for Good
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (completed) return;
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (isFlipped && (e.key === "1" || e.key === "ArrowLeft")) {
        e.preventDefault();
        handleAgain();
      } else if (isFlipped && (e.key === "2" || e.key === "ArrowRight")) {
        e.preventDefault();
        handleGotIt();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, currentIndex, queue, completed]);

  const currentCard = queue[currentIndex];

  const handleAgain = () => {
    if (!currentCard) return;
    setQueue((prev) => [...prev, currentCard]);
    setAgainCount((prev) => prev + 1);
    advanceCard();
  };

  const handleGotIt = () => {
    advanceCard();
  };

  const advanceCard = () => {
    setIsFlipped(false);
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
      const sessionDurationMs = Math.max(1000, Date.now() - startTime);

      // Sync progress to Neon database
      const userEmail = typeof window !== "undefined"
        ? localStorage.getItem("sakana_user_email") || "guest@sakana.net"
        : "guest@sakana.net";

      // Also persist to localStorage for fast offline rendering
      try {
        const stored = JSON.parse(localStorage.getItem("sakana_progress") || "{}");
        stored[stageId] = {
          completed: true,
          stars: 3,
          bestDurationMs: sessionDurationMs,
        };
        localStorage.setItem("sakana_progress", JSON.stringify(stored));
      } catch {}

      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userEmail,
          stageId,
          completed: true,
          stars: 3,
          durationMs: sessionDurationMs,
          accuracyPercentage: 100,
        }),
      }).catch((err) => console.error("Neon progress sync error:", err));
    }
  };

  const restartStudy = () => {
    if (stage?.cards) {
      setQueue([...stage.cards]);
      setCurrentIndex(0);
      setIsFlipped(false);
      setCompleted(false);
      setAgainCount(0);
      setStartTime(Date.now());
    }
  };

  if (!stage) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center font-mono text-xs">
        STAGE NOT FOUND.
      </div>
    );
  }

  const currentHint = currentCard?.hint?.[locale];
  const currentSampleMeaning = currentCard?.sampleWordMeaning?.[locale];
  const stageDisplayName = stage.name[locale];
  const stageDepthName = stage.depthName[locale];

  return (
    <div className="min-h-screen py-4 px-2 sm:px-6 flex flex-col items-center justify-between">
      {/* Outer Windows 98/2000 Container */}
      <div className="w-full max-w-xl bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] shadow-md flex flex-col">
        
        {/* Retro Navbar & SaKana Branding */}
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
            {stageDepthName} // {stage.description[locale]}
          </span>
        </div>

        {/* Card Screen Body */}
        <div className="p-4 bg-white text-black min-h-[360px] flex flex-col justify-between">
          {!completed && currentCard ? (
            <>
              {/* Card Header Status */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-[#d0d0d0] pb-2">
                <span className="text-[#000080] font-bold">
                  {t.study.progress}: {currentIndex + 1} / {queue.length}
                </span>
                <span className="text-[#888] text-[10px]">
                  [ SPACE: FLIP // 1: AGAIN // 2: GOOD ]
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

                    {/* Romaji helper (subordinate, smaller) */}
                    <div className="text-[11px] text-[#666] font-mono">
                      <span>{t.study.romajiLabel} </span>
                      <strong className="text-[#cc0000]">/{currentCard.romaji}/</strong>
                    </div>

                    {/* Mnemonic / Hint (in user's chosen language, including JA) */}
                    {currentHint && (
                      <div className="p-2 border border-[#d0d0d0] bg-[#fff8e7] text-[11px] text-[#555] text-left">
                        <strong className="text-[#800000] block">{t.study.mnemonic}</strong>
                        {currentHint}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Anki Response Buttons */}
              <div className="pt-2">
                {!isFlipped ? (
                  <button
                    type="button"
                    onClick={() => setIsFlipped(true)}
                    className="w-full py-2 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-black"
                  >
                    {t.study.flipPrompt}
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {/* Again Button */}
                    <button
                      type="button"
                      onClick={handleAgain}
                      className="py-2 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-[#800000] flex items-center justify-center gap-1.5"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>{t.study.againBtn}</span>
                    </button>

                    {/* Got It Button */}
                    <button
                      type="button"
                      onClick={handleGotIt}
                      className="py-2 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-[#006600] flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.study.gotItBtn}</span>
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
              </div>

              <div className="w-full space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => alert(`Ready for Challenge! Stage: ${stageDisplayName}`)}
                  className="w-full py-2.5 px-4 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-black text-xs text-[#cc0000] flex items-center justify-center gap-2 shadow"
                >
                  <Play className="w-3.5 h-3.5 fill-[#cc0000]" />
                  <span>{t.study.readyChallengeBtn}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={restartStudy}
                    className="py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] text-xs font-bold text-black"
                  >
                    {t.study.repeatStudyBtn}
                  </button>

                  <Link
                    href="/dashboard"
                    className="py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#c0bca8] text-xs font-bold text-black flex items-center justify-center"
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
          <span className="font-mono">REPETITIONS: {againCount}</span>
        </div>

      </div>
    </div>
  );
}

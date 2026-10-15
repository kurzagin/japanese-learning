"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PronounceButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function PronounceButton({
  text,
  className = "",
  size = "md",
  label,
}: PronounceButtonProps) {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert(t.common.audioNotSupported);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85; // Natural clear pace for learners

      // Find Japanese voice if available
      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find(
        (v) => v.lang.startsWith("ja") || v.lang.includes("JP")
      );
      if (jaVoice) {
        utterance.voice = jaVoice;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlaying(false);
    }
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] gap-1",
    md: "px-3 py-1.5 text-xs gap-1.5",
    lg: "px-4 py-2 text-sm gap-2 font-bold",
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      aria-label={`${t.common.listenPronunciation}: ${text}`}
      className={`inline-flex items-center justify-center font-mono cursor-pointer transition-transform active:translate-y-0.5 border-t border-l border-white border-b-[#404040] border-r-[#404040] bg-[#d4d0c8] hover:bg-[#e4e0d8] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-[#000080] shadow-xs ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <VolumeX className="w-3.5 h-3.5 animate-pulse text-[#cc0000]" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-[#000080]" />
      )}
      {label && <span>{label}</span>}
    </button>
  );
}

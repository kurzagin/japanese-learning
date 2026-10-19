"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Volume2, VolumeX, Settings, X, Check, User, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreferencesModal({ isOpen, onClose }: PreferencesModalProps) {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const [userEmail, setUserEmail] = useState<string>("guest@sakanajp.site");
  const [audioQuestions, setAudioQuestions] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("sakana_user_email") || "guest@sakanajp.site";
      setUserEmail(savedEmail);

      const savedAudio = localStorage.getItem("sakana_test_enable_audio");
      if (savedAudio !== null) {
        setAudioQuestions(savedAudio === "true");
      }
    }
  }, [isOpen]);

  const toggleAudioQuestions = () => {
    const nextVal = !audioQuestions;
    setAudioQuestions(nextVal);
    if (typeof window !== "undefined") {
      localStorage.setItem("sakana_test_enable_audio", String(nextVal));
      window.dispatchEvent(new Event("sakana_preferences_changed"));
    }
  };

  if (!isOpen) return null;

  const isGuest = userEmail === "guest@sakanajp.site";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
      <div className="bg-[#ece9d8] border-2 border-t-white border-l-white border-b-black border-r-black shadow-2xl max-w-md w-full text-black">
        {/* Retro Window Header */}
        <div className="bg-[#000080] text-white px-2 py-1.5 flex items-center justify-between select-none">
          <div className="flex items-center gap-1.5 font-bold text-xs tracking-wider">
            <Settings className="w-3.5 h-3.5 text-[#ffff00]" />
            <span>SAKANA // {t.nav.preferences}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-4 h-4 bg-[#d4d0c8] text-black border border-t-white border-l-white border-b-black border-r-black flex items-center justify-center font-bold text-xs leading-none hover:bg-[#c0c0c0] active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
          >
            ×
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 text-xs">
          {/* User Profile Card */}
          <fieldset className="border border-[#808080] p-3 bg-[#f5f5f0]">
            <legend className="px-1 font-bold text-[#000080] uppercase flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{t.nav.profile}</span>
            </legend>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#555] font-mono">ACCOUNT:</span>
                <span className="font-mono font-bold bg-white px-2 py-0.5 border border-[#808080] text-[11px] truncate max-w-[200px]">
                  {userEmail}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#555]">
                <span>STATUS:</span>
                <span className="flex items-center gap-1 font-bold text-[#006600]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isGuest ? "GUEST MODE (LOCAL SYNC)" : "REGISTERED ACCOUNT (CLOUD SYNC)"}
                </span>
              </div>
              {isGuest && (
                <div className="pt-1 border-t border-[#d0d0d0] text-right">
                  <Link
                    href={`${prefix}/login`}
                    onClick={onClose}
                    className="inline-block text-[11px] font-bold text-[#000080] hover:text-[#cc0000] underline"
                  >
                    → {t.nav.login}
                  </Link>
                </div>
              )}
            </div>
          </fieldset>

          {/* Test & Audio Preferences */}
          <fieldset className="border border-[#808080] p-3 bg-[#f5f5f0]">
            <legend className="px-1 font-bold text-[#000080] uppercase flex items-center gap-1">
              <Volume2 className="w-3 h-3" />
              <span>SPEED TEST DRILLS</span>
            </legend>
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-bold flex items-center gap-1">
                    {audioQuestions ? (
                      <Volume2 className="w-3.5 h-3.5 text-[#008000]" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 text-[#cc0000]" />
                    )}
                    <span>{t.test.audioQuestionToggle}</span>
                  </div>
                  <p className="text-[11px] text-[#555] leading-snug">
                    Include listening questions in Speed Sprint. Timer pauses automatically during audio playback.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleAudioQuestions}
                  className={`px-3 py-1 font-mono font-bold text-xs border border-t-white border-l-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white transition-colors shrink-0 ${
                    audioQuestions
                      ? "bg-[#008000] text-white hover:bg-[#006600]"
                      : "bg-[#d4d0c8] text-[#555] hover:bg-[#c0c0c0]"
                  }`}
                >
                  {audioQuestions ? t.test.audioQuestionsOn : t.test.audioQuestionsOff}
                </button>
              </div>
            </div>
          </fieldset>

          {/* Dialog Action Buttons */}
          <div className="flex justify-end gap-2 pt-1 border-t border-[#808080]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-[#d4d0c8] text-black border border-t-white border-l-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>OK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [audioQuestions, setAudioQuestions] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("sakana_user_email") || "guest@sakanajp.site";
      setUserEmail(savedEmail);

      const savedAudio = localStorage.getItem("sakana_test_enable_audio");
      if (savedAudio !== null) {
        setAudioQuestions(savedAudio === "true");
      } else {
        setAudioQuestions(false);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-2xl max-w-md w-full text-stone-900 overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#fff5f2] text-[#fa624d] flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-semibold text-sm text-stone-900">{t.nav.preferences}</h2>
              <p className="text-[11px] text-stone-400">SaKana Settings</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* User Profile Card */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 space-y-2.5">
            <div className="flex items-center gap-1.5 font-semibold text-stone-700 text-xs">
              <User className="w-3.5 h-3.5 text-[#fa624d]" />
              <span>{t.nav.profile}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Account:</span>
              <span className="font-mono font-medium text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200 truncate max-w-[200px]">
                {userEmail}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span>Status:</span>
              <span className="flex items-center gap-1 font-medium text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isGuest ? "Guest (Local Sync)" : "Synced (Cloud)"}
              </span>
            </div>
            {isGuest && (
              <div className="pt-2 border-t border-stone-200/60 text-right">
                <Link
                  href={`${prefix}/login`}
                  onClick={onClose}
                  className="inline-block text-[11px] font-semibold text-[#fa624d] hover:text-[#e84630]"
                >
                  → {t.nav.login}
                </Link>
              </div>
            )}
          </div>

          {/* Test & Audio Preference */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${audioQuestions ? "bg-[#fff5f2] text-[#fa624d]" : "bg-stone-100 text-stone-400"}`}>
                  {audioQuestions ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-semibold text-stone-800 text-xs">Audio Questions</div>
                  <div className="text-[11px] text-stone-500">Play spoken audio prompt during tests</div>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleAudioQuestions}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  audioQuestions ? "bg-[#fa624d]" : "bg-stone-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                    audioQuestions ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-stone-50 border-t border-stone-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

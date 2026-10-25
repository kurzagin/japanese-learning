"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Volume2, VolumeX, Settings, Check, User, ShieldCheck, KeyRound, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreferencesModal({ isOpen, onClose }: PreferencesModalProps) {
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const [userEmail, setUserEmail] = useState<string>("guest@sakanajp.site");
  const [audioQuestions, setAudioQuestions] = useState<boolean>(false);

  // Account modification states
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMsg, setEmailMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ text: string; isError: boolean } | null>(null);

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
    setEmailMsg(null);
    setPwMsg(null);
  }, [isOpen]);

  const toggleAudioQuestions = () => {
    const nextVal = !audioQuestions;
    setAudioQuestions(nextVal);
    if (typeof window !== "undefined") {
      localStorage.setItem("sakana_test_enable_audio", String(nextVal));
      window.dispatchEvent(new Event("sakana_preferences_changed"));
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || newEmail === userEmail) return;
    setEmailLoading(true);
    setEmailMsg(null);

    const res = await authClient.updateEmail(newEmail);
    if (res.error) {
      setEmailMsg({ text: res.error.message || "Failed to update email", isError: true });
    } else {
      setEmailMsg({
        text: "Confirmation links sent to both your current and new email addresses. Please verify both.",
        isError: false,
      });
      setNewEmail("");
    }
    setEmailLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    if (newPassword.length < 6) {
      setPwMsg({ text: "Password must be at least 6 characters.", isError: true });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwMsg({ text: "Passwords do not match.", isError: true });
      return;
    }

    setPwLoading(true);
    setPwMsg(null);

    const res = await authClient.updatePassword(newPassword);
    if (res.error) {
      setPwMsg({ text: res.error.message || "Failed to change password", isError: true });
    } else {
      setPwMsg({ text: "Password updated successfully!", isError: false });
      setNewPassword("");
      setConfirmPassword("");
    }
    setPwLoading(false);
  };

  if (!isOpen) return null;

  const isGuest = userEmail === "guest@sakanajp.site";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-[#ece9d8] border-2 border-t-white border-l-white border-b-black border-r-black shadow-2xl max-w-md w-full text-black my-8">
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

          {/* Account Security (Change Email & Password for Registered Users) */}
          {!isGuest && (
            <fieldset className="border border-[#808080] p-3 bg-[#f5f5f0] space-y-3">
              <legend className="px-1 font-bold text-[#000080] uppercase flex items-center gap-1">
                <KeyRound className="w-3 h-3" />
                <span>ACCOUNT SECURITY</span>
              </legend>

              {/* Change Email Form */}
              <form onSubmit={handleUpdateEmail} className="space-y-1.5 border-b border-[#d0d0d0] pb-2.5">
                <label className="font-bold flex items-center gap-1 text-[11px] text-[#333]">
                  <Mail className="w-3 h-3 text-[#000080]" />
                  <span>CHANGE EMAIL ADDRESS:</span>
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="email"
                    placeholder="new-email@domain.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                    className="flex-1 px-2 py-1 bg-white border border-[#404040] border-t-[#808080] border-l-[#808080] text-[11px] font-mono outline-none"
                  />
                  <button
                    type="submit"
                    disabled={emailLoading || !newEmail}
                    className="px-2.5 py-1 bg-[#d4d0c8] border-t border-l border-white border-b border-r border-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-[11px]"
                  >
                    {emailLoading ? "SAVING..." : "UPDATE"}
                  </button>
                </div>
                {emailMsg && (
                  <p className={`text-[10px] leading-tight mt-1 ${emailMsg.isError ? "text-[#cc0000]" : "text-[#006600]"}`}>
                    {emailMsg.text}
                  </p>
                )}
              </form>

              {/* Change Password Form */}
              <form onSubmit={handleUpdatePassword} className="space-y-1.5">
                <label className="font-bold flex items-center gap-1 text-[11px] text-[#333]">
                  <KeyRound className="w-3 h-3 text-[#000080]" />
                  <span>CHANGE PASSWORD:</span>
                </label>
                <div className="space-y-1">
                  <input
                    type="password"
                    placeholder="New password (min. 6 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-2 py-1 bg-white border border-[#404040] border-t-[#808080] border-l-[#808080] text-[11px] font-mono outline-none"
                  />
                  <div className="flex gap-1.5">
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="flex-1 px-2 py-1 bg-white border border-[#404040] border-t-[#808080] border-l-[#808080] text-[11px] font-mono outline-none"
                    />
                    <button
                      type="submit"
                      disabled={pwLoading || !newPassword}
                      className="px-2.5 py-1 bg-[#d4d0c8] border-t border-l border-white border-b border-r border-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-[11px]"
                    >
                      {pwLoading ? "SAVING..." : "CHANGE"}
                    </button>
                  </div>
                </div>
                {pwMsg && (
                  <p className={`text-[10px] leading-tight mt-1 ${pwMsg.isError ? "text-[#cc0000]" : "text-[#006600]"}`}>
                    {pwMsg.text}
                  </p>
                )}
              </form>
            </fieldset>
          )}

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

"use client";

import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { HomeFooter } from "@/components/HomeFooter";
import { useLanguage } from "@/context/LanguageContext";
import {
  Shield,
  UserCheck,
  UserX,
  Database,
  HardDrive,
  Cookie,
  Server,
  Cloud,
  Volume2,
  FileText,
  RefreshCw,
  ExternalLink,
  Lock,
} from "lucide-react";

export default function PrivacyClient() {
  const { locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle="Privacy Policy" />

      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Window Header Box */}
        <div className="border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#d4d0c8] p-1 shadow-md">
          <div className="bg-[#000080] text-white px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#ffff00]" />
              <span className="font-bold text-xs sm:text-sm tracking-wide">
                PRIVACY_POLICY.TXT — NOTEPAD
              </span>
            </div>
            <span className="text-[10px] text-[#e0e0ff] font-mono">
              CONFIDENTIAL // TRANSPARENT
            </span>
          </div>

          <div className="bg-white p-4 sm:p-6 space-y-6 border border-[#808080] text-xs sm:text-sm text-[#222]">
            {/* Top Overview Banner */}
            <div className="border-b border-[#808080] pb-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#000080]">
                  SaKana Privacy Policy & Data Transparency
                </h1>
                <span className="bg-[#ffff00] border border-[#808080] text-[#800000] font-mono text-[10px] font-bold px-2 py-0.5">
                  EFFECTIVE: OCTOBER 2026
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                At <strong>SaKana (魚)</strong>, we believe educational tools should respect your freedom and privacy. This document outlines exactly what information is collected, how it is stored, and how our real guest and authenticated systems operate.
              </p>
            </div>

            {/* In-depth Comparison: Guest vs Logged In */}
            <div className="space-y-4">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-[#ffff00]" />
                <span>1. REAL DATA IMPLEMENTATION: GUEST VS. LOGGED-IN ACCOUNTS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Guest Box */}
                <div className="border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#faf8f0] p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[#800000] font-bold text-sm border-b border-[#d0cebf] pb-2 mb-2">
                      <UserX className="w-4 h-4" />
                      <span>GUEST MODE (NO REGISTRATION)</span>
                    </div>

                    <div className="space-y-2.5 text-xs text-[#333]">
                      <p>
                        <strong>Zero Personal Data Collected:</strong> You do not need to submit your email, name, phone number, or password. You are assigned a local placeholder (<code>guest@sakanajp.site</code>).
                      </p>

                      <div>
                        <strong>Client-Side Storage (Browser localStorage):</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-[11px] font-mono text-[#444] bg-white p-2 border border-[#d0cebf]">
                          <li>
                            <code>sakana_progress</code>: Stage completions, star ratings (1–3), accuracy percentage, and best speed duration in milliseconds.
                          </li>
                          <li>
                            <code>sakana_srs_records</code>: SM-2 spaced repetition flashcards (review intervals, ease factor, repetition count, lapses, next review timestamp).
                          </li>
                          <li>
                            <code>sakana_locale</code>: Interface language preference (English, Indonesian, or Japanese).
                          </li>
                          <li>
                            <code>sakana_audio_questions</code>: Toggle for sound-based listening quizzes.
                          </li>
                        </ul>
                      </div>

                      <p>
                        <strong>Server Storage:</strong> Zero study sessions or flashcard records are sent to our cloud database. Only an anonymous visitor counter (<code>/api/visitors</code>) is incremented on page load without storing IP addresses or browser fingerprints.
                      </p>

                      <p className="text-[11px] text-[#800000] bg-[#fff0f0] p-2 border border-[#e0c0c0]">
                        <strong>⚠️ Notice:</strong> Because guest data is stored exclusively in your browser&apos;s localStorage, clearing your browser cache or switching devices will reset your study history.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#d0cebf] text-[11px] text-[#000080] font-bold">
                    ✓ 100% Private to your device
                  </div>
                </div>

                {/* Logged-In Account Box */}
                <div className="border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#f0f4f8] p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[#000080] font-bold text-sm border-b border-[#c0d0e8] pb-2 mb-2">
                      <UserCheck className="w-4 h-4" />
                      <span>AUTHENTICATED ACCOUNT</span>
                    </div>

                    <div className="space-y-2.5 text-xs text-[#333]">
                      <p>
                        <strong>Account Credentials:</strong>
                        <br />
                        • Email address (used for login and verification).
                        <br />
                        • Password (cryptographically salted and hashed by Supabase Auth using bcrypt/argon2; SaKana never sees or stores plaintext passwords).
                        <br />
                        • Optional Display Name and Preferences.
                      </p>

                      <div>
                        <strong>Cloud Database Storage (PostgreSQL hosted via Supabase):</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-[11px] font-mono text-[#444] bg-white p-2 border border-[#c0d0e8]">
                          <li>
                            <code>users</code>: Auth UID, email, display name, avatar, and system role.
                          </li>
                          <li>
                            <code>user_stage_progress</code>: Stage ID, completion boolean, best duration (ms), star ratings, accuracy percentage, and attempt counts.
                          </li>
                          <li>
                            <code>user_card_reviews</code>: SM-2 spaced repetition state, repetition intervals (days), ease factor, lapses, and next scheduled review dates.
                          </li>
                        </ul>
                      </div>

                      <p>
                        <strong>Session Cookies:</strong> Secure JSON Web Tokens (JWT) stored in HTTP cookies managed by <code>@supabase/ssr</code> to keep you signed in across tabs and devices.
                      </p>

                      <p className="text-[11px] text-[#006600] bg-[#f0fff0] p-2 border border-[#b0e0b0]">
                        <strong>✓ Cross-Device Sync:</strong> Your progress and SRS flashcards are safely backed up in the cloud, allowing seamless practice between phone and desktop.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#c0d0e8] text-[11px] text-[#000080] font-bold">
                    ✓ Encrypted Cloud Synchronization
                  </div>
                </div>
              </div>
            </div>

            {/* Guest to Account Migration Engine */}
            <div className="border border-[#808080] bg-[#fffbe6] p-4 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#800000]">
                <RefreshCw className="w-4 h-4" />
                <span>2. AUTOMATIC GUEST-TO-ACCOUNT PROGRESS MIGRATION</span>
              </div>
              <p className="text-xs text-[#444] leading-relaxed">
                When you study as a guest and subsequently sign up or log in, SaKana runs an automatic client-side migration utility (<code>syncGuestDataToAccount</code> via <code>/api/sync/migrate-guest</code>). This process extracts your local stages and SRS memory cards from <code>localStorage</code> and merges them into your newly authenticated PostgreSQL account. Higher stars, higher accuracy, and lower speed run times are preserved, ensuring zero progress is lost when upgrading from guest to user.
              </p>
            </div>

            {/* Third Party Services Disclosure */}
            <div className="space-y-3">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-[#ffff00]" />
                <span>3. THIRD-PARTY SERVICES USED BY SAKANA</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Supabase */}
                <div className="border border-[#808080] bg-[#f9f9f9] p-3 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-[#000080]">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#00aa00]" />
                      <span>Supabase (PostgreSQL & Auth)</span>
                    </span>
                    <span className="text-[10px] text-[#666] font-mono">SOC 2 / GDPR</span>
                  </div>
                  <p className="text-[#444] text-[11px] leading-relaxed">
                    Provides managed PostgreSQL database hosting and authentication infrastructure. Manages password hashing, email confirmations, session JWTs, and row-level security.
                  </p>
                </div>

                {/* Cloudflare R2 */}
                <div className="border border-[#808080] bg-[#f9f9f9] p-3 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-[#000080]">
                    <span className="flex items-center gap-1.5">
                      <Cloud className="w-3.5 h-3.5 text-[#ff6600]" />
                      <span>Cloudflare R2 & Edge CDN</span>
                    </span>
                    <span className="text-[10px] text-[#666] font-mono">EDGE NETWORK</span>
                  </div>
                  <p className="text-[#444] text-[11px] leading-relaxed">
                    Used to host and distribute audio recordings and media assets via <code>cdn.sakanajp.site</code>. Cloudflare caches content globally and monitors DDoS network traffic.
                  </p>
                </div>

                {/* Google AdSense */}
                <div className="border border-[#808080] bg-[#f9f9f9] p-3 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-[#000080]">
                    <span className="flex items-center gap-1.5">
                      <Cookie className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>Google AdSense (ca-pub-6604416528217447)</span>
                    </span>
                    <span className="text-[10px] text-[#666] font-mono">ADVERTISING</span>
                  </div>
                  <p className="text-[#444] text-[11px] leading-relaxed">
                    Serves unobtrusive ads in retro frames to fund server, database, and domain expenses, keeping SaKana 100% free. Google may use advertising cookies in accordance with Google&apos;s privacy policies.
                  </p>
                </div>

                {/* Web Speech API */}
                <div className="border border-[#808080] bg-[#f9f9f9] p-3 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-[#000080]">
                    <span className="flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-[#cc0000]" />
                      <span>Web Speech API (SpeechSynthesis)</span>
                    </span>
                    <span className="text-[10px] text-[#008800] font-mono">100% CLIENT-SIDE</span>
                  </div>
                  <p className="text-[#444] text-[11px] leading-relaxed">
                    Interactive pronunciation audio for Japanese characters is synthesized directly by your web browser&apos;s native engine (<code>ja-JP</code>). No audio requests or microphone recordings are sent across the network.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies & Storage Table */}
            <div className="space-y-3">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <Cookie className="w-3.5 h-3.5 text-[#ffff00]" />
                <span>4. COOKIES & LOCAL BROWSER STORAGE SUMMARY</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-[#808080] text-xs">
                  <thead>
                    <tr className="bg-[#d4d0c8] text-[#000080] font-bold">
                      <th className="border border-[#808080] p-2">Item Name</th>
                      <th className="border border-[#808080] p-2">Type</th>
                      <th className="border border-[#808080] p-2">Purpose</th>
                      <th className="border border-[#808080] p-2">Who Uses It</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d0cebf]">
                    <tr>
                      <td className="border border-[#808080] p-2 font-mono">sb-*-auth-token</td>
                      <td className="border border-[#808080] p-2">HTTP Cookie</td>
                      <td className="border border-[#808080] p-2">Maintains authenticated user session</td>
                      <td className="border border-[#808080] p-2">Logged-in Users</td>
                    </tr>
                    <tr>
                      <td className="border border-[#808080] p-2 font-mono">sakana_progress</td>
                      <td className="border border-[#808080] p-2">localStorage</td>
                      <td className="border border-[#808080] p-2">Stage scores, speed records, star ratings</td>
                      <td className="border border-[#808080] p-2">Guests & Logged-in (Cache)</td>
                    </tr>
                    <tr>
                      <td className="border border-[#808080] p-2 font-mono">sakana_srs_records</td>
                      <td className="border border-[#808080] p-2">localStorage</td>
                      <td className="border border-[#808080] p-2">SM-2 Spaced repetition interval states</td>
                      <td className="border border-[#808080] p-2">Guests & Logged-in (Cache)</td>
                    </tr>
                    <tr>
                      <td className="border border-[#808080] p-2 font-mono">sakana_locale</td>
                      <td className="border border-[#808080] p-2">localStorage</td>
                      <td className="border border-[#808080] p-2">Language preference (en, id, ja)</td>
                      <td className="border border-[#808080] p-2">All Users</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* User Rights & Account Deletion */}
            <div className="space-y-3">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#ffff00]" />
                <span>5. YOUR RIGHTS & ACCOUNT DELETION</span>
              </div>
              <p className="text-xs text-[#444] leading-relaxed">
                You retain complete control over your educational data. You may request permanent deletion of your account, email address, stage completion metrics, and SRS review cards from our PostgreSQL database at any time by contacting our team or raising an issue on our GitHub repository. Guests may delete their data at any time simply by clearing their browser&apos;s site data for <code>sakanajp.site</code>.
              </p>
            </div>

            {/* Quick Links Footer Bar */}
            <div className="pt-4 border-t border-[#808080] flex flex-wrap items-center justify-between gap-3 text-xs">
              <Link
                href={`${prefix}/tos`}
                className="text-[#000080] font-bold hover:underline flex items-center gap-1"
              >
                &rarr; View Terms of Service (TOS)
              </Link>
              <Link
                href={`${prefix}/`}
                className="px-3 py-1 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#e4e0d8] font-bold text-black"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}

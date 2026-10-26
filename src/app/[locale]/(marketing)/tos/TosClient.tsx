"use client";

import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { HomeFooter } from "@/components/HomeFooter";
import { useLanguage } from "@/context/LanguageContext";
import {
  FileCheck2,
  Scale,
  Code,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function TosClient() {
  const { locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const GITHUB_REPO_URL = "https://github.com/kurzagin/japanese-learning";

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle="Terms of Service" />

      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Window Container */}
        <div className="border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#d4d0c8] p-1 shadow-md">
          <div className="bg-[#000080] text-white px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#ffff00]" />
              <span className="font-bold text-xs sm:text-sm tracking-wide">
                TERMS_OF_SERVICE.TXT — NOTEPAD
              </span>
            </div>
            <span className="text-[10px] text-[#e0e0ff] font-mono">
              USER AGREEMENT // LEGAL
            </span>
          </div>

          <div className="bg-white p-4 sm:p-6 space-y-6 border border-[#808080] text-xs sm:text-sm text-[#222]">
            {/* Top Overview Banner */}
            <div className="border-b border-[#808080] pb-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#000080]">
                  SaKana Terms of Service & User Agreement
                </h1>
                <span className="bg-[#ffff00] border border-[#808080] text-[#800000] font-mono text-[10px] font-bold px-2 py-0.5">
                  EFFECTIVE: OCTOBER 2026
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                Welcome to <strong>SaKana (魚)</strong>, available at <code>sakanajp.site</code>. By accessing or using our website, services, and APIs, you agree to comply with and be bound by the following Terms of Service.
              </p>
            </div>

            {/* Section 1: Acceptance of Terms */}
            <div className="space-y-2">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>◆ 1. ACCEPTANCE & ELIGIBILITY</span>
              </div>
              <p className="text-xs text-[#444] leading-relaxed">
                These Terms govern your access to SaKana&apos;s educational platform, flashcard speed drills, spaced repetition system (SRS), vocabulary directory, and developer APIs. If you do not agree to these terms, please discontinue using the service.
              </p>
            </div>

            {/* Section 2: Educational Mission & Free Access */}
            <div className="space-y-2">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>◆ 2. OPEN EDUCATIONAL MISSION</span>
              </div>
              <p className="text-xs text-[#444] leading-relaxed">
                SaKana is designed to help anime fans, manga enthusiasts, and beginner learners master Japanese Hiragana, Katakana, and JLPT N5 vocabulary through instant recognition. Core flashcards, audio pronunciation, stroke guides, lookalike charts, and printable PDF worksheets are provided <strong>100% free of charge</strong>.
              </p>
            </div>

            {/* Section 3: Guest Usage & Authenticated Accounts */}
            <div className="space-y-3">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>◆ 3. USER ACCOUNTS & GUEST DATA POLICIES</span>
              </div>

              <div className="space-y-2 text-xs text-[#444] leading-relaxed">
                <p>
                  <strong>A. Guest Mode (Unauthenticated):</strong> You may use SaKana without creating an account. In this mode, study progress and SRS flashcards are saved solely within your browser&apos;s <code>localStorage</code>. SaKana has no access to your local storage and cannot recover progress lost due to browser cache clearance, private browsing mode, or device switching.
                </p>
                <p>
                  <strong>B. Registered Accounts:</strong> Creating an account enables PostgreSQL cloud synchronization across multiple devices. You agree to provide a valid email address and to maintain the confidentiality of your login credentials. You are responsible for all activities that occur under your account.
                </p>
                <p>
                  <strong>C. Progress Migration:</strong> When a guest registers or logs in, local <code>localStorage</code> study records are automatically merged to their cloud account via our migration API.
                </p>
              </div>
            </div>

            {/* Section 4: Acceptable Use Policy */}
            <div className="space-y-2">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>◆ 4. ACCEPTABLE USE & CONDUCT</span>
              </div>
              <div className="space-y-2 text-xs text-[#444] leading-relaxed">
                <p>
                  Users agree to use SaKana solely for lawful educational and personal study purposes. You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-[11px] font-mono text-[#333]">
                  <li>Attempt to disrupt, overwhelm (DDoS), or compromise the security of our servers or databases.</li>
                  <li>Scrape or mass-harvest platform assets at rates that degrade service performance for other learners.</li>
                  <li>Attempt to bypass authentication, session validation, or rate limits on public API endpoints.</li>
                  <li>Use automated bots to manipulate global visitor or community counters.</li>
                </ul>
              </div>
            </div>

            {/* Section 5: Open Source & Intellectual Property */}
            <div className="space-y-3">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>◆ 5. OPEN SOURCE LICENSE & INTELLECTUAL PROPERTY</span>
              </div>
              <div className="border border-[#808080] bg-[#faf8f0] p-3 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#000080]">
                  <Code className="w-4 h-4 text-[#000080]" />
                  <span>Apache License 2.0 — GitHub Repository</span>
                </div>
                <p className="text-[11px] text-[#444] leading-relaxed">
                  The software source code for SaKana is open source under the permissive <strong>Apache License 2.0</strong> and hosted publicly on GitHub at{" "}
                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#000080] font-bold underline inline-flex items-center gap-0.5"
                  >
                    <span>github.com/kurzagin/japanese-learning</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  . You are welcome to inspect, contribute, or build upon the educational code.
                </p>
                <p className="text-[11px] text-[#555] leading-relaxed">
                  The Japanese writing systems (Hiragana, Katakana, Kanji) and vocabulary definitions represent shared cultural and linguistic heritage. Anime references and pop-culture terms are referenced for transformative educational analysis under fair use principles.
                </p>
              </div>
            </div>

            {/* Section 6: Third-Party Services & Links */}
            <div className="space-y-2">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>◆ 6. THIRD-PARTY SERVICES & EXTERNAL WEBRINGS</span>
              </div>
              <p className="text-xs text-[#444] leading-relaxed">
                SaKana incorporates third-party infrastructure including <strong>Supabase</strong> (PostgreSQL & Auth), <strong>Cloudflare</strong> (R2 Object Storage & CDN), and <strong>Google AdSense</strong>. Our website may also display badges from retro webrings and partner community directories. We do not endorse and are not liable for the content, privacy policies, or practices of external third-party websites.
              </p>
            </div>

            {/* Section 7: Disclaimers & Limitation of Liability */}
            <div className="space-y-2">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>◆ 7. DISCLAIMER OF WARRANTIES & LIABILITY</span>
              </div>
              <div className="p-3 bg-[#f5f5f5] border border-[#d0d0d0] text-[11px] font-mono text-[#555] leading-relaxed">
                SAKANA IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR ACCURATE AT ALL TIMES. IN NO EVENT SHALL THE SAKANA PROJECT MAINTAINERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THE PLATFORM.
              </div>
            </div>

            {/* Section 8: Changes & Updates */}
            <div className="space-y-2">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <span>◆ 8. MODIFICATIONS TO TERMS</span>
              </div>
              <p className="text-xs text-[#444] leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Significant updates will be reflected with a revised &quot;Effective Date&quot; at the top of this document. Continued use of SaKana after modifications constitutes acceptance of the revised Terms.
              </p>
            </div>

            {/* Quick Links Footer Bar */}
            <div className="pt-4 border-t border-[#808080] flex flex-wrap items-center justify-between gap-3 text-xs">
              <Link
                href={`${prefix}/privacy`}
                className="text-[#000080] font-bold hover:underline flex items-center gap-1"
              >
                &rarr; View Privacy Policy & Data Transparency
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

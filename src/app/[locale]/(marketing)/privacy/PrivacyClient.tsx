"use client";

import Link from "next/link";
import { RetroNavbar } from "@/components/RetroNavbar";
import { HomeFooter } from "@/components/HomeFooter";
import { useLanguage } from "@/context/LanguageContext";
import { privacyTranslations } from "@/data/legal/privacy";
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
  Lock,
} from "lucide-react";

export default function PrivacyClient() {
  const { locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = privacyTranslations[locale] || privacyTranslations.en;

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      <RetroNavbar currentSubtitle={t.windowSubtitle} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Window Header Box */}
        <div className="border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#d4d0c8] p-1 shadow-md">
          <div className="bg-[#000080] text-white px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#ffff00]" />
              <span className="font-bold text-xs sm:text-sm tracking-wide">
                {t.notepadTitle}
              </span>
            </div>
            <span className="text-[10px] text-[#e0e0ff] font-mono">
              {t.notepadTag}
            </span>
          </div>

          <div className="bg-white p-4 sm:p-6 space-y-6 border border-[#808080] text-xs sm:text-sm text-[#222]">
            {/* Top Overview Banner */}
            <div className="border-b border-[#808080] pb-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#000080]">
                  {t.bannerTitle}
                </h1>
                <span className="bg-[#ffff00] border border-[#808080] text-[#800000] font-mono text-[10px] font-bold px-2 py-0.5">
                  {t.bannerEffective}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                {t.bannerLead.beforeBrand}
                <strong>{t.bannerLead.brandName}</strong>
                {t.bannerLead.afterBrand}
              </p>
            </div>

            {/* In-depth Comparison: Guest vs Logged In */}
            <div className="space-y-4">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-[#ffff00]" />
                <span>{t.section1Title}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Guest Box */}
                <div className="border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#faf8f0] p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[#800000] font-bold text-sm border-b border-[#d0cebf] pb-2 mb-2">
                      <UserX className="w-4 h-4" />
                      <span>{t.guestTitle}</span>
                    </div>

                    <div className="space-y-2.5 text-xs text-[#333]">
                      <p>
                        <strong>{t.guestZeroDataTitle}</strong>
                        {t.guestZeroDataDesc}
                      </p>

                      <div>
                        <strong>{t.guestStorageTitle}</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-[11px] font-mono text-[#444] bg-white p-2 border border-[#d0cebf]">
                          <li>
                            <code>sakana_progress</code>
                            {t.guestStorageKeys.progress}
                          </li>
                          <li>
                            <code>sakana_srs_records</code>
                            {t.guestStorageKeys.srs}
                          </li>
                          <li>
                            <code>sakana_locale</code>
                            {t.guestStorageKeys.locale}
                          </li>
                          <li>
                            <code>sakana_audio_questions</code>
                            {t.guestStorageKeys.audio}
                          </li>
                        </ul>
                      </div>

                      <p>
                        <strong>{t.guestServerStorageTitle}</strong>
                        {t.guestServerStorageDesc}
                      </p>

                      <p className="text-[11px] text-[#800000] bg-[#fff0f0] p-2 border border-[#e0c0c0]">
                        <strong>{t.guestNoticeTitle}</strong>
                        {t.guestNoticeDesc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#d0cebf] text-[11px] text-[#000080] font-bold">
                    {t.guestBadge}
                  </div>
                </div>

                {/* Logged-In Account Box */}
                <div className="border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#f0f4f8] p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[#000080] font-bold text-sm border-b border-[#c0d0e8] pb-2 mb-2">
                      <UserCheck className="w-4 h-4" />
                      <span>{t.authTitle}</span>
                    </div>

                    <div className="space-y-2.5 text-xs text-[#333]">
                      <div>
                        <strong>{t.authCredsTitle}</strong>
                        <br />
                        • {t.authCredsItems.email}
                        <br />
                        • {t.authCredsItems.password}
                        <br />
                        • {t.authCredsItems.optional}
                      </div>

                      <div>
                        <strong>{t.authCloudTitle}</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-[11px] font-mono text-[#444] bg-white p-2 border border-[#c0d0e8]">
                          <li>
                            <code>users</code>
                            {t.authCloudKeys.users}
                          </li>
                          <li>
                            <code>user_stage_progress</code>
                            {t.authCloudKeys.progress}
                          </li>
                          <li>
                            <code>user_card_reviews</code>
                            {t.authCloudKeys.reviews}
                          </li>
                        </ul>
                      </div>

                      <p>
                        <strong>{t.authCookiesTitle}</strong>
                        {t.authCookiesDesc}
                      </p>

                      <p className="text-[11px] text-[#006600] bg-[#f0fff0] p-2 border border-[#b0e0b0]">
                        <strong>{t.authSyncTitle}</strong>
                        {t.authSyncDesc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#c0d0e8] text-[11px] text-[#000080] font-bold">
                    {t.authBadge}
                  </div>
                </div>
              </div>
            </div>

            {/* Guest to Account Migration Engine */}
            <div className="border border-[#808080] bg-[#fffbe6] p-4 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#800000]">
                <RefreshCw className="w-4 h-4" />
                <span>{t.section2Title}</span>
              </div>
              <p className="text-xs text-[#444] leading-relaxed">
                {t.section2Desc}
              </p>
            </div>

            {/* Third Party Services Disclosure */}
            <div className="space-y-3">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-[#ffff00]" />
                <span>{t.section3Title}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Supabase */}
                <div className="border border-[#808080] bg-[#f9f9f9] p-3 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-[#000080]">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#00aa00]" />
                      <span>{t.services.supabaseTitle}</span>
                    </span>
                    <span className="text-[10px] text-[#666] font-mono">
                      {t.services.supabaseBadge}
                    </span>
                  </div>
                  <p className="text-[#444] text-[11px] leading-relaxed">
                    {t.services.supabaseDesc}
                  </p>
                </div>

                {/* Cloudflare R2 */}
                <div className="border border-[#808080] bg-[#f9f9f9] p-3 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-[#000080]">
                    <span className="flex items-center gap-1.5">
                      <Cloud className="w-3.5 h-3.5 text-[#ff6600]" />
                      <span>{t.services.cloudflareTitle}</span>
                    </span>
                    <span className="text-[10px] text-[#666] font-mono">
                      {t.services.cloudflareBadge}
                    </span>
                  </div>
                  <p className="text-[#444] text-[11px] leading-relaxed">
                    {t.services.cloudflareDesc}
                  </p>
                </div>

                {/* Google AdSense */}
                <div className="border border-[#808080] bg-[#f9f9f9] p-3 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-[#000080]">
                    <span className="flex items-center gap-1.5">
                      <Cookie className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>{t.services.adsenseTitle}</span>
                    </span>
                    <span className="text-[10px] text-[#666] font-mono">
                      {t.services.adsenseBadge}
                    </span>
                  </div>
                  <p className="text-[#444] text-[11px] leading-relaxed">
                    {t.services.adsenseDesc}
                  </p>
                </div>

                {/* Web Speech API */}
                <div className="border border-[#808080] bg-[#f9f9f9] p-3 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-[#000080]">
                    <span className="flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-[#cc0000]" />
                      <span>{t.services.webSpeechTitle}</span>
                    </span>
                    <span className="text-[10px] text-[#008800] font-mono">
                      {t.services.webSpeechBadge}
                    </span>
                  </div>
                  <p className="text-[#444] text-[11px] leading-relaxed">
                    {t.services.webSpeechDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies & Storage Table */}
            <div className="space-y-3">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <Cookie className="w-3.5 h-3.5 text-[#ffff00]" />
                <span>{t.section4Title}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-[#808080] text-xs">
                  <thead>
                    <tr className="bg-[#d4d0c8] text-[#000080] font-bold">
                      <th className="border border-[#808080] p-2">{t.tableHeaders.name}</th>
                      <th className="border border-[#808080] p-2">{t.tableHeaders.type}</th>
                      <th className="border border-[#808080] p-2">{t.tableHeaders.purpose}</th>
                      <th className="border border-[#808080] p-2">{t.tableHeaders.who}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d0cebf]">
                    <tr>
                      <td className="border border-[#808080] p-2 font-mono">sb-*-auth-token</td>
                      <td className="border border-[#808080] p-2">{t.tableRows.cookieSession.type}</td>
                      <td className="border border-[#808080] p-2">{t.tableRows.cookieSession.purpose}</td>
                      <td className="border border-[#808080] p-2">{t.tableRows.cookieSession.who}</td>
                    </tr>
                    <tr>
                      <td className="border border-[#808080] p-2 font-mono">sakana_progress</td>
                      <td className="border border-[#808080] p-2">{t.tableRows.localProgress.type}</td>
                      <td className="border border-[#808080] p-2">{t.tableRows.localProgress.purpose}</td>
                      <td className="border border-[#808080] p-2">{t.tableRows.localProgress.who}</td>
                    </tr>
                    <tr>
                      <td className="border border-[#808080] p-2 font-mono">sakana_srs_records</td>
                      <td className="border border-[#808080] p-2">{t.tableRows.localSrs.type}</td>
                      <td className="border border-[#808080] p-2">{t.tableRows.localSrs.purpose}</td>
                      <td className="border border-[#808080] p-2">{t.tableRows.localSrs.who}</td>
                    </tr>
                    <tr>
                      <td className="border border-[#808080] p-2 font-mono">sakana_locale</td>
                      <td className="border border-[#808080] p-2">{t.tableRows.localLocale.type}</td>
                      <td className="border border-[#808080] p-2">{t.tableRows.localLocale.purpose}</td>
                      <td className="border border-[#808080] p-2">{t.tableRows.localLocale.who}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* User Rights & Account Deletion */}
            <div className="space-y-3">
              <div className="bg-[#000080] text-white px-3 py-1 text-xs font-bold flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#ffff00]" />
                <span>{t.section5Title}</span>
              </div>
              <p className="text-xs text-[#444] leading-relaxed">
                {t.section5Desc}
              </p>
            </div>

            {/* Quick Links Footer Bar */}
            <div className="pt-4 border-t border-[#808080] flex flex-wrap items-center justify-between gap-3 text-xs">
              <Link
                href={`${prefix}/tos`}
                className="text-[#000080] font-bold hover:underline flex items-center gap-1"
              >
                {t.footerTosLink}
              </Link>
              <Link
                href={`${prefix}/`}
                className="px-3 py-1 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] hover:bg-[#e4e0d8] font-bold text-black"
              >
                {t.footerHomeBtn}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FishIcon } from "@/components/FishIcon";
import { RetroNavbar } from "@/components/RetroNavbar";
import { BottomNav } from "@/components/BottomNav";
import { ModernFooter } from "@/components/ModernFooter";
import { useLanguage } from "@/context/LanguageContext";
import { UserCheck, AlertCircle, ArrowLeft, Lock, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [authMsg, setAuthMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleNeonAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setAuthMsg(null);

    const res = await authClient.signIn(email, password || "Guest123456!");
    if (res.error) {
      const signupRes = await authClient.signUp(email, password || "Guest123456!");
      if (signupRes.error) {
        setAuthMsg({ text: signupRes.error.message || res.error.message, isError: true });
        setLoading(false);
        return;
      }
    }

    localStorage.setItem("sakana_user_email", email);
    setAuthMsg({ text: t.login.authSuccessMsg, isError: false });
    setTimeout(() => {
      router.push(`${prefix}/dashboard`);
    }, 400);
  };

  const handleGuestEntry = () => {
    setGuestLoading(true);
    localStorage.setItem("sakana_user_email", "guest@sakanajp.site");
    setTimeout(() => {
      router.push(`${prefix}/dashboard`);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-stone-900">
      <RetroNavbar currentSubtitle={t.login.appTitle} />

      <main className="flex-1 w-full max-w-md mx-auto px-4 py-12 sm:py-16 flex flex-col justify-center">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fa624d] to-[#ff8572] flex items-center justify-center text-white shadow-md shadow-[#fa624d]/20 mx-auto">
              <FishIcon className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">
              {t.login.appTitle}
            </h1>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              {t.login.instruction}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleNeonAuth} className="space-y-3.5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-stone-700 mb-1">
                {t.login.emailLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  placeholder="pilot@sakanajp.site"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 bg-stone-50/70 border border-stone-200 rounded-xl text-xs text-stone-900 outline-none focus:border-[#fa624d] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pass" className="block text-xs font-semibold text-stone-700 mb-1">
                {t.login.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="pass"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-50/70 border border-stone-200 rounded-xl text-xs text-stone-900 outline-none focus:border-[#fa624d] focus:bg-white transition-all"
                />
              </div>
            </div>

            {authMsg && (
              <div
                className={`p-2.5 rounded-xl text-xs ${
                  authMsg.isError
                    ? "bg-rose-50 border border-rose-200 text-rose-700"
                    : "bg-emerald-50 border border-emerald-200 text-emerald-700"
                }`}
              >
                {authMsg.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#fa624d] hover:bg-[#e84630] font-semibold text-xs text-white shadow-xs transition-colors disabled:opacity-50"
            >
              {loading ? t.login.submitting : t.login.submit}
            </button>
          </form>

          {/* Guest Pass */}
          <div className="pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={handleGuestEntry}
              disabled={guestLoading}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 font-semibold text-xs text-stone-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <UserCheck className="w-4 h-4 text-[#fa624d]" />
              <span>{t.login.guestBtn}</span>
            </button>
          </div>

          {/* Invite Only Note */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-[11px] leading-relaxed text-amber-900 space-y-1">
            <div className="font-semibold text-amber-800 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.login.inviteNoticeTitle}</span>
            </div>
            <p className="text-amber-700">
              {t.login.inviteNoticeText.beforeMainSite}
              <a
                href="https://kurzagin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-900 font-semibold underline hover:text-[#fa624d]"
              >
                {t.login.inviteNoticeText.mainSite}
              </a>
              {t.login.inviteNoticeText.between}
              <a
                href="https://kurzagin.com/guestbook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-900 font-semibold underline hover:text-[#fa624d]"
              >
                {t.login.inviteNoticeText.guestbook}
              </a>
              {t.login.inviteNoticeText.afterGuestbook}
            </p>
          </div>

          <div className="text-center pt-1">
            <Link
              href={prefix || "/"}
              className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.login.returnLink}</span>
            </Link>
          </div>
        </div>
      </main>

      <ModernFooter />
      <BottomNav />
    </div>
  );
}

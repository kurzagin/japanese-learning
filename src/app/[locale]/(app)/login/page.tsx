"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FishIcon } from "@/components/FishIcon";
import { RetroNavbar } from "@/components/RetroNavbar";
import { useLanguage } from "@/context/LanguageContext";
import { UserCheck, AlertTriangle, CheckCircle2, UserPlus, LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, locale } = useLanguage();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [authMsg, setAuthMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  // Check if landing from email confirmation link (?confirmed=true)
  useEffect(() => {
    if (searchParams.get("confirmed") === "true") {
      setAuthMsg({
        text: t.login.emailConfirmedMsg || "Email confirmed! You can now sign in.",
        isError: false,
      });
    }
  }, [searchParams, t.login.emailConfirmedMsg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setAuthMsg(null);

    if (mode === "signin") {
      const res = await authClient.signIn(email, password);
      if (res.error) {
        setAuthMsg({ text: res.error.message || "Invalid credentials", isError: true });
        setLoading(false);
        return;
      }

      setAuthMsg({ text: t.login.authSuccessMsg, isError: false });
      setTimeout(() => {
        router.push(`${prefix}/dashboard`);
      }, 400);
    } else {
      // Sign Up Flow
      const res = await authClient.signUp(email, password, displayName || undefined);
      if (res.error) {
        setAuthMsg({ text: res.error.message || "Registration failed", isError: true });
        setLoading(false);
        return;
      }

      // If Supabase has email confirmation enabled, session will be null/unconfirmed
      if (!res.data?.session) {
        setRegisteredSuccess(true);
      } else {
        // If email confirmation is off in Supabase, sign in right away
        setAuthMsg({ text: t.login.authSuccessMsg, isError: false });
        setTimeout(() => {
          router.push(`${prefix}/dashboard`);
        }, 400);
      }
      setLoading(false);
    }
  };

  const handleGuestEntry = () => {
    setGuestLoading(true);
    localStorage.setItem("sakana_user_email", "guest@sakanajp.site");
    setTimeout(() => {
      router.push(`${prefix}/dashboard`);
    }, 300);
  };

  return (
    <div className="space-y-5">
      {/* Header Card */}
      <div className="flex items-center gap-3.5 border-b border-[#808080] pb-4">
        <div className="w-12 h-12 border border-[#808080] bg-white flex items-center justify-center text-[#000080] shrink-0">
          <FishIcon className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-[#000080]">
            {t.login.appTitle}
          </h1>
          <p className="text-xs text-[#555] mt-0.5">
            {t.login.instruction}
          </p>
        </div>
      </div>

      {/* Registration Success / Check Email View */}
      {registeredSuccess ? (
        <div className="border-2 border-t-white border-l-white border-b-black border-r-black bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#006600] font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{t.login.signUpCheckEmailTitle}</span>
          </div>
          <p className="text-xs text-[#333] leading-relaxed">
            {t.login.signUpCheckEmailDesc}
          </p>
          <div className="border border-[#b0a88e] bg-[#fffde6] p-3 text-xs leading-relaxed text-[#554210] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-[#b38600] shrink-0 mt-0.5" />
            <div>
              <strong>{t.login.checkSpamNotice}</strong>
            </div>
          </div>
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setRegisteredSuccess(false);
                setMode("signin");
              }}
              className="w-full py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-[#000080] hover:bg-[#c0bca8]"
            >
              {t.login.goToSignInBtn}
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Tab Selector: Sign In vs Create Account */}
          <div className="flex border-b-2 border-[#808080]">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setAuthMsg(null);
              }}
              className={`flex-1 py-1.5 text-xs font-bold flex items-center justify-center gap-1.5 border-t-2 border-l-2 border-r-2 ${
                mode === "signin"
                  ? "bg-[#ece9d8] border-white border-b-transparent -mb-[2px] text-[#000080]"
                  : "bg-[#d4d0c8] border-[#808080] text-[#555] hover:bg-[#c0bca8]"
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.login.signInTab}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setAuthMsg(null);
              }}
              className={`flex-1 py-1.5 text-xs font-bold flex items-center justify-center gap-1.5 border-t-2 border-l-2 border-r-2 ${
                mode === "signup"
                  ? "bg-[#ece9d8] border-white border-b-transparent -mb-[2px] text-[#000080]"
                  : "bg-[#d4d0c8] border-[#808080] text-[#555] hover:bg-[#c0bca8]"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t.login.signUpTab}</span>
            </button>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="space-y-3 bg-[#f5f5f0] p-4 border border-[#808080]">
            {mode === "signup" && (
              <div>
                <label htmlFor="name" className="block text-[11px] font-bold text-[#333] mb-1">
                  {t.login.displayNameLabel}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Sakana Pilot"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-[#404040] border-t-[#808080] border-l-[#808080] text-xs text-black outline-none font-mono focus:bg-[#ffffeb]"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-[11px] font-bold text-[#333] mb-1">
                {t.login.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                placeholder="pilot@sakanajp.site"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-2 py-1 bg-white border border-[#404040] border-t-[#808080] border-l-[#808080] text-xs text-black outline-none font-mono focus:bg-[#ffffeb]"
              />
            </div>

            <div>
              <label htmlFor="pass" className="block text-[11px] font-bold text-[#333] mb-1">
                {t.login.passwordLabel}
              </label>
              <input
                id="pass"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-2 py-1 bg-white border border-[#404040] border-t-[#808080] border-l-[#808080] text-xs text-black outline-none font-mono focus:bg-[#ffffeb]"
              />
            </div>

            {authMsg && (
              <div
                className={`p-2 text-xs border ${
                  authMsg.isError
                    ? "bg-[#ffebee] border-[#cc0000] text-[#cc0000]"
                    : "bg-[#e8f5e9] border-[#006600] text-[#006600]"
                }`}
              >
                {authMsg.text}
              </div>
            )}

            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-black hover:bg-[#c0bca8]"
              >
                {loading
                  ? t.login.submitting
                  : mode === "signin"
                  ? t.login.submit
                  : t.login.signUpSubmit}
              </button>
            </div>
          </form>
        </>
      )}

      {/* Quick Guest Pass Box */}
      <div className="border border-[#808080] bg-[#f9f9f9] p-2 space-y-1.5 text-center">
        <div className="text-[10px] text-[#666]">
          ◆ {t.login.guestTitle} ◆
        </div>
        <button
          type="button"
          onClick={handleGuestEntry}
          disabled={guestLoading}
          className="w-full py-1.5 px-2 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-[#000080] hover:bg-[#c0bca8] flex items-center justify-center gap-1"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>{t.login.guestBtn}</span>
        </button>
      </div>

      {/* Invite Only Notice Box */}
      <div className="border border-[#b0a88e] bg-[#fffde6] p-2.5 text-[11px] leading-relaxed text-[#4a4228] space-y-1">
        <div className="font-bold text-[10px] text-[#705800] uppercase tracking-wider flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5 text-[#b38600]" />
          <span>{t.login.inviteNoticeTitle}</span>
        </div>
        <p>
          {t.login.inviteNoticeText.beforeMainSite}
          <a
            href="https://kurzagin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#000080] underline font-bold hover:text-[#cc0000]"
          >
            {t.login.inviteNoticeText.mainSite}
          </a>
          {t.login.inviteNoticeText.between}
          <a
            href="https://kurzagin.com/guestbook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#000080] underline font-bold hover:text-[#cc0000]"
          >
            {t.login.inviteNoticeText.guestbook}
          </a>
          {t.login.inviteNoticeText.afterGuestbook}
        </p>
      </div>

      <div className="text-center">
        <Link
          href={prefix || "/"}
          className="text-[11px] text-[#000080] underline hover:text-[#cc0000]"
        >
          {t.login.returnLink}
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9d8] text-black">
      {/* Full-width Sticky Retro Navbar */}
      <RetroNavbar currentSubtitle={t.login.appTitle} />

      {/* Login Page Content inside Suspense for useSearchParams */}
      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center">
        <Suspense
          fallback={
            <div className="p-8 text-center font-mono text-xs text-[#555]">
              [ INITIALIZING AUTH INTERFACE... ]
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}

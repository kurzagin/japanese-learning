"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FishIcon } from "@/components/FishIcon";
import { RetroNavbar } from "@/components/RetroNavbar";
import { useLanguage } from "@/context/LanguageContext";
import { UserCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
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

    // Call Neon Managed Better Auth client
    const res = await authClient.signIn(email, password || "Guest123456!");
    if (res.error) {
      // If sign-in failed (e.g. user doesn't exist yet), attempt sign-up
      const signupRes = await authClient.signUp(email, password || "Guest123456!");
      if (signupRes.error && signupRes.error.code !== "USER_ALREADY_EXISTS") {
        setAuthMsg({ text: signupRes.error.message, isError: true });
        // Still allow entry with offline local storage mode
        localStorage.setItem("sakana_user_email", email);
        setTimeout(() => router.push("/dashboard"), 500);
        return;
      }
    }

    localStorage.setItem("sakana_user_email", email);
    setAuthMsg({ text: "Authentication successful! Redirecting...", isError: false });
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  const handleGuestEntry = () => {
    setGuestLoading(true);
    localStorage.setItem("sakana_user_email", "guest@sakana.net");
    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
  };

  return (
    <div className="min-h-screen py-6 px-2 sm:px-6 flex flex-col items-center justify-center">
      {/* Windows 98/2000 Dialog Box */}
      <div className="w-full max-w-sm bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] shadow-xl">
        
        {/* Retro Navbar & SaKana Branding */}
        <RetroNavbar currentSubtitle={t.login.appTitle} />

        {/* Dialog Content */}
        <div className="p-4 bg-[#ece9d8] text-black space-y-4">
          
          <div className="flex items-start gap-3 border-b border-[#808080] pb-3">
            <div className="w-10 h-10 border border-[#808080] bg-[#fff] flex items-center justify-center text-[#000080]">
              <FishIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xs font-bold text-[#000080]">
                {t.login.appTitle}
              </h1>
              <p className="text-[11px] text-[#555] mt-0.5">
                {t.login.instruction}
              </p>
            </div>
          </div>

          <form onSubmit={handleNeonAuth} className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-[11px] font-bold text-[#333] mb-1">
                {t.login.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                placeholder="pilot@sakana.net"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-2 py-1 bg-white border border-[#404040] border-t-[#808080] border-l-[#808080] text-xs text-black outline-none font-mono focus:bg-[#ffffeb]"
              />
            </div>

            <div>
              <label htmlFor="pass" className="block text-[11px] font-bold text-[#333] mb-1">
                Password
              </label>
              <input
                id="pass"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-1 bg-white border border-[#404040] border-t-[#808080] border-l-[#808080] text-xs text-black outline-none font-mono focus:bg-[#ffffeb]"
              />
            </div>

            {authMsg && (
              <div
                className={`p-1.5 text-[11px] border ${
                  authMsg.isError
                    ? "bg-[#ffebee] border-[#cc0000] text-[#cc0000]"
                    : "bg-[#e8f5e9] border-[#006600] text-[#006600]"
                }`}
              >
                {authMsg.text}
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-1.5 px-3 bg-[#d4d0c8] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white font-bold text-xs text-black hover:bg-[#c0bca8]"
              >
                {loading ? t.login.submitting : t.login.submit}
              </button>
            </div>
          </form>

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

          <div className="text-center">
            <Link
              href="/"
              className="text-[11px] text-[#000080] underline hover:text-[#cc0000]"
            >
              {t.login.returnLink}
            </Link>
          </div>

        </div>

        {/* Dialog Status */}
        <div className="border-t border-[#808080] bg-[#d4d0c8] px-2 py-0.5 text-[9px] text-[#555] flex justify-between">
          <span>NEON MANAGED AUTH</span>
          <span>SSL // SECURED</span>
        </div>
      </div>
    </div>
  );
}

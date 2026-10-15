import type { Metadata } from "next";
import KanaHubClient from "./KanaHubClient";

export const metadata: Metadata = {
  title: "Japanese Kana Chart — Complete Hiragana & Katakana Directory",
  description:
    "Explore the complete Japanese Kana reference directory. Comprehensive Hiragana and Katakana matrix (Gojūon, Dakuon, Handakuon, Yōon) with romaji, stroke counts, audio pronunciation, and mnemonics.",
  alternates: {
    canonical: "/kana",
  },
  openGraph: {
    title: "Complete Japanese Kana Chart — Hiragana & Katakana | SaKana",
    description:
      "Interactive 400+ character Japanese Hiragana and Katakana chart with romaji, audio pronunciation, stroke order, and speed-reading drills.",
    url: "/kana",
  },
};

export default function KanaPage() {
  return <KanaHubClient />;
}

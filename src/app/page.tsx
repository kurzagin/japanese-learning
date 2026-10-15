import type { Metadata } from "next";
import HomePage from "./HomeClient";

export const metadata: Metadata = {
  title: "Read Kana Before the Subtitles Pop Up | Japanese Speed Drill",
  description:
    "Fast Kana reading reflexes for anime fans. Master Hiragana, Katakana, and iconic anime words in fractions of a second with SM-2 spaced repetition and Voicevox audio.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SaKana (魚) — Kana Reading Speed Drill for Anime Fans",
    description:
      "Stop obsessing over stroke orders. Train your reflexes to read anime titles, attack shouts, and manga sound effects instantly.",
    url: "/",
  },
};

export default function Page() {
  return <HomePage />;
}

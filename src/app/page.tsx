import type { Metadata } from "next";
import HomePage from "./HomeClient";

export const metadata: Metadata = {
  title: "Understand Spoken Anime Japanese | Kana & Audio Drill",
  description:
    "Break free from subtitles. Connect spoken sounds to real Japanese words with Voicevox audio drills and spaced repetition.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SaKana (魚) — Understand Spoken Anime Japanese",
    description:
      "Stop getting glued to English subtitles. Train your ears and brain to catch spoken Japanese dialogue in real time.",
    url: "/",
  },
};

export default function Page() {
  return <HomePage />;
}

import type { Metadata } from "next";
import HomePage from "./HomeClient";

export const metadata: Metadata = {
  title: "Free Japanese Speed Drill & Spaced Repetition",
  description:
    "Learn Japanese Hiragana, Katakana, and core words with fast-paced speed drills, SM-2 flashcard memory system, and Voicevox Japanese audio.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SaKana (魚) — Free Japanese Speed Drill",
    description:
      "Interactive flashcards and speed tests for Japanese Hiragana, Katakana, and Vocabulary.",
    url: "/",
  },
};

export default function Page() {
  return <HomePage />;
}

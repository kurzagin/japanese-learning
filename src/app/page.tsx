import type { Metadata } from "next";
import HomePage from "./HomeClient";

export const metadata: Metadata = {
  title: "Master Kana the Fun Way — Built for Anime Fans | SaKana",
  description:
    "Skip the boring textbooks. Master Hiragana and Katakana fast with audio flashcards, spaced repetition, and iconic Japanese pop-culture words.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SaKana (魚) — The Fastest Way to Master Kana for Anime Fans",
    description:
      "Master Japanese Hiragana and Katakana through speed recognition flashcards, native Voicevox audio, and real anime words.",
    url: "/",
  },
};

export default function Page() {
  return <HomePage />;
}

import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About the System & Curriculum",
  description:
    "Learn about SaKana's retro Japanese learning architecture: SM-2 spaced repetition system (SRS), Voicevox AI neural audio pronunciation, multi-language support (EN, ID, JA), and fast retro drills.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About SaKana — Japanese Learning Engine & Features",
    description:
      "Explore SaKana's retro-futuristic Japanese learning platform featuring Voicevox neural audio, SM-2 SRS flashcard algorithms, and 30-kana arcade challenges.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

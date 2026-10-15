import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About the Method & Curriculum — Learn Kana for Anime Fans",
  description:
    "Learn about SaKana's Japanese learning philosophy: instant Kana recognition, SM-2 spaced repetition (SRS), Voicevox neural audio, and vocabulary built for anime and manga enthusiasts.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About SaKana — Kana Speed Recognition for Anime Fans",
    description:
      "Explore SaKana's recognition-first approach: read anime titles, character names, and manga sound effects with speed drills and Voicevox audio.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

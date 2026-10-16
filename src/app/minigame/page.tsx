import type { Metadata } from "next";
import { Suspense } from "react";
import MinigameClient from "./MinigameClient";

export const metadata: Metadata = {
  title: "30-Kana Arcade Loop — Quick Speed Challenge",
  description:
    "Test your Japanese Kana recognition speed under pressure in the 30-Kana arcade challenge.",
  alternates: {
    canonical: "/minigame",
  },
  openGraph: {
    title: "30-Kana Arcade Loop — Japanese Speed Challenge | SaKana",
    description: "Speed-test your Hiragana and Katakana reading with real-time feedback.",
    url: "/minigame",
  },
};

export default function MinigamePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "SaKana 30-Kana Arcade Loop",
    description:
      "Fast-paced Japanese Hiragana and Katakana speed recognition game. Beat the clock and test your kana reading reflex under pressure.",
    genre: ["Educational Game", "Trivia", "Language Learning"],
    url: "https://sakanajp.site/minigame",
    audience: {
      "@type": "Audience",
      audienceType: "Japanese Language Learners & Anime Fans",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen p-4 flex items-center justify-center font-mono text-xs">
            LOADING 30-KANA ARCADE LOOP...
          </div>
        }
      >
        <MinigameClient />
      </Suspense>
    </>
  );
}

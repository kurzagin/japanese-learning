import type { Metadata } from "next";
import HomePage from "./HomeClient";

export const metadata: Metadata = {
  title: "Master Kana the Fun Way — Built for Anime Fans | SaKana",
  description:
    "Skip the boring textbooks. Master Hiragana and Katakana fast with audio flashcards, spaced repetition, and iconic Japanese pop-culture words.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      id: "/",
      ja: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "SaKana (魚) — The Fastest Way to Master Kana for Anime Fans",
    description:
      "Master Japanese Hiragana and Katakana through speed recognition flashcards, native Voicevox audio, and real anime words.",
    url: "/",
  },
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How fast can I learn Hiragana and Katakana with SaKana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most learners master reading all 46 basic Hiragana and 46 Katakana characters in 3 to 7 days using SaKana's rapid-drill flashcards and SM-2 spaced repetition system.",
        },
      },
      {
        "@type": "Question",
        name: "Why should anime fans learn Katakana first or alongside Hiragana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Katakana is used everywhere in Japanese pop culture: anime character names, attack moves, manga onomatopoeia sound effects, and English loanwords like 'Hero' (ヒーロー) and 'Anime' (アニメ).",
        },
      },
      {
        "@type": "Question",
        name: "Is SaKana completely free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, SaKana is 100% free with open access to all Hiragana and Katakana matrix charts, character stroke guides, 161 core vocabulary words, lookalike comparisons, and audio pronunciation.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePage />
    </>
  );
}


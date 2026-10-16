import type { Metadata } from "next";
import WordsHubClient from "./WordsHubClient";

export const metadata: Metadata = {
  title: "Core & Anime Japanese Vocabulary Directory — 161 Words with Audio",
  description:
    "Explore essential Japanese Hiragana and Katakana vocabulary words including popular anime terms with native Voicevox audio pronunciation, spelling breakdowns, English & Indonesian translations, and SRS practice cards.",
  alternates: {
    canonical: "/words",
    languages: {
      en: "/words",
      id: "/words",
      ja: "/words",
      "x-default": "/words",
    },
  },
  openGraph: {
    title: "Core & Anime Japanese Vocabulary Directory | SaKana",
    description:
      "Master essential Hiragana & Katakana words and anime loanwords with native audio pronunciation and character breakdowns.",
    url: "/words",
  },
  keywords: [
    "japanese anime vocabulary",
    "anime words hiragana katakana",
    "japanese vocabulary list",
    "hiragana words",
    "katakana words",
    "learn japanese words",
    "sakanajp vocabulary",
  ],
};

export default function WordsPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Japanese Core & Anime Vocabulary Directory",
        description:
          "A curated directory of foundational Japanese Hiragana and Katakana vocabulary with audio pronunciations, character breakdowns, and spaced repetition cards.",
        url: "https://sakanajp.site/words",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How many Japanese words do beginners need to start watching anime?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Mastering the top 100 to 200 common anime words and loanwords—such as 'arigatou', 'kawaii', 'senpai', and 'sugoi'—along with basic Kana recognition enables beginners to pick out frequent spoken phrases and subtitles instantly.",
            },
          },
          {
            "@type": "Question",
            name: "Why are some words written in Katakana instead of Hiragana?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Words written in Katakana are usually loanwords borrowed from other languages (e.g., パン for bread, コーヒー for coffee), foreign character names, scientific terms, or words emphasized for dramatic effect in manga.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <WordsHubClient />
    </>
  );
}

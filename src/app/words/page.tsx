import type { Metadata } from "next";
import WordsHubClient from "./WordsHubClient";

export const metadata: Metadata = {
  title: "Core & Anime Japanese Vocabulary Directory — 161 Words with Audio",
  description:
    "Explore essential Japanese Hiragana and Katakana vocabulary words including popular anime terms with native Voicevox audio pronunciation, spelling breakdowns, English & Indonesian translations, and SRS practice cards.",
  alternates: {
    canonical: "/words",
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
    "@type": "CollectionPage",
    name: "Japanese Core Vocabulary Directory",
    description:
      "A curated directory of foundational Japanese Hiragana and Katakana vocabulary with audio pronunciations and stroke breakdowns.",
    url: "https://sakanajp.site/words",
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

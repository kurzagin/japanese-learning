import type { Metadata } from "next";
import KanaHubClient from "./KanaHubClient";

export const metadata: Metadata = {
  title: "Japanese Kana Chart — Complete Hiragana & Katakana Directory",
  description:
    "Explore the complete Japanese Kana reference directory. Comprehensive Hiragana and Katakana matrix (Gojūon, Dakuon, Handakuon, Yōon) with romaji, stroke counts, audio pronunciation, and mnemonics.",
  alternates: {
    canonical: "/kana",
  },
  openGraph: {
    title: "Complete Japanese Kana Chart — Hiragana & Katakana | SaKana",
    description:
      "Interactive 400+ character Japanese Hiragana and Katakana chart with romaji, audio pronunciation, stroke order, and speed-reading drills.",
    url: "/kana",
  },
};

export default function KanaPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Complete Japanese Kana Chart (Hiragana & Katakana)",
        description:
          "Comprehensive directory of all Japanese Hiragana and Katakana characters, including Gojūon (46 primitives), Dakuon (voiced), Handakuon (semi-voiced), and Yōon (contracted) combinations with audio pronunciation and stroke orders.",
        url: "https://sakanajp.site/kana",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the difference between Hiragana and Katakana?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hiragana has smooth, flowing strokes and is used for native Japanese grammatical particles, verb conjugations, and native vocabulary. Katakana has sharp, angular strokes and is used primarily for foreign loanwords, anime character names, scientific terms, and dramatic sound effects (manga onomatopoeia).",
            },
          },
          {
            "@type": "Question",
            name: "How many Kana characters are there in Japanese?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "There are 46 basic characters (Gojūon) in Hiragana and 46 in Katakana, totaling 92 base primitives. When adding diacritical marks (dakuten/handakuten) and digraph combination sounds (yōon), each syllabary expands to over 100 phonetic units.",
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
      <KanaHubClient />
    </>
  );
}

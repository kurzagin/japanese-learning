import type { Metadata } from "next";
import RomajiConverterClient from "./RomajiConverterClient";

export const metadata: Metadata = {
  title: "Romaji to Kana Converter — Free Online Hiragana & Katakana Tool",
  description:
    "Convert Romaji to Japanese Hiragana and Katakana in real time. Fast, accurate, handles small tsu (sokuon), combinations (yōon), and features pronunciation audio.",
  alternates: {
    canonical: "/tools/romaji-to-kana",
  },
  openGraph: {
    title: "Free Romaji to Hiragana & Katakana Converter | SaKana",
    description:
      "Instant real-time converter from English/Romaji letters to Japanese Hiragana and Katakana.",
    url: "/tools/romaji-to-kana",
  },
  keywords: [
    "romaji to hiragana",
    "romaji to katakana",
    "japanese converter",
    "convert english to japanese letters",
    "kana converter",
    "romaji converter online",
    "sakanajp",
  ],
};

export default function RomajiConverterPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "SaKana Romaji to Kana Converter",
        applicationCategory: "EducationalApplication",
        operatingSystem: "All modern browsers",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://sakanajp.site",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Romaji to Kana Converter",
            item: "https://sakanajp.site/tools/romaji-to-kana",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does Romaji to Hiragana conversion work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Romaji conversion matches Hepburn Romanization phonemes to standard Hiragana and Katakana characters, handling double consonants (sokuon using small tsu っ) and contracted sounds (yoon like kya, shu, cho).",
            },
          },
          {
            "@type": "Question",
            name: "Why is 'konnichiwa' converted to 'こんにちは' with 'ha' instead of 'wa'?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Japanese grammar, greetings like 'konnichiwa' and topic markers ('watashi wa') are historically grammatical particles spelled with the character は (ha), even though they are phonetically pronounced 'wa'. The SaKana converter includes a smart particle toggle to respect this rule.",
            },
          },
          {
            "@type": "Question",
            name: "How are double consonants written in Kana?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Double consonants like 'tt' in 'matte' or 'pp' in 'nippon' are represented in Japanese using a small tsu (Hiragana っ or Katakana ッ), creating a short glottal pause.",
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
      <RomajiConverterClient />
    </>
  );
}

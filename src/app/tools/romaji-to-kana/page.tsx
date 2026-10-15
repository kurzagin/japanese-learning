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
  return <RomajiConverterClient />;
}

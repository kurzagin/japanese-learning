import type { Metadata } from "next";
import DocsClient from "./DocsClient";

export const metadata: Metadata = {
  title: "API Documentation | SaKana Kana Primitives API",
  description:
    "Public API reference for SaKana Japanese Learning platform. Access Hiragana & Katakana primitives, romaji romanization, phonetic groupings, and native audio endpoints.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "SaKana Public API Documentation",
    description:
      "Explore the SaKana Public Kana API v1. Access structured Japanese Hiragana & Katakana characters, phonetic rows, hints, and pronunciation audio files.",
    url: "/docs",
  },
};

export default function DocsPage() {
  return <DocsClient />;
}

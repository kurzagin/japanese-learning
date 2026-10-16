import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocsClient from "./DocsClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "API Documentation | SaKana Kana Primitives API",
    description:
      "Public API reference for SaKana Japanese Learning platform. Access Hiragana & Katakana primitives, romaji romanization, phonetic groupings, and native audio endpoints.",
    ogTitle: "SaKana Public API Documentation",
    ogDescription:
      "Explore the SaKana Public Kana API v1. Access structured Japanese Hiragana & Katakana characters, phonetic rows, hints, and pronunciation audio files.",
  },
  id: {
    title: "Dokumentasi API | API Primitif Kana SaKana",
    description:
      "Referensi API publik untuk platform belajar SaKana. Akses dataset Hiragana & Katakana, alih aksara romaji, klasifikasi fonetik, dan endpoint audio native.",
    ogTitle: "Dokumentasi API Publik SaKana",
    ogDescription:
      "Akses data karakter Hiragana & Katakana terstruktur, petunjuk visual, dan file audio pengucapan Voicevox via REST API.",
  },
  ja: {
    title: "APIドキュメント | SaKana かなプリミティブAPI仕様",
    description:
      "SaKana日本語学習プラットフォームの公開REST APIリファレンス。ひらがな・カタカナの字形データ、ローマ字転写、音韻分類、ネイティブ音声をプログラムから取得可能。",
    ogTitle: "SaKana 公開APIドキュメント",
    ogDescription:
      "構造化されたひらがな・カタカナの五十音データとVOICEVOX音声エンドポイントを自由にご利用いただけます。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/docs");

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: alternates.languages[locale] || alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: alternates.languages[locale] || alternates.canonical,
    },
  };
}

export default async function DocsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  return <DocsClient />;
}

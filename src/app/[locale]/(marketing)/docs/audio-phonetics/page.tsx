import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { AudioDocClient } from "@/components/docs/AudioDocClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Audio Engine & Japanese Phonetics | SaKana Documentation",
    description:
      "Learn about SaKana's audio pipeline: native Japanese speech synthesis at a calibrated 0.85x speed, Japanese Mora timing, pitch accents, and loanword Katakana combinations.",
    ogTitle: "Native Audio Engine & Phonetics — SaKana",
    ogDescription:
      "Explore the phonetic accuracy and speech engine powering SaKana's crystal-clear native pronunciation.",
  },
  id: {
    title: "Mesin Audio & Fonetik Bahasa Jepang | Dokumentasi SaKana",
    description:
      "Pelajari sistem audio SaKana: sintesis suara native bahasa Jepang dengan tempo terkalibrasi 0.85x, ketukan Mora Jepang, aksen nada, dan kombinasi Katakana kata serapan.",
    ogTitle: "Mesin Audio Native & Fonetik — SaKana",
    ogDescription:
      "Jelajahi keakuratan fonetik dan mesin suara yang menggerakkan pelafalan jernih SaKana.",
  },
  ja: {
    title: "音声エンジン＆日本語音韻論 | SaKana ドキュメント",
    description:
      "SaKanaの音声パイプライン解説：0.85倍速に調整されたネイティブ日本語音声合成、モーラ拍感覚、高低アクセント、外来語カタカナ特殊音の仕組み。",
    ogTitle: "ネイティブ音声＆音韻論仕様 — SaKana",
    ogDescription:
      "SaKanaのクリアなネイティブ発音を支える音韻設計と音声合成エンジンの詳細。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/docs/audio-phonetics");

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

export default async function AudioPhoneticsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  return (
    <DocsLayout>
      <AudioDocClient />
    </DocsLayout>
  );
}

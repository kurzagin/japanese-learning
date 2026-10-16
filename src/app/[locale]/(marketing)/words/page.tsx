import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WordsHubClient from "./WordsHubClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";
import { getAllVocabulary } from "@/lib/db-data";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Core & Anime Japanese Vocabulary Directory — 161 Words with Audio",
    description:
      "Explore essential Japanese Hiragana and Katakana vocabulary words including popular anime terms with native Voicevox audio pronunciation, spelling breakdowns, English & Indonesian translations, and SRS practice cards.",
    ogTitle: "Core & Anime Japanese Vocabulary Directory | SaKana",
    ogDescription:
      "Master essential Hiragana & Katakana words and anime loanwords with native audio pronunciation and character breakdowns.",
  },
  id: {
    title: "Direktori Kosakata Dasar & Anime Jepang — 161 Kata dengan Audio",
    description:
      "Jelajahi kosakata dasar Hiragana dan Katakana termasuk istilah anime populer dengan audio pengucapan Voicevox native, pemecahan karakter, dan arti bahasa Indonesia.",
    ogTitle: "Direktori Kosakata Jepang Dasar & Anime | SaKana",
    ogDescription:
      "Kuasai kosakata Jepang esensial dan kata serapan anime dengan pengucapan audio native serta kartu latihan SRS.",
  },
  ja: {
    title: "基本＆アニメ頻出 日本語単語集 — 161語（ネイティブ音声・解説付き）",
    description:
      "ひらがな・カタカナで構成される基本語彙およびアニメ・日常会話頻出の161単語を収録。VOICEVOXによる自然な発音音声、文字構成分解、英語・インドネシア語訳を掲載。",
    ogTitle: "基本＆アニメ日本語単語ディレクトリ | SaKana",
    ogDescription:
      "かな文字から覚える実践日本語単語。クリアな音声とフラッシュカードで反射的な語彙力を養成。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/words");

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
}

export default async function WordsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const prefix = locale === "en" ? "" : `/${locale}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name:
          locale === "id"
            ? "Direktori Kosakata Dasar & Anime Jepang"
            : locale === "ja"
            ? "基本＆アニメ日本語単語集"
            : "Japanese Core & Anime Vocabulary Directory",
        description:
          "A curated directory of foundational Japanese Hiragana and Katakana vocabulary with audio pronunciations, character breakdowns, and spaced repetition cards.",
        url: `https://sakanajp.site${prefix}/words`,
      },
    ],
  };

  const words = await getAllVocabulary();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <WordsHubClient initialWords={words} />
    </>
  );
}

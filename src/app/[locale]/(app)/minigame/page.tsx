import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MinigameClient from "./MinigameClient";
import { translations } from "@/data/i18n";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";
import { getStages } from "@/lib/db-data";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "30-Kana Arcade Loop — Quick Speed Challenge",
    description: "Test your Japanese Kana recognition speed under pressure in the 30-Kana arcade challenge.",
    ogTitle: "30-Kana Arcade Loop — Japanese Speed Challenge | SaKana",
    ogDescription: "Speed-test your Hiragana and Katakana reading with real-time feedback.",
  },
  id: {
    title: "30-Kana Arcade Loop — Tantangan Kecepatan Refleks",
    description: "Uji kecepatan refleks membaca huruf Jepang Hiragana & Katakana di arcade SaKana.",
    ogTitle: "30-Kana Arcade Loop — Tantangan Kecepatan Huruf Jepang | SaKana",
    ogDescription: "Uji refleks membaca Hiragana dan Katakana dengan loop adaptif 30 karakter.",
  },
  ja: {
    title: "30文字かなアーケード — 瞬間反射サバイバルドリル",
    description: "30文字の連続反射ループでかな文字の認識速度を極限までテスト。苦手な文字を重点ループ。",
    ogTitle: "30文字かなアーケード | SaKana",
    ogDescription: "クリア済みかな文字の定着度をテストするリアルタイムアーケードドリル。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/minigame");

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

export default async function MinigamePage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = translations[locale];
  const prefix = locale === "en" ? "" : `/${locale}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "SaKana 30-Kana Arcade Loop",
    description:
      "Fast-paced Japanese Hiragana and Katakana speed recognition game. Beat the clock and test your kana reading reflex under pressure.",
    genre: ["Educational Game", "Trivia", "Language Learning"],
    url: `https://sakanajp.site${prefix}/minigame`,
    audience: {
      "@type": "Audience",
      audienceType: "Japanese Language Learners & Anime Fans",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const stages = await getStages();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen p-4 flex items-center justify-center font-mono text-xs">
            {t.common.initializingPool}
          </div>
        }
      >
        <MinigameClient stages={stages} />
      </Suspense>
    </>
  );
}

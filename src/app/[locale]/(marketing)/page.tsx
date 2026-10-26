import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_STATS } from "@/lib/site-stats";
import HomePage from "@/app/HomeClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Master Kana the Fun Way — Built for Anime Fans | SaKana",
    description:
      "Skip the boring textbooks. Master Hiragana and Katakana fast with audio flashcards, spaced repetition, and iconic Japanese pop-culture words.",
    ogTitle: "SaKana (魚) — The Fastest Way to Master Kana for Anime Fans",
    ogDescription:
      "Master Japanese Hiragana and Katakana through speed recognition flashcards, native Japanese TTS audio, and real anime words.",
  },
  id: {
    title: "Cara Menyenangkan Kuasai Kana — Didesain untuk Penggemar Anime | SaKana",
    description:
      "Tinggalkan buku teks yang membosankan. Kuasai Hiragana dan Katakana cepat dengan flashcard audio, spaced repetition, dan kosakata anime populer.",
    ogTitle: "SaKana (魚) — Cara Tercepat Belajar Huruf Jepang untuk Penggemar Anime",
    ogDescription:
      "Kuasai Hiragana dan Katakana Jepang melalui drill kecepatan, audio TTS Jepang native, dan kata-kata anime populer.",
  },
  ja: {
    title: "アニメファンのための最速「かな文字」学習ドリル | SaKana (魚)",
    description:
      "退屈なテキスト練習は不要。テンポの良いカード学習、クリアなネイティブ音声合成（TTS）、大好きなポップカルチャーの言葉でひらがな・カタカナを楽しく身につけます。",
    ogTitle: "SaKana (魚) — アニメファンのための「かな文字」瞬時認識ドリル",
    ogDescription:
      "反射神経を鍛えるカード学習とクリアな音声で、ひらがな・カタカナを素早くマスター。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/");

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

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name:
          locale === "id"
            ? "Berapa lama waktu yang dibutuhkan untuk belajar Hiragana dan Katakana di SaKana?"
            : locale === "ja"
            ? "SaKanaでひらがな・カタカナを覚えるのにどれくらい時間がかかりますか？"
            : "How fast can I learn Hiragana and Katakana with SaKana?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            locale === "id"
              ? "Sebagian besar pembelajar menguasai 46 Hiragana dasar dan 46 Katakana dalam 3 hingga 7 hari menggunakan drill cepat dan sistem SM-2 spaced repetition SaKana."
              : locale === "ja"
              ? "SaKanaの瞬間認識ドリルとSM-2記憶保持システムにより、多くの学習者が3〜7日で基本の46文字を読めるようになります。"
              : "Most learners master reading all 46 basic Hiragana and 46 Katakana characters in 3 to 7 days using SaKana's rapid-drill flashcards and SM-2 spaced repetition system.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePage stats={SITE_STATS} />
    </>
  );
}

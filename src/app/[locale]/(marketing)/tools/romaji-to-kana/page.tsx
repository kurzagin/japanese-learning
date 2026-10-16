import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RomajiConverterClient from "./RomajiConverterClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Romaji to Kana Converter — Free Online Hiragana & Katakana Tool",
    description:
      "Convert Romaji to Japanese Hiragana and Katakana in real time. Fast, accurate, handles small tsu (sokuon), combinations (yōon), and features pronunciation audio.",
    ogTitle: "Free Romaji to Hiragana & Katakana Converter | SaKana",
    ogDescription:
      "Instant real-time converter from English/Romaji letters to Japanese Hiragana and Katakana.",
  },
  id: {
    title: "Konverter Romaji ke Kana — Alat Online Hiragana & Katakana Gratis",
    description:
      "Ubah teks Romaji / alfabet Latin ke huruf Jepang Hiragana dan Katakana secara real-time. Akurat menangani konsonan ganda (sokuon), gabungan (yōon), dan audio native.",
    ogTitle: "Konverter Romaji ke Hiragana & Katakana Gratis | SaKana",
    ogDescription:
      "Ubah ketikan alfabet latin menjadi huruf Hiragana dan Katakana Jepang secara instan dan akurat.",
  },
  ja: {
    title: "ローマ字・かなリアルタイム変換ツール — 無料オンライン変換",
    description:
      "アルファベット（ローマ字）入力をひらがな・カタカナにリアルタイム変換。促音（っ）や拗音（きゃ・しゅ・ちょ）に完全対応し、発音音声の再生も可能。",
    ogTitle: "ローマ字・かな変換ツール | SaKana",
    ogDescription:
      "入力と同時にひらがな・カタカナへ即時変換。スマート助詞トグル付き。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/tools/romaji-to-kana");

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
      "romaji to hiragana",
      "romaji to katakana",
      "japanese converter",
      "convert english to japanese letters",
      "kana converter",
      "romaji converter online",
      "sakanajp",
    ],
  };
}

export default async function RomajiConverterPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const prefix = locale === "en" ? "" : `/${locale}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "SaKana Romaji to Kana Converter",
        applicationCategory: "EducationalApplication",
        operatingSystem: "All modern browsers",
        url: `https://sakanajp.site${prefix}/tools/romaji-to-kana`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
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

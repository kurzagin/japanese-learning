import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KanaHubClient from "./KanaHubClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";
import { getAllKana } from "@/lib/db-data";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Japanese Kana Chart — Complete Hiragana & Katakana Directory",
    description:
      "Explore the complete Japanese Kana reference directory. Comprehensive Hiragana and Katakana matrix (Gojūon, Dakuon, Handakuon, Yōon) with romaji, stroke counts, audio pronunciation, and mnemonics.",
    ogTitle: "Complete Japanese Kana Chart — Hiragana & Katakana | SaKana",
    ogDescription:
      "Interactive 400+ character Japanese Hiragana and Katakana chart with romaji, audio pronunciation, stroke order, and speed-reading drills.",
  },
  id: {
    title: "Tabel Kana Jepang — Direktori Lengkap Hiragana & Katakana",
    description:
      "Jelajahi direktori referensi Kana Jepang terlengkap. Matriks komprehensif Hiragana dan Katakana (Gojūon, Dakuon, Handakuon, Yōon) dengan romaji, audio, dan jembatan keledai.",
    ogTitle: "Tabel Lengkap Kana Jepang — Hiragana & Katakana | SaKana",
    ogDescription:
      "Bagan interaktif 400+ karakter Hiragana dan Katakana dengan audio pengucapan native dan drill pengenalan cepat.",
  },
  ja: {
    title: "日本語五十音図・かな一覧表 — ひらがな・カタカナ完全リファレンス",
    description:
      "200字以上のひらがな・カタカナを網羅した五十音図リファレンス。清音（46音）、濁音・半濁音、拗音を網羅し、クリアな発音音声と書き順情報、単語例を掲載。",
    ogTitle: "日本語五十音図（かな文字リファレンス） | SaKana",
    ogDescription:
      "ネイティブ音声付きの五十音図マトリックス。瞬時認識ドリルと連動した対話型かな一覧表。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/kana");

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

export default async function KanaPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name:
          locale === "id"
            ? "Tabel Lengkap Kana Jepang (Hiragana & Katakana)"
            : locale === "ja"
            ? "日本語五十音図（ひらがな・カタカナ一覧）"
            : "Complete Japanese Kana Chart (Hiragana & Katakana)",
        description:
          "Comprehensive directory of all Japanese Hiragana and Katakana characters, including Gojūon (46 primitives), Dakuon (voiced), Handakuon (semi-voiced), and Yōon (contracted) combinations with audio pronunciation and stroke orders.",
        url: `https://sakanajp.site${locale === "en" ? "" : `/${locale}`}/kana`,
      },
    ],
  };

  const allKana = await getAllKana();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <KanaHubClient allKana={allKana} />
    </>
  );
}

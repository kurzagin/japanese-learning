import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsLayout } from "@/components/docs/DocsLayout";
import DocsClient from "../DocsClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Developer REST API Playground | SaKana Documentation",
    description:
      "Public REST API reference and interactive console for SaKana. Access structured Hiragana and Katakana character primitives, romaji romanization, and Voicevox audio endpoints.",
    ogTitle: "SaKana Public REST API Documentation",
    ogDescription:
      "Explore the SaKana Public Kana API v1. Access structured Japanese Hiragana & Katakana characters, phonetic rows, hints, and pronunciation audio files.",
  },
  id: {
    title: "Konsol Developer REST API | Dokumentasi SaKana",
    description:
      "Referensi REST API publik dan konsol interaktif untuk SaKana. Akses data karakter Hiragana dan Katakana terstruktur, romaji, dan endpoint audio Voicevox.",
    ogTitle: "Dokumentasi API Publik SaKana",
    ogDescription:
      "Akses data karakter Hiragana & Katakana terstruktur, petunjuk visual, dan file audio pengucapan Voicevox via REST API.",
  },
  ja: {
    title: "開発者向け REST API コンソール | SaKana ドキュメント",
    description:
      "SaKana日本語学習プラットフォームの公開REST APIリファレンスとインタラクティブテストベンチ。五十音データとVOICEVOX音声エンドポイントをプログラムから取得可能。",
    ogTitle: "SaKana 公開APIドキュメント",
    ogDescription:
      "構造化されたひらがな・カタカナの五十音データとVOICEVOX音声エンドポイントを自由にご利用いただけます。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/docs/api");

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

export default async function ApiDocsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  return (
    <DocsLayout>
      <DocsClient />
    </DocsLayout>
  );
}

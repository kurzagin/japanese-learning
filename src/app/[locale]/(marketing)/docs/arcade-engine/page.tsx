import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { ArcadeDocClient } from "@/components/docs/ArcadeDocClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Arcade Engine & Adaptive Weakness Weighting | SaKana Documentation",
    description:
      "Deep dive into the 30-Kana Survival Arcade. Discover how past SRS error rates dynamically boost card spawn rates up to 5x while resting 100% mastered characters.",
    ogTitle: "Arcade Engine & Survival Loops — SaKana",
    ogDescription:
      "Learn the algorithmic mechanics behind SaKana's 30-Kana Survival Arcade: dynamic error weighting, shield lives, and combo multipliers.",
  },
  id: {
    title: "Mesin Arcade & Pembobotan Kelemahan Adaptif | Dokumentasi SaKana",
    description:
      "Pelajari sistem Arcade Bertahan Hidup 30 Kana. Temukan bagaimana riwayat kesalahan SRS secara dinamis meningkatkan frekuensi muncul kartu hingga 5x sementara karakter yang telah dikuasai diistirahatkan.",
    ogTitle: "Mesin Arcade & Loop Bertahan Hidup — SaKana",
    ogDescription:
      "Pelajari mekanik algoritma di balik Arcade Bertahan Hidup 30 Kana SaKana: pembobotan kesalahan dinamis, perisai nyawa, dan pengganda kombo.",
  },
  ja: {
    title: "アーケードエンジン＆適応型弱点重点配分 | SaKana ドキュメント",
    description:
      "30文字かなサバイバルアーケードの仕様解説。過去のSRS忘却履歴に基づき、苦手文字の出現確率を最大5倍に動的配分し、完全修得済み文字を自動休眠させるアルゴリズム。",
    ogTitle: "アーケードエンジン＆生存ループ仕様 — SaKana",
    ogDescription:
      "SaKanaのサバイバルアーケードを支える動的重み付けアルゴリズム、シールド残機、コンボ倍率の仕組み。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/docs/arcade-engine");

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

export default async function ArcadeEnginePage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  return (
    <DocsLayout>
      <ArcadeDocClient />
    </DocsLayout>
  );
}

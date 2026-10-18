import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { ProgressionDocClient } from "@/components/docs/ProgressionDocClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Progression System & Speed Sprint Gates | SaKana Documentation",
    description:
      "Understand SaKana's dual-pillar learning progression: why untimed flashcard study schedules memory retention, while passing <1.5s Speed Sprint challenges unlocks subsequent sectors and Boss Gates.",
    ogTitle: "Progression System & Speed Sprints — SaKana",
    ogDescription:
      "Learn how SaKana balances long-term memory encoding with split-second reflex character recognition.",
  },
  id: {
    title: "Sistem Progresi & Gerbang Speed Sprint | Dokumentasi SaKana",
    description:
      "Pahami progresi belajar dua pilar SaKana: alasan belajar kartu memori menjadwalkan retensi, sedangkan tantangan Speed Sprint <1.5 detik membuka sektor berikutnya dan Gerbang Boss.",
    ogTitle: "Sistem Progresi & Speed Sprint — SaKana",
    ogDescription:
      "Pelajari bagaimana SaKana menyeimbangkan retensi jangka panjang dengan refleks pengenalan karakter sepersekian detik.",
  },
  ja: {
    title: "進捗システム＆スピードスプリント関門 | SaKana ドキュメント",
    description:
      "SaKanaの二大柱学習進捗モデル：フラッシュカード学習による記憶スケジュールと、1文字1.5秒未満のスピードスプリント関門によるステージ・ボス関門解放の仕組み。",
    ogTitle: "進捗システム＆スピードスプリント仕様 — SaKana",
    ogDescription:
      "長期記憶のエンコードと瞬時の文字反射認識を両立させる進捗システムを解説。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/docs/progression");

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

export default async function ProgressionPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  return (
    <DocsLayout>
      <ProgressionDocClient />
    </DocsLayout>
  );
}

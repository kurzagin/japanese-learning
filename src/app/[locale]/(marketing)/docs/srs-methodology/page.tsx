import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { SrsDocClient } from "@/components/docs/SrsDocClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "SRS Methodology & SM-2 Memory Model | SaKana Documentation",
    description:
      "Deep dive into SaKana's Spaced Repetition System (SRS). Learn how the SM-2 algorithm calculates interval expansion, ease factor penalties, <10m re-queue on Again, and 21-day Mastery.",
    ogTitle: "SM-2 Spaced Repetition (SRS) Methodology — SaKana",
    ogDescription:
      "Understand the memory science of SaKana: SM-2 interval formulas, ease factors, lapse penalties, and reaching 21-day Mastery.",
  },
  id: {
    title: "Metodologi SRS & Model Memori SM-2 | Dokumentasi SaKana",
    description:
      "Pelajari Sistem Pengulangan Berjarak (SRS) SaKana. Pahami cara algoritma SM-2 menghitung ekspansi interval, penalti ease factor, antrean ulang <10m saat Again, dan Penguasaan 21 hari.",
    ogTitle: "Metodologi Spaced Repetition (SRS) SM-2 — SaKana",
    ogDescription:
      "Pelajari sains retensi memori SaKana: formula interval SM-2, faktor kemudahan, penalti lapse, dan penguasaan 21 hari.",
  },
  ja: {
    title: "SRS間隔反復メソッド＆SM-2記憶モデル | SaKana ドキュメント",
    description:
      "SaKanaの間隔反復システム（SRS）の技術解説。SM-2アルゴリズムによる復習間隔拡大、Ease Factor変動、「もう一度」による10分以内再キュー、21日完全修得の基準を詳解。",
    ogTitle: "SM-2 間隔反復（SRS）アルゴリズム仕様 — SaKana",
    ogDescription:
      "SaKanaの記憶アルゴリズム解説：SM-2間隔計算式、イーズファクター、忘却ペナルティ、21日定着の仕組み。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/docs/srs-methodology");

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

export default async function SrsMethodologyPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  return (
    <DocsLayout>
      <SrsDocClient />
    </DocsLayout>
  );
}

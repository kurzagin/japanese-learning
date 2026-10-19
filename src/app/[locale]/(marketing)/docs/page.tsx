import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocsHubClient } from "@/components/docs/DocsHubClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Documentation & Knowledge Base | SaKana Japanese Learning",
    description:
      "Comprehensive documentation for SaKana. Learn about the SM-2 Spaced Repetition System (SRS), Speed Sprint reflex challenges, native Japanese speech audio, and adaptive Arcade drills.",
    ogTitle: "SaKana Knowledge Base & System Documentation",
    ogDescription:
      "Explore the science and mechanics behind SaKana: SM-2 spaced repetition, reflex sprints, native speech audio, and arcade survival loops.",
  },
  id: {
    title: "Dokumentasi & Basis Pengetahuan | Belajar Bahasa Jepang SaKana",
    description:
      "Dokumentasi lengkap untuk SaKana. Pelajari tentang Sistem Pengulangan Berjarak (SRS) SM-2, tantangan refleks Speed Sprint, audio penutur asli Jepang, dan latihan Arcade adaptif.",
    ogTitle: "Basis Pengetahuan & Dokumentasi Sistem SaKana",
    ogDescription:
      "Pelajari sains dan mekanik di balik SaKana: pengulangan berjarak SM-2, sprint refleks, audio penutur asli, dan loop bertahan hidup arcade.",
  },
  ja: {
    title: "ドキュメント＆ナレッジベース | SaKana 日本語学習システム",
    description:
      "SaKanaの総合ドキュメント。SM-2間隔反復システム（SRS）、スピードスプリント反射テスト、ネイティブ日本語音声、適応型アーケードドリルの仕組みを解説。",
    ogTitle: "SaKana ナレッジベース＆システムドキュメント",
    ogDescription:
      "SaKanaの背後にある記憶科学とシステム仕様：SM-2間隔反復、反射神経スプリント、ネイティブ日本語音声、アーケード生存ループを徹底解説。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/docs");

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

export default async function DocsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  return (
    <DocsLayout>
      <DocsHubClient />
    </DocsLayout>
  );
}

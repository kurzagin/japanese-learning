import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TosClient from "./TosClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Terms of Service & User Agreement | SaKana (魚)",
    description:
      "Review the Terms of Service for SaKana, including acceptable use policies, open-source Apache 2.0 licensing, guest browser storage, and third-party integrations.",
    ogTitle: "Terms of Service — SaKana Japanese Learning Platform",
    ogDescription:
      "User agreement, acceptable use policy, and Apache 2.0 open-source terms for SaKana.",
  },
  id: {
    title: "Syarat & Ketentuan Penggunaan | SaKana (魚)",
    description:
      "Tinjau Syarat & Ketentuan layanan SaKana, termasuk kebijakan penggunaan wajar, lisensi open-source Apache 2.0, penyimpanan lokal data tamu, dan integrasi pihak ketiga.",
    ogTitle: "Syarat & Ketentuan — Platform Belajar Bahasa Jepang SaKana",
    ogDescription:
      "Perjanjian pengguna, ketentuan penggunaan wajar, dan lisensi open-source Apache 2.0 di SaKana.",
  },
  ja: {
    title: "利用規約とユーザー合意書 | SaKana (魚)",
    description:
      "SaKana（魚）の利用規約、利用許諾方針、Apache 2.0オープンソースライセンス、ゲスト利用時の端末保存責任、サードパーティ連携に関するガイドラインをご確認ください。",
    ogTitle: "利用規約 — SaKana 日本語学習プラットフォーム",
    ogDescription:
      "SaKanaにおける利用規約、適正利用ポリシー、オープンソースライセンス条件。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/tos");

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

export default async function TosPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  return <TosClient />;
}

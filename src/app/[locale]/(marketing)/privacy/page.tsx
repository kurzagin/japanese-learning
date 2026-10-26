import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrivacyClient from "./PrivacyClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Privacy Policy & Data Transparency | SaKana (魚)",
    description:
      "Understand how SaKana handles guest localStorage, authenticated PostgreSQL accounts, automated progress migration, and third-party services like Supabase and Cloudflare.",
    ogTitle: "Privacy Policy — SaKana Japanese Learning Platform",
    ogDescription:
      "Transparent breakdown of guest localStorage, cloud account sync, and third-party integrations in SaKana.",
  },
  id: {
    title: "Kebijakan Privasi & Transparansi Data | SaKana (魚)",
    description:
      "Pelajari bagaimana SaKana mengelola data tamu di localStorage, akun cloud PostgreSQL, migrasi data otomatis, dan layanan pihak ketiga seperti Supabase serta Cloudflare.",
    ogTitle: "Kebijakan Privasi — Platform Belajar Bahasa Jepang SaKana",
    ogDescription:
      "Transparansi penuh data mode tamu, sinkronisasi akun terdaftar, dan layanan pihak ketiga di SaKana.",
  },
  ja: {
    title: "プライバシーポリシーとデータ透明性 | SaKana (魚)",
    description:
      "ゲスト利用時の端末内ローカル保存（localStorage）、登録アカウントでのPostgreSQLクラウド保存、データ自動移行、利用するサードパーティサービスについて詳しく解説します。",
    ogTitle: "プライバシーポリシー — SaKana 日本語学習プラットフォーム",
    ogDescription:
      "SaKanaにおけるゲスト保存、アカウント同期、外部サービス利用に関する透明性ポリシー。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/privacy");

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

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  return <PrivacyClient />;
}

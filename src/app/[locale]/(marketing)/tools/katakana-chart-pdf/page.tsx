import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrintableKanaChartClient } from "@/components/PrintableKanaChartClient";
import { getHreflangAlternates, isValidLocale } from "@/lib/seo/locale";
import { getKanaByScript } from "@/lib/db-data";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const META_BY_LOCALE = {
  en: {
    title: "Free Printable Katakana Chart PDF (Horizontal Landscape) — Complete A-O Table",
    description:
      "Download or print the complete Japanese Katakana chart in horizontal landscape PDF format. Includes all 46 basic Gojūon, 25 Dakuon/Handakuon, and 33 Yōon combinations with Romaji. 100% free for students and teachers.",
    ogTitle: "Printable Katakana Chart PDF (Horizontal Layout) | SaKana",
    ogDescription:
      "Free high-resolution horizontal Katakana PDF study sheet. All 104+ Katakana characters with Romaji guide.",
  },
  id: {
    title: "Bagan Katakana PDF Siap Cetak Gratis (Landscape Horizontal) — Tabel Lengkap A-O",
    description:
      "Unduh atau cetak tabel lengkap Katakana Jepang format PDF landscape horizontal. Mencakup 46 Gojūon dasar, 25 Dakuon/Handakuon, dan 33 Yōon dengan Romaji.",
    ogTitle: "Bagan Katakana PDF Siap Cetak (Layout Horizontal) | SaKana",
    ogDescription:
      "Lembar belajar Katakana resolusi tinggi format PDF gratis untuk murid dan guru.",
  },
  ja: {
    title: "無料印刷用カタカナ五十音図PDF（A4横型ランドスケープ） — 完全版一覧表",
    description:
      "A4横向きレイアウトの完全版カタカナ一覧表PDFを無料ダウンロード・印刷。清音46文字、濁音・半濁音25文字、拗音33文字をローマ字表記付きで網羅。",
    ogTitle: "印刷用カタカナ五十音図PDF（横型レイアウト） | SaKana",
    ogDescription:
      "高解像度A4横型カタカナ学習シート。個人学習・学校授業で無料配布可能。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = META_BY_LOCALE[locale];
  const alternates = getHreflangAlternates("/tools/katakana-chart-pdf");

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
      type: "website",
    },
    keywords: [
      "katakana chart pdf",
      "printable katakana chart",
      "katakana chart horizontal",
      "katakana landscape pdf",
      "japanese katakana table download",
      "katakana alphabet chart printable",
      "complete katakana chart",
      "free japanese study sheet",
      "sakanajp",
    ],
  };
}

export default async function KatakanaChartPdfPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const prefix = locale === "en" ? "" : `/${locale}`;
  const meta = META_BY_LOCALE[locale];

  const uiProps = {
    en: {
      title: "Printable Katakana Chart PDF",
      seoSubtitle: "Printable Katakana Chart PDF (Horizontal Landscape)",
      otherScriptLabel: "Hiragana (平仮名)",
    },
    id: {
      title: "Bagan PDF Katakana Siap Cetak",
      seoSubtitle: "Bagan PDF Katakana Siap Cetak (Landscape Horizontal)",
      otherScriptLabel: "Hiragana (平仮名)",
    },
    ja: {
      title: "印刷用カタカナ五十音図PDF",
      seoSubtitle: "印刷用カタカナ五十音図PDF（A4横型）",
      otherScriptLabel: "ひらがな (平仮名)",
    },
  }[locale];

  const kanaList = await getKanaByScript("katakana");

  return (
    <PrintableKanaChartClient
      script="katakana"
      title={uiProps.title}
      japaneseTitle="片仮名一覧表"
      description={meta.description}
      seoSubtitle={uiProps.seoSubtitle}
      otherScriptUrl={`${prefix}/tools/hiragana-chart-pdf`}
      otherScriptLabel={uiProps.otherScriptLabel}
      kanaList={kanaList}
    />
  );
}

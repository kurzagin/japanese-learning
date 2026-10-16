import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CURATED_COMPARISONS, getComparisonBySlug, KANA_STROKE_COUNTS } from "@/lib/kana-seo";
import { getAllKana } from "@/lib/db-data";
import KanaCompareClient from "./KanaCompareClient";
import { getHreflangAlternates, isValidLocale, LOCALES } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
    pair: string;
  }>;
}

export function generateStaticParams() {
  const params: Array<{ locale: string; pair: string }> = [];
  LOCALES.forEach((locale) => {
    CURATED_COMPARISONS.forEach((c) => {
      params.push({
        locale,
        pair: c.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pair } = await params;
  if (!isValidLocale(locale)) return {};

  const comparison = getComparisonBySlug(pair);
  if (!comparison) {
    return {
      title: "Kana Comparison Not Found",
    };
  }

  const allKana = await getAllKana();
  const k1 = allKana.find((k) => k.id === comparison.kana1Id);
  const k2 = allKana.find((k) => k.id === comparison.kana2Id);

  if (!k1 || !k2) {
    return {
      title: "Kana Comparison",
    };
  }

  const scriptLabel = comparison.script === "hiragana" ? "Hiragana" : "Katakana";
  let title = `${k1.character} vs ${k2.character} (${k1.romaji} vs ${k2.romaji}) — Difference Between Japanese ${scriptLabel} Lookalikes`;
  let description = `Learn the exact difference between Japanese ${scriptLabel} ${k1.character} (${k1.romaji}) and ${k2.character} (${k2.romaji}). Visual stroke directions, mnemonics, audio pronunciation, and comparison guide.`;

  if (locale === "id") {
    title = `${k1.character} vs ${k2.character} (${k1.romaji} vs ${k2.romaji}) — Perbedaan Karakter Huruf ${scriptLabel} Mirip`;
    description = `Pelajari cara membedakan karakter Jepang ${scriptLabel} ${k1.character} dan ${k2.character}. Arah guratan, trik visual, dan audio pengucapan.`;
  } else if (locale === "ja") {
    title = `「${k1.character}」と「${k2.character}」の違い（${k1.romaji} vs ${k2.romaji}）— ${scriptLabel === "Hiragana" ? "ひらがな" : "カタカナ"}見分け方ガイド`;
    description = `間違えやすい日本語の文字「${k1.character}」と「${k2.character}」の決定的な違い。筆順の方向と字形の特徴を視覚的に解説。`;
  }

  const path = `/compare/${pair}`;
  const alternates = getHreflangAlternates(path);

  return {
    title,
    description,
    alternates: {
      canonical: alternates.languages[locale] || alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: alternates.languages[locale] || alternates.canonical,
      type: "article",
    },
    keywords: [
      `${k1.character} vs ${k2.character}`,
      `difference between ${k1.character} and ${k2.character}`,
      `${k1.romaji} vs ${k2.romaji} ${comparison.script}`,
      `how to tell ${k1.character} and ${k2.character} apart`,
      `${comparison.script} lookalikes`,
      "sakanajp",
    ],
  };
}

export default async function KanaComparePage({ params }: Props) {
  const { locale, pair } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const comparison = getComparisonBySlug(pair);
  if (!comparison) {
    notFound();
  }

  const allKana = await getAllKana();
  const k1 = allKana.find((k) => k.id === comparison.kana1Id);
  const k2 = allKana.find((k) => k.id === comparison.kana2Id);

  if (!k1 || !k2) {
    notFound();
  }

  const prefix = locale === "en" ? "" : `/${locale}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `Difference Between ${k1.character} and ${k2.character} (${k1.romaji} vs ${k2.romaji})`,
        description: `A visual guide to distinguishing Japanese ${comparison.script} characters ${k1.character} and ${k2.character}.`,
        mainEntityOfPage: `https://sakanajp.site${prefix}/compare/${pair}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `https://sakanajp.site${prefix}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Kana Comparisons",
            item: `https://sakanajp.site${prefix}/compare`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${k1.character} vs ${k2.character}`,
            item: `https://sakanajp.site${prefix}/compare/${pair}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <KanaCompareClient
        comparison={comparison}
        kana1={k1}
        kana2={k2}
        k1Strokes={KANA_STROKE_COUNTS[k1.id] || null}
        k2Strokes={KANA_STROKE_COUNTS[k2.id] || null}
      />
    </>
  );
}

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
  const k3 = comparison.kana3Id ? allKana.find((k) => k.id === comparison.kana3Id) : undefined;

  if (!k1 || !k2) {
    return {
      title: "Kana Comparison",
    };
  }

  const charsEn = k3 ? `${k1.character} vs ${k2.character} vs ${k3.character}` : `${k1.character} vs ${k2.character}`;
  const romajisEn = k3 ? `${k1.romaji} vs ${k2.romaji} vs ${k3.romaji}` : `${k1.romaji} vs ${k2.romaji}`;
  const charsJa = k3 ? `「${k1.character}」と「${k2.character}」と「${k3.character}」` : `「${k1.character}」と「${k2.character}」`;

  const scriptLabel = comparison.script === "hiragana" ? "Hiragana" : "Katakana";
  let title = `${charsEn} (${romajisEn}) — Difference Between Japanese ${scriptLabel} Lookalikes`;
  let description = `Learn the exact difference between Japanese ${scriptLabel} ${charsEn} (${romajisEn}). Visual stroke directions, mnemonics, audio pronunciation, and comparison guide.`;

  if (locale === "id") {
    title = `${charsEn} (${romajisEn}) — Perbedaan Karakter Huruf ${scriptLabel} Mirip`;
    description = `Pelajari cara membedakan karakter Jepang ${scriptLabel} ${charsEn}. Arah guratan, trik visual, dan audio pengucapan.`;
  } else if (locale === "ja") {
    title = `${charsJa}の違い（${romajisEn}）— ${scriptLabel === "Hiragana" ? "ひらがな" : "カタカナ"}見分け方ガイド`;
    description = `間違えやすい日本語の文字${charsJa}の決定的な違い。筆順の方向と字形の特徴を視覚的に解説。`;
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
  const k3 = comparison.kana3Id ? allKana.find((k) => k.id === comparison.kana3Id) : undefined;

  if (!k1 || !k2) {
    notFound();
  }

  const prefix = locale === "en" ? "" : `/${locale}`;
  const pairTitle = k3 ? `${k1.character} vs ${k2.character} vs ${k3.character}` : `${k1.character} vs ${k2.character}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `Difference Between ${pairTitle}`,
        description: `A visual guide to distinguishing Japanese ${comparison.script} characters ${pairTitle}.`,
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
            name: pairTitle,
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
        kana3={k3}
        k1Strokes={KANA_STROKE_COUNTS[k1.id] || null}
        k2Strokes={KANA_STROKE_COUNTS[k2.id] || null}
        k3Strokes={k3 ? KANA_STROKE_COUNTS[k3.id] || null : null}
      />
    </>
  );
}

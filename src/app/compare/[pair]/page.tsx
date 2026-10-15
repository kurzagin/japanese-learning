import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CURATED_COMPARISONS, getComparisonBySlug, KANA_STROKE_COUNTS } from "@/lib/kana-seo";
import { ALL_KANA_PRIMITIVES } from "@/data/kana";
import KanaCompareClient from "./KanaCompareClient";

interface Props {
  params: Promise<{
    pair: string;
  }>;
}

export function generateStaticParams() {
  return CURATED_COMPARISONS.map((c) => ({
    pair: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const comparison = getComparisonBySlug(pair);

  if (!comparison) {
    return {
      title: "Kana Comparison Not Found",
    };
  }

  const k1 = ALL_KANA_PRIMITIVES.find((k) => k.id === comparison.kana1Id);
  const k2 = ALL_KANA_PRIMITIVES.find((k) => k.id === comparison.kana2Id);

  if (!k1 || !k2) {
    return {
      title: "Kana Comparison",
    };
  }

  const scriptLabel = comparison.script === "hiragana" ? "Hiragana" : "Katakana";
  const title = `${k1.character} vs ${k2.character} (${k1.romaji} vs ${k2.romaji}) — Difference Between Japanese ${scriptLabel} Lookalikes`;
  const description = `Learn the exact difference between Japanese ${scriptLabel} ${k1.character} (${k1.romaji}) and ${k2.character} (${k2.romaji}). Visual stroke directions, mnemonics, audio pronunciation, and comparison guide.`;
  const canonicalUrl = `/compare/${pair}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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
  const { pair } = await params;
  const comparison = getComparisonBySlug(pair);

  if (!comparison) {
    notFound();
  }

  const k1 = ALL_KANA_PRIMITIVES.find((k) => k.id === comparison.kana1Id);
  const k2 = ALL_KANA_PRIMITIVES.find((k) => k.id === comparison.kana2Id);

  if (!k1 || !k2) {
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `Difference Between ${k1.character} and ${k2.character} (${k1.romaji} vs ${k2.romaji})`,
        description: `A visual guide to distinguishing Japanese ${comparison.script} characters ${k1.character} and ${k2.character}.`,
        mainEntityOfPage: `https://sakanajp.site/compare/${pair}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://sakanajp.site",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Kana Comparisons",
            item: "https://sakanajp.site/compare",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${k1.character} vs ${k2.character}`,
            item: `https://sakanajp.site/compare/${pair}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How can I tell Japanese ${k1.character} and ${k2.character} apart?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: comparison.visualTip.en,
            },
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

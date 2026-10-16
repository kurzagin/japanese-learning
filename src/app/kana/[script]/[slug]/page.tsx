import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_KANA_PRIMITIVES } from "@/data/kana";
import {
  getKanaBySlug,
  getKanaSlug,
  KANA_STROKE_COUNTS,
  CONFUSED_PAIRS,
  getSampleWord,
  KANA_ORIGINS,
} from "@/lib/kana-seo";
import KanaDetailClient from "./KanaDetailClient";

interface Props {
  params: Promise<{
    script: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return ALL_KANA_PRIMITIVES.map((k) => ({
    script: k.script,
    slug: getKanaSlug(k),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { script, slug } = await params;
  const kana = getKanaBySlug(script, slug);

  if (!kana) {
    return {
      title: "Kana Not Found",
    };
  }

  const scriptTitle = kana.script === "hiragana" ? "Hiragana" : "Katakana";
  const strokes = KANA_STROKE_COUNTS[kana.id] || "standard";
  const origin = KANA_ORIGINS[kana.id];
  const originNote = origin ? ` Derived from ancient Kanji ${origin.kanji}.` : "";
  const title = `${kana.character} (${kana.romaji}) — ${scriptTitle} Character Guide & Pronunciation`;
  const description = `Master Japanese ${scriptTitle} ${kana.character} (${kana.romaji}).${originNote} Includes native audio pronunciation, mnemonic memory aid, and vocabulary words.`;
  const canonicalUrl = `/kana/${kana.script}/${slug}`;

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
      `${kana.script} ${kana.romaji}`,
      `japanese ${kana.character}`,
      `how to pronounce ${kana.character}`,
      `${kana.romaji} pronunciation`,
      "learn japanese kana",
      "sakanajp",
    ],
  };
}

export default async function KanaDetailPage({ params }: Props) {
  const { script, slug } = await params;
  const kana = getKanaBySlug(script, slug);

  if (!kana) {
    notFound();
  }

  const sampleWord = getSampleWord(kana.id);
  const origin = KANA_ORIGINS[kana.id] || null;
  const confusedIds = CONFUSED_PAIRS[kana.id] || [];
  const confusedKana = confusedIds
    .map((id) => ALL_KANA_PRIMITIVES.find((k) => k.id === id))
    .filter((k): k is typeof ALL_KANA_PRIMITIVES[number] => Boolean(k));

  const strokeCount = KANA_STROKE_COUNTS[kana.id] || null;

  // Schema.org structured data (DefinedTerm & BreadcrumbList)
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        name: `${kana.character} (${kana.romaji})`,
        alternateName: origin ? [origin.kanji, kana.romaji] : [kana.romaji],
        termCode: kana.character,
        inLanguage: "ja",
        description: kana.hint.en || `Japanese ${kana.script} character for ${kana.romaji}.`,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: `Japanese ${kana.script === "hiragana" ? "Hiragana" : "Katakana"} Alphabet`,
          url: "https://sakanajp.site/kana",
        },
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
            name: "Kana Hub",
            item: "https://sakanajp.site/kana",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${kana.script.charAt(0).toUpperCase() + kana.script.slice(1)} ${kana.character} (${kana.romaji})`,
            item: `https://sakanajp.site/kana/${kana.script}/${slug}`,
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
      <KanaDetailClient
        kana={kana}
        slug={slug}
        strokeCount={strokeCount}
        sampleWord={sampleWord}
        confusedKana={confusedKana}
        origin={origin}
      />
    </>
  );
}

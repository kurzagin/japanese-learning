import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  VOCABULARY_LIST,
  getWordBySlug,
  getConstituentKana,
  getRelatedWords,
} from "@/lib/vocab-seo";
import WordDetailClient from "./WordDetailClient";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return VOCABULARY_LIST.map((w) => ({
    slug: w.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const word = getWordBySlug(slug);

  if (!word) {
    return {
      title: "Japanese Word Not Found",
    };
  }

  const scriptTitle = word.script === "hiragana" ? "Hiragana" : "Katakana";
  const title = `${word.character} (${word.romaji}) — Meaning, Pronunciation & ${scriptTitle} Breakdown`;
  const description = `Learn what "${word.character}" (${word.romaji}) means in Japanese. English meaning: ${word.meaning.en}. Includes native audio pronunciation, character breakdown, and example usage.`;
  const canonicalUrl = `/words/${word.slug}`;

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
      `${word.character} meaning`,
      `${word.romaji} in japanese`,
      `what does ${word.romaji} mean`,
      `japanese word ${word.character}`,
      `learn japanese vocabulary`,
      "sakanajp",
    ],
  };
}

export default async function WordDetailPage({ params }: Props) {
  const { slug } = await params;
  const word = getWordBySlug(slug);

  if (!word) {
    notFound();
  }

  const constituentKana = getConstituentKana(word);
  const relatedWords = getRelatedWords(word, 6);

  // Schema.org DefinedTerm & BreadcrumbList for Dictionary Entries
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        name: `${word.character} (${word.romaji})`,
        termCode: word.character,
        description: word.meaning.en,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "SaKana Japanese Core Vocabulary",
          url: "https://sakanajp.site/words",
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
            name: "Vocabulary Directory",
            item: "https://sakanajp.site/words",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${word.character} (${word.romaji})`,
            item: `https://sakanajp.site/words/${word.slug}`,
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
      <WordDetailClient
        word={word}
        constituentKana={constituentKana}
        relatedWords={relatedWords}
      />
    </>
  );
}

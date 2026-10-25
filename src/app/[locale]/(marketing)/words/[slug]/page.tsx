import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllVocabulary,
  getWordBySlug,
  getConstituentKana,
  getRelatedWords,
} from "@/lib/db-data";
import WordDetailClient from "./WordDetailClient";
import { getHreflangAlternates, isValidLocale, LOCALES } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const words = await getAllVocabulary();
  const params: Array<{ locale: string; slug: string }> = [];
  LOCALES.forEach((locale) => {
    words.forEach((w) => {
      params.push({
        locale,
        slug: w.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const word = await getWordBySlug(slug);
  if (!word) {
    return {
      title: "Japanese Word Not Found",
    };
  }

  const scriptTitle = word.script === "hiragana" ? "Hiragana" : "Katakana";
  const meaning = word.meaning[locale as "en" | "id" | "ja"] || word.meaning.en;

  let title = `${word.character} (${word.romaji}) — Meaning, Pronunciation & ${scriptTitle} Breakdown`;
  let description = `Learn what "${word.character}" (${word.romaji}) means in Japanese. Meaning: ${meaning}. Includes native TTS audio pronunciation, character breakdown, and example usage.`;

  if (locale === "id") {
    title = `${word.character} (${word.romaji}) — Arti, Pengucapan & Bedah Huruf ${scriptTitle}`;
    description = `Arti "${word.character}" (${word.romaji}) dalam bahasa Jepang: ${meaning}. Dilengkapi audio TTS Jepang native, pemecahan huruf, dan contoh kalimat.`;
  } else if (locale === "ja") {
    title = `「${word.character}」（${word.romaji}）— 意味・発音・文字構成分解`;
    description = `日本語の単語「${word.character}」（${word.romaji}）の意味（${meaning}）と正しい発音、構成する${scriptTitle === "Hiragana" ? "ひらがな" : "カタカナ"}の分解解説。`;
  }

  const path = `/words/${word.slug}`;
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
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const word = await getWordBySlug(slug);
  if (!word) {
    notFound();
  }

  const [constituentKana, relatedWords] = await Promise.all([
    getConstituentKana(word),
    getRelatedWords(word, undefined, 6),
  ]);
  const prefix = locale === "en" ? "" : `/${locale}`;

  // Schema.org DefinedTerm & BreadcrumbList for Dictionary Entries
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        name: `${word.character} (${word.romaji})`,
        alternateName: word.kanji ? [word.kanji, word.romaji] : [word.romaji],
        termCode: word.character,
        description: word.meaning[locale as "en" | "id" | "ja"] || word.meaning.en,
        inLanguage: "ja",
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "SaKana Japanese Core Vocabulary",
          url: `https://sakanajp.site${prefix}/words`,
        },
        ...(word.sentence
          ? {
              disambiguatingDescription: `Example usage: ${word.sentence.ja} (${word.sentence.romaji}) — ${word.sentence[locale as "en" | "id"] || word.sentence.en}`,
            }
          : {}),
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
            name: "Vocabulary Directory",
            item: `https://sakanajp.site${prefix}/words`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${word.character} (${word.romaji})`,
            item: `https://sakanajp.site${prefix}/words/${word.slug}`,
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

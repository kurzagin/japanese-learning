import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllKana, getKanaBySlug } from "@/lib/db-data";
import {
  getKanaSlug,
  KANA_STROKE_COUNTS,
  CONFUSED_PAIRS,
  getSampleWord,
  KANA_ORIGINS,
} from "@/lib/kana-seo";
import KanaDetailClient from "./KanaDetailClient";
import { getHreflangAlternates, isValidLocale, LOCALES } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
    script: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allKana = await getAllKana();
  const params: Array<{ locale: string; script: string; slug: string }> = [];
  LOCALES.forEach((locale) => {
    allKana.forEach((k) => {
      params.push({
        locale,
        script: k.script,
        slug: getKanaSlug(k),
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, script, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const kana = await getKanaBySlug(script, slug);
  if (!kana) {
    return {
      title: "Kana Not Found",
    };
  }

  const scriptTitle = kana.script === "hiragana" ? "Hiragana" : "Katakana";
  const origin = KANA_ORIGINS[kana.id];
  const originNote = origin ? ` Derived from ancient Kanji ${origin.kanji}.` : "";

  let title = `${kana.character} (${kana.romaji}) — ${scriptTitle} Character Guide & Pronunciation`;
  let description = `Master Japanese ${scriptTitle} ${kana.character} (${kana.romaji}).${originNote} Includes native audio pronunciation, mnemonic memory aid, and vocabulary words.`;

  if (locale === "id") {
    title = `${kana.character} (${kana.romaji}) — Panduan & Pengucapan Karakter ${scriptTitle}`;
    description = `Pelajari karakter Jepang ${scriptTitle} ${kana.character} (${kana.romaji}). Audio pengucapan Jepang native, petunjuk visual, dan contoh kosakata.`;
  } else if (locale === "ja") {
    title = `${kana.character}（${kana.romaji}）— ${scriptTitle === "Hiragana" ? "ひらがな" : "カタカナ"}解説と発音ガイド`;
    description = `日本語の${scriptTitle === "Hiragana" ? "ひらがな" : "カタカナ"}「${kana.character}」（${kana.romaji}）の正しい発音、書き順、記憶のコツと単語例。`;
  }

  const path = `/kana/${kana.script}/${slug}`;
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
  const { locale, script, slug } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const [kana, allKana] = await Promise.all([
    getKanaBySlug(script, slug),
    getAllKana(),
  ]);
  if (!kana) {
    notFound();
  }

  const sampleWord = getSampleWord(kana.id);
  const origin = KANA_ORIGINS[kana.id] || null;
  const confusedIds = CONFUSED_PAIRS[kana.id] || [];
  const confusedKana = confusedIds
    .map((id) => allKana.find((k) => k.id === id))
    .filter((k): k is typeof allKana[number] => Boolean(k));

  const strokeCount = KANA_STROKE_COUNTS[kana.id] || null;
  const prefix = locale === "en" ? "" : `/${locale}`;

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
        description: kana.hint[locale as "en" | "id" | "ja"] || kana.hint.en || `Japanese ${kana.script} character for ${kana.romaji}.`,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: `Japanese ${kana.script === "hiragana" ? "Hiragana" : "Katakana"} Alphabet`,
          url: `https://sakanajp.site${prefix}/kana`,
        },
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
            name: "Kana Hub",
            item: `https://sakanajp.site${prefix}/kana`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${kana.script.charAt(0).toUpperCase() + kana.script.slice(1)} ${kana.character} (${kana.romaji})`,
            item: `https://sakanajp.site${prefix}/kana/${kana.script}/${slug}`,
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

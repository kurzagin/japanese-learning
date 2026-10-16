import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JLPT_CATEGORIES, getWordsByJlpt } from "@/lib/vocab-seo";
import JlptCategoryClient from "./JlptCategoryClient";
import { getHreflangAlternates, isValidLocale, LOCALES } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export function generateStaticParams() {
  const params: Array<{ locale: string; category: string }> = [];
  LOCALES.forEach((locale) => {
    JLPT_CATEGORIES.forEach((c) => {
      params.push({
        locale,
        category: c.key,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isValidLocale(locale)) return {};

  const cat = JLPT_CATEGORIES.find((c) => c.key === category.toLowerCase());
  if (!cat) {
    return {
      title: "Vocabulary Category Not Found",
    };
  }

  const title = `${cat.title} — ${cat.tagline} | SaKana`;
  const description = `${cat.description} Complete with native Voicevox audio pronunciation, Kanji and Furigana breakdowns.`;
  const path = `/words/category/${cat.key}`;
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
      `jlpt ${cat.key} vocabulary`,
      `${cat.title.toLowerCase()}`,
      "japanese vocabulary list",
      "learn japanese words",
      "sakanajp",
    ],
  };
}

export default async function JlptCategoryPage({ params }: Props) {
  const { locale, category } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const cat = JLPT_CATEGORIES.find((c) => c.key === category.toLowerCase());
  if (!cat) {
    notFound();
  }

  const words = getWordsByJlpt(cat.jlpt);
  const prefix = locale === "en" ? "" : `/${locale}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: cat.title,
        description: cat.description,
        url: `https://sakanajp.site${prefix}/words/category/${cat.key}`,
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
            name: cat.jlpt,
            item: `https://sakanajp.site${prefix}/words/category/${cat.key}`,
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
      <JlptCategoryClient category={cat} words={words} />
    </>
  );
}

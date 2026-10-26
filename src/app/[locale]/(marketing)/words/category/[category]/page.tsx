import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JLPT_CATEGORIES } from "@/lib/vocab-seo";
import { getAllVocabulary, getWordsByJlpt } from "@/lib/db-data";
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

  const catTitle = cat.title[locale] || cat.title.en;
  const catTagline = cat.tagline[locale] || cat.tagline.en;
  const catDesc = cat.description[locale] || cat.description.en;

  const title = `${catTitle} — ${catTagline} | SaKana`;
  const description = `${catDesc}`;
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
      `${catTitle.toLowerCase()}`,
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

  const words = await getWordsByJlpt(cat.jlpt);
  const allWords = await getAllVocabulary();
  const counts = {
    total: allWords.length,
    n5: allWords.filter((w) => w.jlpt === "N5").length,
    n4: allWords.filter((w) => w.jlpt === "N4").length,
    anime: allWords.filter((w) => w.jlpt === "Anime").length,
  };
  const prefix = locale === "en" ? "" : `/${locale}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: cat.title[locale] || cat.title.en,
        description: cat.description[locale] || cat.description.en,
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
      <JlptCategoryClient category={cat} words={words} counts={counts} />
    </>
  );
}

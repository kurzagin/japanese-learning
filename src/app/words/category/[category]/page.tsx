import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JLPT_CATEGORIES, getWordsByJlpt } from "@/lib/vocab-seo";
import JlptCategoryClient from "./JlptCategoryClient";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  return JLPT_CATEGORIES.map((c) => ({
    category: c.key,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = JLPT_CATEGORIES.find((c) => c.key === category.toLowerCase());

  if (!cat) {
    return {
      title: "Vocabulary Category Not Found",
    };
  }

  const title = `${cat.title} — ${cat.tagline} | SaKana`;
  const description = `${cat.description} Complete with native Voicevox audio pronunciation, Kanji and Furigana breakdowns.`;
  const canonicalUrl = `/words/category/${cat.key}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl,
        id: canonicalUrl,
        ja: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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
  const { category } = await params;
  const cat = JLPT_CATEGORIES.find((c) => c.key === category.toLowerCase());

  if (!cat) {
    notFound();
  }

  const words = getWordsByJlpt(cat.jlpt);

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: cat.title,
        description: cat.description,
        url: `https://sakanajp.site/words/category/${cat.key}`,
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
            name: cat.jlpt,
            item: `https://sakanajp.site/words/category/${cat.key}`,
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

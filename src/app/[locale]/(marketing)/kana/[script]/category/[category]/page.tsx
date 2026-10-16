import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HIRAGANA_PRIMITIVES, KATAKANA_PRIMITIVES } from "@/data/kana";
import { KANA_CATEGORIES, getKanaCategoryInfo } from "@/lib/kana-seo";
import KanaCategoryClient from "./KanaCategoryClient";
import { getHreflangAlternates, isValidLocale, LOCALES } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
    script: string;
    category: string;
  }>;
}

export function generateStaticParams() {
  const params: Array<{ locale: string; script: string; category: string }> = [];
  LOCALES.forEach((locale) => {
    KANA_CATEGORIES.forEach((cat) => {
      params.push({
        locale,
        script: cat.script,
        category: cat.category,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, script, category } = await params;
  if (!isValidLocale(locale)) return {};

  const catInfo = getKanaCategoryInfo(script, category);
  if (!catInfo) {
    return {
      title: "Kana Category Not Found",
    };
  }

  const title = `${catInfo.title[locale as "en" | "id" | "ja"] || catInfo.title.en} — Chart, Audio & Practice`;
  const description = catInfo.description[locale as "en" | "id" | "ja"] || catInfo.description.en;
  const path = `/kana/${script}/category/${category}`;
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
      `${catInfo.script} ${catInfo.category}`,
      `japanese ${catInfo.category}`,
      `${catInfo.script} chart`,
      "learn japanese kana",
      "sakanajp",
    ],
  };
}

export default async function KanaCategoryPage({ params }: Props) {
  const { locale, script, category } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const catInfo = getKanaCategoryInfo(script, category);
  if (!catInfo) {
    notFound();
  }

  const primitives = script === "hiragana" ? HIRAGANA_PRIMITIVES : KATAKANA_PRIMITIVES;
  const characters = primitives.filter((k) => k.type === category);
  const prefix = locale === "en" ? "" : `/${locale}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: catInfo.title[locale as "en" | "id" | "ja"] || catInfo.title.en,
    description: catInfo.description[locale as "en" | "id" | "ja"] || catInfo.description.en,
    url: `https://sakanajp.site${prefix}/kana/${script}/category/${category}`,
    hasDefinedTerm: characters.map((k) => ({
      "@type": "DefinedTerm",
      name: `${k.character} (${k.romaji})`,
      termCode: k.character,
      description: k.hint[locale as "en" | "id" | "ja"] || k.hint.en || `${script} character for ${k.romaji}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <KanaCategoryClient
        catInfo={catInfo}
        characters={characters}
      />
    </>
  );
}

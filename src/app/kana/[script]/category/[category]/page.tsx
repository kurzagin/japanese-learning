import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HIRAGANA_PRIMITIVES, KATAKANA_PRIMITIVES } from "@/data/kana";
import { KANA_CATEGORIES, getKanaCategoryInfo } from "@/lib/kana-seo";
import KanaCategoryClient from "./KanaCategoryClient";

interface Props {
  params: Promise<{
    script: string;
    category: string;
  }>;
}

export function generateStaticParams() {
  return KANA_CATEGORIES.map((cat) => ({
    script: cat.script,
    category: cat.category,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { script, category } = await params;
  const catInfo = getKanaCategoryInfo(script, category);

  if (!catInfo) {
    return {
      title: "Kana Category Not Found",
    };
  }

  const title = `${catInfo.title.en} — Chart, Audio & Practice`;
  const description = catInfo.description.en;
  const canonicalUrl = `/kana/${script}/category/${category}`;

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
      `${catInfo.script} ${catInfo.category}`,
      `japanese ${catInfo.category}`,
      `${catInfo.script} chart`,
      "learn japanese kana",
      "sakanajp",
    ],
  };
}

export default async function KanaCategoryPage({ params }: Props) {
  const { script, category } = await params;
  const catInfo = getKanaCategoryInfo(script, category);

  if (!catInfo) {
    notFound();
  }

  const primitives = script === "hiragana" ? HIRAGANA_PRIMITIVES : KATAKANA_PRIMITIVES;
  const characters = primitives.filter((k) => k.type === category);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: catInfo.title.en,
    description: catInfo.description.en,
    url: `https://sakanajp.site/kana/${script}/category/${category}`,
    hasDefinedTerm: characters.map((k) => ({
      "@type": "DefinedTerm",
      name: `${k.character} (${k.romaji})`,
      termCode: k.character,
      description: k.hint.en || `${script} character for ${k.romaji}`,
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

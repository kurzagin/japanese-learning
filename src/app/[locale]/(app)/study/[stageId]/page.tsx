import type { Metadata } from "next";
import { Suspense } from "react";
import StudyClient from "./StudyClient";
import { getStages } from "@/lib/db-data";
import { translations } from "@/data/i18n";
import { getHreflangAlternates, isValidLocale, LOCALES } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
    stageId: string;
  }>;
}

export async function generateStaticParams() {
  const stages = await getStages();
  const params: Array<{ locale: string; stageId: string }> = [];
  LOCALES.forEach((locale) => {
    stages.forEach((s) => {
      params.push({
        locale,
        stageId: s.id,
      });
    });
    params.push({
      locale,
      stageId: "srs-due",
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, stageId } = await params;
  if (!isValidLocale(locale)) return {};

  if (stageId === "srs-due") {
    return {
      title: "SRS Memory Reviews",
      description:
        "Daily Spaced Repetition reviews for Japanese Hiragana, Katakana, and vocabulary flashcards on SaKana.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const stages = await getStages();
  const stage = stages.find((s) => s.id === stageId);
  if (!stage) {
    return {
      title: "Study Japanese Kana & Vocabulary",
    };
  }

  const stageTitle = stage.name[locale as "en" | "id" | "ja"] || stage.name.en;
  const stageDesc = stage.description[locale as "en" | "id" | "ja"] || stage.description.en;
  const sampleChars = stage.cards
    .slice(0, 5)
    .map((c) => c.character)
    .join(", ");

  const path = `/study/${stageId}`;
  const alternates = getHreflangAlternates(path);

  return {
    title: `Learn ${stageTitle} (${sampleChars})`,
    description: `Master ${stageTitle} with interactive flashcards, audio pronunciation, and mnemonics. ${stageDesc}`,
    alternates: {
      canonical: alternates.languages[locale] || alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: `${stageTitle} — Japanese Study Deck | SaKana`,
      description: `Practice ${stageTitle} (${sampleChars}) with native Japanese TTS audio and SRS flashcards.`,
      url: alternates.languages[locale] || alternates.canonical,
    },
  };
}

async function StudyContent({ params }: Props) {
  const { locale, stageId } = await params;
  const stages = await getStages();
  const stage = stages.find((s) => s.id === stageId);
  const prefix = locale === "en" ? "" : `/${locale}`;

  const schemaData = stage && stageId !== "srs-due" ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        name: stage.name[locale as "en" | "id" | "ja"] || stage.name.en,
        description: stage.description[locale as "en" | "id" | "ja"] || stage.description.en,
        learningResourceType: "Flashcards",
        educationalLevel: "Beginner",
        inLanguage: ["ja", "en", "id"],
        url: `https://sakanajp.site${prefix}/study/${stageId}`,
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
            name: "Study Stages",
            item: `https://sakanajp.site${prefix}/dashboard`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: stage.name[locale as "en" | "id" | "ja"] || stage.name.en,
            item: `https://sakanajp.site${prefix}/study/${stageId}`,
          },
        ],
      },
    ],
  } : null;

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      <StudyClient stageId={stageId} initialStage={stage} allStages={stages} />
    </>
  );
}

export default async function StudyPage({ params }: Props) {
  const { locale } = await params;
  const t = isValidLocale(locale) ? translations[locale] : translations.en;
  return (
    <Suspense
      fallback={
        <div className="min-h-screen p-4 flex items-center justify-center font-mono text-xs">
          {t.common.loadingDueSrs}
        </div>
      }
    >
      <StudyContent params={params} />
    </Suspense>
  );
}

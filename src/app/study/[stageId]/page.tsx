import type { Metadata } from "next";
import { Suspense } from "react";
import StudyClient from "./StudyClient";
import { STAGES } from "@/data/stages";

export function generateStaticParams() {
  return [
    ...STAGES.map((s) => ({
      stageId: s.id,
    })),
    { stageId: "srs-due" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stageId: string }>;
}): Promise<Metadata> {
  const { stageId } = await params;

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

  const stage = STAGES.find((s) => s.id === stageId);
  if (!stage) {
    return {
      title: "Study Japanese Kana & Vocabulary",
    };
  }

  const stageTitle = stage.name.en || stage.name.ja;
  const stageDesc = stage.description.en || stage.description.ja;
  const sampleChars = stage.cards
    .slice(0, 5)
    .map((c) => c.character)
    .join(", ");

  return {
    title: `Learn ${stageTitle} (${sampleChars})`,
    description: `Master ${stageTitle} with interactive flashcards, audio pronunciation, and mnemonics. ${stageDesc}`,
    alternates: {
      canonical: `/study/${stageId}`,
    },
    openGraph: {
      title: `${stageTitle} — Japanese Study Deck | SaKana`,
      description: `Practice ${stageTitle} (${sampleChars}) with native Voicevox audio and SRS flashcards.`,
      url: `/study/${stageId}`,
    },
  };
}

async function StudyContent({
  params,
}: {
  params: Promise<{ stageId: string }>;
}) {
  const { stageId } = await params;
  const stage = STAGES.find((s) => s.id === stageId);

  const schemaData = stage && stageId !== "srs-due" ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        name: stage.name.en || stage.name.ja,
        description: stage.description.en || stage.description.ja,
        learningResourceType: "Flashcards",
        educationalLevel: "Beginner",
        inLanguage: ["ja", "en", "id"],
        url: `https://sakanajp.site/study/${stageId}`,
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
            name: "Study Stages",
            item: "https://sakanajp.site/dashboard",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: stage.name.en || stage.name.ja,
            item: `https://sakanajp.site/study/${stageId}`,
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
      <StudyClient stageId={stageId} />
    </>
  );
}

export default function StudyPage({
  params,
}: {
  params: Promise<{ stageId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen p-4 flex items-center justify-center font-mono text-xs">
          LOADING STUDY MODULE...
        </div>
      }
    >
      <StudyContent params={params} />
    </Suspense>
  );
}

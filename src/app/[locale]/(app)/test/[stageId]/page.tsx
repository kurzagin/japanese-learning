import { Suspense } from "react";
import TestClient from "./TestClient";
import { getStages } from "@/lib/db-data";
import { translations } from "@/data/i18n";
import { isValidLocale, LOCALES } from "@/lib/seo/locale";

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
  });
  return params;
}

async function TestContent({ params }: Props) {
  const { stageId } = await params;
  const stages = await getStages();
  const stage = stages.find((s) => s.id === stageId);
  return <TestClient stageId={stageId} initialStage={stage} allStages={stages} />;
}

export default async function TestPage({ params }: Props) {
  const { locale } = await params;
  const t = isValidLocale(locale) ? translations[locale] : translations.en;
  return (
    <Suspense
      fallback={
        <div className="min-h-screen p-4 flex items-center justify-center font-mono text-xs">
          {t.common.initializingPool}
        </div>
      }
    >
      <TestContent params={params} />
    </Suspense>
  );
}

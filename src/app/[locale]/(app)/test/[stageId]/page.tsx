import { Suspense } from "react";
import TestClient from "./TestClient";
import { STAGES } from "@/data/stages";
import { translations } from "@/data/i18n";
import { isValidLocale, LOCALES } from "@/lib/seo/locale";

interface Props {
  params: Promise<{
    locale: string;
    stageId: string;
  }>;
}

export function generateStaticParams() {
  const params: Array<{ locale: string; stageId: string }> = [];
  LOCALES.forEach((locale) => {
    STAGES.forEach((s) => {
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
  return <TestClient stageId={stageId} />;
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

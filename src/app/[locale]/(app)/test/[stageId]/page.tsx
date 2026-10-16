import { Suspense } from "react";
import TestClient from "./TestClient";
import { STAGES } from "@/data/stages";
import { LOCALES } from "@/lib/seo/locale";

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

export default function TestPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen p-4 flex items-center justify-center font-mono text-xs">
          LOADING SPEED TEST MODULE...
        </div>
      }
    >
      <TestContent params={params} />
    </Suspense>
  );
}

import { Suspense } from "react";
import StudyClient from "./StudyClient";
import { STAGES } from "@/data/stages";

export function generateStaticParams() {
  return STAGES.map((s) => ({
    stageId: s.id,
  }));
}

async function StudyContent({
  params,
}: {
  params: Promise<{ stageId: string }>;
}) {
  const { stageId } = await params;
  return <StudyClient stageId={stageId} />;
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

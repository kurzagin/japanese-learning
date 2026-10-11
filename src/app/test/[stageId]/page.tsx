import { Suspense } from "react";
import TestClient from "./TestClient";
import { STAGES } from "@/data/stages";

export function generateStaticParams() {
  return STAGES.map((s) => ({
    stageId: s.id,
  }));
}

async function TestContent({
  params,
}: {
  params: Promise<{ stageId: string }>;
}) {
  const { stageId } = await params;
  return <TestClient stageId={stageId} />;
}

export default function TestPage({
  params,
}: {
  params: Promise<{ stageId: string }>;
}) {
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

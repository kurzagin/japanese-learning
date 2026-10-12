import { Suspense } from "react";
import MinigameClient from "./MinigameClient";

export default function MinigamePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen p-4 flex items-center justify-center font-mono text-xs">
          LOADING 30-KANA ARCADE LOOP...
        </div>
      }
    >
      <MinigameClient />
    </Suspense>
  );
}

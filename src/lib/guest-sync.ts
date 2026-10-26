/**
 * Client-side utility to migrate guest progress and SRS cards from localStorage
 * to the authenticated user's account in PostgreSQL.
 */
export async function syncGuestDataToAccount(targetUserId: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (!targetUserId || targetUserId === "guest@sakanajp.site") return false;

  // Check if we have already migrated for this user in this browser session
  const migrationKey = `sakana_migrated_for_${targetUserId}`;
  if (localStorage.getItem(migrationKey) === "true") {
    return false;
  }

  try {
    const rawProgress = localStorage.getItem("sakana_progress");
    const rawSrs = localStorage.getItem("sakana_srs_records");

    const progress = rawProgress ? JSON.parse(rawProgress) : {};
    const srsRecords = rawSrs ? JSON.parse(rawSrs) : {};

    const hasProgress = Object.keys(progress).length > 0;
    const hasSrs = Object.keys(srsRecords).length > 0;

    // If nothing to migrate, mark done and exit
    if (!hasProgress && !hasSrs) {
      localStorage.setItem(migrationKey, "true");
      return false;
    }

    const res = await fetch("/api/sync/migrate-guest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: targetUserId,
        progress,
        srsRecords,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        localStorage.setItem(migrationKey, "true");
        return true;
      }
    }
  } catch (err) {
    console.warn("Guest data migration skipped due to network/parsing:", err);
  }

  return false;
}

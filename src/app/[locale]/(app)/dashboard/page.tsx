import DashboardClient from "./DashboardClient";
import { getStages } from "@/lib/db-data";

export default async function DashboardPage() {
  const stages = await getStages();
  return <DashboardClient stages={stages} />;
}

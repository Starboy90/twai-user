/** Dedicated AI assistant route entry; shares the dashboard session gate and workspace state. */
import { DashboardGate } from "@/components/dashboard/dashboard-gate";

export function AiPage() {
  return <DashboardGate initialTab="AI assistant" />;
}

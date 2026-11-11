import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Saved analysis feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function SavedAnalysis() {
  return <DashboardGate initialTab="Saved analysis" />;
}

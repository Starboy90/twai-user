import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * News Impact Analyzer feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function NewsImpactAnalyzer() {
  return <DashboardGate initialTab="News Impact Analyzer" />;
}

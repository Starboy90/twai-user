import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Journal feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function Journal() {
  return <DashboardGate initialTab="Journal" />;
}

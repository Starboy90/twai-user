import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Pre-Trade Checklist feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function PreTradeChecklist() {
  return <DashboardGate initialTab="Pre-Trade Checklist" />;
}

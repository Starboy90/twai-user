import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Central Bank Intelligence feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function CentralBankIntelligence() {
  return <DashboardGate initialTab="Central Bank Intelligence" />;
}

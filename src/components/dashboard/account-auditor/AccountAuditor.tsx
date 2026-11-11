import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Account Auditor feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function AccountAuditor() {
  return <DashboardGate initialTab="Account Auditor" />;
}

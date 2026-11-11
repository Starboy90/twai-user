import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Credits & Usage feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function CreditsAndUsage() {
  return <DashboardGate initialTab="Credits & Usage" />;
}

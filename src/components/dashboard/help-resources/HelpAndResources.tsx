import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Help & resources feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function HelpAndResources() {
  return <DashboardGate initialTab="Help" />;
}

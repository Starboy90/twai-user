import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Why Market Moving? feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function WhyMarketMoving() {
  return <DashboardGate initialTab="Why Market Moving?" />;
}

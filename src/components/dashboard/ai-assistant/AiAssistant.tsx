import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * AI assistant feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function AiAssistant() {
  return <DashboardGate initialTab="AI assistant" />;
}

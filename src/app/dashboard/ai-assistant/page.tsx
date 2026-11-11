import type { Metadata } from "next";
import AiAssistant from "@/components/dashboard/ai-assistant/AiAssistant";

export const metadata: Metadata = {
  title: "AI assistant | Trader World AI",
  description: "Your Trader World AI ai assistant workspace.",
};

export default function AiAssistantRoute() {
  return <AiAssistant />;
}

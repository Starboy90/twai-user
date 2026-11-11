import type { Metadata } from "next";
import { AiPage } from "@/components/dashboard/ai/ai-page";

export const metadata: Metadata = {
  title: "AI Assistant | Trader World AI",
  description: "Your AI trading research assistant workspace.",
};

export default function DashboardAiPage() {
  return <AiPage />;
}

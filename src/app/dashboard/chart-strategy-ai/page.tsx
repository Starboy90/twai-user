import type { Metadata } from "next";
import ChartAndStrategyAi from "@/components/dashboard/chart-strategy-ai/ChartAndStrategyAi";

export const metadata: Metadata = {
  title: "Chart & Strategy AI | Trader World AI",
  description: "Your Trader World AI chart & strategy ai workspace.",
};

export default function ChartAndStrategyAiRoute() {
  return <ChartAndStrategyAi />;
}

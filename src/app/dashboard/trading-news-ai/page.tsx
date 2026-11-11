import type { Metadata } from "next";
import TradingNewsAi from "@/components/dashboard/trading-news-ai/TradingNewsAi";

export const metadata: Metadata = {
  title: "Trading News AI | Trader World AI",
  description: "Your Trader World AI trading news ai workspace.",
};

export default function TradingNewsAiRoute() {
  return <TradingNewsAi />;
}

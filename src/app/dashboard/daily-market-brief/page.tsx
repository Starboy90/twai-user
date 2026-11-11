import type { Metadata } from "next";
import DailyMarketBrief from "@/components/dashboard/daily-market-brief/DailyMarketBrief";

export const metadata: Metadata = {
  title: "Daily Market Brief | Trader World AI",
  description: "Your Trader World AI daily market brief workspace.",
};

export default function DailyMarketBriefRoute() {
  return <DailyMarketBrief />;
}

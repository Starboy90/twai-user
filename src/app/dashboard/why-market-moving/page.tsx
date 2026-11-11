import type { Metadata } from "next";
import WhyMarketMoving from "@/components/dashboard/why-market-moving/WhyMarketMoving";

export const metadata: Metadata = {
  title: "Why Market Moving? | Trader World AI",
  description: "Your Trader World AI why market moving? workspace.",
};

export default function WhyMarketMovingRoute() {
  return <WhyMarketMoving />;
}

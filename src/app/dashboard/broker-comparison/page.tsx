import type { Metadata } from "next";
import BrokerComparison from "@/components/dashboard/broker-comparison/BrokerComparison";

export const metadata: Metadata = {
  title: "Broker comparison | Trader World AI",
  description: "Your Trader World AI broker comparison workspace.",
};

export default function BrokerComparisonRoute() {
  return <BrokerComparison />;
}

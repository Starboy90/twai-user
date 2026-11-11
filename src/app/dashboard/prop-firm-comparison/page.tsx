import type { Metadata } from "next";
import PropFirmComparison from "@/components/dashboard/prop-firm-comparison/PropFirmComparison";

export const metadata: Metadata = {
  title: "Prop firm comparison | Trader World AI",
  description: "Your Trader World AI prop firm comparison workspace.",
};

export default function PropFirmComparisonRoute() {
  return <PropFirmComparison />;
}

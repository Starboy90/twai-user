import type { Metadata } from "next";
import CreditsAndUsage from "@/components/dashboard/credits-usage/CreditsAndUsage";

export const metadata: Metadata = {
  title: "Credits & Usage | Trader World AI",
  description: "Your Trader World AI credits & usage workspace.",
};

export default function CreditsAndUsageRoute() {
  return <CreditsAndUsage />;
}

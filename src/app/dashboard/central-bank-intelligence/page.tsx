import type { Metadata } from "next";
import CentralBankIntelligence from "@/components/dashboard/central-bank-intelligence/CentralBankIntelligence";

export const metadata: Metadata = {
  title: "Central Bank Intelligence | Trader World AI",
  description: "Your Trader World AI central bank intelligence workspace.",
};

export default function CentralBankIntelligenceRoute() {
  return <CentralBankIntelligence />;
}

import type { Metadata } from "next";
import PreTradeChecklist from "@/components/dashboard/pre-trade-checklist/PreTradeChecklist";

export const metadata: Metadata = {
  title: "Pre-Trade Checklist | Trader World AI",
  description: "Your Trader World AI pre-trade checklist workspace.",
};

export default function PreTradeChecklistRoute() {
  return <PreTradeChecklist />;
}

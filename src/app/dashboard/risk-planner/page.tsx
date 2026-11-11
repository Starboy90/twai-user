import type { Metadata } from "next";
import RiskPlanner from "@/components/dashboard/risk-planner/RiskPlanner";

export const metadata: Metadata = {
  title: "Risk Planner | Trader World AI",
  description: "Your Trader World AI risk planner workspace.",
};

export default function RiskPlannerRoute() {
  return <RiskPlanner />;
}

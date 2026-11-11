import type { Metadata } from "next";
import SavedAnalysis from "@/components/dashboard/saved-analysis/SavedAnalysis";

export const metadata: Metadata = {
  title: "Saved analysis | Trader World AI",
  description: "Your Trader World AI saved analysis workspace.",
};

export default function SavedAnalysisRoute() {
  return <SavedAnalysis />;
}

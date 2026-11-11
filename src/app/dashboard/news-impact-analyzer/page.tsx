import type { Metadata } from "next";
import NewsImpactAnalyzer from "@/components/dashboard/news-impact-analyzer/NewsImpactAnalyzer";

export const metadata: Metadata = {
  title: "News Impact Analyzer | Trader World AI",
  description: "Your Trader World AI news impact analyzer workspace.",
};

export default function NewsImpactAnalyzerRoute() {
  return <NewsImpactAnalyzer />;
}

import type { ReactNode } from "react";

export function NewsImpactAnalyzerPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-news-impact-analyzer" data-dashboard-page="News Impact Analyzer">
      {children}
    </section>
  );
}

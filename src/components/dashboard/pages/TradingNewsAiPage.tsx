import type { ReactNode } from "react";

export function TradingNewsAiPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-trading-news-ai" data-dashboard-page="Trading News AI">
      {children}
    </section>
  );
}

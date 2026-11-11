import type { ReactNode } from "react";

export function WatchlistPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-watchlist" data-dashboard-page="Watchlist">
      {children}
    </section>
  );
}

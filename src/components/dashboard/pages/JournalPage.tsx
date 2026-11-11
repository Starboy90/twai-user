import type { ReactNode } from "react";

export function JournalPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-journal" data-dashboard-page="Journal">
      {children}
    </section>
  );
}

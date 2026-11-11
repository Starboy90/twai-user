import type { ReactNode } from "react";

export function AiAssistantPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-ai-assistant" data-dashboard-page="AI assistant">
      {children}
    </section>
  );
}

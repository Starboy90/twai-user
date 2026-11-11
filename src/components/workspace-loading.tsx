"use client";

import { Brand } from "@/components/ui";

export function WorkspaceLoadingScreen({
  message = "Preparing your market workspace",
}: {
  message?: string;
}) {
  return (
    <main
      className="twai-loading-screen"
      role="status"
      aria-live="polite"
      aria-label="Loading Trader World AI workspace"
    >
      <div className="twai-loading-atmosphere" aria-hidden="true">
        <span className="twai-loading-orb twai-loading-orb-a" />
        <span className="twai-loading-orb twai-loading-orb-b" />
        <span className="twai-loading-orb twai-loading-orb-c" />
        <span className="twai-loading-orb twai-loading-orb-d" />
        <div className="twai-loading-grid" />
      </div>

      <section className="twai-loading-card">
        <div className="twai-loading-card-glow" aria-hidden="true" />

        <div className="twai-loading-brand">
          <Brand />
          <span className="twai-loading-brand-caption">YOUR MARKET WORKSPACE</span>
        </div>

        <div className="twai-loading-visual" aria-hidden="true">
          <span className="twai-loading-ring twai-loading-ring-one" />
          <span className="twai-loading-ring twai-loading-ring-two" />
          <span className="twai-loading-ring twai-loading-ring-three" />
          <span className="twai-loading-logo-halo" />
          <span className="twai-loading-pulse-dot twai-loading-pulse-dot-one" />
          <span className="twai-loading-pulse-dot twai-loading-pulse-dot-two" />
        </div>

        <div className="twai-loading-copy">
          <span className="twai-loading-eyebrow">TRADER WORLD AI</span>
          <h1>{message}</h1>
          <p>Connecting your dashboard, market insights and research tools.</p>
        </div>

        <div className="twai-loading-progress" aria-hidden="true">
          <span />
        </div>

        <div className="twai-loading-status">
          <span className="twai-loading-status-dot" />
          <span>Secure workspace initialization</span>
          <span className="twai-loading-dots"><i /><i /><i /></span>
        </div>

        <div className="twai-loading-preview" aria-hidden="true">
          <div className="twai-loading-preview-card">
            <span className="twai-skeleton twai-skeleton-label" />
            <span className="twai-skeleton twai-skeleton-value" />
            <span className="twai-skeleton twai-skeleton-line" />
          </div>
          <div className="twai-loading-preview-card">
            <span className="twai-skeleton twai-skeleton-label" />
            <span className="twai-skeleton twai-skeleton-value short" />
            <span className="twai-skeleton twai-skeleton-line" />
          </div>
          <div className="twai-loading-preview-card twai-loading-preview-chart">
            <span className="twai-skeleton twai-skeleton-label" />
            <svg viewBox="0 0 180 44" preserveAspectRatio="none">
              <path d="M2 36 L22 29 L38 32 L58 18 L75 25 L94 12 L110 18 L132 6 L151 13 L178 2" />
            </svg>
          </div>
        </div>
      </section>

      <p className="twai-loading-footnote">
        A calmer space to think. <span>Research tools, not financial advice.</span>
      </p>
    </main>
  );
}

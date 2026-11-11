"use client";

import { ChevronDown } from "lucide-react";
import { workspaceNav } from "../sidebar/workspace-sidebar";

export function DashboardPageSwitcher({
  activeTab,
  onChange,
}: {
  activeTab: string;
  onChange: (page: string) => void;
}) {
  const value = activeTab === "Help" ? "Help & resources" : activeTab;
  return (
    <label className="dashboard-page-switcher">
      <span className="sr-only">Select dashboard section</span>
      <select
        aria-label="Select dashboard section"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {workspaceNav.map((item) => (
          <option key={item.label} value={item.label}>{item.label}</option>
        ))}
      </select>
      <ChevronDown size={14} aria-hidden="true" />
    </label>
  );
}

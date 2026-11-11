"use client";

import { create } from "zustand";

export type DashboardTab = string;

type DashboardNavigationState = {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  resetDashboard: () => void;
};

/**
 * Shared dashboard navigation state.
 * Feature pages can read or change the selected dashboard module without
 * coupling their UI to the workspace shell.
 */
export const useDashboardNavigationStore = create<DashboardNavigationState>((set) => ({
  activeTab: "Overview",
  setActiveTab: (activeTab) => set({ activeTab }),
  resetDashboard: () => set({ activeTab: "Overview" }),
}));

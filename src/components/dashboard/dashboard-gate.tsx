"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Workspace } from "@/components/dashboard/workspace";
import { WorkspaceLoadingScreen } from "@/components/workspace-loading";

export function DashboardGate({ initialTab = "Overview" }: { initialTab?: string }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const session = localStorage.getItem("twai-demo-session");
    if (!session) { router.replace("/login"); return; }
    setReady(true);
  }, [router]);
  if (!ready) return <WorkspaceLoadingScreen message="Checking your secure demo session" />;
  return <Workspace initialTab={initialTab} />;
}

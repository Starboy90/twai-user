import type { Metadata } from "next";
import Alerts from "@/components/dashboard/alerts/Alerts";

export const metadata: Metadata = {
  title: "Alerts | Trader World AI",
  description: "Your Trader World AI alerts workspace.",
};

export default function AlertsRoute() {
  return <Alerts />;
}

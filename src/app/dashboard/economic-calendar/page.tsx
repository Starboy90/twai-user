import type { Metadata } from "next";
import EconomicCalendar from "@/components/dashboard/economic-calendar/EconomicCalendar";

export const metadata: Metadata = {
  title: "Economic Calendar | Trader World AI",
  description: "Your Trader World AI economic calendar workspace.",
};

export default function EconomicCalendarRoute() {
  return <EconomicCalendar />;
}

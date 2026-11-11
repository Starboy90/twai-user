import type { Metadata } from "next";
import Journal from "@/components/dashboard/journal/Journal";

export const metadata: Metadata = {
  title: "Journal | Trader World AI",
  description: "Your Trader World AI journal workspace.",
};

export default function JournalRoute() {
  return <Journal />;
}

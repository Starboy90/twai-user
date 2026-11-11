import type { Metadata } from "next";
import Subscriptions from "@/components/dashboard/subscriptions/Subscriptions";

export const metadata: Metadata = {
  title: "Subscriptions | Trader World AI",
  description: "Your Trader World AI subscriptions workspace.",
};

export default function SubscriptionsRoute() {
  return <Subscriptions />;
}

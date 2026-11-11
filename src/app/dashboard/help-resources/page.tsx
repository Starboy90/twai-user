import type { Metadata } from "next";
import HelpAndResources from "@/components/dashboard/help-resources/HelpAndResources";

export const metadata: Metadata = {
  title: "Help & resources | Trader World AI",
  description: "Your Trader World AI help & resources workspace.",
};

export default function HelpAndResourcesRoute() {
  return <HelpAndResources />;
}

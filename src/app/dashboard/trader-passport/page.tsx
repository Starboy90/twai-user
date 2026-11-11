import type { Metadata } from "next";
import TraderPassport from "@/components/dashboard/trader-passport/TraderPassport";

export const metadata: Metadata = {
  title: "Trader Passport | Trader World AI",
  description: "Your Trader World AI trader passport workspace.",
};

export default function TraderPassportRoute() {
  return <TraderPassport />;
}

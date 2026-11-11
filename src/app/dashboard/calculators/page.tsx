import type { Metadata } from "next";
import Calculators from "@/components/dashboard/calculators/Calculators";

export const metadata: Metadata = {
  title: "Calculators | Trader World AI",
  description: "Your Trader World AI calculators workspace.",
};

export default function CalculatorsRoute() {
  return <Calculators />;
}

import type { Metadata } from "next";
import AccountAuditor from "@/components/dashboard/account-auditor/AccountAuditor";

export const metadata: Metadata = {
  title: "Account Auditor | Trader World AI",
  description: "Your Trader World AI account auditor workspace.",
};

export default function AccountAuditorRoute() {
  return <AccountAuditor />;
}

import type { Metadata } from "next";
import PollsAndVoting from "@/components/dashboard/polls-voting/PollsAndVoting";

export const metadata: Metadata = {
  title: "Polls & Voting | Trader World AI",
  description: "Your Trader World AI polls & voting workspace.",
};

export default function PollsAndVotingRoute() {
  return <PollsAndVoting />;
}

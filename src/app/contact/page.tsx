import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact Us | Trader World AI",
  description:
    "Contact Trader World AI for product questions, platform support, and partnership enquiries.",
};

export default function ContactRoute() {
  return <ContactPage />;
}

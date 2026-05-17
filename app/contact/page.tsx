import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import ContactClient from "./ContactClient";

export const metadata: Metadata = generateSEO({
  title: "Contact GetVidya | Reach Our Team",
  description:
    "Get in touch with the GetVidya team. We help students crack SSC, Railway, and State PCS exams with AI-powered preparation.",
  canonical: "https://getvidya.in/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}

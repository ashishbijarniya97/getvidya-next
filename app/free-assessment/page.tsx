import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import FreeAssessmentClient from "./FreeAssessmentClient";

export const metadata: Metadata = generateSEO({
  title: "Free AI Diagnostic Test for SSC CGL & UPSC — No Registration | GetVidyaAI",
  description:
    "Take GetVidyaAI's free 25-question diagnostic test. Find your exact weak subjects for SSC CGL, UPSC, Railway & Banking in 20 min. No credit card required.",
  keywords: [
    "free ai diagnostic test",
    "free mock test without registration",
    "free ai diagnostic test for upsc",
    "free ai diagnostic test for ssc cgl",
    "ssc cgl mock test free without registration",
    "free online test for government exam",
    "weak subject finder ssc upsc free",
    "getvidyaai free diagnostic",
    "free adaptive test series india",
  ],
  canonical: "https://getvidya.in/free-assessment",
});

export default function FreeAssessmentPage() {
  return <FreeAssessmentClient />;
}

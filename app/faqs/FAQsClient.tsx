"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is GetVidya?", a: "GetVidya is an online exam preparation platform offering 1,200+ mock tests and 140,000+ MCQs for UPSC, SSC CGL, Banking, Railway, State PSC, and Defence exams. Built by Prepdot Solutions Pvt. Ltd." },
  { q: "How much does GetVidya cost?", a: "GetVidya's Vidya Pass Pro starts at just ₹149/month, giving you unlimited access to all mock tests, question banks, and analysis tools. Free daily questions are always available at no cost." },
  { q: "Which government exams does GetVidya cover?", a: "We currently cover 6 major exams: SSC CGL, UPSC CSE, SBI PO/Clerk, Railway NTPC, State PSC, and NDA/CDS. More exams are being added continuously." },
  { q: "Is there a mobile app available?", a: "Yes! GetVidya is available on Android (Google Play Store) and iOS (App Store). Search for 'GetVidya' or scan the QR code on our website. The app supports offline study mode." },
  { q: "Are the mock tests up to date with the latest exam pattern?", a: "Absolutely. Our expert team continuously updates all mock tests to reflect the latest official exam patterns, syllabus changes, and previous year question trends." },
  { q: "How is GetVidya different from other platforms?", a: "GetVidya offers exam-specific personalization, chapter-wise analysis, daily study targets, and detailed weakness reports — not just a dump of questions. Plus, at ₹149/month, it's the most affordable comprehensive prep platform in India." },
  { q: "Can I try GetVidya for free?", a: "Yes! You can attempt free mock tests without any payment. Daily free questions from our question bank are also available to all registered users." },
  { q: "How do I cancel my subscription?", a: "You can cancel your Vidya Pass Pro subscription anytime. Please contact us via WhatsApp or email at support@getvidya.in and we'll process your request immediately." },
  { q: "What is the refund policy?", a: "We offer refunds within 7 days of purchase if you haven't used more than 2 mock tests. Please see our full Refund Policy page for details." },
  { q: "How do I delete my account?", a: "You can request account deletion from the app settings or by contacting support@getvidya.in. Your data will be fully erased within 30 days as per our privacy policy." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl transition-all duration-300 ${open ? "border-teal bg-mint/30" : "border-slate-200 bg-white"}`}>
      <button
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-primary-500 text-base">{q}</span>
        <ChevronDown
          size={20}
          className={`text-teal flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed animate-fade-in">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQsClient() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-hero py-20 text-center">
          <div className="container-xl">
            <span className="section-tag mb-4 !bg-white/10 !text-white/90">FAQs</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Everything you need to know about GetVidya.
            </p>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container-xl max-w-3xl">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
            <div className="text-center mt-12 p-8 card">
              <h3 className="font-bold text-primary-500 text-xl mb-2">Still have questions?</h3>
              <p className="text-slate-500 mb-5">Our team is happy to help. Chat with us on WhatsApp.</p>
              <a
                href="https://wa.me/918114422752"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Chat with us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

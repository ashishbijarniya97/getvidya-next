import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({ title: "Refund Policy", noIndex: false });

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-hero py-16 text-center">
          <div className="container-xl">
            <h1 className="text-4xl font-bold text-white">Refund Policy</h1>
            <p className="text-white/60 mt-3">Last updated: February 2025</p>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container-xl max-w-3xl prose prose-slate prose-headings:text-primary-500 prose-a:text-teal">
            <h2>Eligibility for Refund</h2>
            <p>We offer refunds within <strong>7 days of purchase</strong> if you have not used more than 2 mock tests from your subscription.</p>
            <h2>How to Request a Refund</h2>
            <p>Contact us at <a href="mailto:support@getvidya.in">support@getvidya.in</a> or WhatsApp us at +91 81144 22752 with your registered email and purchase details. We process refunds within 5-7 business days.</p>
            <h2>Non-Refundable Cases</h2>
            <ul>
              <li>Subscriptions used beyond 2 mock tests</li>
              <li>Requests made after 7 days of purchase</li>
              <li>Accounts found in violation of our Terms of Service</li>
            </ul>
            <h2>Contact</h2>
            <p>For any refund queries, reach us at <a href="mailto:support@getvidya.in">support@getvidya.in</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

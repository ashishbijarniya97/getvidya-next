import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({ title: "Terms of Service", noIndex: false });

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-hero py-16 text-center">
          <div className="container-xl">
            <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
            <p className="text-white/60 mt-3">Last updated: February 2025</p>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container-xl max-w-3xl prose prose-slate prose-headings:text-primary-500 prose-a:text-teal">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing GetVidya, you agree to these Terms of Service. If you disagree, please discontinue use. GetVidya is operated by Prepdot Solutions Pvt. Ltd.</p>
            <h2>2. Use of Service</h2>
            <p>GetVidya grants you a limited, non-exclusive, non-transferable license to use the platform for personal, non-commercial exam preparation purposes only.</p>
            <h2>3. Subscriptions & Payments</h2>
            <p>Paid subscriptions (Vidya Pass Pro) are billed monthly at ₹149 unless otherwise specified. Prices are subject to change with 30 days notice.</p>
            <h2>4. Prohibited Activities</h2>
            <p>You may not reproduce, distribute, or commercially exploit any content from GetVidya. Automated access, scraping, or sharing of account credentials is strictly prohibited.</p>
            <h2>5. Intellectual Property</h2>
            <p>All content on GetVidya — questions, explanations, test papers — is the property of Prepdot Solutions Pvt. Ltd. and protected by copyright law.</p>
            <h2>6. Disclaimer</h2>
            <p>GetVidya makes no guarantees of exam success. Results depend on individual effort and preparation.</p>
            <h2>7. Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.</p>
            <h2>8. Contact</h2>
            <p>Questions? Email us at <a href="mailto:support@getvidya.in">support@getvidya.in</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

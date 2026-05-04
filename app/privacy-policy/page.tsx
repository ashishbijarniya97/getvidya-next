import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Privacy Policy",
  noIndex: false,
  canonical: "https://getvidya.in/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-hero py-16 text-center">
          <div className="container-xl">
            <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
            <p className="text-white/60 mt-3">Last updated: February 2025</p>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container-xl max-w-3xl prose prose-slate prose-headings:text-primary-500 prose-a:text-teal">
            <h2>1. Information We Collect</h2>
            <p>GetVidya (operated by Prepdot Solutions Pvt. Ltd.) collects information you provide directly, including name, email address, and phone number when you register or contact us. We also collect usage data through analytics tools.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use your information to provide and improve our exam preparation services, send you relevant notifications, respond to your inquiries, and process payments.</p>

            <h2>3. Data Sharing</h2>
            <p>We do not sell your personal data. We may share data with trusted service providers (e.g., payment processors, analytics) strictly for operational purposes under confidentiality agreements.</p>

            <h2>4. Cookies</h2>
            <p>We use cookies and similar technologies to improve your experience. You can control cookies through your browser settings.</p>

            <h2>5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. However, no method of internet transmission is 100% secure.</p>

            <h2>6. Account Deletion</h2>
            <p>You may request deletion of your account and associated data at any time by contacting support@getvidya.in. Data will be erased within 30 days.</p>

            <h2>7. Children&apos;s Privacy</h2>
            <p>GetVidya is not directed at children under 13. We do not knowingly collect data from minors.</p>

            <h2>8. Changes to This Policy</h2>
            <p>We may update this policy periodically. We will notify you of significant changes via email or in-app notice.</p>

            <h2>9. Contact Us</h2>
            <p>For privacy concerns, contact us at <a href="mailto:support@getvidya.in">support@getvidya.in</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

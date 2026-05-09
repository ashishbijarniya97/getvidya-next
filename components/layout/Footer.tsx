import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20your%20AI%20exam%20prep%20platform.";

const socials = [
  { label: "Telegram",  href: "https://t.me/GetVidyaofficial",                          icon: "/images/Telegram.svg",    bg: "bg-[#2CA5E0]" },
  { label: "WhatsApp",  href: "https://whatsapp.com/channel/0029VahvzYy9mrGVgvn8Ys3q", icon: "/images/Whatsapp_1.svg",  bg: "bg-[#25D366]" },
  { label: "YouTube",   href: "https://www.youtube.com/@Get_Vidya",                     icon: "/images/Youtube.svg",     bg: "bg-[#FF0000]" },
  { label: "Facebook",  href: "https://www.facebook.com/profile.php?id=61552776714971", icon: "/images/Social-facebook.svg", bg: "bg-[#1877F2]" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/getvidya",              icon: "/images/Social-linkedin.svg", bg: "bg-[#0A66C2]" },
  { label: "X",         href: "https://x.com/GetVidya",                                 icon: "/images/Social-x.svg",    bg: "bg-slate-800" },
];

const examHubLinks = [
  { label: "SSC CGL Mock Tests",       href: "/exams/ssc-cgl/mock-tests" },
  { label: "SSC CGL Syllabus 2026",    href: "/exams/ssc-cgl/syllabus" },
  { label: "UPSC Prelims Strategy",    href: "/exams/upsc/prelims-strategy" },
  { label: "SSC CGL Preparation",      href: "/exams/ssc-cgl" },
  { label: "UPSC CSE Preparation",     href: "/exams/upsc" },
  { label: "Banking Exam Prep",        href: "/exams/banking" },
];

const resourceLinks = [
  { label: "AI Study Plan",             href: "/ai-study-plan" },
  { label: "Free Diagnostic Test",      href: "/free-assessment" },
  { label: "GetVidya vs Coaching",      href: "/compare/getvidya-vs-coaching" },
  { label: "GetVidya vs Testbook",      href: "/compare/getvidya-vs-testbook" },
  { label: "Previous Year Questions",   href: "/previous-year-questions" },
  { label: "Question Bank",             href: "/question-bank" },
];

const cityLinks = [
  { label: "Exam Prep Jaipur",     href: "/city/jaipur" },
  { label: "Exam Prep Delhi",      href: "/city/delhi" },
  { label: "Exam Prep Lucknow",    href: "/city/lucknow" },
  { label: "Exam Prep Pune",       href: "/city/pune" },
  { label: "Exam Prep Hyderabad",  href: "/city/hyderabad" },
  { label: "Exam Prep Bangalore",  href: "/city/bangalore" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms-of-service" },
  { label: "Refund Policy",      href: "/refund-policy" },
  { label: "Privacy Policy",     href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-500">
      {/* App Download Banner */}
      <div className="border-b border-white/10">
        <div className="container-xl py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-lg">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Prepare on-the-go with
                <span className="text-accent"> GetVidya app</span>
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Personalized exam preparation anytime, anywhere. Mock tests,
                analysis & daily targets in your pocket.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <a href="https://play.google.com/store/apps/details?id=app.getvidya.prod&pcampaignid=web_share"
                  target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                  <Image src="/images/play-store-White.svg" alt="Download on Google Play" width={160} height={48} className="h-12 w-auto" />
                </a>
                <a href="https://apps.apple.com/in/app/getvidya/id6642687147"
                  target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                  <Image src="/images/app-store-White.svg" alt="Download on App Store" width={160} height={48} className="h-12 w-auto" />
                </a>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="bg-white p-3 rounded-2xl mb-3 inline-block">
                  <Image src="/images/GetVidya_Telegram_QR.png" alt="Join Telegram" width={100} height={100} className="w-24 h-24" />
                </div>
                <p className="text-white/60 text-xs max-w-[100px]">Join us on Telegram</p>
              </div>
              <div className="text-center">
                <div className="bg-white p-3 rounded-2xl mb-3 inline-block">
                  <Image src="/images/GV-WA-QR.webp" alt="Join WhatsApp" width={100} height={100} className="w-24 h-24" />
                </div>
                <p className="text-white/60 text-xs max-w-[100px]">Join us on WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container-xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand + Socials + WhatsApp CTA */}
          <div>
            <Link href="/">
              <Image src="/images/logo-gv-full.png" alt="GetVidya Logo" width={160} height={40}
                className="h-9 w-auto mb-4 brightness-0 invert" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              India&apos;s first AI-powered government exam prep platform. Adaptive practice,
              personalized study plans, and 140,000+ MCQs.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mb-6">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center hover:opacity-85 transition-opacity`}>
                  <Image src={s.icon} alt={s.label} width={18} height={18} className="w-4 h-4 brightness-0 invert" />
                </a>
              ))}
            </div>
            {/* WhatsApp CTA */}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Col 2: Exam Hub */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Exam Hub</h4>
            <ul className="space-y-3">
              {examHubLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 text-sm hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 text-sm hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Locations */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Locations</h4>
            <ul className="space-y-3 mb-8">
              {cityLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 text-sm hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* App QR */}
            <div>
              <div className="bg-white p-2.5 rounded-xl inline-block mb-2">
                <Image src="/images/GetVidya_QR_Code.png" alt="Scan to download GetVidya" width={96} height={96} className="w-24 h-24" />
              </div>
              <p className="text-white/50 text-xs">Scan to download the app</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Prepdot Solutions Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className="text-white/40 text-sm hover:text-white/80 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

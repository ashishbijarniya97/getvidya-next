import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20your%20AI%20exam%20prep%20platform.";

/* Inline SVG brand icons — no file dependency, always renders */
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.24 13.42l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.908.139z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.849L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socials = [
  { label: "Telegram",  href: "https://t.me/GetVidyaofficial",                          Icon: TelegramIcon,  bg: "bg-[#2CA5E0]" },
  { label: "WhatsApp",  href: "https://whatsapp.com/channel/0029VahvzYy9mrGVgvn8Ys3q", Icon: WhatsAppIcon,  bg: "bg-[#25D366]" },
  { label: "YouTube",   href: "https://www.youtube.com/@Get_Vidya",                     Icon: YouTubeIcon,   bg: "bg-[#FF0000]" },
  { label: "Facebook",  href: "https://www.facebook.com/profile.php?id=61552776714971", Icon: FacebookIcon,  bg: "bg-[#1877F2]" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/getvidya",              Icon: LinkedInIcon,  bg: "bg-[#0A66C2]" },
  { label: "X",         href: "https://x.com/GetVidya",                                 Icon: XIcon,         bg: "bg-black" },
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
              {socials.map(({ label, href, Icon, bg }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center hover:opacity-80 transition-opacity`}>
                  <Icon />
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

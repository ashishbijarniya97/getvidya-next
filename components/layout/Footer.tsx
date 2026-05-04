import Link from "next/link";
import Image from "next/image";

const socials = [
  { label: "Telegram", href: "https://t.me/GetVidyaofficial", icon: "/images/Telegram.svg" },
  { label: "WhatsApp", href: "https://whatsapp.com/channel/0029VahvzYy9mrGVgvn8Ys3q", icon: "/images/Whatsapp_1.svg" },
  { label: "YouTube", href: "https://www.youtube.com/@Get_Vidya", icon: "/images/Youtube.svg" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61552776714971", icon: "/images/Facebook.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/getvidya", icon: "/images/Linkedin.svg" },
];

const sscLinks = [
  { label: "SSC CGL Notification 2025", href: "/blog/ssc-cgl-notification-2025" },
  { label: "SSC CGL Syllabus 2025", href: "https://www.getvidya.in/blog/ssc-cgl-syllabus" },
  { label: "SSC CGL Salary 2025", href: "https://www.getvidya.in/blog/ssc-cgl-salary" },
  { label: "SSC CGL Previous Year Papers", href: "https://www.getvidya.in/blog/ssc-cgl-previous-year-question-paper" },
  { label: "SSC CGL Vacancy 2025", href: "https://www.getvidya.in/blog/ssc-cgl-vacancy-2025" },
  { label: "SSC CGL Exam Pattern 2025", href: "https://www.getvidya.in/blog/ssc-cgl-exam-pattern" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "/blog" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms-of-service" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
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
                <a
                  href="https://play.google.com/store/apps/details?id=app.getvidya.prod&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/play-store-White.svg"
                    alt="Download on Google Play"
                    width={160}
                    height={48}
                    className="h-12 w-auto"
                  />
                </a>
                <a
                  href="https://apps.apple.com/in/app/getvidya/id6642687147"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/app-store-White.svg"
                    alt="Download on App Store"
                    width={160}
                    height={48}
                    className="h-12 w-auto"
                  />
                </a>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="bg-white p-3 rounded-2xl mb-3 inline-block">
                  <Image
                    src="/images/GetVidya_Telegram_QR.png"
                    alt="Join Telegram"
                    width={100}
                    height={100}
                    className="w-24 h-24"
                  />
                </div>
                <p className="text-white/60 text-xs max-w-[100px]">
                  Join us on Telegram
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white p-3 rounded-2xl mb-3 inline-block">
                  <Image
                    src="/images/GV-WA-QR.webp"
                    alt="Join WhatsApp"
                    width={100}
                    height={100}
                    className="w-24 h-24"
                  />
                </div>
                <p className="text-white/60 text-xs max-w-[100px]">
                  Join us on WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/images/logo-gv-full.png"
                alt="GetVidya Logo"
                width={160}
                height={40}
                className="h-9 w-auto mb-5 brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Simplifying competitive exam preparation, so you can focus on
              learning and reaching your goals.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-teal/30 transition-colors"
                >
                  <Image
                    src={s.icon}
                    alt={s.label}
                    width={20}
                    height={20}
                    className="w-4 h-4 brightness-0 invert"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* SSC CGL */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              SSC CGL 2025
            </h4>
            <ul className="space-y-3">
              {sscLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 text-sm hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 text-sm hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App Download QR */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Download App
            </h4>
            <div className="bg-white p-3 rounded-2xl inline-block mb-3">
              <Image
                src="/images/GetVidya_QR_Code.png"
                alt="Scan to download GetVidya"
                width={120}
                height={120}
                className="w-28 h-28"
              />
            </div>
            <p className="text-white/60 text-xs">Scan to download the app</p>
            <div className="flex flex-col gap-2 mt-5">
              <a
                href="https://play.google.com/store/apps/details?id=app.getvidya.prod"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/images/play-store.webp"
                  alt="Google Play"
                  width={140}
                  height={42}
                  className="h-10 w-auto"
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/getvidya/id6642687147"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/images/app-store.webp"
                  alt="App Store"
                  width={140}
                  height={42}
                  className="h-10 w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Prepdot Solutions Pvt. Ltd. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white/40 text-sm hover:text-white/80 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

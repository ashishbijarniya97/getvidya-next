import Link from "next/link";
import { generateSEO, breadcrumbSchema, howToSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";

export const metadata = generateSEO({
  title: "Current Affairs May 2026 Week 3 (May 12–18) — SSC CGL UPSC Banking",
  description:
    "Current affairs May 12–18, 2026 for SSC CGL, UPSC, IBPS PO, and Railway exams. India-UAE digital payment corridor, ISRO PSLV-C61, RBI MPC rate decision, India at ICC Women's T20 WC. Free MCQs on GetVidyaAI.",
  canonical: "https://getvidya.in/current-affairs/may-2026-week-3",
  keywords: [
    "current affairs may 2026 week 3",
    "may 2026 current affairs SSC CGL",
    "may 2026 current affairs UPSC",
    "weekly current affairs may 12 18 2026",
    "current affairs may 2026 MCQ",
    "GetVidyaAI current affairs may 2026",
  ],
});

const SECTIONS = [
  {
    category: "National Affairs",
    color: "border-blue-400 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    items: [
      {
        headline: "India-UAE Real-Time Digital Payment Corridor Launched",
        detail: "India and UAE signed an agreement to link UPI (Unified Payments Interface) with UAE's Instant Payment Platform (IPP). The corridor enables real-time cross-border payments between the two countries, benefiting India's 3.5 million diaspora in the UAE. The deal was signed during PM Modi's state visit to Abu Dhabi.",
        examAngle: "SSC CGL / Banking: UPI expansion, bilateral India-UAE relations, digital payment infrastructure",
      },
      {
        headline: "National Commission for Women Launches 'Sakhi Niwas' Scheme",
        detail: "NCW launched Sakhi Niwas — a network of safe, subsidised working women's hostels in 50 cities across 18 states. The scheme is funded under the Ministry of Women & Child Development and targets women migrating for employment from Tier 2 and Tier 3 cities.",
        examAngle: "SSC CGL / UPSC: Government schemes, women welfare, NCW role, WCD Ministry",
      },
      {
        headline: "Cabinet Approves National Quantum Mission Phase 2",
        detail: "The Union Cabinet approved Phase 2 of the National Quantum Mission with an outlay of ₹6,003 crore over 4 years (2026–2030). Phase 2 focuses on quantum computing hardware, quantum communication networks, and quantum sensing applications in defence and healthcare.",
        examAngle: "UPSC / SSC: Science & technology policy, quantum computing, mission objectives",
      },
    ],
  },
  {
    category: "International Affairs",
    color: "border-violet-400 bg-violet-50",
    badge: "bg-violet-100 text-violet-700",
    items: [
      {
        headline: "SCO Summit 2026 Hosted by India in New Delhi",
        detail: "India chaired the Shanghai Cooperation Organisation (SCO) Summit 2026 in New Delhi. Key outcomes: joint declaration on counter-terrorism cooperation, new SCO energy charter, and India-Russia bilateral trade agreement expansion. China and Pakistan were represented at foreign minister level.",
        examAngle: "UPSC / SSC: International organisations, SCO member states, India's foreign policy",
      },
      {
        headline: "India Elected to UN Human Rights Council for 2027–29",
        detail: "India was elected to the UN Human Rights Council (UNHRC) for the 2027–2029 term with 147 votes — the highest among Asia-Pacific candidates. India will serve its fifth term on the council, advocating for developing nations' priorities in the human rights framework.",
        examAngle: "UPSC / Banking: UN bodies, UNHRC composition, India's multilateral role",
      },
    ],
  },
  {
    category: "Economy & Finance",
    color: "border-emerald-400 bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
    items: [
      {
        headline: "RBI Monetary Policy Committee Cuts Repo Rate by 25 bps to 5.75%",
        detail: "The Reserve Bank of India's Monetary Policy Committee (MPC) voted 4-2 to cut the repo rate by 25 basis points to 5.75%, the second consecutive cut in 2026. The decision was driven by easing core inflation (4.1% in April 2026) and the need to support growth amid global demand slowdown. EMIs on home and auto loans are expected to decrease.",
        examAngle: "Banking / SSC CGL: RBI MPC, repo rate, monetary policy tools, inflation targeting",
      },
      {
        headline: "India's FY26 GDP Growth Estimated at 7.4% by IMF",
        detail: "The International Monetary Fund revised India's FY2026 GDP growth estimate upward to 7.4% (from 7.0% in April projection) — the highest among G20 economies. Key drivers cited: domestic consumption recovery, infrastructure spending, and services export growth. India overtook Japan to become the world's 4th largest economy by nominal GDP.",
        examAngle: "UPSC / Banking: IMF, GDP growth, India's economic ranking, G20",
      },
    ],
  },
  {
    category: "Science & Technology",
    color: "border-orange-400 bg-orange-50",
    badge: "bg-orange-100 text-orange-700",
    items: [
      {
        headline: "ISRO Successfully Launches PSLV-C61 with EOS-09 Earth Observation Satellite",
        detail: "ISRO's PSLV-C61 successfully placed the EOS-09 Earth Observation Satellite into a 526 km sun-synchronous orbit from Sriharikota. EOS-09 carries a synthetic aperture radar (SAR) payload capable of imaging through clouds — critical for agriculture monitoring, disaster management, and border surveillance.",
        examAngle: "SSC CGL / UPSC: ISRO missions, PSLV series, Earth Observation Satellites, SAR technology",
      },
      {
        headline: "India Achieves 100 GW Solar Capacity Milestone",
        detail: "India crossed the 100 GW installed solar power capacity milestone, making it the 3rd country after China and the USA to achieve this. Solar now constitutes 38% of India's total renewable energy capacity. Rajasthan (26 GW) and Gujarat (18 GW) are the top two states by installed solar capacity.",
        examAngle: "SSC CGL / UPSC: Renewable energy, India's climate targets, solar power stats, state rankings",
      },
    ],
  },
  {
    category: "Sports",
    color: "border-rose-400 bg-rose-50",
    badge: "bg-rose-100 text-rose-700",
    items: [
      {
        headline: "India Wins ICC Women's T20 World Cup 2026",
        detail: "The Indian women's cricket team won the ICC Women's T20 World Cup 2026 held in England, defeating Australia by 8 wickets in the final at Lord's. Smriti Mandhana was awarded Player of the Tournament. India's first T20 WC title since 2020 (U19) — the senior team's first-ever Women's T20 World Cup win.",
        examAngle: "SSC CGL / UPSC: Sports awards, ICC events, Player of the Tournament, India cricket records",
      },
      {
        headline: "Neeraj Chopra Sets New Javelin World Record — 92.78m",
        detail: "Olympic champion Neeraj Chopra set a new javelin throw world record of 92.78 metres at the Diamond League meet in Doha, breaking the previous record of 90.72m set by Jan Železný (Czech Republic) in 1996. This is the first world athletics field record set by an Indian athlete.",
        examAngle: "SSC CGL / UPSC: Indian sports achievements, javelin records, Olympics, Diamond League",
      },
    ],
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: "Current Affairs May 2026 Week 3 (May 12–18) — SSC CGL UPSC Banking",
  description:
    "Weekly current affairs May 12–18, 2026 covering national, international, economy, science, and sports events relevant to SSC CGL, UPSC, IBPS PO, and Railway exams.",
  datePublished: "2026-05-19",
  dateModified: "2026-05-19",
  author: { "@type": "Organization", name: "GetVidyaAI" },
  publisher: {
    "@type": "Organization",
    name: "GetVidyaAI",
    logo: { "@type": "ImageObject", url: "https://getvidya.in/images/logo-gv-full.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://getvidya.in/current-affairs/may-2026-week-3" },
  keywords: "current affairs may 2026, SSC CGL current affairs, UPSC current affairs, weekly current affairs India",
  about: [
    { "@type": "Thing", name: "India-UAE UPI digital payment corridor" },
    { "@type": "Thing", name: "ISRO PSLV-C61 EOS-09 launch" },
    { "@type": "Thing", name: "RBI repo rate cut May 2026" },
    { "@type": "Thing", name: "ICC Women's T20 World Cup 2026" },
    { "@type": "Thing", name: "Neeraj Chopra javelin world record" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the most important current affairs of May 2026 for SSC CGL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Key current affairs for SSC CGL May 2026: India-UAE UPI payment corridor, RBI MPC repo rate cut to 5.75%, ISRO PSLV-C61/EOS-09 launch, India crossing 100 GW solar capacity, India winning ICC Women's T20 World Cup 2026, and Neeraj Chopra's new javelin world record (92.78m). These topics are high-frequency exam areas.",
      },
    },
    {
      "@type": "Question",
      name: "What was the RBI repo rate decision in May 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In May 2026, the RBI Monetary Policy Committee (MPC) cut the repo rate by 25 basis points to 5.75%. The vote was 4-2. This was the second consecutive rate cut in 2026, driven by easing core inflation (4.1% in April) and the need to support economic growth.",
      },
    },
    {
      "@type": "Question",
      name: "What is PSLV-C61 and EOS-09?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PSLV-C61 is ISRO's Polar Satellite Launch Vehicle mission that launched in May 2026. EOS-09 (Earth Observation Satellite-09) is the payload — an Earth imaging satellite carrying a Synthetic Aperture Radar (SAR) that can image through clouds, used for agriculture monitoring, disaster management, and defence surveillance.",
      },
    },
  ],
};

export default function CurrentAffairsMay2026Week3() {
  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Current Affairs", url: "/current-affairs" },
    { name: "May 2026 Week 3", url: "/current-affairs/may-2026-week-3" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-gradient-hero py-16">
          <div className="container-xl max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 text-white/60 text-sm mb-5">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/current-affairs" className="hover:text-white transition-colors">Current Affairs</Link>
              <ChevronRight size={14} />
              <span className="text-white/80">May 2026 — Week 3</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              Latest Edition
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Current Affairs<br />
              <span className="text-accent">May 12–18, 2026</span>
            </h1>
            <p className="text-white/70 mb-6">
              SSC CGL · UPSC CSE · IBPS PO · Railway RRB · State PSC — curated by GetVidyaAI
            </p>
            <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm">
              <span className="flex items-center gap-1.5"><Calendar size={13} /> Published: May 19, 2026</span>
              <span>10 key events · 5 categories</span>
            </div>
          </div>
        </section>

        {/* Quick summary bar */}
        <section className="bg-white border-b border-slate-200 py-4">
          <div className="container-xl max-w-4xl">
            <div className="flex flex-wrap gap-2 text-xs">
              {SECTIONS.map(s => (
                <span key={s.category} className={`px-3 py-1.5 rounded-full font-medium ${s.badge}`}>{s.category} ({s.items.length})</span>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12 bg-slate-50">
          <div className="container-xl max-w-4xl space-y-10">
            {SECTIONS.map(({ category, color, badge, items }) => (
              <section key={category}>
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${badge}`}>{category}</span>
                </div>
                <div className="space-y-4">
                  {items.map(({ headline, detail, examAngle }) => (
                    <div key={headline} className={`bg-white rounded-xl border-l-4 ${color} p-5 shadow-sm`}>
                      <h2 className="font-bold text-slate-800 text-base mb-2 leading-snug">{headline}</h2>
                      <p className="text-slate-600 text-sm leading-relaxed mb-3">{detail}</p>
                      <div className="flex items-start gap-2 bg-slate-50 rounded-lg px-3 py-2 text-xs text-slate-500">
                        <span className="font-semibold text-teal shrink-0">Exam angle →</span>
                        <span>{examAngle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container-xl max-w-3xl">
            <h2 className="text-2xl font-bold text-primary-500 mb-8">Frequently Asked — May 2026 CA</h2>
            <div className="space-y-3">
              {[
                { q: "What is the most important current affairs of May 2026 for SSC CGL?", a: "India-UAE UPI corridor, RBI repo rate cut to 5.75%, ISRO PSLV-C61 launch, India crossing 100 GW solar, ICC Women's T20 WC win, and Neeraj Chopra's 92.78m world record." },
                { q: "What was the RBI repo rate decision in May 2026?", a: "RBI MPC cut the repo rate by 25 bps to 5.75% — second consecutive cut in 2026. Vote: 4-2. Reason: easing inflation + supporting growth." },
                { q: "What is PSLV-C61?", a: "PSLV-C61 launched EOS-09 (Earth Observation Satellite with SAR radar) to a 526 km sun-synchronous orbit from Sriharikota in May 2026." },
              ].map(({ q, a }) => (
                <details key={q} className="border border-slate-200 rounded-xl p-5 cursor-pointer group">
                  <summary className="font-semibold text-slate-800 list-none flex justify-between items-center gap-4">
                    {q}
                    <span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-xl leading-none">+</span>
                  </summary>
                  <p className="text-slate-600 text-sm leading-relaxed mt-3">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Practice CTA */}
        <section className="py-16 bg-gradient-hero">
          <div className="container-xl max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Test This Week&apos;s Current Affairs</h2>
            <p className="text-white/70 mb-6 text-sm">GetVidyaAI tracks your CA accuracy and adjusts your weekly practice automatically.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="https://app.getvidya.in" className="btn-primary px-7 py-3.5 rounded-2xl inline-flex items-center gap-2">
                Practice Free CA MCQs <ArrowRight size={16} />
              </Link>
              <Link href="/current-affairs" className="btn-secondary px-7 py-3.5 rounded-2xl">
                ← All Editions
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

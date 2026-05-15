"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  Shield,
  Trophy,
  BookOpen,
  Brain,
  FileText,
  Users,
  Star,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

const APP_URL = "https://app.getvidya.in";

/* ─── Pricing plans ─────────────────────────────────────────────────────────── */
const PLANS = [
  {
    id: "free",
    name: "FREE",
    tagline: "Start your journey",
    monthlyPrice: 0,
    annualPrice: 0,
    badge: null,
    badgeStyle: "",
    cardStyle: "bg-white border-2 border-slate-200",
    nameStyle: "text-slate-400",
    taglineStyle: "text-slate-500",
    priceStyle: "text-primary-500",
    periodStyle: "text-slate-400",
    savingsStyle: "text-slate-400",
    dividerStyle: "border-slate-100",
    featStyle: "text-slate-600",
    missStyle: "text-slate-400",
    iconStyle: "text-teal",
    missIconStyle: "text-slate-400",
    ctaStyle:
      "inline-flex items-center justify-center gap-2 w-full bg-transparent text-primary-500 font-semibold border-2 border-primary-500 px-8 py-3 rounded-xl hover:bg-primary-500 hover:text-white active:scale-95 transition-all duration-200",
    ctaLabel: "Get Started Free",
    ctaHref: `${APP_URL}/signup`,
    features: [
      "25-question Diagnostic Assessment",
      "25 AI practice questions (lifetime)",
      "10 AI chat messages (lifetime)",
      "Subject-wise weak area report",
      "Basic progress dashboard",
      "SSC CGL & Railway access",
    ],
    missing: [
      "Daily AI practice quota",
      "Full mock tests",
      "Weekly AI study plan",
      "AI profile analysis",
      "Monthly PDF report",
    ],
  },
  {
    id: "vidya-pass",
    name: "VIDYA PASS",
    tagline: "Most popular for aspirants",
    monthlyPrice: 79,
    annualPrice: 499,
    badge: "Most Popular",
    badgeStyle: "bg-accent text-primary-500",
    cardStyle:
      "bg-gradient-to-b from-primary-400 to-primary-500 border-2 border-teal/40 shadow-glow",
    nameStyle: "text-teal-light opacity-80",
    taglineStyle: "text-white/60",
    priceStyle: "text-accent",
    periodStyle: "text-white/50",
    savingsStyle: "text-white/50",
    dividerStyle: "border-white/10",
    featStyle: "text-white/80",
    missStyle: "text-white/40",
    iconStyle: "text-teal-light",
    missIconStyle: "text-white/40",
    ctaStyle:
      "inline-flex items-center justify-center gap-2 w-full bg-accent text-primary-500 font-semibold px-8 py-3 rounded-xl hover:bg-accent-dark active:scale-95 transition-all duration-200",
    ctaLabel: "Start Vidya Pass",
    ctaHref: `${APP_URL}/signup?plan=vidya-pass`,
    features: [
      "Everything in Free",
      "30 AI practice questions/day",
      "30 AI chat messages/day",
      "5 full mock tests/month",
      "Weekly AI-generated study plan",
      "Adaptive difficulty practice",
      "Topic-level accuracy insights",
      "SSC, Railway & Banking exams",
    ],
    missing: [
      "Unlimited AI practice",
      "AI profile analysis",
      "Monthly PDF report",
      "Defence & State PSC access",
    ],
  },
  {
    id: "personal-mentor",
    name: "PERSONAL MENTOR",
    tagline: "For serious toppers",
    monthlyPrice: 149,
    annualPrice: 999,
    badge: "Best Value",
    badgeStyle: "bg-teal text-white",
    cardStyle:
      "bg-gradient-to-b from-slate-900 to-slate-800 border-2 border-teal/30 shadow-glow",
    nameStyle: "text-teal-light opacity-80",
    taglineStyle: "text-white/60",
    priceStyle: "text-teal-light",
    periodStyle: "text-white/50",
    savingsStyle: "text-teal-light/70",
    dividerStyle: "border-white/10",
    featStyle: "text-white/80",
    missStyle: "text-white/40",
    iconStyle: "text-teal-light",
    missIconStyle: "text-white/40",
    ctaStyle:
      "inline-flex items-center justify-center gap-2 w-full bg-teal text-white font-semibold px-8 py-3 rounded-xl hover:bg-teal-dark active:scale-95 transition-all duration-200",
    ctaLabel: "Get Personal Mentor",
    ctaHref: `${APP_URL}/signup?plan=personal-mentor`,
    features: [
      "Everything in Vidya Pass",
      "Unlimited AI practice questions",
      "Unlimited AI chat",
      "Unlimited full mock tests",
      "Weekly LLaMA profile analysis",
      "Monthly PDF progress report",
      "All exams incl. Defence & State PSC",
      "UPSC CSE preparation included",
      "Priority support",
    ],
    missing: [],
  },
];

/* ─── Comparison table rows ─────────────────────────────────────────────────── */
const COMPARISON_ROWS: {
  label: string;
  free: boolean | string;
  vidya: boolean | string;
  mentor: boolean | string;
}[] = [
  { label: "Diagnostic Assessment (25 Qs)", free: true, vidya: true, mentor: true },
  { label: "AI Practice Questions", free: "25 lifetime", vidya: "30/day", mentor: "Unlimited" },
  { label: "AI Chat Messages", free: "10 lifetime", vidya: "30/day", mentor: "Unlimited" },
  { label: "Full Mock Tests", free: false, vidya: "5/month", mentor: "Unlimited" },
  { label: "Weekly AI Study Plan", free: false, vidya: true, mentor: true },
  { label: "Adaptive Difficulty", free: false, vidya: true, mentor: true },
  { label: "LLaMA Profile Analysis", free: false, vidya: false, mentor: "Weekly" },
  { label: "Monthly PDF Report", free: false, vidya: false, mentor: true },
  { label: "SSC CGL / Railway / Banking", free: true, vidya: true, mentor: true },
  { label: "UPSC / Defence / State PSC", free: false, vidya: false, mentor: true },
  { label: "Priority Support", free: false, vidya: false, mentor: true },
];

/* ─── FAQs ──────────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no lock-ins. You can cancel your Vidya Pass or Personal Mentor subscription at any time from your account settings. Your access continues until the end of the billing period — no pro-rated refunds, but no penalty either.",
  },
  {
    q: "Is my data safe with GetVidya?",
    a: "Absolutely. Your practice data, diagnostic results, and personal information are stored securely and never sold to third parties. GetVidya is built by Prepdot Solutions Pvt. Ltd. and follows industry-standard data protection practices. See our Privacy Policy for full details.",
  },
  {
    q: "Is the content available in Hindi?",
    a: "Yes. GetVidyaAI supports both English and Hindi for practice questions, study plans, and AI chat. You can switch languages from your profile settings. Hindi medium aspirants preparing for SSC CGL, Railway NTPC, and State PSC will find full bilingual support.",
  },
  {
    q: "Which plan is best for SSC CGL 2026?",
    a: "Vidya Pass (₹499/year) is the ideal pick for SSC CGL 2026. It gives you 30 adaptive practice questions per day, 5 full mock tests per month, and a weekly AI study plan built around your weak areas. Most CGL aspirants see a +12 to +18 mark improvement after 8 weeks of consistent use. If you want unlimited mocks and a monthly PDF report, upgrade to Personal Mentor.",
  },
  {
    q: "What is the difference between Vidya Pass and Personal Mentor?",
    a: "Vidya Pass gives you 30 AI questions/day and a weekly study plan — perfect for consistent daily preparation. Personal Mentor removes all limits: unlimited questions, unlimited mocks, a weekly LLaMA AI profile analysis that gives you a detailed strengths-and-weaknesses breakdown, a monthly PDF report, and access to all 6 exam categories including Defence (NDA/CDS) and State PSC.",
  },
];

/* ─── Render helper ─────────────────────────────────────────────────────────── */
function CellValue({ val, dark = false }: { val: boolean | string; dark?: boolean }) {
  if (val === true)
    return <CheckCircle2 className="w-5 h-5 text-teal mx-auto" />;
  if (val === false)
    return <XCircle className="w-5 h-5 text-slate-300 mx-auto" />;
  return (
    <span className={`text-sm font-medium ${dark ? "text-teal-DEFAULT" : "text-primary-500"}`}>
      {val}
    </span>
  );
}

export default function PricingClient() {
  const [annual, setAnnual] = useState(true);
  const [timeLeft, setTimeLeft] = useState<{ h: string; m: string; s: string } | null>(null);

  useEffect(() => {
    // Early Bird offer hard-expires 2026-05-29 — remove this block after that date
    const END = new Date("2026-05-29T23:59:59+05:30").getTime();

    const tick = () => {
      const diff = END - Date.now();
      if (diff <= 0) { setTimeLeft(null); return; }
      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      setTimeLeft({ h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-hero pt-28 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Zap size={14} className="text-accent" />
            GetVidyaAI — AI Exam Prep Plans
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Simple, honest pricing.
            <br className="hidden sm:block" />
            <span className="text-accent">Built for aspirants.</span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            GetVidyaAI adapts to your accuracy, builds your weekly study plan, and targets your
            weak areas — so every rupee you spend earns you more marks.
          </p>

          {/* Annual / Monthly toggle */}
          <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                !annual
                  ? "bg-white text-primary-500 shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                annual
                  ? "bg-white text-primary-500 shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Annual
              <span className="bg-accent text-primary-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                SAVE
              </span>
            </button>
          </div>
          {annual && (
            <p className="text-teal-light text-sm mt-3">
              Annual plans save you up to{" "}
              <strong>₹390/year</strong> vs monthly billing
            </p>
          )}

          {/* ── EARLY BIRD CARD (auto-hides after 2026-05-29) ────────────── */}
          {timeLeft && (
            <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-3 bg-amber-500/20 border border-amber-400/40 backdrop-blur-md rounded-2xl px-6 py-4 text-white max-w-lg mx-auto">
              <span className="text-2xl">⚡</span>
              <div className="text-center sm:text-left">
                <p className="text-sm font-bold text-amber-300 uppercase tracking-wide">Early Bird Offer</p>
                <p className="text-xs text-white/70 mt-0.5">Day Zero pricing ends in</p>
              </div>
              <div className="font-mono text-xl font-bold text-amber-300 bg-black/20 px-4 py-2 rounded-xl tracking-widest ml-auto">
                {timeLeft.h}:{timeLeft.m}:{timeLeft.s}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── PRICING CARDS ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((plan) => {
              const price = annual ? plan.annualPrice : plan.monthlyPrice;
              const period = annual ? "/year" : "/month";
              const isFree = plan.id === "free";

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-6 flex flex-col ${plan.cardStyle} ${
                    plan.id === "vidya-pass" ? "md:-mt-4 md:pb-10" : ""
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span
                        className={`${plan.badgeStyle} text-xs font-bold px-4 py-1 rounded-full shadow-sm whitespace-nowrap`}
                      >
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Plan name */}
                  <div className="mb-4 pt-2">
                    <h2
                      className={`text-xs font-bold tracking-widest uppercase mb-1 ${plan.nameStyle}`}
                    >
                      {plan.name}
                    </h2>
                    <p className={`text-sm ${plan.taglineStyle}`}>{plan.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {isFree ? (
                      <div className="flex items-end gap-1">
                        <span className={`text-5xl font-bold ${plan.priceStyle}`}>₹0</span>
                        <span className={`text-sm pb-2 ${plan.periodStyle}`}>forever</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-end gap-1">
                          <span className={`text-5xl font-bold ${plan.priceStyle}`}>
                            ₹{price}
                          </span>
                          <span className={`text-sm pb-2 ${plan.periodStyle}`}>{period}</span>
                        </div>
                        {annual ? (
                          <p className={`text-xs mt-1 ${plan.savingsStyle}`}>
                            ≈ ₹{Math.round(price / 12)}/month · ₹{(price / 365).toFixed(2)}/day
                          </p>
                        ) : (
                          <p className={`text-xs mt-1 ${plan.savingsStyle}`}>
                            Annual plan saves ₹{plan.monthlyPrice * 12 - plan.annualPrice}/year
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <a href={plan.ctaHref} className={`${plan.ctaStyle} mb-6`}>
                    {plan.ctaLabel} <ArrowRight size={16} />
                  </a>

                  {/* Divider */}
                  <div className={`border-t mb-4 ${plan.dividerStyle}`} />

                  {/* Included features */}
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-4 h-4 mt-0.5 shrink-0 ${plan.iconStyle}`}
                        />
                        <span className={`text-sm ${plan.featStyle}`}>{f}</span>
                      </li>
                    ))}
                    {plan.missing.map((f) => (
                      <li key={f} className="flex items-start gap-2 opacity-40">
                        <XCircle
                          className={`w-4 h-4 mt-0.5 shrink-0 ${plan.missIconStyle}`}
                        />
                        <span className={`text-sm ${plan.missStyle}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="text-center text-slate-400 text-sm mt-6">
            All plans include a free 25-question diagnostic · No credit card needed for Free tier
          </p>
        </div>
      </section>

      {/* ── EARLY BIRD BANNER ────────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-accent/10 border-y border-accent/20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-500" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
                <span className="bg-accent text-primary-500 text-xs font-bold px-2.5 py-1 rounded-full">
                  LIMITED OFFER
                </span>
                <span className="bg-primary-500 text-accent text-xs font-bold px-2.5 py-1 rounded-full">
                  DAY ZERO NATIONAL
                </span>
              </div>
              <p className="font-semibold text-primary-500 text-base">
                Day Zero offer — Vidya Pass at{" "}
                <strong className="text-teal-dark">₹299/year</strong> for the first 500 students.
                <span className="text-slate-500 font-normal"> Renews at ₹499.</span>
              </p>
              <p className="text-slate-600 text-sm mt-1">
                Rajasthan Topper 100 — First 100 Rajasthan students get{" "}
                <strong className="text-primary-500">Personal Mentor at ₹499/year</strong> (50%
                off, auto-detected via phone prefix).
              </p>
            </div>
            <a href={`${APP_URL}/signup`} className="btn-primary flex-shrink-0 text-sm">
              Claim Early Bird <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── FEATURE COMPARISON TABLE ─────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-tag mb-4">Full Comparison</span>
            <h2 className="section-heading mt-4 mb-2">Everything side by side</h2>
            <p className="section-subheading mx-auto">
              Exactly what you get at each tier — no asterisks
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-5 py-4 text-slate-500 font-semibold w-2/5">
                    Feature
                  </th>
                  <th className="text-center px-5 py-4 text-slate-600 font-bold">Free</th>
                  <th className="text-center px-5 py-4 text-primary-500 font-bold bg-mint/30">
                    Vidya Pass
                  </th>
                  <th className="text-center px-5 py-4 text-white font-bold bg-primary-500 rounded-tr-2xl">
                    Personal Mentor
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-5 py-3.5 font-medium text-slate-700">{row.label}</td>
                    <td className="px-5 py-3.5 text-center">
                      <CellValue val={row.free} />
                    </td>
                    <td className="px-5 py-3.5 text-center bg-mint/10">
                      <CellValue val={row.vidya} />
                    </td>
                    <td className="px-5 py-3.5 text-center bg-primary-500/5">
                      <CellValue val={row.mentor} dark />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200 bg-slate-50">
                  <td className="px-5 py-4 font-bold text-slate-700">Price</td>
                  <td className="px-5 py-4 text-center font-bold text-primary-500">₹0</td>
                  <td className="px-5 py-4 text-center bg-mint/30 font-bold text-primary-500">
                    {annual ? "₹499/year" : "₹79/month"}
                  </td>
                  <td className="px-5 py-4 text-center bg-primary-500 font-bold text-accent rounded-br-2xl">
                    {annual ? "₹999/year" : "₹149/month"}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* ── WHY WE WIN ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-tag mb-4">
              <Brain size={14} />
              Why GetVidya Wins
            </span>
            <h2 className="section-heading mt-4 mb-2">GetVidya vs Other Platforms</h2>
            <p className="section-subheading mx-auto">Same price range. Fundamentally different approach.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Other platforms */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Most Other Platforms</h3>
                  <p className="text-slate-400 text-sm">₹399–₹2,000/year</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Static PDFs and fixed-difficulty tests",
                  "Zero AI personalization",
                  "Thousands of tests — mostly irrelevant to your exam",
                  "No diagnostic that maps your actual weak topics",
                  "Same fixed study schedule for everyone",
                  "No adaptive difficulty progression",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-slate-500 text-sm">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* GetVidya */}
            <div className="bg-gradient-to-b from-primary-400 to-primary-500 border-2 border-teal/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-teal/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-white">GetVidya Vidya Pass</h3>
                  <p className="text-teal-light text-sm">₹499/year · ₹1.37/day</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Adaptive MCQ practice — difficulty adjusts to your accuracy",
                  "GetVidyaAI diagnoses your exact weak topics on Day 1",
                  "Weekly study plan rebuilt from your last 7 days of performance",
                  "Only relevant questions for your specific exam",
                  "+12 to +18 mark improvement in 8 weeks of consistent use",
                  "Personalized — because every aspirant's weak areas are different",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-white/90 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-teal-light mt-0.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Value callout */}
          <div className="mt-6 bg-accent/10 border border-accent/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="text-3xl font-bold text-primary-500 flex-shrink-0">₹499</div>
            <div className="flex-1">
              <p className="font-semibold text-primary-500">
                The most AI-powered exam prep plan at this price point
              </p>
              <p className="text-slate-500 text-sm mt-0.5">
                ₹499/year = ₹41/month = the cost of one chai every few days.
                GetVidya gives you AI-adaptive practice, a weekly personalized study plan, and
                diagnostics that map your weak topics — features other platforms simply don&apos;t offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPETITOR COMPARISON MATRIX ─────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-tag mb-4">
              <Trophy size={14} />
              Platform Comparison
            </span>
            <h2 className="section-heading mt-4 mb-2">
              Why students are switching to GetVidya
            </h2>
            <p className="section-subheading mx-auto">
              See how GetVidya stacks up against the typical features of popular exam prep platforms
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-5 py-4 text-slate-500 font-semibold w-2/5">Feature</th>
                  <th className="text-center px-5 py-4 text-primary-500 font-bold bg-mint/30">
                    GetVidya (Vidya Pass)
                  </th>
                  <th className="text-center px-5 py-4 text-slate-600 font-bold">Platform A</th>
                  <th className="text-center px-5 py-4 text-slate-600 font-bold">Platform B</th>
                </tr>
              </thead>
              <tbody>
                {/* Price row */}
                <tr className="bg-white">
                  <td className="px-5 py-3.5 font-medium text-slate-700">Price</td>
                  <td className="px-5 py-3.5 text-center bg-mint/10 font-semibold text-primary-500">₹499/year</td>
                  <td className="px-5 py-3.5 text-center text-slate-600">₹399–₹2,000/year</td>
                  <td className="px-5 py-3.5 text-center text-slate-600">₹499–₹1,999/year</td>
                </tr>

                {/* Adaptive AI Practice — highlighted exclusive row */}
                <tr className="bg-emerald-50/60 border-l-4 border-l-emerald-400">
                  <td className="px-5 py-3.5 font-medium text-slate-700 flex items-center gap-2">
                    Adaptive AI Practice
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      <Star className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500" />
                      Exclusive
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center bg-mint/10">✅ Exclusive</td>
                  <td className="px-5 py-3.5 text-center">❌ None</td>
                  <td className="px-5 py-3.5 text-center">❌ None</td>
                </tr>

                {/* AI Weak Subject Diagnosis */}
                <tr className="bg-slate-50/50">
                  <td className="px-5 py-3.5 font-medium text-slate-700">AI Weak Subject Diagnosis</td>
                  <td className="px-5 py-3.5 text-center bg-mint/10">✅ Day 1 diagnostic</td>
                  <td className="px-5 py-3.5 text-center">❌ None</td>
                  <td className="px-5 py-3.5 text-center">❌ None</td>
                </tr>

                {/* Personalized Study Plan */}
                <tr className="bg-white">
                  <td className="px-5 py-3.5 font-medium text-slate-700">Personalized Study Plan</td>
                  <td className="px-5 py-3.5 text-center bg-mint/10">✅ Weekly AI plan</td>
                  <td className="px-5 py-3.5 text-center text-slate-500">❌ Static syllabus</td>
                  <td className="px-5 py-3.5 text-center text-slate-500">❌ Static syllabus</td>
                </tr>

                {/* Mock Tests */}
                <tr className="bg-slate-50/50">
                  <td className="px-5 py-3.5 font-medium text-slate-700">Mock Tests</td>
                  <td className="px-5 py-3.5 text-center bg-mint/10">✅ Adaptive difficulty</td>
                  <td className="px-5 py-3.5 text-center">✅ Large library (static)</td>
                  <td className="px-5 py-3.5 text-center">✅ 500+ (static)</td>
                </tr>

                {/* AI Chat Tutor */}
                <tr className="bg-white">
                  <td className="px-5 py-3.5 font-medium text-slate-700">AI Chat Tutor</td>
                  <td className="px-5 py-3.5 text-center bg-mint/10">✅ GetVidyaAI</td>
                  <td className="px-5 py-3.5 text-center">❌ None</td>
                  <td className="px-5 py-3.5 text-center">❌ None</td>
                </tr>

                {/* Offline Access */}
                <tr className="bg-slate-50/50">
                  <td className="px-5 py-3.5 font-medium text-slate-700">Offline Access</td>
                  <td className="px-5 py-3.5 text-center bg-mint/10 text-slate-500">❌ App only</td>
                  <td className="px-5 py-3.5 text-center">✅ Full</td>
                  <td className="px-5 py-3.5 text-center">✅ Full</td>
                </tr>

                {/* Video Lectures */}
                <tr className="bg-white">
                  <td className="px-5 py-3.5 font-medium text-slate-700">Video Lectures</td>
                  <td className="px-5 py-3.5 text-center bg-mint/10 text-slate-500">❌</td>
                  <td className="px-5 py-3.5 text-center">✅ Extensive</td>
                  <td className="px-5 py-3.5 text-center">✅ Extensive</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-slate-500 text-sm mt-5 italic max-w-2xl mx-auto">
            Adaptive AI Practice is exclusive to GetVidya — no other platform personalises
            difficulty in real time based on your accuracy.
          </p>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary-500 mb-2">
              Aspirants who chose GetVidya
            </h2>
            <p className="text-slate-500 text-sm">Real results. Real prices paid.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Priya Sharma",
                exam: "SSC CGL 2025 — Cleared",
                city: "Jaipur",
                plan: "Vidya Pass",
                quote:
                  "GetVidyaAI found I was weak in DI specifically, not Quant overall. 5 weeks of targeted practice took my DI accuracy from 40% to 72%. Cleared Tier-1 with 32 marks more than my previous attempt.",
                stars: 5,
              },
              {
                name: "Rohan Meena",
                exam: "Railway NTPC 2025 — Selected",
                city: "Sikar, Rajasthan",
                plan: "Vidya Pass",
                quote:
                  "At ₹499/year, this is cheaper than a single coaching centre mock test series. The weekly study plan told me exactly what to study every day. No guessing.",
                stars: 5,
              },
              {
                name: "Anjali Singh",
                exam: "UPSC CSE Prelims — Cleared",
                city: "Delhi",
                plan: "Personal Mentor",
                quote:
                  "The monthly PDF report is genuinely useful. It showed me I was improving in Polity but stagnating in Economy — I would never have noticed on my own.",
                stars: 5,
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm italic mb-4 leading-relaxed">
                  &quot;{t.quote}&quot;
                </p>
                <div>
                  <p className="font-semibold text-primary-500 text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">
                    {t.exam} · {t.city}
                  </p>
                  <span className="inline-block mt-1.5 bg-mint text-primary-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {t.plan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-tag mb-4">
              <AlertCircle size={14} />
              FAQ
            </span>
            <h2 className="section-heading mt-4 mb-2">Common questions</h2>
            <p className="section-subheading mx-auto">
              Answers about plans, cancellation, and what GetVidyaAI actually does
            </p>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="bg-white border border-slate-200 rounded-2xl p-5 group open:border-teal/30 transition-all"
              >
                <summary className="font-semibold text-primary-500 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>{f.q}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <p className="text-slate-600 mt-3 leading-relaxed text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gradient-primary text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center gap-3 mb-5">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-teal-light" />
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-light" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Start free. Upgrade only when ready.
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Take the 25-question diagnostic, get your weak-subject report, and see exactly where
            GetVidyaAI can take you. No credit card. No pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`${APP_URL}/signup`} className="btn-primary px-8 py-4 text-base">
              Start Free Diagnostic <ArrowRight size={18} />
            </a>
            <a
              href={`${APP_URL}/signup?plan=vidya-pass`}
              className="btn-secondary px-8 py-4 text-base"
            >
              Get Vidya Pass — ₹499/year
            </a>
          </div>
          <p className="text-white/40 text-sm mt-6">
            50,000+ students · 4.7★ · Cancel anytime
          </p>
        </div>
      </section>
    </>
  );
}

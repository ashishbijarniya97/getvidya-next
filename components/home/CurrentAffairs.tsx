import Link from "next/link";
import { ArrowRight, Calendar, Zap } from "lucide-react";

const WEEKS = [
  {
    label: "Week 3 — May 2026",
    date: "May 12–18, 2026",
    href: "/current-affairs/may-2026-week-3",
    topics: ["India-UAE digital payment corridor", "ISRO PSLV-C61 launch", "RBI MPC rate decision", "ICC Women's T20 WC"],
    badge: "Latest",
    badgeColor: "bg-accent text-primary-500",
  },
  {
    label: "Week 2 — May 2026",
    date: "May 5–11, 2026",
    href: "/current-affairs/may-2026-week-3",
    topics: ["Operation Sindoor outcomes", "India GDP Q4 data", "WHO Global TB Report", "NEP 2020 update"],
    badge: "Popular",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    label: "Week 1 — May 2026",
    date: "Apr 28 – May 4, 2026",
    href: "/current-affairs/may-2026-week-3",
    topics: ["India-Pakistan ceasefire", "RBI rate cut 25bps", "IPL 2026 final", "IUCN Red List update"],
    badge: null,
    badgeColor: "",
  },
];

const CATEGORIES = [
  { label: "National", color: "bg-blue-100 text-blue-700" },
  { label: "International", color: "bg-purple-100 text-purple-700" },
  { label: "Economy", color: "bg-emerald-100 text-emerald-700" },
  { label: "Science & Tech", color: "bg-orange-100 text-orange-700" },
  { label: "Sports", color: "bg-rose-100 text-rose-700" },
];

export default function CurrentAffairs() {
  return (
    <section className="py-20 bg-white px-4">
      <div className="container-xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-teal mb-3">
              <Zap size={12} /> AI-Curated · Updated Weekly
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-500 leading-tight">
              Current Affairs for<br className="hidden sm:block" /> Govt Exams 2026
            </h2>
            <p className="text-slate-500 mt-2 text-base max-w-lg">
              Every week, GetVidyaAI curates the most exam-relevant news across SSC CGL, UPSC, Banking, and Railway — with the exam angle highlighted.
            </p>
          </div>
          <Link
            href="/current-affairs"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-primary-500 transition-colors"
          >
            View all editions <ArrowRight size={14} />
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
            <span key={c.label} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${c.color}`}>
              {c.label}
            </span>
          ))}
        </div>

        {/* Week cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {WEEKS.map((week) => (
            <Link
              key={week.label}
              href={week.href}
              className="group block bg-slate-50 hover:bg-mint/40 border border-slate-200 hover:border-teal/40 rounded-2xl p-6 transition-all hover:shadow-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <Calendar size={13} />
                  {week.date}
                </div>
                {week.badge && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${week.badgeColor}`}>
                    {week.badge}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-4 group-hover:text-primary-500 transition-colors">
                {week.label}
              </h3>
              <ul className="space-y-2">
                {week.topics.map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-teal group-hover:gap-2 transition-all">
                Read with exam angles <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="bg-gradient-to-r from-primary-500 to-teal rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-lg">Never miss an important current affair</p>
            <p className="text-white/70 text-sm mt-0.5">GetVidyaAI highlights exactly which news will be asked in your target exam — so you study smart, not more.</p>
          </div>
          <Link
            href="/current-affairs"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-primary-500 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-accent transition-colors"
          >
            Explore Current Affairs <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}

import Link from "next/link";
import { generateSEO, howToSchema, breadcrumbSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Calendar, Brain, Target, BookOpen, Zap, Flame, Clock } from "lucide-react";
import { EDITIONS, getDailyEditions, getWeeklyEditions } from "./_data/editions";

export const revalidate = 3600;

export const metadata = generateSEO({
  title: "Current Affairs for SSC CGL UPSC 2026 — Daily & Weekly Updates by GetVidyaAI",
  description:
    "Daily and weekly current affairs for SSC CGL, UPSC CSE, Banking, and Railway exams. AI-curated national, international, economy, sports, and science news — updated daily. Free on GetVidyaAI.",
  canonical: "https://getvidya.in/current-affairs",
  keywords: [
    "current affairs for SSC CGL 2026",
    "current affairs for UPSC 2026",
    "daily current affairs India",
    "weekly current affairs India",
    "current affairs for government exams May 2026",
    "today current affairs India 2026",
    "GetVidyaAI current affairs",
  ],
});

const CATEGORIES = [
  { icon: Target, label: "National Affairs", desc: "Parliament, government schemes, awards, appointments" },
  { icon: Brain, label: "International Affairs", desc: "Summits, treaties, bilateral relations, UN resolutions" },
  { icon: BookOpen, label: "Economy & Finance", desc: "RBI, GDP, budget, banking, indices" },
  { icon: Zap, label: "Science & Technology", desc: "ISRO, DRDO, AI developments, space missions" },
  { icon: Calendar, label: "Sports", desc: "Olympics, cricket, awards, Indian sports achievements" },
];

const steps = [
  { name: "Read GetVidyaAI's daily CA digest (10 min)", text: "Every day, GetVidyaAI publishes a short 5-point current affairs digest focused on exam-relevant events. Read it first thing each morning — 10 minutes is enough. Each item includes the Exam Angle so you know exactly which exam and section it targets." },
  { name: "Practice GetVidyaAI weekly CA MCQs every Monday", text: "GetVidyaAI publishes weekly current affairs MCQs every Monday. Practice the quiz within 24 hours to test retention while events are fresh in memory. The AI tracks your accuracy by CA category." },
  { name: "Revise month-end with GetVidyaAI summary", text: "At month end, read the GetVidyaAI monthly current affairs summary. Focus on appointments, government schemes, sports, and international summits — high-frequency exam areas." },
  { name: "Identify weak CA categories via GetVidyaAI insights", text: "GetVidyaAI tracks your accuracy per current affairs category. If you score below 60% in Economy CA, the AI study plan increases your weekly CA practice in that category automatically." },
  { name: "Attempt previous year CA-heavy mock sections", text: "SSC CGL and IBPS PO include 4–8 current affairs questions per paper. Attempt GetVidyaAI's GK section mock tests filtered by 'current affairs' tag to track improvement over time." },
];

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export default function CurrentAffairsPage() {
  const daily = getDailyEditions();
  const weekly = getWeeklyEditions();
  const todayEdition = daily[0]; // most recent daily
  const latest = EDITIONS[0];

  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Current Affairs", url: "/current-affairs" },
  ]);

  const howTo = howToSchema({
    name: "How to Prepare Current Affairs for SSC CGL and UPSC — Step by Step",
    description:
      "A practical 5-step system for preparing current affairs for government exams using GetVidyaAI's daily and weekly updates, AI-powered quizzes, and monthly revision summaries.",
    steps,
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many months of current affairs are needed for SSC CGL?",
        acceptedAnswer: { "@type": "Answer", text: "SSC CGL Tier 1 typically asks current affairs from the last 6–12 months before the exam date. Focus on the 6 months preceding the exam notification. GetVidyaAI's daily and monthly CA summaries cover exactly this window." },
      },
      {
        "@type": "Question",
        name: "Is current affairs important for UPSC Prelims?",
        acceptedAnswer: { "@type": "Answer", text: "Yes — UPSC Prelims GS Paper 1 typically carries 15–25 current affairs questions. UPSC current affairs often blend with static GK. GetVidyaAI's UPSC current affairs section tags events with relevant static topics to help connect the dots." },
      },
      {
        "@type": "Question",
        name: "How to study current affairs for banking exams?",
        acceptedAnswer: { "@type": "Answer", text: "Banking exams (SBI PO, IBPS PO) ask 5–10 current affairs questions per paper, focusing heavily on RBI decisions, banking schemes, and appointments. GetVidyaAI's Economy & Finance CA category is curated specifically for banking exam relevance. Practice 10 banking CA questions daily in the app." },
      },
      {
        "@type": "Question",
        name: "Does GetVidyaAI provide current affairs in Hindi?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. GetVidyaAI provides current affairs content and MCQs in both Hindi and English. Hindi-medium students can access daily CA, weekly summaries, and mock test GK sections in Hindi via the GetVidya app (Android/iOS) and getvidya.in." },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-gradient-hero py-20">
          <div className="container-xl max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Updated Daily — {formatDate(latest.publishedDate)}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Current Affairs for<br />
              <span className="text-accent">SSC CGL, UPSC &amp; Banking</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-2xl">
              Daily and weekly current affairs — national, international, economy, science, and sports — aligned to SSC CGL, UPSC CSE, IBPS PO, and Railway exam patterns. With exam angles for every event.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/current-affairs/${latest.slug}`}
                className="btn-primary px-7 py-3.5 rounded-2xl flex items-center gap-2 w-fit"
              >
                {latest.type === "daily" ? "Read Today's CA" : "Read This Week"} <ArrowRight size={16} />
              </Link>
              <Link href="https://app.getvidya.in" className="btn-secondary px-7 py-3.5 rounded-2xl w-fit">
                Practice CA Questions — Free
              </Link>
            </div>
          </div>
        </section>

        {/* Today's Daily Digest */}
        {todayEdition && (
          <section className="py-12 bg-white border-b border-slate-100">
            <div className="container-xl max-w-4xl">
              <div className="flex items-center gap-2 mb-6">
                <Flame size={18} className="text-orange-500" />
                <h2 className="text-xl font-bold text-slate-800">Today&apos;s Current Affairs</h2>
                <span className="ml-auto text-xs text-slate-400 flex items-center gap-1">
                  <Clock size={11} /> {formatDate(todayEdition.publishedDate)}
                </span>
              </div>
              <div className="grid gap-3">
                {todayEdition.sections.flatMap((s) => s.items).slice(0, 5).map(({ headline, examAngle }) => (
                  <div key={headline} className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-teal hover:shadow-sm transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm leading-snug">{headline}</p>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        <span className="text-teal font-medium">Exam →</span> {examAngle.split(":")[0]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <Link
                  href={`/current-affairs/${todayEdition.slug}`}
                  className="inline-flex items-center gap-2 text-teal font-semibold text-sm hover:underline"
                >
                  Read full details with exam angles <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Daily archive */}
        {daily.length > 0 && (
          <section className="py-14 bg-slate-50">
            <div className="container-xl max-w-4xl">
              <h2 className="text-xl font-bold text-primary-500 mb-6">Recent Daily Editions</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {daily.map((e, i) => (
                  <Link
                    key={e.slug}
                    href={`/current-affairs/${e.slug}`}
                    className="block p-4 rounded-xl border border-slate-200 bg-white hover:border-teal hover:shadow-card transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-slate-800 text-sm">{e.dateRange}</span>
                          {i === 0 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-accent text-primary-500">
                              Today
                            </span>
                          )}
                        </div>
                        <div className="text-slate-400 text-xs flex items-center gap-1">
                          <Flame size={10} className="text-orange-400" />
                          {e.sections.reduce((n, s) => n + s.items.length, 0)} key events
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-slate-300 group-hover:text-teal transition-colors shrink-0 mt-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Weekly archive */}
        <section className="py-14 bg-white">
          <div className="container-xl max-w-4xl">
            <h2 className="text-xl font-bold text-primary-500 mb-6">Weekly Editions</h2>
            <div className="space-y-3">
              {weekly.map((e, i) => (
                <Link
                  key={e.slug}
                  href={`/current-affairs/${e.slug}`}
                  className="block p-5 rounded-2xl border border-slate-200 hover:border-teal hover:shadow-card transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-slate-800">{e.label}</span>
                        {i === 0 && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-accent text-primary-500">
                            Latest
                          </span>
                        )}
                      </div>
                      <div className="text-slate-400 text-sm flex items-center gap-1.5">
                        <Calendar size={12} /> {e.dateRange}
                        <span className="text-slate-300 mx-1">·</span>
                        {e.sections.reduce((n, s) => n + s.items.length, 0)} events
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-slate-300 group-hover:text-teal transition-colors shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-slate-50">
          <div className="container-xl max-w-4xl">
            <h2 className="text-2xl font-bold text-primary-500 mb-3">Topics Covered</h2>
            <p className="text-slate-500 mb-8">Every edition covers these 5 exam-relevant categories</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-primary-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{label}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to prepare */}
        <section className="py-16 bg-white">
          <div className="container-xl max-w-3xl">
            <h2 className="text-2xl font-bold text-primary-500 mb-2">How to Prepare Current Affairs for Govt Exams</h2>
            <p className="text-slate-500 mb-8">A 5-step system using GetVidyaAI daily updates, weekly MCQs, and AI insights</p>
            <ol className="space-y-4">
              {steps.map(({ name, text }, i) => (
                <li key={name} className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="w-8 h-8 rounded-full bg-primary-500 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 mb-1">{name}</div>
                    <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-slate-50">
          <div className="container-xl max-w-3xl">
            <h2 className="text-2xl font-bold text-primary-500 mb-8">Current Affairs FAQs</h2>
            <div className="space-y-3">
              {[
                { q: "How many months of current affairs are needed for SSC CGL?", a: "Focus on the 6 months preceding the exam date. GetVidyaAI's daily and monthly summaries cover exactly this window." },
                { q: "Is current affairs important for UPSC Prelims?", a: "Yes — UPSC Prelims carries 15–25 current affairs questions. GetVidyaAI tags events with relevant static topics to help connect the dots." },
                { q: "Does GetVidyaAI provide current affairs in Hindi?", a: "Yes. All daily and weekly CA summaries and MCQs are available in both Hindi and English on the GetVidya app and getvidya.in." },
                { q: "How to study current affairs for banking exams?", a: "Banking exams ask 5–10 CA questions focused on RBI decisions, banking schemes, and appointments. Use GetVidyaAI's Economy & Finance CA category — 10 questions daily in the app." },
              ].map(({ q, a }) => (
                <details key={q} className="bg-white border border-slate-200 rounded-xl p-5 cursor-pointer group">
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

        {/* CTA */}
        <section className="py-16 bg-gradient-hero">
          <div className="container-xl max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Test Your Current Affairs — Free</h2>
            <p className="text-white/70 mb-8">
              GetVidyaAI identifies which CA categories you&apos;re weak in and adjusts your weekly practice automatically.
            </p>
            <Link href="/free-assessment" className="btn-primary px-8 py-4 rounded-2xl inline-flex items-center gap-2">
              Take Free Diagnostic <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

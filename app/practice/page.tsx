import type { Metadata } from "next";
import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen, ArrowRight, Trophy, Sparkles } from "lucide-react";

const APP_URL = "https://app.getvidya.in";

/* Exam → topic map. Every (slug, topic) pair resolves to a live
   /practice/[exam]/[topic] page backed by the Supabase question bank,
   and mirrors the EXAM_SLUGS / TOPIC_SLUGS used in app/sitemap.ts. */
const EXAMS: { slug: string; label: string; blurb: string; topics: string[] }[] = [
  { slug: "ssc-cgl",          label: "SSC CGL",           blurb: "Tier-1 & Tier-2 practice sets",  topics: ["math", "reasoning", "english", "gk"] },
  { slug: "upsc",             label: "UPSC CSE",          blurb: "Prelims GS & CSAT drilling",     topics: ["gk", "reasoning", "math", "english"] },
  { slug: "banking",          label: "Banking (SBI PO)",  blurb: "Prelims & mains practice",        topics: ["english", "math", "reasoning", "gk"] },
  { slug: "railway",          label: "Railway NTPC",      blurb: "CBT-1 & CBT-2 practice",          topics: ["gk", "math", "reasoning"] },
  { slug: "ib-acio",          label: "IB ACIO",           blurb: "Grade-II executive prep",         topics: ["reasoning", "english", "gk", "math"] },
  { slug: "rjs",              label: "RJS",               blurb: "Rajasthan Judicial Services",     topics: ["law", "reasoning", "english"] },
  { slug: "defence",          label: "NDA / CDS",         blurb: "Defence services entry",          topics: ["math", "gk", "english"] },
  { slug: "state-psc",        label: "State PSC",         blurb: "Mixed state-level practice",       topics: ["gk", "reasoning", "english"] },
  { slug: "rpsc-ras",         label: "RPSC RAS",          blurb: "Rajasthan Administrative Service", topics: ["gk", "reasoning", "english"] },
  { slug: "rajasthan-police", label: "Rajasthan Police",  blurb: "Constable & SI practice",          topics: ["reasoning", "gk", "math"] },
];

const TOPIC_LABEL: Record<string, string> = {
  math: "Maths", reasoning: "Reasoning", english: "English", gk: "GK", law: "Law",
};

export const metadata: Metadata = generateSEO({
  title: "Practice Questions — Free MCQs for Every Govt Exam",
  description:
    "Free topic-wise practice questions with explanations for SSC CGL, UPSC, Banking, Railway NTPC, IB ACIO, RJS, RPSC RAS and more. Thousands of MCQs on GetVidyaAI.",
  keywords: [
    "government exam practice questions",
    "free MCQ practice",
    "SSC CGL practice test",
    "UPSC prelims practice questions",
    "online exam practice GetVidyaAI",
  ],
  canonical: "https://getvidya.in/practice",
});

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "GetVidyaAI Practice Question Banks",
  itemListElement: EXAMS.map((e, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${e.label} Practice Questions`,
    url: `https://getvidya.in/practice/${e.slug}/${e.topics[0]}`,
  })),
};

export default function PracticeHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <Navbar />

      <main className="pt-20 min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-hero py-16 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />
          <div className="container-xl relative z-10">
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm mb-5">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Practice</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <BookOpen size={14} />
              Free Practice Questions
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Practice by Exam &amp; Topic</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Thousands of MCQs with explanations across every major government exam. Pick an exam, choose a topic, and start practising free.
            </p>
          </div>
        </section>

        {/* Exam grid */}
        <section className="py-14">
          <div className="container-xl max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2">
              {EXAMS.map((exam) => (
                <div key={exam.slug} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h2 className="text-primary-500 font-bold text-lg">{exam.label}</h2>
                    <Link
                      href={`/exams/${exam.slug}`}
                      className="text-teal text-xs font-semibold hover:underline whitespace-nowrap mt-1"
                    >
                      Exam guide
                    </Link>
                  </div>
                  <p className="text-slate-500 text-sm mb-5">{exam.blurb}</p>

                  <div className="flex flex-wrap gap-2">
                    {exam.topics.map((topic) => (
                      <Link
                        key={topic}
                        href={`/practice/${exam.slug}/${topic}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-sm font-medium hover:border-teal/40 hover:bg-teal/5 hover:text-teal transition-colors"
                      >
                        {TOPIC_LABEL[topic] ?? topic}
                        <ArrowRight size={13} />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-14 text-center bg-gradient-hero rounded-3xl p-10 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 text-teal font-semibold text-sm mb-3">
                  <Sparkles size={16} />
                  Adaptive practice
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Unlock the full question bank</h3>
                <p className="text-white/65 text-sm mb-7 max-w-md mx-auto">
                  GetVidyaAI adapts to your performance and pinpoints your weak areas automatically. Start free — no credit card needed.
                </p>
                <a
                  href={`${APP_URL}/signup`}
                  className="inline-flex items-center gap-2 bg-teal hover:bg-teal/90 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base"
                >
                  <Trophy size={16} /> Start Practising Free
                </a>
                <p className="text-white/40 text-xs mt-4">Free forever · No credit card required</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

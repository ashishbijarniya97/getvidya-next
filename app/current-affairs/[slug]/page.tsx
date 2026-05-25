import { notFound } from "next/navigation";
import Link from "next/link";
import { generateSEO, breadcrumbSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Calendar, ChevronRight, Clock } from "lucide-react";
import { createPublicClient } from "@/lib/supabase/server";
import { EDITIONS as STATIC_EDITIONS } from "../_data/editions";

export const revalidate = 3600;

interface CAItem { headline: string; detail: string; examAngle: string; }
interface CASection { category: string; colorClass: string; badgeClass: string; items: CAItem[]; }
interface FAQ { q: string; a: string; }
interface Edition {
  slug: string; type: string; label: string; date_range: string; published_date: string;
  meta_title: string; meta_description: string; keywords: string[]; exam_tags: string;
  sections: CASection[]; faqs: FAQ[]; about_things: string[];
}

async function fetchEdition(slug: string): Promise<Edition | null> {
  try {
    const db = createPublicClient();
    const { data } = await db
      .from("current_affairs_editions")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (data) return data as Edition;
  } catch {}
  // Fallback to static data
  const s = STATIC_EDITIONS.find((e) => e.slug === slug);
  if (!s) return null;
  return {
    slug: s.slug, type: s.type, label: s.label,
    date_range: s.dateRange, published_date: s.publishedDate,
    meta_title: s.metaTitle, meta_description: s.metaDescription,
    keywords: s.keywords, exam_tags: s.examTags,
    sections: s.sections, faqs: s.faqs, about_things: s.aboutThings,
  };
}

export async function generateStaticParams() {
  const staticSlugs = STATIC_EDITIONS.map((e) => ({ slug: e.slug }));
  try {
    const db = createPublicClient();
    const { data } = await db
      .from("current_affairs_editions")
      .select("slug")
      .eq("status", "published");
    if (data && data.length > 0) {
      const dbSlugs = data.map((r: { slug: string }) => ({ slug: r.slug }));
      const combined = [...dbSlugs];
      for (const s of staticSlugs) {
        if (!combined.find((x) => x.slug === s.slug)) combined.push(s);
      }
      return combined;
    }
  } catch {}
  return staticSlugs;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const edition = await fetchEdition(params.slug);
  if (!edition) return {};
  return generateSEO({
    title: edition.meta_title,
    description: edition.meta_description,
    canonical: `https://getvidya.in/current-affairs/${edition.slug}`,
    keywords: edition.keywords ?? [],
  });
}

function formatPublishedDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export default async function CAEditionPage({ params }: { params: { slug: string } }) {
  const edition = await fetchEdition(params.slug);
  if (!edition) notFound();

  const isDaily = edition.type === "daily";
  const totalItems = edition.sections.reduce((n, s) => n + s.items.length, 0);

  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Current Affairs", url: "/current-affairs" },
    { name: edition.label, url: `/current-affairs/${edition.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": isDaily ? "NewsArticle" : "Article",
    headline: edition.meta_title,
    description: edition.meta_description,
    datePublished: edition.published_date,
    dateModified: edition.published_date,
    author: { "@type": "Organization", name: "GetVidyaAI" },
    publisher: {
      "@type": "Organization", name: "GetVidyaAI",
      logo: { "@type": "ImageObject", url: "https://getvidya.in/images/logo-gv-full.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://getvidya.in/current-affairs/${edition.slug}` },
    about: (edition.about_things ?? []).map((name) => ({ "@type": "Thing", name })),
  };

  const faqSchema = edition.faqs?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: edition.faqs.map(({ q, a }) => ({
      "@type": "Question", name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
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
              <span className="text-white/80">{edition.label}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent text-xs font-semibold px-3 py-1.5 rounded-full">
                {isDaily ? (
                  <><span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Daily CA</>
                ) : "Weekly Edition"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Current Affairs<br />
              <span className="text-accent">{edition.date_range}</span>
            </h1>
            <p className="text-white/70 mb-6 text-sm md:text-base">
              {edition.exam_tags} — curated by GetVidyaAI
            </p>
            <div className="flex flex-wrap items-center gap-5 text-white/50 text-sm">
              <span className="flex items-center gap-1.5"><Calendar size={13} /> Published: {formatPublishedDate(edition.published_date)}</span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {totalItems} event{totalItems !== 1 ? "s" : ""} · {edition.sections.length} categor{edition.sections.length !== 1 ? "ies" : "y"}
              </span>
            </div>
          </div>
        </section>

        {/* Category bar */}
        <section className="bg-white border-b border-slate-200 py-4">
          <div className="container-xl max-w-4xl">
            <div className="flex flex-wrap gap-2 text-xs">
              {edition.sections.map((s) => (
                <span key={s.category} className={`px-3 py-1.5 rounded-full font-medium ${s.badgeClass}`}>
                  {s.category} ({s.items.length})
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12 bg-slate-50">
          <div className="container-xl max-w-4xl space-y-10">
            {edition.sections.map(({ category, colorClass, badgeClass, items }) => (
              <section key={category}>
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${badgeClass}`}>{category}</span>
                </div>
                <div className="space-y-4">
                  {items.map(({ headline, detail, examAngle }) => (
                    <div key={headline} className={`bg-white rounded-xl border-l-4 ${colorClass} p-5 shadow-sm`}>
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
        {edition.faqs?.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container-xl max-w-3xl">
              <h2 className="text-2xl font-bold text-primary-500 mb-8">Frequently Asked — {edition.date_range}</h2>
              <div className="space-y-3">
                {edition.faqs.map(({ q, a }) => (
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
        )}

        {/* CTA */}
        <section className="py-16 bg-gradient-hero">
          <div className="container-xl max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Test This {isDaily ? "Day&apos;s" : "Week&apos;s"} Current Affairs
            </h2>
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

import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO, breadcrumbSchema } from "@/lib/seo";
import { AnimateIn } from "@/components/ui/AnimateIn";
import MagneticButton from "@/components/ui/MagneticButton";
import { Clock, ArrowRight, User, Calendar, Tag } from "lucide-react";

const WA = "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";

const POSTS: Record<string, {
  title: string; slug: string; excerpt: string; cover: string;
  author: string; readTime: string; date: string; tag: string; tagColor: string;
  content: { heading?: string; body: string }[];
  relatedExam?: string; relatedExamSlug?: string;
}> = {
  "ssc-cgl-notification-2025": {
    title: "SSC CGL 2025 Notification Released — Complete Guide",
    slug: "ssc-cgl-notification-2025",
    excerpt: "Everything you need to know about SSC CGL 2025: important dates, eligibility, vacancy, syllabus and how to apply.",
    cover: "/images/home-banner.webp",
    author: "GetVidya Team",
    readTime: "8 min read",
    date: "Feb 18, 2025",
    tag: "Notification",
    tagColor: "bg-red-100 text-red-700",
    relatedExam: "SSC CGL",
    relatedExamSlug: "ssc-cgl",
    content: [
      {
        heading: "Overview",
        body: "The Staff Selection Commission has officially released the SSC CGL 2025 notification. This is one of the most awaited notifications for graduates aspiring to join the central government. The SSC CGL exam is conducted in two tiers — Tier 1 (CBT) and Tier 2 (CBT) — and opens doors to over 17 departments.",
      },
      {
        heading: "Important Dates",
        body: "Application Start: March 10, 2025 | Application End: April 5, 2025 | Tier 1 Exam: June 2025 | Admit Card: 2 weeks before exam | Results: August 2025. Candidates must complete the application within the deadline — no extensions are expected.",
      },
      {
        heading: "Eligibility Criteria",
        body: "Educational Qualification: Any graduate from a recognized university. Age Limit: 18–32 years (with relaxation for OBC: 3 years, SC/ST: 5 years, PwD: 10 years). Candidates appearing in their final year of graduation may also apply provisionally.",
      },
      {
        heading: "Vacancy Details",
        body: "SSC CGL 2025 is expected to announce over 17,000+ vacancies across posts including Assistant Audit Officer, Income Tax Inspector, CBI Sub-Inspector, Statistical Investigator, and more. Final vacancy numbers will be updated after department requisitions.",
      },
      {
        heading: "How to Prepare",
        body: "Start your preparation with a structured plan: focus on Quantitative Aptitude, General Intelligence & Reasoning, English Comprehension, and General Awareness. Use GetVidya's SSC CGL mock tests to practice under real exam conditions and track your performance with detailed analytics.",
      },
    ],
  },
  "ssc-cgl-syllabus": {
    title: "SSC CGL Syllabus 2025 — Tier 1 & Tier 2 Complete Breakdown",
    slug: "ssc-cgl-syllabus",
    excerpt: "Detailed breakdown of the SSC CGL Tier 1 and Tier 2 syllabus for 2025 with weightage and best preparation strategy.",
    cover: "/images/Online-mock-test.webp",
    author: "GetVidya Team",
    readTime: "12 min read",
    date: "Jan 30, 2025",
    tag: "Syllabus",
    tagColor: "bg-blue-100 text-blue-700",
    relatedExam: "SSC CGL",
    relatedExamSlug: "ssc-cgl",
    content: [
      {
        heading: "Tier 1 — Computer Based Test (CBT)",
        body: "Tier 1 consists of 100 questions worth 200 marks with a 1-hour time limit. The four sections are: General Intelligence & Reasoning (25Q), General Awareness (25Q), Quantitative Aptitude (25Q), and English Comprehension (25Q). There is a negative marking of 0.5 marks per wrong answer.",
      },
      {
        heading: "Tier 2 — Paper I (Compulsory for all posts)",
        body: "Paper I has three modules: Module I — Mathematical Abilities (30Q, 90 marks), Module II — Reasoning & General Intelligence (30Q, 90 marks), and Module III — English Language & Comprehension (45Q + 20Q, 195 marks). Total duration: 2 hours 30 minutes.",
      },
      {
        heading: "Tier 2 — Paper II (Statistics)",
        body: "Paper II is for candidates applying for the post of JSO (Junior Statistical Officer). It covers Collection, Classification and Presentation of Statistical Data, Measures of Central Tendency, Dispersion, Moments, Skewness, Kurtosis, Correlation & Regression, Probability Theory, and more.",
      },
      {
        heading: "Preparation Strategy",
        body: "Begin with General Awareness and English since they require consistent daily revision. Quantitative Aptitude needs 2–3 hours daily practice focused on speed and accuracy. Reasoning can be mastered with 1 hour of daily problem-solving. Use GetVidya chapter-wise tests to build topic mastery before attempting full mocks.",
      },
    ],
  },
  "ssc-cgl-3-month-plan": {
    title: "How to Crack SSC CGL in 3 Months — Step-by-Step Plan",
    slug: "ssc-cgl-3-month-plan",
    excerpt: "A proven 90-day study schedule built around daily mock tests, topic revision and performance analysis.",
    cover: "/images/Daily-study-target.webp",
    author: "GetVidya Team",
    readTime: "10 min read",
    date: "Jan 15, 2025",
    tag: "Strategy",
    tagColor: "bg-green-100 text-green-700",
    relatedExam: "SSC CGL",
    relatedExamSlug: "ssc-cgl",
    content: [
      {
        heading: "Month 1 — Foundation Building",
        body: "Week 1–2: Complete the Quantitative Aptitude basics — Number System, LCM & HCF, Percentage, Ratio & Proportion. Week 3: Start Reasoning — Analogy, Classification, Coding-Decoding. Week 4: English Grammar fundamentals. Attempt one chapter-wise test daily on GetVidya to reinforce what you study.",
      },
      {
        heading: "Month 2 — Speed & Accuracy",
        body: "Begin taking full-length Tier 1 mocks twice a week. After each mock, spend 2 hours analysing mistakes. Focus on General Awareness current affairs — read one newspaper and solve 20 GK questions daily. Target: 70%+ accuracy in each section by end of Month 2.",
      },
      {
        heading: "Month 3 — Mock Test Intensive",
        body: "Attempt a full mock every alternate day. Revise weak topics identified from your GetVidya performance report. In the last 2 weeks, shift to full revision mode — no new topics. Focus on maximising speed: aim to complete Tier 1 in 45 minutes, leaving 15 minutes for review.",
      },
      {
        heading: "Daily Schedule Template",
        body: "5:30 AM — 7:30 AM: Quantitative Aptitude (2 hours). 8:00 AM — 9:00 AM: General Awareness (1 hour). 10:00 AM — 12:00 PM: Reasoning & English (2 hours). 8:00 PM — 9:30 PM: Mock test or topic test on GetVidya. 9:30 PM — 10:00 PM: Error analysis and next-day planning.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug];
  if (!post) return {};
  return generateSEO({
    title: post.title,
    description: post.excerpt,
    keywords: [post.tag, "SSC CGL 2025", "government exam preparation", "GetVidya blog"],
    canonical: `https://getvidya.in/blog/${params.slug}`,
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: post.title, url: `/blog/${params.slug}` },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        author: { "@type": "Organization", name: post.author },
        datePublished: post.date,
        image: `https://getvidya.in${post.cover}`,
        publisher: { "@type": "Organization", name: "GetVidya", logo: { "@type": "ImageObject", url: "https://getvidya.in/images/logo.png" } },
      }) }} />

      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-hero py-20">
          <div className="container-xl">
            <AnimateIn>
              <div className="flex items-center gap-3 text-white/60 text-sm mb-6">
                <a href="/">Home</a> / <a href="/blog">Blog</a> / <span className="text-white line-clamp-1">{post.title}</span>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block ${post.tagColor}`}>
                <Tag size={11} className="inline mr-1" />{post.tag}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 text-white/60 text-sm">
                <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="container-xl">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Article */}
              <article className="lg:col-span-2">
                {/* Cover image */}
                <AnimateIn>
                  <div
                    className="w-full h-72 rounded-2xl bg-cover bg-center mb-10 shadow-card"
                    style={{ backgroundImage: `url(${post.cover})` }}
                  />
                </AnimateIn>

                {/* Excerpt */}
                <AnimateIn>
                  <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-teal pl-5 mb-10 font-medium">
                    {post.excerpt}
                  </p>
                </AnimateIn>

                {/* Content sections */}
                <div className="space-y-8">
                  {post.content.map((section, i) => (
                    <AnimateIn key={i} delay={i * 0.05}>
                      {section.heading && (
                        <h2 className="text-xl font-bold text-primary-500 mb-3">{section.heading}</h2>
                      )}
                      <p className="text-slate-600 leading-relaxed">{section.body}</p>
                    </AnimateIn>
                  ))}
                </div>
              </article>

              {/* Sidebar */}
              <div>
                <AnimateIn variant="fadeRight" className="sticky top-24 space-y-5">
                  {/* CTA card */}
                  <div className="card p-6">
                    <h3 className="font-bold text-primary-500 mb-3">Practice for {post.relatedExam ?? "this exam"}</h3>
                    <p className="text-slate-500 text-sm mb-5">
                      GetVidya has 1,200+ mock tests and 140K+ questions across all government exams.
                    </p>
                    <div className="bg-mint rounded-xl p-4 mb-5 text-center">
                      <div className="text-2xl font-bold text-primary-500">₹149<span className="text-sm font-normal text-slate-500">/month</span></div>
                      <div className="text-slate-500 text-xs mt-1">Unlimited mock tests</div>
                    </div>
                    <MagneticButton href={WA} target="_blank" rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center gap-2 text-sm mb-3">
                      Start Free Now <ArrowRight size={14} />
                    </MagneticButton>
                    {post.relatedExamSlug && (
                      <a href={`/exams/${post.relatedExamSlug}`}
                        className="btn-outline w-full flex items-center justify-center gap-2 text-sm">
                        View {post.relatedExam} Tests <ArrowRight size={14} />
                      </a>
                    )}
                    <p className="text-center text-xs text-slate-400 mt-3">Free tests · No card needed</p>
                  </div>

                  {/* Related posts */}
                  <div className="card p-5">
                    <h3 className="font-bold text-primary-500 mb-4 text-sm">More Articles</h3>
                    <div className="space-y-3">
                      {Object.values(POSTS)
                        .filter((p) => p.slug !== params.slug)
                        .slice(0, 3)
                        .map((p) => (
                          <a key={p.slug} href={`/blog/${p.slug}`}
                            className="group flex items-start gap-3 text-sm hover:text-teal transition-colors">
                            <span className="text-slate-400 group-hover:text-teal mt-0.5 flex-shrink-0">→</span>
                            <span className="text-slate-600 group-hover:text-teal line-clamp-2 leading-snug">{p.title}</span>
                          </a>
                        ))}
                    </div>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

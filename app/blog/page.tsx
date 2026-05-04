import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO } from "@/lib/seo";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = generateSEO({
  title: "Blog — Exam Prep Tips & Notifications",
  description: "Latest SSC CGL, UPSC, Banking & Railway exam notifications, syllabus updates, preparation tips and strategies from the GetVidya team.",
  canonical: "https://getvidya.in/blog",
});

const featuredPosts = [
  {
    title: "SSC CGL 2025 Notification Released — Complete Guide",
    slug: "ssc-cgl-notification-2025",
    excerpt: "Everything you need to know about SSC CGL 2025: important dates, eligibility, vacancy, syllabus and how to apply.",
    cover: "/images/home-banner.webp",
    author: "GetVidya Team",
    readTime: "8 min read",
    date: "Feb 18, 2025",
    tag: "Notification",
    tagColor: "bg-red-100 text-red-700",
  },
  {
    title: "SSC CGL Syllabus 2025 — Tier 1 & Tier 2 Complete",
    slug: "ssc-cgl-syllabus",
    excerpt: "Detailed breakdown of the SSC CGL Tier 1 and Tier 2 syllabus for 2025 with weightage and best preparation strategy.",
    cover: "/images/Online-mock-test.webp",
    author: "GetVidya Team",
    readTime: "12 min read",
    date: "Jan 30, 2025",
    tag: "Syllabus",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    title: "How to Crack SSC CGL in 3 Months — Step-by-Step Plan",
    slug: "ssc-cgl-3-month-plan",
    excerpt: "A proven 90-day study schedule built around daily mock tests, topic revision and performance analysis.",
    cover: "/images/Daily-study-target.webp",
    author: "GetVidya Team",
    readTime: "10 min read",
    date: "Jan 15, 2025",
    tag: "Strategy",
    tagColor: "bg-green-100 text-green-700",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-hero py-20">
          <div className="container-xl">
            <span className="section-tag mb-4 !bg-white/10 !text-white/90">Blog</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Exam Prep Resources
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              Notifications, syllabi, strategies and tips from India&apos;s smartest
              exam prep team.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="py-20 bg-slate-50">
          <div className="container-xl">
            {/* Featured */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <Link href={`/blog/${featuredPosts[0].slug}`} className="card overflow-hidden group col-span-1 lg:col-span-1 row-span-2">
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${featuredPosts[0].cover})` }} />
                  <div className="absolute inset-0 bg-gradient-card" />
                  <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${featuredPosts[0].tagColor}`}>
                    {featuredPosts[0].tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <Clock size={13} /> {featuredPosts[0].readTime} · {featuredPosts[0].date}
                  </div>
                  <h2 className="text-xl font-bold text-primary-500 mb-2 group-hover:text-teal transition-colors leading-snug">
                    {featuredPosts[0].title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed">{featuredPosts[0].excerpt}</p>
                  <div className="flex items-center gap-1 text-teal text-sm font-medium mt-4">
                    Read more <ArrowRight size={14} />
                  </div>
                </div>
              </Link>

              <div className="space-y-6">
                {featuredPosts.slice(1).map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="card overflow-hidden group flex gap-5 p-5">
                    <div className="w-28 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${post.cover})` }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post.tagColor}`}>{post.tag}</span>
                      <h3 className="font-bold text-primary-500 text-sm mt-2 mb-1 line-clamp-2 group-hover:text-teal transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock size={11} /> {post.readTime}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="text-center py-12 text-slate-400">
              <p className="mb-4">More articles are published on the main GetVidya blog.</p>
              <a
                href="https://www.getvidya.in/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Visit Full Blog <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

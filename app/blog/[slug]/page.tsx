import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO, breadcrumbSchema } from "@/lib/seo";
import { getPublishedPost, getAllPublishedSlugs, formatBlogDate, readingTime } from "@/lib/blog";
import { AnimateIn } from "@/components/ui/AnimateIn";
import MagneticButton from "@/components/ui/MagneticButton";
import { Clock, ArrowRight, User, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

const WA = "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";

export async function generateStaticParams() {
  try {
    const slugs = await getAllPublishedSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPublishedPost(params.slug);
  if (!post) return {};
  return generateSEO({
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt ?? "",
    keywords: post.tags,
    ogImage: post.og_image_url ?? post.featured_image_url ?? undefined,
    canonical: `https://getvidya.in/blog/${params.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPublishedPost(params.slug);
  if (!post) notFound();

  const firstTag = post.tags[0] ?? null;
  const mins = readingTime(post.content_html);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt ?? "",
    author: { "@type": "Person", name: post.author_name ?? "GetVidya Team" },
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    image: post.og_image_url ?? post.featured_image_url ?? "https://getvidya.in/images/og-image.png",
    keywords: post.tags.join(", "),
    publisher: {
      "@type": "Organization",
      name: "GetVidya",
      logo: { "@type": "ImageObject", url: "https://getvidya.in/images/logo-gv-full.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://getvidya.in/blog/${params.slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${params.slug}` },
        ])) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-hero py-20">
          <div className="container-xl">
            <AnimateIn>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-6 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-white/80 line-clamp-1">{post.title}</span>
              </div>

              {firstTag && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 mb-4">
                  <Tag size={11} /> {firstTag}
                </span>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-white/60 text-sm">
                <span className="flex items-center gap-1.5"><User size={14} />{post.author_name ?? "GetVidya Team"}</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} />{formatBlogDate(post.published_at)}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} />{mins} min read</span>
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
                {post.featured_image_url && (
                  <AnimateIn>
                    <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-10 shadow-card">
                      <Image
                        src={post.featured_image_url}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    </div>
                  </AnimateIn>
                )}

                {post.excerpt && (
                  <AnimateIn>
                    <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-teal pl-5 mb-10 font-medium">
                      {post.excerpt}
                    </p>
                  </AnimateIn>
                )}

                <AnimateIn>
                  <div
                    className="prose prose-lg max-w-none
                      prose-headings:text-primary-500 prose-headings:font-bold
                      prose-p:text-slate-600 prose-p:leading-relaxed
                      prose-a:text-teal prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-primary-500
                      prose-blockquote:border-teal prose-blockquote:text-slate-500
                      prose-code:text-teal prose-code:bg-mint prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                      prose-pre:bg-primary-500 prose-pre:text-white
                      prose-img:rounded-2xl prose-img:shadow-card
                      prose-li:text-slate-600
                      prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3"
                    dangerouslySetInnerHTML={{ __html: post.content_html ?? "" }}
                  />
                </AnimateIn>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-100">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-mint text-primary-500 text-xs font-medium rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>

              {/* Sidebar */}
              <aside>
                <AnimateIn variant="fadeRight" className="sticky top-24 space-y-5">
                  {/* CTA card */}
                  <div className="card p-6">
                    <h3 className="font-bold text-primary-500 mb-3">Practice with GetVidyaAI</h3>
                    <p className="text-slate-500 text-sm mb-5">
                      1,200+ mock tests, adaptive AI practice, and personalized study plans for all government exams.
                    </p>
                    <div className="bg-mint rounded-xl p-4 mb-5 text-center">
                      <div className="text-2xl font-bold text-primary-500">
                        ₹149<span className="text-sm font-normal text-slate-500">/month</span>
                      </div>
                      <div className="text-slate-500 text-xs mt-1">Unlimited mock tests</div>
                    </div>
                    <MagneticButton
                      href={WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center gap-2 text-sm mb-3"
                    >
                      Start Free Now <ArrowRight size={14} />
                    </MagneticButton>
                    <p className="text-center text-xs text-slate-400">Free tests · No card needed</p>
                  </div>

                  {/* Back to blog */}
                  <Link
                    href="/blog"
                    className="card p-5 flex items-center gap-3 group hover:shadow-card-hover transition-shadow"
                  >
                    <div className="w-9 h-9 rounded-xl bg-mint flex items-center justify-center flex-shrink-0">
                      <ArrowRight size={16} className="text-primary-500 rotate-180" />
                    </div>
                    <span className="text-sm font-medium text-primary-500 group-hover:text-teal transition-colors">
                      Back to all articles
                    </span>
                  </Link>
                </AnimateIn>
              </aside>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

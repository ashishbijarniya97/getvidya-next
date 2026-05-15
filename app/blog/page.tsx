import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO } from "@/lib/seo";
import { getPublishedPosts, formatBlogDate, readingTime } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600;

export const metadata = generateSEO({
  title: "Blog — Exam Prep Tips & Notifications",
  description: "Latest SSC CGL, UPSC, Banking & Railway exam notifications, syllabus updates, preparation tips and strategies from the GetVidya team.",
  canonical: "https://getvidya.in/blog",
});

function tagColor(tag: string) {
  const map: Record<string, string> = {
    notification: "bg-red-100 text-red-700",
    syllabus: "bg-blue-100 text-blue-700",
    strategy: "bg-green-100 text-green-700",
    upsc: "bg-purple-100 text-purple-700",
    banking: "bg-indigo-100 text-indigo-700",
    railway: "bg-orange-100 text-orange-700",
    "ssc-cgl": "bg-teal-100 text-teal-700",
    tips: "bg-yellow-100 text-yellow-700",
  };
  return map[tag.toLowerCase()] ?? "bg-slate-100 text-slate-600";
}

export default async function BlogPage() {
  const posts: BlogPost[] = await getPublishedPosts(20);

  const featured = posts[0];
  const rest = posts.slice(1);

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
              Notifications, syllabi, strategies and tips from India&apos;s smartest exam prep team.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="py-20 bg-slate-50">
          <div className="container-xl">
            {posts.length === 0 ? (
              <div className="text-center py-24">
                <BookOpen size={48} className="text-slate-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-slate-500 mb-2">Articles coming soon</h2>
                <p className="text-slate-400 text-sm">We&apos;re working on our first posts. Check back shortly.</p>
              </div>
            ) : (
              <>
                {/* Featured post */}
                {featured && (
                  <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <Link href={`/blog/${featured.slug}`} className="card overflow-hidden group lg:col-span-1">
                      <div className="relative h-72 overflow-hidden bg-mint">
                        {featured.featured_image_url ? (
                          <Image
                            src={featured.featured_image_url}
                            alt={featured.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-500 to-teal flex items-center justify-center">
                            <BookOpen size={48} className="text-white/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-card" />
                        {featured.tags[0] && (
                          <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${tagColor(featured.tags[0])}`}>
                            {featured.tags[0]}
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                          <Clock size={13} />
                          {readingTime(featured.content_html)} min read · {formatBlogDate(featured.published_at)}
                        </div>
                        <h2 className="text-xl font-bold text-primary-500 mb-2 group-hover:text-teal transition-colors leading-snug">
                          {featured.title}
                        </h2>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{featured.excerpt}</p>
                        <div className="flex items-center gap-1 text-teal text-sm font-medium mt-4">
                          Read more <ArrowRight size={14} />
                        </div>
                      </div>
                    </Link>

                    {/* Secondary posts beside featured */}
                    {rest.length > 0 && (
                      <div className="space-y-6">
                        {rest.slice(0, 2).map((post) => (
                          <Link key={post.slug} href={`/blog/${post.slug}`} className="card overflow-hidden group flex gap-5 p-5">
                            <div className="w-28 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-mint">
                              {post.featured_image_url ? (
                                <Image
                                  src={post.featured_image_url}
                                  alt={post.title}
                                  width={112}
                                  height={96}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-teal flex items-center justify-center">
                                  <BookOpen size={20} className="text-white/40" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              {post.tags[0] && (
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColor(post.tags[0])}`}>
                                  {post.tags[0]}
                                </span>
                              )}
                              <h3 className="font-bold text-primary-500 text-sm mt-2 mb-1 line-clamp-2 group-hover:text-teal transition-colors">
                                {post.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Clock size={11} /> {readingTime(post.content_html)} min read
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Rest of posts grid */}
                {rest.length > 2 && (
                  <>
                    <h2 className="text-xl font-bold text-primary-500 mb-6">More Articles</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rest.slice(2).map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="card overflow-hidden group">
                          <div className="relative h-44 overflow-hidden bg-mint">
                            {post.featured_image_url ? (
                              <Image
                                src={post.featured_image_url}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-teal flex items-center justify-center">
                                <BookOpen size={32} className="text-white/30" />
                              </div>
                            )}
                            {post.tags[0] && (
                              <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${tagColor(post.tags[0])}`}>
                                {post.tags[0]}
                              </span>
                            )}
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                              <Clock size={11} /> {readingTime(post.content_html)} min · {formatBlogDate(post.published_at)}
                            </div>
                            <h3 className="font-bold text-primary-500 text-base mb-1 line-clamp-2 group-hover:text-teal transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-slate-500 text-sm line-clamp-2">{post.excerpt}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

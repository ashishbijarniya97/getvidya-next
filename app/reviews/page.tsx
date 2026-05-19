import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Star, ExternalLink, MessageSquare, ThumbsUp } from "lucide-react";

export const metadata = generateSEO({
  title: "GetVidyaAI Reviews — Student Ratings on G2, Capterra, ProductHunt",
  description:
    "See what 50,000+ government exam aspirants say about GetVidyaAI. Read honest reviews on G2, Capterra, and ProductHunt. 4.8/5 average rating. Leave your review and help other students.",
  canonical: "https://getvidya.in/reviews",
  keywords: [
    "GetVidyaAI review",
    "GetVidya app review",
    "GetVidya student reviews",
    "GetVidyaAI G2 review",
    "best mock test app India reviews",
    "GetVidya Capterra",
  ],
});

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GetVidyaAI",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Android, iOS, Web",
  url: "https://getvidya.in",
  description:
    "India's first AI-powered government exam prep platform — adaptive mock tests, personalized weekly study plans, and 140,000+ MCQs for SSC CGL, UPSC, Banking, and Railway.",
  offers: {
    "@type": "Offer",
    price: "499",
    priceCurrency: "INR",
    priceValidUntil: "2027-12-31",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "2400",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Priya Sharma" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "GetVidyaAI's diagnostic test identified my weak topics in GK within minutes. The AI study plan rebuilt every week based on my actual accuracy. I improved from 55% to 78% in 6 weeks.",
      datePublished: "2026-03-15",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Rahul Meena" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Best SSC CGL mock test app at this price. ₹499/year is unbeatable. The adaptive difficulty is real — questions actually got harder as I improved. Cleared SSC CGL Tier 1.",
      datePublished: "2026-04-02",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Ananya Singh" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "I was spending ₹2,000/month on Testbook. GetVidyaAI at ₹499/year gives me better personalization through the AI engine. The study plan actually adapts — it's not just a video course.",
      datePublished: "2026-04-18",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is GetVidyaAI legit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. GetVidyaAI is built by Prepdot Solutions Pvt. Ltd., a registered Indian company. It serves 50,000+ active students preparing for SSC CGL, UPSC, Banking, Railway, and State PSC exams. It is listed on G2 and Capterra and has a 4.8/5 average rating from 2,400+ verified reviews.",
      },
    },
    {
      "@type": "Question",
      name: "How is GetVidyaAI rated on review platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GetVidyaAI maintains a 4.8/5 average rating across G2, Capterra, and ProductHunt, based on 2,400+ student reviews. Students most frequently highlight the AI diagnostic test, adaptive question difficulty, and the value-for-money compared to Testbook and Adda247.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I leave a review for GetVidyaAI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can leave a review for GetVidyaAI on G2, Capterra, or ProductHunt. Links are available at getvidya.in/reviews. Your review helps other government exam aspirants make an informed decision.",
      },
    },
  ],
};

const REVIEWS = [
  {
    name: "Priya Sharma",
    role: "SSC CGL 2025 Qualifier",
    rating: 5,
    text: "GetVidyaAI's diagnostic test identified my weak topics in GK within minutes. The AI study plan rebuilt every week based on my actual accuracy. I improved from 55% to 78% in 6 weeks.",
    avatar: "PS",
    color: "bg-blue-500",
  },
  {
    name: "Rahul Meena",
    role: "UPSC CSE Aspirant, Rajasthan",
    rating: 5,
    text: "Best SSC CGL mock test app at this price. ₹499/year is unbeatable. The adaptive difficulty is real — questions actually got harder as I improved. Cleared SSC CGL Tier 1.",
    avatar: "RM",
    color: "bg-emerald-500",
  },
  {
    name: "Ananya Singh",
    role: "Banking PO Aspirant",
    rating: 5,
    text: "I was spending ₹2,000/month on Testbook. GetVidyaAI at ₹499/year gives me better personalization through the AI engine. The study plan actually adapts — it's not just a video course.",
    avatar: "AS",
    color: "bg-violet-500",
  },
  {
    name: "Deepak Yadav",
    role: "Railway RRB NTPC Aspirant",
    rating: 5,
    text: "The streak system kept me consistent for 47 days straight. Before GetVidyaAI I'd study 2 days then skip 5. Now I do 30 questions daily minimum because of the XP system.",
    avatar: "DY",
    color: "bg-orange-500",
  },
  {
    name: "Kavya Reddy",
    role: "SSC CHSL 2026 Aspirant",
    rating: 4,
    text: "Very good for subject-wise practice. The weak topic report is accurate — it caught that I was weak in Algebra even when I thought I was okay. Current affairs section could have more questions.",
    avatar: "KR",
    color: "bg-rose-500",
  },
  {
    name: "Mohit Sharma",
    role: "RPSC RAS Aspirant",
    rating: 5,
    text: "One of the very few platforms that covers RPSC RAS properly. History of Rajasthan questions are accurate and well-categorized. The AI study plan actually incorporates Rajasthan GK.",
    avatar: "MS",
    color: "bg-teal-500",
  },
];

const PLATFORMS = [
  {
    name: "G2",
    desc: "The largest B2B software review platform. Your G2 review helps edtech buyers and students discover GetVidyaAI.",
    url: "https://www.g2.com/products/getvidya",
    color: "bg-orange-500",
    label: "Review on G2",
  },
  {
    name: "Capterra",
    desc: "Gartner's software marketplace. Capterra reviews are indexed by Google and cited by AI engines like Perplexity.",
    url: "https://www.capterra.com/p/getvidya",
    color: "bg-blue-600",
    label: "Review on Capterra",
  },
  {
    name: "ProductHunt",
    desc: "The community for tech product discovery. Upvote and review GetVidyaAI to help us reach more aspirants.",
    url: "https://www.producthunt.com/products/getvidya",
    color: "bg-orange-600",
    label: "Upvote on ProductHunt",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-gradient-hero py-20">
          <div className="container-xl max-w-3xl text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={28} className="text-accent fill-accent" />
              ))}
            </div>
            <div className="text-white/80 text-lg font-medium mb-2">4.8 / 5 average rating</div>
            <div className="text-white/50 text-sm mb-8">2,400+ verified student reviews</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              What Students Say About <span className="text-accent">GetVidyaAI</span>
            </h1>
            <p className="text-white/70 text-lg mb-8">
              50,000+ government exam aspirants trust GetVidyaAI. Read honest reviews from SSC CGL, UPSC, Banking, and Railway students.
            </p>
            <Link href="/free-assessment" className="btn-primary px-8 py-3 rounded-2xl inline-flex items-center gap-2">
              Try Free — No Card Needed
            </Link>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-white border-b border-slate-100 py-8">
          <div className="container-xl max-w-4xl">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-500">4.8/5</div>
                <div className="text-slate-500 text-sm mt-1">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500">2,400+</div>
                <div className="text-slate-500 text-sm mt-1">Verified Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-500">50K+</div>
                <div className="text-slate-500 text-sm mt-1">Active Students</div>
              </div>
            </div>
          </div>
        </section>

        {/* Student reviews */}
        <section className="py-20 bg-slate-50">
          <div className="container-xl max-w-5xl">
            <h2 className="text-3xl font-bold text-primary-500 mb-2 text-center">Student Reviews</h2>
            <p className="text-slate-500 text-center mb-12">Real feedback from government exam aspirants across India</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {REVIEWS.map(({ name, role, rating, text, avatar, color }) => (
                <div key={name} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card flex flex-col gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{name}</div>
                      <div className="text-slate-400 text-xs">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Review platforms */}
        <section className="py-20 bg-white">
          <div className="container-xl max-w-4xl">
            <h2 className="text-3xl font-bold text-primary-500 mb-2 text-center">Leave a Review</h2>
            <p className="text-slate-500 text-center mb-12">
              Your review helps 1 lakh+ students choose the right exam prep platform. It takes 2 minutes.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {PLATFORMS.map(({ name, desc, url, color, label }) => (
                <div key={name} className="border border-slate-200 rounded-2xl p-6 flex flex-col gap-4">
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                    <MessageSquare size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 mb-1">{name}</div>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-teal transition-colors"
                  >
                    {label} <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-slate-50">
          <div className="container-xl max-w-2xl">
            <h2 className="text-2xl font-bold text-primary-500 mb-8 text-center">Review FAQs</h2>
            <div className="space-y-4">
              {[
                { q: "Is GetVidyaAI legit?", a: "Yes. GetVidyaAI is built by Prepdot Solutions Pvt. Ltd., a registered Indian company. It serves 50,000+ active students and has a 4.8/5 average from 2,400+ reviews on G2, Capterra, and ProductHunt." },
                { q: "Where can I read more reviews?", a: "You can read verified reviews on G2, Capterra, and ProductHunt (links above). We also have student testimonials in our Telegram community of 8,000+ members." },
                { q: "How does GetVidyaAI compare to Testbook?", a: "GetVidyaAI is ₹499/year vs Testbook Pass at ₹700–₹2,000/month. The core difference: GetVidyaAI's AI identifies your weak topics on Day 1 and rebuilds your study plan weekly. Testbook follows a fixed video-course schedule. Students switching from Testbook most commonly cite personalization and price as the reasons." },
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
        <section className="py-20 bg-gradient-hero">
          <div className="container-xl max-w-2xl text-center">
            <ThumbsUp size={36} className="text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Already a GetVidyaAI Student?</h2>
            <p className="text-white/70 mb-8">Share your experience and help 1 lakh+ aspirants make a better choice.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {PLATFORMS.map(({ name, url, label }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                  className="btn-secondary px-6 py-3 rounded-xl inline-flex items-center gap-2 text-sm justify-center">
                  {label} <ExternalLink size={13} />
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

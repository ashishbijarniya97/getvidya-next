"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ravi Sharma",
    exam: "SSC CGL 2024 — Selected",
    avatar: "/images/home-banner-p-500.webp",
    rating: 5,
    review:
      "GetVidya's mock tests were spot-on with the actual SSC CGL pattern. The detailed analysis after each test helped me figure out my weak areas in just 2 weeks. Highly recommend!",
  },
  {
    name: "Priya Meena",
    exam: "SBI PO 2024 — Qualified",
    avatar: "/images/home-banner-p-500.webp",
    rating: 5,
    review:
      "The question bank is massive and so well organized. I practiced over 5,000 questions before my exam. The weekly prep reports kept me motivated throughout my preparation.",
  },
  {
    name: "Ankur Singh",
    exam: "UPSC Prelims — Cleared",
    avatar: "/images/home-banner-p-500.webp",
    rating: 5,
    review:
      "At ₹149/month, this is the best investment I made for my UPSC prep. The bare act question bank alone is worth it. Got access to 1,200+ tests at a fraction of the cost.",
  },
  {
    name: "Sunita Yadav",
    exam: "Railway NTPC — Selected",
    avatar: "/images/home-banner-p-500.webp",
    rating: 4,
    review:
      "The app works flawlessly even on slow connections. I used to study during my commute every day. Daily free questions kept me engaged without spending a rupee extra.",
  },
  {
    name: "Mohit Gupta",
    exam: "State PSC — Mains Cleared",
    avatar: "/images/home-banner-p-500.webp",
    rating: 5,
    review:
      "The subject-wise and chapter-wise tests are a game changer. I could laser-focus on my weak subjects without wading through material I already knew. Excellent platform!",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-24 bg-white">
      <div className="container-xl">
        <div className="text-center mb-14">
          <span className="section-tag mb-4">Student Love</span>
          <h2 className="section-heading mb-4">
            Your friends love us{" "}
            <span className="text-rose-500">❤️</span>
          </h2>
          <p className="section-subheading mx-auto">
            Real results from students who cracked government exams with GetVidya.
          </p>
        </div>

        {/* Featured review — large card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-mint rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
            <Quote size={48} className="text-mint mb-6 relative z-10" />

            <div
              ref={containerRef}
              className="relative z-10"
              key={current}
            >
              <div className="flex mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-accent fill-accent" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-8 animate-fade-in">
                &ldquo;{testimonials[current].review}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 overflow-hidden border-2 border-teal">
                  <div className="w-full h-full bg-gradient-to-br from-teal to-primary-300 flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[current].name[0]}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-primary-500">
                    {testimonials[current].name}
                  </div>
                  <div className="text-sm text-teal font-medium">
                    {testimonials[current].exam}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-teal hover:text-teal transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 h-2 bg-primary-500"
                      : "w-2 h-2 bg-slate-300 hover:bg-teal"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-teal hover:text-teal transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mini review grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16">
          {testimonials.slice(0, 3).map((t) => (
            <div key={t.name} className="card p-5 border border-slate-100">
              <div className="flex mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal to-primary-300 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-primary-500 text-sm">{t.name}</div>
                  <div className="text-xs text-teal">{t.exam}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

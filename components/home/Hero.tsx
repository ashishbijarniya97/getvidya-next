"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  PlayCircle,
  Star,
  Users,
  BookOpen,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const WA_LINK =
  "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";

const EXAM_BADGES = [
  "SSC CGL", "UPSC", "Banking", "Railway", "State PSC", "Defence",
];

const TRUST_ITEMS = [
  { icon: Users, value: "50,000+", label: "Active Students" },
  { icon: BookOpen, value: "1,200+", label: "Mock Tests" },
  { icon: TrendingUp, value: "140K+", label: "MCQ Questions" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("opacity-100");
        });
      },
      { threshold: 0.1 }
    );
    const el = heroRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/GetVidya-home-bg.svg')] bg-center bg-cover opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        {/* Grid dot pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container-xl relative z-10 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="animate-fade-up">
            {/* Eyebrow tag */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
              India&apos;s Smartest Govt. Exam Prep Platform
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
              Crack Government Exams with
              <span className="block mt-1">
                <span className="text-accent">Expert MCQs</span> &amp; Mock
                Tests
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
              Over{" "}
              <strong className="text-accent font-semibold">
                140,000 practice questions
              </strong>{" "}
              across UPSC, SSC, Banking &amp; more. Start free — upgrade when
              you&apos;re ready.
            </p>

            {/* Exam pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {EXAM_BADGES.map((exam) => (
                <span
                  key={exam}
                  className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/80 text-sm font-medium hover:bg-white/20 transition-colors cursor-default"
                >
                  {exam}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-4 rounded-2xl group"
              >
                Start Free Mock Test
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <Link
                href="/about"
                className="btn-secondary text-base px-8 py-4 rounded-2xl group"
              >
                <PlayCircle size={18} className="text-accent" />
                See how it works
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 flex-wrap">
              {TRUST_ITEMS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal/20 flex items-center justify-center">
                    <Icon size={16} className="text-teal-light" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm leading-none">
                      {value}
                    </div>
                    <div className="text-white/50 text-xs">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price note */}
            <div className="mt-6 flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle2 size={15} className="text-accent" />
              Mock tests starting at just{" "}
              <strong className="text-accent">₹149/month</strong> — cancel
              anytime
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative flex justify-center lg:justify-end animate-slide-left animation-delay-200">
            {/* Floating rating card */}
            <div className="absolute -top-4 -left-4 lg:-left-8 z-20 glass-card px-4 py-3 flex items-center gap-3 animate-float">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-accent fill-accent"
                  />
                ))}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">4.8 Rating</div>
                <div className="text-white/60 text-xs">2,400+ reviews</div>
              </div>
            </div>

            {/* Floating question card */}
            <div className="absolute -bottom-4 -left-4 lg:-left-8 z-20 glass-card p-4 max-w-[220px] animate-float animation-delay-300">
              <div className="text-white/60 text-xs mb-2 font-medium">
                Today&apos;s Free Question
              </div>
              <div className="text-white text-xs font-medium leading-relaxed">
                &quot;Which article of the Indian Constitution deals with the
                Right to Education?&quot;
              </div>
              <div className="mt-3 flex gap-2">
                {["Art. 21A", "Art. 45"].map((opt) => (
                  <span
                    key={opt}
                    className="text-xs px-2 py-1 rounded-lg bg-white/10 text-white/70"
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>

            {/* Main hero image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/50 to-transparent rounded-3xl z-10" />
              <Image
                src="/images/home-banner.webp"
                alt="Students preparing for government exams with GetVidya"
                width={580}
                height={520}
                className="rounded-3xl object-cover shadow-2xl relative z-0"
                priority
                sizes="(max-width: 768px) 100vw, 580px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1">
          <div className="w-1 h-2 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}

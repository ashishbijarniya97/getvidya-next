"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Star, CheckCircle2, Zap } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const WA = "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";
const BADGES = ["SSC CGL", "UPSC", "Banking", "Railway", "State PSC", "Defence"];
const STATS = [
  { value: "50K+", label: "Students" },
  { value: "1,200+", label: "Tests" },
  { value: "140K+", label: "MCQs" },
  { value: "AI", label: "Powered" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Static background decorations — no motion, no repaints */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/GetVidya-home-bg.svg')] bg-center bg-cover opacity-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="container-xl relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Copy */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              GetVidyaAI — AI-Powered Exam Prep
            </motion.div>

            <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.12] mb-6">
              India&apos;s First{" "}
              <span className="relative inline-block">
                <span className="text-accent">AI-Powered</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-accent/50 rounded-full"
                  initial={{ width: 0 }} animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              {" "}Govt. Exam Prep Platform
            </motion.h1>

            <motion.p variants={item} className="text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
              <strong className="text-accent font-semibold">GetVidyaAI</strong> adapts to your accuracy, builds your weekly study plan with AI, and tracks your progress — so you always know exactly what to study next.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-2 mb-10">
              {BADGES.map((b) => (
                <span key={b}
                  className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/80 text-sm font-medium backdrop-blur-sm">
                  {b}
                </span>
              ))}
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-10">
              <MagneticButton href={WA} target="_blank" rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-4 rounded-2xl group flex items-center gap-2">
                Start Free Mock Test
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton href="https://app.getvidya.in/login" className="btn-secondary text-base px-8 py-4 rounded-2xl flex items-center gap-2">
                <PlayCircle size={18} className="text-accent" />
                Login to your account
              </MagneticButton>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-6 flex-wrap">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-white font-bold text-sm">{value}</span>
                  <span className="text-white/50 text-sm">{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="mt-5 flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle2 size={14} className="text-accent" />
              Starting at <strong className="text-accent">₹149/month</strong> — cancel anytime
            </motion.div>
          </motion.div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Floating rating */}
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="hidden sm:flex absolute -top-4 -left-4 lg:-left-8 z-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 items-center gap-3"
            >
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-accent fill-accent" />)}</div>
              <div>
                <div className="text-white font-semibold text-sm">4.8 Rating</div>
                <div className="text-white/50 text-xs">2,400+ reviews</div>
              </div>
            </motion.div>

            {/* Floating question card */}
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="hidden sm:block absolute -bottom-4 -left-4 lg:-left-8 z-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 max-w-[220px]"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Zap size={12} className="text-orange-400" />
                <span className="text-white/60 text-xs font-medium">GetVidyaAI — Study Streak</span>
              </div>
              <div className="text-white text-xs font-medium leading-relaxed">
                🔥 Day 7 Streak — +25 XP earned today!
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-white/50 mb-1">
                  <span>Level 2 → Level 3</span>
                  <span>75%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full">
                  <div className="h-full w-3/4 bg-orange-400 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Hero image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-teal/20 rounded-[2rem] blur-2xl opacity-50" />
              <Image src="/images/home-banner.webp" alt="Students preparing with GetVidya"
                width={540} height={480} className="rounded-3xl object-cover shadow-2xl relative z-10"
                priority fetchPriority="high"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary-500/40 to-transparent z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/60" />
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { AnimateIn } from "@/components/ui/AnimateIn";

const WA_LINK =
  "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";

const perks = ["No credit card required", "Free tests available", "Cancel anytime"];

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/20 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
      />

      <div className="container-xl relative z-10 text-center">
        <AnimateIn>
          <motion.div
            className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-8"
            whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}
          >
            <Zap size={14} className="fill-accent" />
            VidyaAI is Live — Try It Free Today
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-6 leading-tight">
            Your AI study partner is ready.
            <br />
            <span className="text-accent">Let&apos;s crack your exam.</span>
          </h2>

          <p className="text-white/70 text-xl mb-10 max-w-2xl mx-auto">
            Join <strong className="text-white">50,000+</strong> students already preparing with GetVidya.
            VidyaAI adapts to you from day one — powered by Gemini, starting at just <strong className="text-white">₹149/month</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <MagneticButton
              href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="btn-primary text-lg px-10 py-4 rounded-2xl flex items-center gap-2"
            >
              Start Free Mock Test
              <ArrowRight size={20} />
            </MagneticButton>
            <MagneticButton
              href="https://app.getvidya.in/login"
              className="btn-secondary text-lg px-10 py-4 rounded-2xl flex items-center gap-2"
            >
              Login to your account
              <ArrowRight size={20} />
            </MagneticButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-1.5 text-white/50 text-sm">
                <CheckCircle2 size={13} className="text-teal" />
                {p}
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

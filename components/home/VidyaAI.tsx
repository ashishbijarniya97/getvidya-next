"use client";

import { motion } from "framer-motion";
import { Brain, Flame, Map, Crosshair, BarChart3, Sparkles } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";

const features = [
  {
    icon: Brain,
    iconBg: "bg-violet-500",
    glowColor: "bg-violet-500/20",
    tag: "Adaptive AI",
    title: "VidyaAI Adaptive Practice",
    desc: "Our AI engine — powered by Gemini — tracks your accuracy across every subject. Score above 70% consistently over 3 sessions and VidyaAI automatically promotes you to the next difficulty level. Always challenged. Never overwhelmed.",
    large: true,
  },
  {
    icon: Flame,
    iconBg: "bg-orange-500",
    glowColor: "bg-orange-500/20",
    tag: "Gamified",
    title: "Daily Streak & XP",
    desc: "Earn XP for every correct answer, daily check-in, and completed session. Build streaks, level up, and watch your progress compound.",
    large: false,
  },
  {
    icon: Map,
    iconBg: "bg-blue-500",
    glowColor: "bg-blue-500/20",
    tag: "Gemini AI",
    title: "AI Study Plan",
    desc: "Each week, VidyaAI generates a personalized 7-day plan using your weak subjects, difficulty level, and target exam. No guessing what to study next.",
    large: false,
  },
  {
    icon: Crosshair,
    iconBg: "bg-emerald-500",
    glowColor: "bg-emerald-500/20",
    tag: "Smart Start",
    title: "Diagnostic Assessment",
    desc: "A 25-question diagnostic quiz maps your strengths and weaknesses in minutes. VidyaAI uses this to personalize everything from day one.",
    large: false,
  },
  {
    icon: BarChart3,
    iconBg: "bg-teal-500",
    glowColor: "bg-teal-500/20",
    tag: "Insights",
    title: "Progress & Insights",
    desc: "Activity calendar, weekly XP chart, subject accuracy, and difficulty progression — every metric you need to stay on track.",
    large: false,
  },
];

export default function VidyaAI() {
  return (
    <section className="py-24 bg-primary-500 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-xl relative z-10">
        <StaggerContainer className="text-center mb-14">
          <StaggerItem>
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles size={14} className="fill-accent" />
              Powered by Google Gemini AI
            </motion.div>
          </StaggerItem>
          <StaggerItem>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Introducing{" "}
              <span className="text-accent">VidyaAI</span>
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="text-white/65 text-xl max-w-2xl mx-auto leading-relaxed">
              India&apos;s first AI study partner built specifically for government exams.
              It learns how you think, adapts to your pace, and builds your path to success.
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Large card — Adaptive Practice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 relative bg-white/8 backdrop-blur-sm border border-white/12 rounded-3xl p-8 overflow-hidden group hover:bg-white/12 transition-colors duration-300"
          >
            <div className={`absolute -top-12 -right-12 w-48 h-48 ${features[0].glowColor} rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity`} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 ${features[0].iconBg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <Brain size={26} className="text-white" />
                </div>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {features[0].tag}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{features[0].title}</h3>
              <p className="text-white/65 text-base leading-relaxed max-w-lg">{features[0].desc}</p>

              {/* Difficulty progression visual */}
              <div className="mt-8 flex gap-3 flex-wrap">
                {["Beginner", "Intermediate", "Advanced"].map((level, i) => (
                  <div key={level} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border ${
                    i === 0
                      ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                      : i === 1
                      ? "bg-blue-500/20 border-blue-500/30 text-blue-300"
                      : "bg-violet-500/20 border-violet-500/30 text-violet-300"
                  }`}>
                    <span>{i === 0 ? "✓" : i === 1 ? "→" : "🔒"}</span>
                    {level}
                  </div>
                ))}
                <p className="w-full text-white/40 text-xs mt-1">Score 70%+ over 3 sessions to advance automatically</p>
              </div>
            </div>
          </motion.div>

          {/* Small card — Streak */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white/8 backdrop-blur-sm border border-white/12 rounded-3xl p-6 overflow-hidden group hover:bg-white/12 transition-colors duration-300"
          >
            <div className={`absolute -top-8 -right-8 w-32 h-32 ${features[1].glowColor} rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity`} />
            <div className="relative z-10">
              <div className={`w-12 h-12 ${features[1].iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <Flame size={22} className="text-white" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                {features[1].tag}
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-2">{features[1].title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{features[1].desc}</p>
            </div>
          </motion.div>

          {/* Small card — Study Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white/8 backdrop-blur-sm border border-white/12 rounded-3xl p-6 overflow-hidden group hover:bg-white/12 transition-colors duration-300"
          >
            <div className={`absolute -top-8 -right-8 w-32 h-32 ${features[2].glowColor} rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity`} />
            <div className="relative z-10">
              <div className={`w-12 h-12 ${features[2].iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <Map size={22} className="text-white" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {features[2].tag}
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-2">{features[2].title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{features[2].desc}</p>
            </div>
          </motion.div>

          {/* Small card — Diagnostic */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white/8 backdrop-blur-sm border border-white/12 rounded-3xl p-6 overflow-hidden group hover:bg-white/12 transition-colors duration-300"
          >
            <div className={`absolute -top-8 -right-8 w-32 h-32 ${features[3].glowColor} rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity`} />
            <div className="relative z-10">
              <div className={`w-12 h-12 ${features[3].iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <Crosshair size={22} className="text-white" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {features[3].tag}
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-2">{features[3].title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{features[3].desc}</p>
            </div>
          </motion.div>

          {/* Small card — Insights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white/8 backdrop-blur-sm border border-white/12 rounded-3xl p-6 overflow-hidden group hover:bg-white/12 transition-colors duration-300"
          >
            <div className={`absolute -top-8 -right-8 w-32 h-32 ${features[4].glowColor} rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity`} />
            <div className="relative z-10">
              <div className={`w-12 h-12 ${features[4].iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <BarChart3 size={22} className="text-white" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {features[4].tag}
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-2">{features[4].title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{features[4].desc}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

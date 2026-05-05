"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 6, suffix: "", label: "Govt. Exams Covered", icon: "🏛️" },
  { value: 1200, suffix: "+", label: "Mock Tests Available", icon: "📝" },
  { value: 140000, suffix: "+", label: "Practice Questions", icon: "🧠" },
  { value: 50000, suffix: "+", label: "Active Students", icon: "🎓" },
];

function useCountUp(target: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return count;
}

function StatCard({ value, suffix, label, icon, started, index }: (typeof stats)[0] & { started: boolean; index: number }) {
  const count = useCountUp(value, 2000, started);
  const display = value >= 1000 ? `${(count / 1000).toFixed(count < 1000 ? 0 : 1)}K` : count;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center p-4 sm:p-8 group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.4 }}
        className="text-2xl sm:text-4xl mb-2 sm:mb-4"
      >
        {icon}
      </motion.div>
      <div className="text-3xl sm:text-5xl font-bold text-primary-500 mb-1 sm:mb-2 tabular-nums">
        {display}{suffix}
      </div>
      <div className="text-slate-500 font-medium text-xs sm:text-base">{label}</div>
    </motion.div>
  );
}

export default function Stats() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-mint" ref={ref}>
      <div className="container-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-teal/20 rounded-3xl overflow-hidden bg-white shadow-card">
          {stats.map((s, i) => <StatCard key={s.label} {...s} started={started} index={i} />)}
        </div>
      </div>
    </section>
  );
}

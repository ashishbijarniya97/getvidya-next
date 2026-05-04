"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 6, suffix: "", label: "Govt. Exams Covered", icon: "🏛️" },
  { value: 1200, suffix: "+", label: "Mock Tests Available", icon: "📝" },
  { value: 140000, suffix: "+", label: "Practice Questions", icon: "🧠" },
  { value: 50000, suffix: "+", label: "Active Students", icon: "🎓" },
];

function useCountUp(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatCard({ value, suffix, label, icon, started }: (typeof stats)[0] & { started: boolean }) {
  const count = useCountUp(value, 1800, started);
  const display = value >= 1000 ? (count >= 1000 ? `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}K` : count) : count;
  return (
    <div className="flex flex-col items-center text-center p-8">
      <div className="text-4xl mb-4">{icon}</div>
      <div className="text-5xl font-bold text-primary-500 mb-2 tabular-nums">
        {display}{suffix}
      </div>
      <div className="text-slate-500 font-medium">{label}</div>
    </div>
  );
}

export default function Stats() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-mint" ref={ref}>
      <div className="container-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-teal/20 rounded-3xl overflow-hidden bg-white shadow-card">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}

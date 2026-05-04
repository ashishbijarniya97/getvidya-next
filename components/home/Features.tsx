"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const features = [
  {
    title: "Daily Study Target",
    desc: "Set goals, track progress, and crack your exam step by step with our adaptive daily planner.",
    image: "/images/Daily-study-target.webp",
    tag: "Consistency",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    title: "Prepare for Your Exam",
    desc: "Personalized study plans and expert guidance tailored to your exam, level, and timeline.",
    image: "/images/Prepare-for-your-exam.webp",
    tag: "Personalised",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    title: "Online Mock Tests",
    desc: "Timed, exam-pattern tests with instant results and deep performance analysis.",
    image: "/images/Online-mock-test.webp",
    tag: "Practice",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Know Your Weakness",
    desc: "Topic-wise accuracy reports that pinpoint exactly where you need to improve.",
    image: "/images/Know-your-weakness.webp",
    tag: "Analytics",
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    title: "Structured Mock Tests",
    desc: "Full mocks in a real exam environment. Subject and chapter-wise tests to clear every doubt.",
    image: "/images/Structured-mock-tests.webp",
    tag: "Exam-like",
    tagColor: "bg-rose-100 text-rose-700",
  },
  {
    title: "Detailed Analysis",
    desc: "Understand your behaviours, patterns, time management and scoring trends after every test.",
    image: "/images/Detailed-analysis.webp",
    tag: "Insights",
    tagColor: "bg-indigo-100 text-indigo-700",
  },
  {
    title: "Study On-the-Go",
    desc: "Download the GetVidya app and crack your exam prep anywhere with Android & iOS.",
    image: "/images/Study-on-the-go.webp",
    tag: "Mobile",
    tagColor: "bg-teal-100 text-teal-700",
  },
  {
    title: "Weekly Prep Report",
    desc: "Track weekly progress, measure accuracy, and stay on pace to hit your exam target.",
    image: "/images/Weekly-prep-report.webp",
    tag: "Progress",
    tagColor: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Start Free, Upgrade When Ready",
    desc: "Monthly free tests and questions included. Unlock unlimited access with Vidya Pass Pro.",
    image: "/images/Start-free-upgrade-when-ready.webp",
    tag: "Flexible",
    tagColor: "bg-green-100 text-green-700",
  },
];

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`card overflow-hidden group transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <div className="relative h-48 overflow-hidden bg-mint">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${feature.tagColor}`}>
            {feature.tag}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-primary-500 text-lg mb-2">
          {feature.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container-xl">
        <div className="text-center mb-14">
          <span className="section-tag mb-4">Why GetVidya?</span>
          <h2 className="section-heading mb-4">
            Everything you need to{" "}
            <span className="gradient-text">crack your exam</span>
          </h2>
          <p className="section-subheading mx-auto">
            Crack government exams with GetVidya&apos;s personalized learning
            path and expert-curated content.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

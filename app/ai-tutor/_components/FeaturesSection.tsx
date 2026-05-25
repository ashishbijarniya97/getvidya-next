"use client";

import { useState } from "react";
import { CheckCircle2, TrendingUp, Newspaper, Crosshair } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";

const EMERALD = "#059669";
const GOLD    = "#D97706";

const FEATURES = [
  {
    icon: TrendingUp,
    tag: "Core Engine",
    title: "Real-Time Adaptive Mock Tests",
    body: "GetVidyaAI continuously recalibrates question difficulty based on your historical accuracy thresholds. Score above 80% for three sessions and the engine auto-promotes you. Drop below 65% and it floods your queue with foundational drills — until the gap is closed.",
    bullets: [
      "Dynamic difficulty per topic, not per exam",
      "Auto-promotion and auto-regression triggers",
      "Performance memory across 90 days of sessions",
    ],
    accent: EMERALD,
  },
  {
    icon: Newspaper,
    tag: "Daily Intelligence",
    title: "Current Affairs Linked to Syllabus MCQs",
    body: "Every morning GetVidyaAI ingests the day's top current affairs and maps each event to its corresponding core syllabus concept. A Supreme Court judgment becomes a Constitutional Law MCQ. A budget headline becomes a General Awareness drill. You practice news in exam format.",
    bullets: [
      "MCQ-format current affairs — no passive reading",
      "Tagged per exam: SSC, UPSC, Railway, Banking",
      "Historical news archive with explanation trails",
    ],
    accent: GOLD,
  },
  {
    icon: Crosshair,
    tag: "Micro-Precision",
    title: "Hyper-Granular Topic Sprints",
    body: "Full mocks waste your time when the problem is Algebra. Topic Sprints drill a single micro-topic — Algebra, Blood Relations, Constitutional Articles — in 15 questions over 20 minutes. GetVidyaAI surfaces a sprint before your next session automatically.",
    bullets: [
      "15Q · 20 min per micro-topic",
      "Available for SSC, UPSC, NTPC, Banking, RJS",
      "AI-triggered when accuracy drops below threshold",
    ],
    accent: "#7C3AED",
  },
];

function FeatureCard({
  icon: Icon,
  tag,
  title,
  body,
  bullets,
  accent,
}: (typeof FEATURES)[number]) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl p-7 border flex flex-col h-full cursor-default"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        borderColor: hovered ? `${accent}70` : `${accent}30`,
        boxShadow: hovered ? `0 20px 60px ${accent}18` : "none",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-5 w-fit"
        style={{ backgroundColor: `${accent}20`, color: accent }}
      >
        {tag}
      </div>

      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
        style={{ backgroundColor: `${accent}18` }}
      >
        <Icon size={22} style={{ color: accent }} />
      </div>

      <h3 className="text-xl font-bold text-white mb-3 leading-tight">{title}</h3>
      <p className="text-white/55 text-sm leading-relaxed mb-5 flex-1">{body}</p>

      <ul className="space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-white/70">
            <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: accent }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <StaggerContainer className="grid md:grid-cols-3 gap-6">
      {FEATURES.map((feat) => (
        <StaggerItem key={feat.title}>
          <FeatureCard {...feat} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

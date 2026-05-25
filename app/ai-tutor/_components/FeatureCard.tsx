"use client";

import { useState } from "react";
import { CheckCircle2, type LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
  bullets: string[];
  accent: string;
}

export default function FeatureCard({ icon: Icon, tag, title, body, bullets, accent }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl p-7 border flex flex-col h-full transition-all duration-300 cursor-default"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        borderColor: hovered ? `${accent}70` : `${accent}30`,
        boxShadow: hovered ? `0 20px 60px ${accent}18` : "none",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
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

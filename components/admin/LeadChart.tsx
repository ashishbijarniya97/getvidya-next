"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint { date: string; leads: number; }

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-primary-500 text-white text-xs px-3 py-2 rounded-xl shadow-lg">
      <div className="font-semibold mb-0.5">{label}</div>
      <div>{payload[0].value} lead{payload[0].value !== 1 ? "s" : ""}</div>
    </div>
  );
}

export default function LeadChart({ data }: { data: DataPoint[] }) {
  const thinned = data.filter((_, i) => i % 3 === 0 || i === data.length - 1);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis
          dataKey="date"
          ticks={thinned.map((d) => d.date)}
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false} tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#0d9488", strokeWidth: 1, strokeDasharray: "4 2" }} />
        <Area
          type="monotone" dataKey="leads"
          stroke="#0d9488" strokeWidth={2.5}
          fill="url(#leadGrad)"
          dot={false} activeDot={{ r: 5, fill: "#0d9488", strokeWidth: 2, stroke: "#fff" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

"use client";

import { useState } from "react";
import { X, Rocket } from "lucide-react";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative z-50 bg-accent text-primary-500 py-2.5 px-4">
      <div className="flex items-center justify-center gap-2 text-sm font-semibold text-center">
        <Rocket size={15} className="flex-shrink-0" />
        <span>
          🚀 Coming Soon — VidyaAI App is launching! Get ready to crack your exam with AI.
        </span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-primary-500/10 transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}

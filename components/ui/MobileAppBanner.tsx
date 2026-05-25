"use client";

import Link from "next/link";
import { Smartphone } from "lucide-react";

const PLAY_STORE = "https://play.google.com/store/apps/details?id=app.getvidya.prod";

export default function MobileAppBanner() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t"
      style={{ backgroundColor: "#0B111E", borderColor: "rgba(5,150,105,0.3)" }}
    >
      <div className="px-4 py-3 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: "rgba(5,150,105,0.2)" }}
        >
          <Smartphone size={18} style={{ color: "#059669" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-semibold leading-tight">
            Download the GetVidya Mobile App
          </p>
          <p className="text-white/45 text-xs truncate">
            Free offline topic drills · Push notification alerts
          </p>
        </div>
        <Link
          href={PLAY_STORE}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center text-xs font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95"
          style={{ backgroundColor: "#059669", color: "#fff" }}
        >
          Install Free
        </Link>
      </div>
    </div>
  );
}

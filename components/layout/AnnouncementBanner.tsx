"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, ArrowRight } from "lucide-react";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setVisible(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative bg-primary-500 rounded-3xl p-8 max-w-md w-full shadow-2xl pointer-events-auto overflow-hidden">
              {/* Background glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-teal/20 rounded-full blur-2xl" />

              {/* Close */}
              <button
                onClick={() => setVisible(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white"
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>

              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5">
                  <Rocket size={28} className="text-primary-500" />
                </div>

                {/* Badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-accent text-xs font-semibold mb-4">
                  Coming Soon
                </span>

                <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
                  VidyaAI App is<br />launching soon! 🚀
                </h2>

                <p className="text-white/65 text-sm leading-relaxed mb-7">
                  Get ready to crack your government exam with India&apos;s first AI-powered study partner. Adaptive practice, personalized plans, streaks & more — all in your pocket.
                </p>

                <button
                  onClick={() => setVisible(false)}
                  className="w-full bg-accent text-primary-500 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors text-sm"
                >
                  Got it, can&apos;t wait!
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

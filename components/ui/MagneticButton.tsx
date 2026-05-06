"use client";

import { useRef, ReactNode } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a";
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children, className, href, onClick, strength = 0.4, as: Tag = "a", target, rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * strength);
    y.set((e.clientY - (top + height / 2)) * strength);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  const props = href ? { href, target, rel } : { onClick };

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={handleLeave} className="inline-block">
      <motion.div style={{ x: springX, y: springY }}>
        {Tag === "a" ? (
          <a {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} className={className}>
            {children}
          </a>
        ) : (
          <button {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={className}>
            {children}
          </button>
        )}
      </motion.div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

const WAVES = [
  { amp: 28, freq: 0.011, speed: 0.38, width: 2.5, color: "#059669", opacity: 0.9 },
  { amp: 18, freq: 0.017, speed: 0.55, width: 1.5, color: "#10b981", opacity: 0.65 },
  { amp: 40, freq: 0.007, speed: 0.22, width: 1.2, color: "#34d399", opacity: 0.4 },
  { amp: 12, freq: 0.024, speed: 0.72, width: 1,   color: "#6ee7b7", opacity: 0.3 },
  { amp: 22, freq: 0.014, speed: 0.44, width: 0.8, color: "#a7f3d0", opacity: 0.2 },
];

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const W = canvas.getBoundingClientRect().width;
      const H = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, W, H);

      WAVES.forEach(({ amp, freq, speed, width, color, opacity }, i) => {
        const yCenter = H * 0.55 + i * 6;

        ctx.beginPath();
        for (let x = 0; x <= W; x += 1.5) {
          const y = yCenter + amp * Math.sin(freq * x + t * speed + i * 0.8);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        ctx.strokeStyle = color;
        ctx.lineWidth   = width;
        ctx.globalAlpha = opacity;
        ctx.shadowBlur  = 18;
        ctx.shadowColor = color;
        ctx.stroke();

        // subtle fill beneath each wave
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity * 0.07;
        ctx.shadowBlur  = 0;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;
      t += 0.022;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
    />
  );
}

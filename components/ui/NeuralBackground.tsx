"use client";

import { useEffect, useRef } from "react";

/* ── Tuning knobs ──────────────────────────────────────────────────────────── */
const NODE_COLOR   = "97,177,164";   // teal  (#61b1a4)
const ACCENT_COLOR = "255,215,50";   // gold  (#ffd732)
const LINK_RADIUS  = 160;            // px — max distance for a visible edge
const SIGNAL_SPEED = 1.6;            // signal particle speed (px/frame)

/* ── Types ─────────────────────────────────────────────────────────────────── */
interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  pulse: number;      // 0-1 phase
  pulseSpeed: number;
  isAccent: boolean;
}

interface Signal {
  fromIdx: number;
  toIdx: number;
  t: number;          // 0 → 1 progress along the edge
}

/* ── Helpers ───────────────────────────────────────────────────────────────── */
function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildNodes(W: number, H: number, count: number): Node[] {
  return Array.from({ length: count }, () => ({
    x: rand(0, W),
    y: rand(0, H),
    vx: rand(-0.22, 0.22),
    vy: rand(-0.18, 0.18),
    r: rand(2, 4.5),
    pulse: Math.random(),
    pulseSpeed: rand(0.006, 0.016),
    isAccent: Math.random() < 0.12,
  }));
}

/* ── Component ─────────────────────────────────────────────────────────────── */
export default function NeuralBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;
    let nodes: Node[] = [];
    let signals: Signal[] = [];
    let frameCount = 0;

    /* resize */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      W = rect.width;  H = rect.height;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      const isMobile = W < 640;
      const count    = isMobile ? 28 : 55;
      nodes = buildNodes(W, H, count);
      signals = [];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* spawn a signal on a random long-enough edge */
    const spawnSignal = () => {
      for (let attempts = 0; attempts < 20; attempts++) {
        const i = Math.floor(Math.random() * nodes.length);
        const j = Math.floor(Math.random() * nodes.length);
        if (i === j) continue;
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 60 || d > LINK_RADIUS) continue;
        signals.push({ fromIdx: i, toIdx: j, t: 0 });
        break;
      }
    };

    /* draw loop */
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      frameCount++;
      if (frameCount % 90 === 0 && signals.length < 8) spawnSignal();

      /* update nodes */
      for (const n of nodes) {
        n.x += n.vx;  n.y += n.vy;
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > W) { n.x = W; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > H) { n.y = H; n.vy *= -1; }
        n.pulse = (n.pulse + n.pulseSpeed) % 1;
      }

      /* draw edges */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d > LINK_RADIUS) continue;
          const alpha = (1 - d / LINK_RADIUS) * 0.22;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${NODE_COLOR},${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      /* update & draw signals */
      signals = signals.filter((sig) => {
        sig.t += SIGNAL_SPEED / Math.hypot(
          nodes[sig.toIdx].x - nodes[sig.fromIdx].x,
          nodes[sig.toIdx].y - nodes[sig.fromIdx].y
        );
        if (sig.t >= 1) return false;

        const x = nodes[sig.fromIdx].x + (nodes[sig.toIdx].x - nodes[sig.fromIdx].x) * sig.t;
        const y = nodes[sig.fromIdx].y + (nodes[sig.toIdx].y - nodes[sig.fromIdx].y) * sig.t;

        /* glow trail */
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 10);
        grad.addColorStop(0, `rgba(${ACCENT_COLOR},0.9)`);
        grad.addColorStop(1, `rgba(${ACCENT_COLOR},0)`);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        /* bright dot */
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT_COLOR},1)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${ACCENT_COLOR},0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });

      /* draw nodes */
      for (const n of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(n.pulse * Math.PI * 2);
        const color = n.isAccent ? ACCENT_COLOR : NODE_COLOR;

        /* outer pulse ring */
        if (pulse > 0.6) {
          const ringAlpha = (pulse - 0.6) / 0.4 * 0.25;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 5 + pulse * 6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${color},${ringAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        /* glow */
        const gGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        gGrad.addColorStop(0, `rgba(${color},${0.18 + pulse * 0.1})`);
        gGrad.addColorStop(1, `rgba(${color},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = gGrad;
        ctx.fill();

        /* core dot */
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${0.65 + pulse * 0.35})`;
        ctx.shadowBlur  = n.isAccent ? 12 : 6;
        ctx.shadowColor = `rgba(${color},0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

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
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
    />
  );
}

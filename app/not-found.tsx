"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Home } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

const quickLinks = [
  { label: "Free Mock Tests", desc: "Attempt SSC CGL practice tests", href: "/exams/ssc-cgl", icon: BookOpen },
  { label: "Question Bank", desc: "1.2 lakh+ free MCQs", href: "/question-bank", icon: FileText },
  { label: "Go Home", desc: "Back to the homepage", href: "/", icon: Home },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 text-center max-w-2xl">
        {/* Animated 404 */}
        <motion.div variants={item} className="mb-6">
          <div className="relative inline-block">
            <motion.span
              className="text-[10rem] font-bold text-white/10 leading-none select-none"
              animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              404
            </motion.span>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <span className="text-7xl">🧠</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={item}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          Page not found
        </motion.div>

        <motion.h1 variants={item} className="text-4xl md:text-5xl font-bold text-white mb-4">
          Oops! This page went on leave.
        </motion.h1>
        <motion.p variants={item} className="text-white/60 text-lg mb-12">
          Don&apos;t lose study time. Jump straight to your exam prep resources below.
        </motion.p>

        {/* Quick links */}
        <motion.div variants={item} className="grid sm:grid-cols-3 gap-4 mb-10">
          {quickLinks.map(({ label, desc, href, icon: Icon }) => (
            <Link key={href} href={href}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-left hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
              <Icon size={20} className="text-accent mb-3" />
              <div className="font-semibold text-white text-sm mb-1">{label}</div>
              <div className="text-white/50 text-xs">{desc}</div>
            </Link>
          ))}
        </motion.div>

        <motion.div variants={item}>
          <MagneticButton href="/" className="btn-primary inline-flex items-center gap-2">
            Back to Homepage <ArrowRight size={16} />
          </MagneticButton>
        </motion.div>
      </motion.div>
    </div>
  );
}

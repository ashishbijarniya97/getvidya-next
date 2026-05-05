"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
  {
    label: "Exams", href: "/exams",
    dropdown: [
      { label: "SSC CGL", href: "/exams/ssc-cgl", icon: "📋", desc: "Combined Graduate Level" },
      { label: "UPSC CSE", href: "/exams/upsc", icon: "🏛️", desc: "Civil Services Exam" },
      { label: "Banking", href: "/exams/banking", icon: "🏦", desc: "SBI PO / Clerk / RBI" },
      { label: "Railway", href: "/exams/railway", icon: "🚂", desc: "NTPC / Group D" },
      { label: "State PSC", href: "/exams/state-psc", icon: "📜", desc: "State Civil Services" },
      { label: "Defence", href: "/exams/defence", icon: "🎖️", desc: "NDA / CDS" },
    ],
  },
  {
    label: "Free Resources", href: "#",
    dropdown: [
      { label: "PYQ Sets", href: "/previous-year-questions", icon: "📅", desc: "Past 10 years question papers" },
      { label: "Question Bank", href: "/question-bank", icon: "📊", desc: "1.2 lakh+ free MCQs" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const WA = "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container-xl">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/images/logo-gv-full.png" alt="GetVidya" width={160} height={40}
              className={`h-8 w-auto transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`} priority />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    scrolled ? "text-slate-700 hover:text-primary-500 hover:bg-slate-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}>
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-2"
                      >
                        {link.dropdown.map((item) => (
                          <Link key={item.href} href={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-mint/60 transition-colors group">
                            <span className="text-xl mt-0.5">{item.icon}</span>
                            <div>
                              <div className="font-semibold text-primary-500 text-sm group-hover:text-teal transition-colors">{item.label}</div>
                              {"desc" in item && <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>}
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.label} href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    scrolled ? "text-slate-700 hover:text-primary-500 hover:bg-slate-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}>
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="https://app.getvidya.in/login"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                scrolled ? "text-primary-500 hover:bg-slate-50 border border-primary-500/20"
                  : "text-white/90 hover:text-white hover:bg-white/10 border border-white/20"
              }`}>
              Login
            </Link>
            <MagneticButton href={WA} target="_blank" rel="noopener noreferrer"
              className="btn-primary text-sm group flex items-center gap-2">
              Free Mock Test <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </MagneticButton>
          </div>

          {/* Mobile burger */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? "text-primary-500 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle nav"
          >
            <AnimatePresence mode="wait">
              <motion.div key={mobileOpen ? "x" : "menu"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-xl"
          >
            <div className="container-xl py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.dropdown ? (
                    <div>
                      <button onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-slate-50">
                        {link.label}
                        <ChevronDown size={15} className={`transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }} className="ml-4 overflow-hidden">
                            {link.dropdown.map((item) => (
                              <Link key={item.href} href={item.href}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 hover:text-primary-500 hover:bg-mint/50 text-sm"
                                onClick={() => setMobileOpen(false)}>
                                <span>{item.icon}</span>{item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link href={link.href} className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-slate-50"
                      onClick={() => setMobileOpen(false)}>{link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link href="https://app.getvidya.in/login"
                  className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-primary-500 font-medium border border-primary-500/20 hover:bg-slate-50 text-sm"
                  onClick={() => setMobileOpen(false)}>
                  Login to your account
                </Link>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center text-sm">
                  Attempt Free SSC CGL Mock <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

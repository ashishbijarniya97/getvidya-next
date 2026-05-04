"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";

const navLinks = [
  {
    label: "Exams",
    href: "/exams",
    dropdown: [
      { label: "SSC CGL", href: "/exams/ssc-cgl", icon: "📋" },
      { label: "UPSC", href: "/exams/upsc", icon: "🏛️" },
      { label: "Banking", href: "/exams/banking", icon: "🏦" },
      { label: "Railway", href: "/exams/railway", icon: "🚂" },
      { label: "State PSC", href: "/exams/state-psc", icon: "📜" },
      { label: "Defence", href: "/exams/defence", icon: "🎖️" },
    ],
  },
  {
    label: "Free Resources",
    href: "#",
    dropdown: [
      {
        label: "PYQ Sets",
        href: "/previous-year-questions",
        icon: "📅",
        desc: "Download past 10 years question papers",
      },
      {
        label: "Question Bank",
        href: "/question-bank",
        icon: "📊",
        desc: "1.2 lakh+ free updated MCQs",
      },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const WA_LINK =
  "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="container-xl">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo-gv-full.png"
              alt="GetVidya Logo"
              width={160}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                      scrolled
                        ? "text-slate-700 hover:text-primary-500 hover:bg-slate-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-fade-in">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-mint transition-colors group"
                        >
                          <span className="text-xl mt-0.5">{item.icon}</span>
                          <div>
                            <div className="font-semibold text-primary-500 text-sm group-hover:text-teal transition-colors">
                              {item.label}
                            </div>
                            {"desc" in item && (
                              <div className="text-xs text-slate-500 mt-0.5">
                                {item.desc}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    scrolled
                      ? "text-slate-700 hover:text-primary-500 hover:bg-slate-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Free Mock Test
              <ExternalLink size={15} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-primary-500 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="container-xl py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-slate-50"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === link.label ? null : link.label
                        )
                      }
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === link.label && (
                      <div className="ml-4 space-y-1 mt-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:text-primary-500 hover:bg-mint text-sm"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span>{item.icon}</span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-slate-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-slate-100">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-sm"
              >
                Attempt Free SSC CGL Mock
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";
import MagneticButton from "@/components/ui/MagneticButton";

const exams = [
  { name: "SSC CGL", slug: "ssc-cgl", icon: "📋", tests: "240+", color: "bg-blue-50 text-blue-700 border-blue-200", desc: "Combined Graduate Level" },
  { name: "UPSC CSE", slug: "upsc", icon: "🏛️", tests: "180+", color: "bg-purple-50 text-purple-700 border-purple-200", desc: "Civil Services Exam" },
  { name: "SBI PO", slug: "banking", icon: "🏦", tests: "200+", color: "bg-emerald-50 text-emerald-700 border-emerald-200", desc: "Probationary Officer" },
  { name: "Railway NTPC", slug: "railway", icon: "🚂", tests: "150+", color: "bg-orange-50 text-orange-700 border-orange-200", desc: "Non-Technical Popular" },
  { name: "State PSC", slug: "state-psc", icon: "📜", tests: "120+", color: "bg-rose-50 text-rose-700 border-rose-200", desc: "State Civil Services" },
  { name: "NDA / CDS", slug: "defence", icon: "🎖️", tests: "90+", color: "bg-indigo-50 text-indigo-700 border-indigo-200", desc: "Defence Services" },
];

export default function ExamGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="container-xl">
        <StaggerContainer className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-tag mb-4">Exam Coverage</span>
          </motion.div>
          <motion.h2
            className="section-heading mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            Which exam are you cracking?
          </motion.h2>
          <motion.p
            className="section-subheading mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Targeted mock tests and question banks for every major government exam.
          </motion.p>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {exams.map((exam) => (
            <StaggerItem key={exam.slug}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(10,40,36,0.12)" }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <Link
                  href={`/exams/${exam.slug}`}
                  className="card p-3 sm:p-6 flex flex-col gap-3 sm:gap-4 group h-full hover:border-teal border border-transparent transition-colors duration-300"
                >
                  <div className="flex items-start justify-between">
                    <motion.div
                      className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-2xl border ${exam.color}`}
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      {exam.icon}
                    </motion.div>
                    <span className="text-[10px] sm:text-xs font-semibold text-teal bg-mint px-2 sm:px-3 py-1 rounded-full">
                      {exam.tests} tests
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-500 text-sm sm:text-lg group-hover:text-teal transition-colors">
                      {exam.name}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1 hidden sm:block">{exam.desc}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-teal text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                    Explore tests <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MagneticButton href="/exams" className="btn-outline flex items-center gap-2 mx-auto">
            View All Exams <ArrowRight size={16} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

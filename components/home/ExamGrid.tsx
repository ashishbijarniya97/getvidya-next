import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
        <div className="text-center mb-14">
          <span className="section-tag mb-4">Exam Coverage</span>
          <h2 className="section-heading mb-4">
            Which exam are you cracking?
          </h2>
          <p className="section-subheading mx-auto">
            Targeted mock tests and question banks for every major government exam.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {exams.map((exam) => (
            <Link
              key={exam.slug}
              href={`/exams/${exam.slug}`}
              className="card p-6 flex flex-col gap-4 group hover:border-teal border border-transparent transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border ${exam.color}`}
                >
                  {exam.icon}
                </div>
                <span className="text-xs font-semibold text-teal bg-mint px-3 py-1 rounded-full">
                  {exam.tests} tests
                </span>
              </div>
              <div>
                <h3 className="font-bold text-primary-500 text-lg group-hover:text-teal transition-colors">
                  {exam.name}
                </h3>
                <p className="text-slate-500 text-sm mt-1">{exam.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-teal text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Explore tests <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/exams" className="btn-outline">
            View All Exams <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

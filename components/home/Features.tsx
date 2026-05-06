"use client";

import Image from "next/image";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";

type Feature =
  | { title: string; desc: string; tag: string; tagColor: string; image: string; icon?: undefined; gradient?: undefined }
  | { title: string; desc: string; tag: string; tagColor: string; icon: string; gradient: string; image?: undefined };

const features: Feature[] = [
  { title: "VidyaAI Adaptive Practice", desc: "AI adjusts question difficulty based on your accuracy. Score 70%+ over 3 sessions and get auto-promoted to the next level.", icon: "🤖", gradient: "bg-gradient-to-br from-violet-50 to-violet-100", tag: "AI-Powered", tagColor: "bg-violet-100 text-violet-700" },
  { title: "AI-Generated Study Plan", desc: "Gemini AI builds your personalized 7-day study plan from your weak subjects, exam target, and current difficulty level.", icon: "🗺️", gradient: "bg-gradient-to-br from-blue-50 to-blue-100", tag: "Gemini AI", tagColor: "bg-blue-100 text-blue-700" },
  { title: "Daily Streak & XP Rewards", desc: "Earn XP for every correct answer and daily check-in. Build streaks, level up, and stay consistent with gamified learning.", icon: "🔥", gradient: "bg-gradient-to-br from-orange-50 to-orange-100", tag: "Gamified", tagColor: "bg-orange-100 text-orange-700" },
  { title: "Diagnostic Assessment", desc: "A 25-question diagnostic quiz instantly maps your strong and weak subjects — so your personalized prep starts from day one.", icon: "🎯", gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100", tag: "Smart Start", tagColor: "bg-emerald-100 text-emerald-700" },
  { title: "Progress & Insights", desc: "Activity calendar, weekly XP chart, subject accuracy rates, and difficulty progression — all in one clear screen.", icon: "📊", gradient: "bg-gradient-to-br from-teal-50 to-teal-100", tag: "Analytics", tagColor: "bg-teal-100 text-teal-700" },
  { title: "Online Mock Tests", desc: "1,200+ timed, exam-pattern tests with instant results, percentile ranking, and deep answer analysis.", image: "/images/Online-mock-test.webp", tag: "Practice", tagColor: "bg-indigo-100 text-indigo-700" },
  { title: "Know Your Weakness", desc: "Topic-wise and subject-wise accuracy reports that pinpoint exactly where you need to improve — powered by your real performance data.", image: "/images/Know-your-weakness.webp", tag: "Insights", tagColor: "bg-rose-100 text-rose-700" },
  { title: "Study On-the-Go", desc: "Download the GetVidya app for Android & iOS and prepare anywhere — commute, breaks, or late nights.", image: "/images/Study-on-the-go.webp", tag: "Mobile", tagColor: "bg-purple-100 text-purple-700" },
  { title: "Start Free, Upgrade When Ready", desc: "Free daily questions and monthly tests included. Unlock unlimited access with Vidya Pass Pro starting at just ₹149/month.", image: "/images/Start-free-upgrade-when-ready.webp", tag: "Flexible", tagColor: "bg-green-100 text-green-700" },
];

export default function Features() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container-xl">
        <StaggerContainer className="text-center mb-14">
          <StaggerItem><span className="section-tag mb-4">Why GetVidya?</span></StaggerItem>
          <StaggerItem>
            <h2 className="section-heading mb-4">
              AI-powered tools to{" "}
              <span className="gradient-text">crack your exam faster</span>
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="section-subheading mx-auto">
              From adaptive AI practice to personalized study plans — GetVidya gives every student the edge that used to cost a fortune.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="card overflow-hidden group h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className="relative h-48 overflow-hidden bg-mint">
                  {f.image ? (
                    <Image
                      src={f.image} alt={f.title} fill loading="lazy"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${f.gradient} group-hover:scale-105 transition-transform duration-500`}>
                      <span className="text-6xl">{f.icon}</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${f.tagColor}`}>{f.tag}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-primary-500 text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

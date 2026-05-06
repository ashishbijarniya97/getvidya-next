const items = [
  "VidyaAI — Gemini-Powered Adaptive Practice 🤖",
  "SSC CGL 2025 Notification Out 🔔",
  "AI Study Plans Generated Weekly 🗺️",
  "1200+ Mock Tests Available 📝",
  "UPSC CSE 2025 Preparation",
  "Daily XP & Streak Rewards 🔥",
  "Free Diagnostic Assessment 🎯",
  "Banking PO Mock Tests",
  "Railway NTPC 2025",
  "₹149/month — Unlimited Access ⚡",
  "140,000+ Practice MCQs 🧠",
  "Progress Insights & Analytics 📊",
  "State PSC Prep",
  "NDA & CDS Exam Tests 🎖️",
];

export default function Ticker() {
  const repeated = [...items, ...items];
  return (
    <div className="bg-primary-500 py-3 overflow-hidden border-y border-teal/20">
      <div className="ticker-wrap">
        <div className="ticker-content">
          {repeated.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-8 text-sm font-medium text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

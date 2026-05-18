"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Brain, CheckCircle2, ArrowRight, Loader2, ChevronRight } from "lucide-react";

const APP_URL = "https://app.getvidya.in";

const EXAMS = ["SSC CGL", "UPSC CSE", "SBI PO / Clerk", "Railway NTPC", "State PSC", "NDA / CDS"];

type Step = "exam" | "info" | "quiz" | "result";
type Q = { q: string; opts: string[]; correct: number; subject: string };

const QUIZ_BY_EXAM: Record<string, Q[]> = {
  "SSC CGL": [
    { subject: "Quantitative Aptitude", q: "The LCM of two numbers is 120 and their HCF is 4. If one number is 24, what is the other?", opts: ["16", "20", "24", "18"], correct: 1 },
    { subject: "General Intelligence",  q: "In a certain code, PENCIL is written as QFODJM. How is ERASER written?", opts: ["FSBTFS", "FSBSFS", "FRTBSF", "FQBUFS"], correct: 0 },
    { subject: "General Awareness",     q: "Which article of the Indian Constitution deals with the Right to Education?", opts: ["Article 21A", "Article 19", "Article 24", "Article 32"], correct: 0 },
    { subject: "English Language",      q: "Choose the word most nearly OPPOSITE in meaning to GREGARIOUS.", opts: ["Unsociable", "Outgoing", "Friendly", "Cheerful"], correct: 0 },
    { subject: "General Awareness",     q: "The Headquarters of the Staff Selection Commission (SSC) is located in:", opts: ["Mumbai", "Chennai", "New Delhi", "Kolkata"], correct: 2 },
  ],
  "UPSC CSE": [
    { subject: "Indian Polity",   q: "Which Schedule of the Constitution contains provisions related to the allocation of seats in the Council of States?", opts: ["Third Schedule", "Fourth Schedule", "Fifth Schedule", "Sixth Schedule"], correct: 1 },
    { subject: "Indian History",  q: "The 'Doctrine of Lapse' was introduced by which Governor-General?", opts: ["Lord Dalhousie", "Lord Canning", "Lord Cornwallis", "Lord Wellesley"], correct: 0 },
    { subject: "Indian Geography",q: "Which river forms the boundary between Telangana and Chhattisgarh?", opts: ["Godavari", "Indravati", "Mahanadi", "Wainganga"], correct: 1 },
    { subject: "Indian Economy",  q: "Which Five-Year Plan introduced the concept of 'Indicative Planning' in India?", opts: ["7th Plan", "8th Plan", "9th Plan", "10th Plan"], correct: 1 },
    { subject: "CSAT Reasoning",  q: "A is the brother of B. B is the sister of C. C is the son of D. How is A related to D?", opts: ["Son", "Nephew", "Brother", "Cannot be determined"], correct: 3 },
  ],
  "SBI PO / Clerk": [
    { subject: "Banking Awareness",     q: "The Reserve Bank of India was established in:", opts: ["1935", "1947", "1949", "1955"], correct: 0 },
    { subject: "Quantitative Aptitude", q: "Simple interest on ₹6,000 at 8% per annum for 3 years is:", opts: ["₹1,440", "₹1,540", "₹1,640", "₹1,340"], correct: 0 },
    { subject: "General Intelligence",  q: "If DESK is coded as 9472 and RIDE is coded as 5392, what is the code for DISK?", opts: ["9472", "9372", "3972", "9572"], correct: 2 },
    { subject: "English Language",      q: "Select the correctly spelt word:", opts: ["Accomodation", "Accommodation", "Acommodation", "Accomodattion"], correct: 1 },
    { subject: "Banking Awareness",     q: "Which bank is known as the 'Banker's Bank' in India?", opts: ["State Bank of India", "NABARD", "Reserve Bank of India", "SIDBI"], correct: 2 },
  ],
  "Railway NTPC": [
    { subject: "Quantitative Aptitude", q: "A train 150 m long passes a telegraph post in 12 seconds. Its speed is:", opts: ["12.5 m/s", "45 km/h", "40 km/h", "50 km/h"], correct: 0 },
    { subject: "General Intelligence",  q: "Pointing to a photograph, Ravi said 'His mother is the only daughter of my mother.' How is Ravi related to the person in the photograph?", opts: ["Maternal Uncle", "Father", "Brother", "Grandfather"], correct: 0 },
    { subject: "General Science",       q: "Which gas is used in electric bulbs to prevent the filament from oxidising?", opts: ["Nitrogen", "Oxygen", "Carbon dioxide", "Hydrogen"], correct: 0 },
    { subject: "General Awareness",     q: "Indian Railways was established in:", opts: ["1947", "1853", "1869", "1905"], correct: 1 },
    { subject: "English Language",      q: "Choose the synonym of DILIGENT:", opts: ["Lazy", "Hardworking", "Careless", "Ignorant"], correct: 1 },
  ],
  "State PSC": [
    { subject: "Indian Polity",   q: "Which Constitutional Amendment lowered the voting age from 21 to 18 years?", opts: ["42nd Amendment", "44th Amendment", "61st Amendment", "73rd Amendment"], correct: 2 },
    { subject: "General Intelligence", q: "If 6 × 4 = 46 and 8 × 3 = 83 (in a special code), what is 5 × 7?", opts: ["57", "75", "12", "35"], correct: 1 },
    { subject: "Indian Geography",q: "The Tropic of Cancer passes through how many Indian states?", opts: ["6", "7", "8", "9"], correct: 2 },
    { subject: "Current Affairs", q: "Which article of the Constitution deals with the abolition of untouchability?", opts: ["Article 14", "Article 17", "Article 19", "Article 21"], correct: 1 },
    { subject: "English Language",q: "Choose the antonym of EPHEMERAL:", opts: ["Permanent", "Temporary", "Fleeting", "Short-lived"], correct: 0 },
  ],
  "NDA / CDS": [
    { subject: "Quantitative Aptitude", q: "The value of sin²30° + cos²60° + tan²45° is:", opts: ["1.5", "2", "2.5", "1"], correct: 0 },
    { subject: "General Science",       q: "Newton's first law of motion is also known as:", opts: ["Law of Acceleration", "Law of Inertia", "Law of Gravitation", "Law of Action-Reaction"], correct: 1 },
    { subject: "General Knowledge",     q: "The National Defence Academy (NDA) is located at:", opts: ["Pune", "Dehradun", "Delhi", "Bengaluru"], correct: 0 },
    { subject: "English Language",      q: "Fill in the blank: The soldier showed great __ in the face of danger.", opts: ["cowardice", "valour", "negligence", "hesitation"], correct: 1 },
    { subject: "General Knowledge",     q: "The first woman to become the Chief of Staff of the Indian Army is:", opts: ["No woman has held this post yet", "Priya Jhingan", "Punita Arora", "Mitali Madhumita"], correct: 0 },
  ],
};

const DEFAULT_QUIZ: Q[] = QUIZ_BY_EXAM["SSC CGL"];

const SUBJECT_MAP: Record<string, string> = {
  "Quantitative Aptitude": "Math / Quant",
  "General Intelligence": "Reasoning & GI",
  "General Awareness": "GK & Current Affairs",
  "English Language": "English",
  "Current Affairs": "App Features",
};

export default function FreeAssessmentClient() {
  const [step, setStep]           = useState<Step>("exam");
  const [exam, setExam]           = useState("");
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [answers, setAnswers]     = useState<number[]>(Array(DEFAULT_QUIZ.length).fill(-1));
  const [current, setCurrent]     = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const QUIZ = QUIZ_BY_EXAM[exam] ?? DEFAULT_QUIZ;

  const score     = answers.filter((a, i) => a === QUIZ[i].correct).length;
  const weakSubs  = QUIZ.filter((q, i) => answers[i] !== q.correct).map((q) => SUBJECT_MAP[q.subject]);
  const strongSubs = QUIZ.filter((q, i) => answers[i] === q.correct).map((q) => SUBJECT_MAP[q.subject]);

  const handleAnswer = (idx: number) => {
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
    if (current < QUIZ.length - 1) {
      setTimeout(() => setCurrent(current + 1), 500);
    } else {
      setTimeout(() => submitResult(next), 500);
    }
  };

  const submitResult = async (finalAnswers: number[]) => {
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone, exam,
          score: finalAnswers.filter((a, i) => a === QUIZ[i].correct).length,
          total: QUIZ.length,
          weakSubjects: QUIZ.filter((q, i) => finalAnswers[i] !== q.correct).map((q) => q.subject),
        }),
      });
    } catch { /* non-blocking */ }
    setSubmitting(false);
    setStep("result");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-20 pb-16 px-4">
        <div className="max-w-xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8 pt-8">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-7 h-7 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Free AI Diagnostic Assessment</h1>
            <p className="text-slate-400">Takes 5 minutes · Identifies your exact weak subjects · 100% free</p>
          </div>

          {/* Progress bar */}
          <div className="flex gap-2 mb-8">
            {(["exam", "info", "quiz", "result"] as Step[]).map((s, i) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full ${
                step === s ? "bg-emerald-400" :
                (["exam","info","quiz","result"].indexOf(step) > i) ? "bg-emerald-600" : "bg-slate-700"
              }`} />
            ))}
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6">

            {/* Step 1: Exam Selection */}
            {step === "exam" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Which exam are you preparing for?</h2>
                <p className="text-slate-400 text-sm mb-6">5 questions tailored to your target exam — identifies your exact weak subjects.</p>
                <div className="grid grid-cols-2 gap-3">
                  {EXAMS.map((e) => (
                    <button
                      key={e}
                      onClick={() => { setExam(e); setAnswers(Array((QUIZ_BY_EXAM[e] ?? DEFAULT_QUIZ).length).fill(-1)); setStep("info"); }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        exam === e
                          ? "border-emerald-400 bg-emerald-500/20 text-white"
                          : "border-slate-600 hover:border-slate-400 text-slate-300"
                      }`}
                    >
                      <span className="font-semibold text-sm">{e}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Lead Capture */}
            {step === "info" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Enter your details to begin</h2>
                <p className="text-slate-400 text-sm mb-6">Your personalized weak-subject report will be ready in 5 minutes.</p>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your full name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Mobile number (10 digits) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                    />
                    {phone.length > 0 && phone.length < 10 && (
                      <p className="text-red-400 text-xs mt-1 ml-1">{10 - phone.length} more digits needed</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email address (optional — for your report)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <p className="text-slate-500 text-xs">Your data is safe. We only use it to send your assessment report.</p>
                  <button
                    onClick={() => { if (name && phone.length === 10) setStep("quiz"); }}
                    disabled={!name || phone.length < 10}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    Start My Assessment <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Quiz */}
            {step === "quiz" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-400 text-sm">Question {current + 1} of {QUIZ.length}</span>
                  <span className="text-emerald-400 text-sm font-medium">{QUIZ[current].subject}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5 mb-6">
                  <div className="bg-emerald-400 h-1.5 rounded-full transition-all" style={{ width: `${(current / QUIZ.length) * 100}%` }} />
                </div>
                <h2 className="text-lg font-semibold text-white mb-6 leading-relaxed">{QUIZ[current].q}</h2>
                <div className="space-y-3">
                  {QUIZ[current].opts.map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(i)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all font-medium ${
                        answers[current] === i
                          ? "border-emerald-400 bg-emerald-500/20 text-white"
                          : "border-slate-600 hover:border-slate-400 text-slate-300"
                      }`}
                    >
                      <span className="text-slate-500 mr-3 font-mono">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
                {submitting && (
                  <div className="flex items-center gap-2 text-emerald-400 mt-6 justify-center">
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span>Analyzing your results...</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Result */}
            {step === "result" && (
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  score >= 4 ? "bg-emerald-500/20" : score >= 2 ? "bg-yellow-500/20" : "bg-red-500/20"
                }`}>
                  <span className={`text-3xl font-bold ${
                    score >= 4 ? "text-emerald-400" : score >= 2 ? "text-yellow-400" : "text-red-400"
                  }`}>{score}/{QUIZ.length}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Your Diagnostic Result</h2>
                <p className="text-slate-400 mb-6">
                  {score >= 4 ? "Excellent foundation! Focus on speed and advanced topics." :
                   score >= 2 ? "Good base — targeted practice on weak areas will boost your score significantly." :
                   "Don't worry. GetVidyaAI is designed exactly for this — building from the ground up."}
                </p>

                {weakSubs.length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4 text-left">
                    <p className="text-red-400 font-semibold text-sm mb-2">Subjects needing attention</p>
                    {weakSubs.map((s) => (
                      <p key={s} className="text-slate-300 text-sm flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-red-400" /> {s}
                      </p>
                    ))}
                  </div>
                )}

                {strongSubs.length > 0 && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6 text-left">
                    <p className="text-emerald-400 font-semibold text-sm mb-2">Your strong subjects</p>
                    {strongSubs.map((s) => (
                      <p key={s} className="text-slate-300 text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {s}
                      </p>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  <a href={APP_URL} className="block w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-xl transition-all">
                    Get My AI Study Plan in the App →
                  </a>
                  <p className="text-slate-500 text-xs">
                    {email ? `Your report has been sent to ${email}.` : "Our team will reach out on your mobile number."} GetVidyaAI Vidya Pass · from ₹79/month · Cancel anytime.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

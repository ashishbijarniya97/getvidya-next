"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, MessageSquare, Send, MapPin, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Enter a valid 10-digit phone number").max(15),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;
type Phase = "idle" | "loading" | "success";

const LOADING_STEPS = [
  "Encrypting your message…",
  "Connecting to our team…",
  "Message delivered!",
];

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="py-14 px-4 text-center"
    >
      {/* Animated check ring */}
      <div className="relative inline-flex items-center justify-center mb-8">
        <motion.div
          className="w-24 h-24 rounded-full bg-teal/10 absolute"
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        />
        <motion.div
          className="w-20 h-20 rounded-full bg-teal/15 absolute"
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-teal flex items-center justify-center relative z-10"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <CheckCircle2 size={30} className="text-white" strokeWidth={2.5} />
          </motion.div>
        </motion.div>
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-2xl font-bold text-primary-500 mb-3"
      >
        Message Received!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-slate-500 text-sm max-w-xs mx-auto mb-8"
      >
        Our team will get back to you via email within 24 hours.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <button onClick={onReset} className="btn-primary text-sm">
          Send another message
        </button>
      </motion.div>
    </motion.div>
  );
}

function LoadingOverlay({ step }: { step: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-20"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="mb-6"
      >
        <Loader2 size={36} className="text-teal" />
      </motion.div>

      <div className="space-y-2">
        {LOADING_STEPS.map((text, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: step >= i ? 1 : 0.25, x: 0 }}
            transition={{ delay: i * 0.6, duration: 0.4 }}
            className={`flex items-center gap-2 text-sm ${step >= i ? "text-teal font-medium" : "text-slate-300"}`}
          >
            <motion.div
              animate={step > i ? { scale: [1, 1.3, 1] } : {}}
              className={`w-1.5 h-1.5 rounded-full ${step >= i ? "bg-teal" : "bg-slate-200"}`}
            />
            {text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ContactClient() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [loadStep, setLoadStep] = useState(0);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setPhase("loading");
    setLoadStep(0);

    const t1 = setTimeout(() => setLoadStep(1), 900);
    const t2 = setTimeout(() => setLoadStep(2), 1700);

    try {
      const supabase = createClient();
      await supabase.from("leads").insert([{ ...data, source: "contact-page", status: "new" }]);
      await new Promise((r) => setTimeout(r, 2200));
      clearTimeout(t1); clearTimeout(t2);
      setPhase("success");
      reset();
    } catch {
      clearTimeout(t1); clearTimeout(t2);
      setPhase("idle");
      alert("Something went wrong. Please email support@getvidya.in.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-hero py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal/20 rounded-full blur-3xl pointer-events-none" />
          <div className="container-xl relative z-10">
            <AnimateIn>
              <span className="section-tag mb-4 !bg-white/10 !text-white/90 !border-white/20">Get in Touch</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">We&apos;re here to help</h1>
              <p className="text-white/70 text-lg max-w-xl mx-auto">
                Have questions about GetVidya? Our team responds within 24 hours.
              </p>
            </AnimateIn>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Info */}
              <AnimateIn>
                <h2 className="text-3xl font-bold text-primary-500 mb-8">Reach us directly</h2>
                <div className="space-y-4 mb-10">
                  {[
                    { icon: Mail, label: "Email", value: "support@getvidya.in", href: "mailto:support@getvidya.in", color: "bg-blue-50 text-blue-600" },
                    { icon: MapPin, label: "Company", value: "Prepdot Solutions Pvt. Ltd.", href: "#", color: "bg-purple-50 text-purple-600" },
                  ].map(({ icon: Icon, label, value, href, color }) => (
                    <motion.a
                      key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-4 p-5 card hover:shadow-card-hover transition-all"
                      whileHover={{ x: 4 }} transition={{ duration: 0.2 }}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 font-medium">{label}</div>
                        <div className="font-semibold text-primary-500">{value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="bg-mint rounded-2xl p-6">
                  <h3 className="font-bold text-primary-500 mb-2">Need help?</h3>
                  <p className="text-slate-600 text-sm mb-5">
                    Send an email to support@getvidya.in — we typically respond within 24 hours.
                  </p>
                  <MagneticButton href="mailto:support@getvidya.in"
                    className="btn-primary text-sm flex items-center gap-2">
                    Email Us <ArrowRight size={14} />
                  </MagneticButton>
                </div>
              </AnimateIn>

              {/* Form */}
              <AnimateIn variant="fadeRight">
                <div className="card p-8 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {phase === "loading" && (
                      <LoadingOverlay key="loading" step={loadStep} />
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {phase === "success" ? (
                      <SuccessState key="success" onReset={() => setPhase("idle")} />
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                        noValidate
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-bold text-primary-500 mb-6">Send us a message</h3>

                        {[
                          { id: "name", label: "Full Name", type: "text", placeholder: "Ravi Sharma" },
                          { id: "email", label: "Email Address", type: "email", placeholder: "ravi@example.com" },
                          { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
                        ].map(({ id, label, type, placeholder }) => (
                          <div key={id}>
                            <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                            <input
                              id={id} type={type} placeholder={placeholder}
                              {...register(id as keyof FormData)}
                              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all
                                focus:border-teal focus:ring-2 focus:ring-teal/20
                                ${errors[id as keyof FormData] ? "border-red-400 bg-red-50" : "border-slate-200 bg-white"}`}
                            />
                            {errors[id as keyof FormData] && (
                              <p className="text-red-500 text-xs mt-1">{errors[id as keyof FormData]?.message}</p>
                            )}
                          </div>
                        ))}

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                          <textarea
                            id="message" rows={4}
                            placeholder="Tell us what you need help with..."
                            {...register("message")}
                            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none
                              focus:border-teal focus:ring-2 focus:ring-teal/20
                              ${errors.message ? "border-red-400 bg-red-50" : "border-slate-200 bg-white"}`}
                          />
                          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                        </div>

                        <button
                          type="submit"
                          disabled={phase === "loading"}
                          className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                          Send Message <Send size={16} />
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

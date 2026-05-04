"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MessageSquare, Send, CheckCircle, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Enter a valid 10-digit phone number").max(15),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const WA_LINK = "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.from("leads").insert([{ ...data, source: "contact-page", status: "new" }]);
      setSubmitted(true);
      reset();
    } catch {
      alert("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-hero py-20 text-center">
          <div className="container-xl">
            <span className="section-tag mb-4 !bg-white/10 !text-white/90">Get in Touch</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              We&apos;re here to help
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Have questions about GetVidya? Our team responds within 24 hours.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-primary-500 mb-8">
                  Reach us directly
                </h2>
                <div className="space-y-6 mb-10">
                  {[
                    { icon: MessageSquare, label: "WhatsApp", value: "+91 81144 22752", href: WA_LINK, color: "bg-green-50 text-green-600" },
                    { icon: Mail, label: "Email", value: "support@getvidya.in", href: "mailto:support@getvidya.in", color: "bg-blue-50 text-blue-600" },
                    { icon: MapPin, label: "Company", value: "Prepdot Solutions Pvt. Ltd.", href: "#", color: "bg-purple-50 text-purple-600" },
                  ].map(({ icon: Icon, label, value, href, color }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-4 p-5 card hover:shadow-card-hover transition-all">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 font-medium">{label}</div>
                        <div className="font-semibold text-primary-500">{value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="bg-mint rounded-2xl p-6">
                  <h3 className="font-bold text-primary-500 mb-2">Fastest response?</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Message us directly on WhatsApp — we typically respond within minutes.
                  </p>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Form */}
              <div className="card p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle size={56} className="text-teal mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-primary-500 mb-2">Message sent!</h3>
                    <p className="text-slate-500">
                      We&apos;ll get back to you within 24 hours. Check your WhatsApp too!
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn-outline mt-6">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <h3 className="text-xl font-bold text-primary-500 mb-6">Send us a message</h3>

                    {[
                      { id: "name", label: "Full Name", type: "text", placeholder: "Ravi Sharma" },
                      { id: "email", label: "Email Address", type: "email", placeholder: "ravi@example.com" },
                      { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
                    ].map(({ id, label, type, placeholder }) => (
                      <div key={id}>
                        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
                          {label}
                        </label>
                        <input
                          id={id}
                          type={type}
                          placeholder={placeholder}
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
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us what you need help with..."
                        {...register("message")}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none
                          focus:border-teal focus:ring-2 focus:ring-teal/20
                          ${errors.message ? "border-red-400 bg-red-50" : "border-slate-200 bg-white"}`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full py-4">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message <Send size={16} />
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

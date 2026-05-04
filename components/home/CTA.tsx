import { ArrowRight, Zap } from "lucide-react";

const WA_LINK =
  "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container-xl relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-8">
          <Zap size={14} className="fill-accent" />
          Limited Time — Start Free Today
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Your dream government job
          <br />
          <span className="text-accent">starts here.</span>
        </h2>
        <p className="text-white/70 text-xl mb-10 max-w-2xl mx-auto">
          Join 50,000+ students already preparing with GetVidya.
          Get full access to 1,200+ mock tests for just ₹149/month.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-10 py-4 rounded-2xl group"
          >
            Start Free Mock Test
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        <p className="text-white/40 text-sm mt-6">
          No credit card required · Free tests available · Cancel anytime
        </p>
      </div>
    </section>
  );
}

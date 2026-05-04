import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Euclid Circular A", "Inter", "system-ui", "sans-serif"],
        euclid: ["Euclid Circular A", "Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#0a2824",
          50: "#def6eb",
          100: "#aadcc3",
          200: "#61b1a4",
          300: "#1c3e40",
          400: "#0d3330",
          500: "#0a2824",
          600: "#071e1b",
          700: "#051512",
          800: "#020b09",
          900: "#010504",
        },
        accent: {
          DEFAULT: "#ffd732",
          dark: "#e6c000",
          light: "#fff0a0",
        },
        teal: {
          DEFAULT: "#61b1a4",
          light: "#aadcc3",
          dark: "#3d8a7e",
        },
        mint: {
          DEFAULT: "#def6eb",
          dark: "#b8e8d0",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(135deg, #0a2824 0%, #1c3e40 50%, #0d3330 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #0a2824 0%, #0d3330 60%, #1c3e40 100%)",
        "gradient-card":
          "linear-gradient(180deg, rgba(10,40,36,0) 0%, rgba(10,40,36,0.8) 100%)",
        "gradient-accent":
          "linear-gradient(90deg, #ffd732 0%, #ffb800 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-left": "slideLeft 0.5s ease-out forwards",
        "slide-right": "slideRight 0.5s ease-out forwards",
        "ticker": "ticker 30s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "count-up": "countUp 2s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      boxShadow: {
        card: "0 4px 24px rgba(10, 40, 36, 0.08)",
        "card-hover": "0 12px 40px rgba(10, 40, 36, 0.16)",
        glow: "0 0 32px rgba(97, 177, 164, 0.3)",
        "glow-accent": "0 0 32px rgba(255, 215, 50, 0.4)",
        "inner-glow": "inset 0 0 24px rgba(97, 177, 164, 0.15)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
    },
  },
  plugins: [],
};

export default config;

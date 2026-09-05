"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Download, Mail } from "lucide-react";

interface HeroProps {
  name: string;
  title: string;
  headline: string;
}

// ── Full-motion variants ───────────────────────────────────────────────────────
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ── P1-1: Reduced-motion variants — opacity only, no movement ─────────────────
const containerReduced: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

export default function Hero({ name, title, headline }: HeroProps) {
  // P1-1: Respect prefers-reduced-motion
  const prefersReducedMotion = useReducedMotion();

  const cv = prefersReducedMotion ? containerReduced : container;
  const iv = prefersReducedMotion ? itemReduced : item;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Radial glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Animated grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        variants={cv}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl"
      >
        {/* Badge */}
        <motion.div variants={iv} className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={iv}
          className="bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-7xl md:text-8xl"
        >
          {name}
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={iv}
          className="mt-4 text-lg font-semibold tracking-widest text-indigo-400 uppercase sm:text-xl"
        >
          {title}
        </motion.p>

        {/* Headline */}
        <motion.p
          variants={iv}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          {headline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={iv}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="/Sriraj_M_Resume.pdf"
            id="hero-download-resume"
            download="Sriraj_M_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Download Resume
          </a>
          <a
            href="#contact"
            id="hero-contact-me"
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-7 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — hidden for reduced motion users */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-slate-600 p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-slate-500"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Mail, ExternalLink, Phone, ArrowUpRight, Send, CheckCircle, Loader2 } from "lucide-react";
import type { ContactLink } from "@/lib/data";

// ── Icon map ──────────────────────────────────────────────────────────────────
const icons = {
  email: Mail,
  linkedin: ExternalLink,
  phone: Phone,
};

// ── Per-type colours ──────────────────────────────────────────────────────────
const cardColors = {
  email: {
    icon: "text-indigo-400",
    iconBg: "bg-indigo-500/10",
    border: "hover:border-indigo-500/40",
    glow: "rgba(99,102,241,0.08)",
  },
  linkedin: {
    icon: "text-sky-400",
    iconBg: "bg-sky-500/10",
    border: "hover:border-sky-500/40",
    glow: "rgba(14,165,233,0.08)",
  },
  phone: {
    icon: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
    glow: "rgba(16,185,129,0.08)",
  },
};

// ── Full-motion animation variants ────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

// ── P1-1: Reduced-motion variants — opacity only, no movement ─────────────────
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.3, delay: i * 0.05 },
  }),
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface ContactLinksProps {
  links: ContactLink[];
}

type FormState = "idle" | "sending" | "sent" | "error";

// ── Component ─────────────────────────────────────────────────────────────────
export default function ContactLinks({ links }: ContactLinksProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // P1-1: Respect prefers-reduced-motion
  const prefersReducedMotion = useReducedMotion();
  const fv = prefersReducedMotion ? fadeIn : fadeUp;

  // Client-side validation
  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState("sending");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setFormState("idle");
        return;
      }

      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setFormState("error");
        return;
      }

      setFormState("sent");
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setFormState("error");
    }
  };

  return (
    // P1-3: aria-labelledby pointing to the section h2
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      {/* Top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: "1px",
          background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)",
        }}
      />
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%,rgba(99,102,241,0.07) 0%,transparent 70%)",
        }}
      />

      {/* Section heading */}
      <motion.div
        variants={fv}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto mb-16 max-w-2xl text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
          Get in touch
        </p>
        {/* P1-3: id for aria-labelledby */}
        <h2 id="contact-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Let&apos;s Work Together
        </h2>
        <p className="mt-4 text-slate-400">
          Have a project in mind or want to collaborate? Drop me a message — I&apos;ll get back
          within 24 hours.
        </p>
      </motion.div>

      {/* Two-column layout */}
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* ── Left: contact cards ── */}
        <motion.div
          variants={{ visible: { transition: { staggerChildren: prefersReducedMotion ? 0.03 : 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-4"
        >
          {links.map((link) => {
            const Icon = icons[link.type];
            const colors = cardColors[link.type];
            return (
              <motion.a
                key={link.type}
                href={link.href}
                id={`contact-${link.type}`}
                target={link.type === "linkedin" ? "_blank" : undefined}
                rel={link.type === "linkedin" ? "noopener noreferrer" : undefined}
                variants={fv}
                whileHover={prefersReducedMotion ? undefined : { y: -3, transition: { duration: 0.18 } }}
                className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-sm transition-all duration-300 ${colors.border}`}
              >
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-5 w-5 ${colors.icon}`} />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {link.label}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-slate-200">{link.value}</p>
                </div>

                {/* Arrow */}
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-slate-700 opacity-0 transition-all duration-300 group-hover:text-slate-400 group-hover:opacity-100" />

                {/* Hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 0% 50%,${colors.glow} 0%,transparent 70%)` }}
                />
              </motion.a>
            );
          })}

          {/* Availability pill */}
          <motion.div
            variants={fv}
            className="mt-2 flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <p className="text-sm text-slate-400">
              Currently <span className="font-semibold text-emerald-400">available</span> for new
              opportunities &amp; freelance projects.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Right: contact form ── */}
        <motion.div
          variants={fv}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm sm:p-8"
        >
          {/* Card top accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

          {formState === "sent" ? (
            // ── Success state ──
            <motion.div
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.4 }}
              className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Message sent!</h3>
              <p className="max-w-xs text-sm text-slate-400">
                Thanks for reaching out. I&apos;ll get back to you as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => { setFormState("idle"); setForm({ name: "", email: "", message: "" }); }}
                className="mt-2 rounded-lg border border-slate-700 px-5 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            // ── Form (idle | sending | error) ──
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <h3 className="mb-1 text-lg font-bold text-white">Send a message</h3>

              {/* Server error banner */}
              {serverError && (
                <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                  <span className="mt-0.5 h-4 w-4 shrink-0 text-red-400">⚠</span>
                  <p className="text-sm text-red-400">{serverError}</p>
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="contact-form-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Name
                </label>
                <input
                  id="contact-form-name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  // P1-5: aria-describedby links input to its error message
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                  className={`w-full rounded-xl border bg-slate-800/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/60 ${
                    errors.name ? "border-red-500/60" : "border-slate-700 focus:border-indigo-500/60"
                  }`}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-form-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Email
                </label>
                <input
                  id="contact-form-email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  // P1-5: aria-describedby links input to its error message
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                  className={`w-full rounded-xl border bg-slate-800/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/60 ${
                    errors.email ? "border-red-500/60" : "border-slate-700 focus:border-indigo-500/60"
                  }`}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-form-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Message
                </label>
                <textarea
                  id="contact-form-message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  // P1-5: aria-describedby links textarea to its error message
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-invalid={!!errors.message}
                  className={`w-full resize-none rounded-xl border bg-slate-800/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/60 ${
                    errors.message ? "border-red-500/60" : "border-slate-700 focus:border-indigo-500/60"
                  }`}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                id="contact-form-submit"
                type="submit"
                disabled={formState === "sending"}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {formState === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

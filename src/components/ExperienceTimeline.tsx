"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Briefcase, Calendar, Zap } from "lucide-react";
import type { Experience } from "@/lib/data";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

// ── Full-motion variants ───────────────────────────────────────────────────────
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const bulletVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// ── P1-1: Reduced-motion variants — opacity only, no movement ─────────────────
const sectionVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const cardContainerVariantsReduced: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const bulletVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  // P1-1: Respect prefers-reduced-motion
  const prefersReducedMotion = useReducedMotion();

  const sv = prefersReducedMotion ? sectionVariantsReduced : sectionVariants;
  const ccv = prefersReducedMotion ? cardContainerVariantsReduced : cardContainerVariants;
  const kv = prefersReducedMotion ? cardVariantsReduced : cardVariants;
  const bv = prefersReducedMotion ? bulletVariantsReduced : bulletVariants;

  return (
    // P1-3: aria-labelledby pointing to the section h2
    <section
      id="experience"
      className="relative px-6 py-24 sm:py-32"
      aria-labelledby="experience-heading"
    >
      {/* Background radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Section heading */}
      <motion.div
        variants={sv}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto mb-20 max-w-2xl text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
          Where I&apos;ve worked
        </p>
        {/* P1-3: id for aria-labelledby */}
        <h2 id="experience-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Experience
        </h2>
        <p className="mt-4 text-slate-400">
          A timeline of companies and projects I&apos;ve had the pleasure of building.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative mx-auto max-w-4xl">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-indigo-500/70 via-indigo-500/20 to-transparent sm:left-9" />

        {experiences.map((exp, expIdx) => (
          <motion.div
            key={`${exp.company}-${expIdx}`}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 0.5 }}
            className="relative mb-16 pl-16 sm:pl-24"
          >
            {/* Timeline node */}
            <div className="absolute left-3 top-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-indigo-500 bg-slate-950 sm:left-5.5">
              <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
            </div>

            {/* Company header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white sm:text-2xl">{exp.role}</h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-semibold text-indigo-400">{exp.company}</span>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {exp.period}
                </span>
              </div>
            </div>

            {/* Project cards — vertical stack */}
            <motion.div
              variants={ccv}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col gap-5"
            >
              {exp.projects.map((project) => (
                <motion.div
                  key={project.name}
                  variants={kv}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { x: 4, transition: { duration: 0.2 } }
                  }
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 transition-colors duration-300 hover:border-indigo-500/40"
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-indigo-500/70 via-violet-500/40 to-transparent" />

                  <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-start">
                    {/* Left: name + bullets */}
                    <div className="flex-1 min-w-0">
                      {/* Project name */}
                      <h4 className="mb-2 text-base font-bold text-slate-100 leading-tight">
                        {project.name}
                      </h4>

                      {/* Tech tags */}
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-400 transition-colors duration-200 group-hover:bg-slate-700/80 group-hover:text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Bullet points */}
                      <motion.ul
                        variants={{ visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } } }}
                        className="space-y-2 border-t border-slate-800/60 pt-3"
                      >
                        {project.points.map((point, i) => (
                          <motion.li
                            key={i}
                            variants={bv}
                            className="flex items-start gap-2.5"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/70" />
                            <span className="text-sm leading-relaxed text-slate-400">{point}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>

                    {/* Right: stat badge */}
                    {project.stat && (
                      <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl border border-indigo-500/25 bg-indigo-500/10 px-5 py-4 text-center sm:min-w-[90px]">
                        <span className="text-2xl font-black text-indigo-300 leading-none">
                          {project.stat.value}
                        </span>
                        <span className="mt-1 text-[11px] leading-tight text-indigo-400/80 whitespace-nowrap">
                          {project.stat.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 0% 50%, rgba(99,102,241,0.07) 0%, transparent 60%)",
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Stat summary strip */}
            {exp.projects.some((p) => p.stat) && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 0.5, delay: 0.4 }}
                className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3"
              >
                <Zap className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                <span className="text-xs text-slate-500">Key achievements:</span>
                {exp.projects
                  .filter((p) => p.stat)
                  .map((p) => (
                    <span
                      key={p.name}
                      className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400"
                    >
                      {p.stat!.value} {p.stat!.label}
                    </span>
                  ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

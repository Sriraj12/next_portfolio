"use client";

import { motion, type Variants } from "framer-motion";
import type { SkillGroup } from "@/lib/data";

const categoryColors: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  "Front-End": {
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",
    text: "text-indigo-300",
    dot: "bg-indigo-500",
  },
  "Back-End": {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    dot: "bg-emerald-500",
  },
  "Databases": {
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    text: "text-sky-300",
    dot: "bg-sky-500",
  },
  "Architecture": {
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    text: "text-violet-300",
    dot: "bg-violet-500",
  },
  "Testing & Tools": {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-300",
    dot: "bg-amber-500",
  },
};

interface SkillsGridProps {
  groups: SkillGroup[];
}

export default function SkillsGrid({ groups }: SkillsGridProps) {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const tagVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <section id="skills" className="relative px-6 py-24 sm:py-32">
      {/* Section heading */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto mb-16 max-w-2xl text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
          What I work with
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Skills &amp; Technologies
        </h2>
        <p className="mt-4 text-slate-400">
          A curated stack of tools and technologies I use to ship great products.
        </p>
      </motion.div>

      {/* Skill groups */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {groups.map((group) => {
          const colors = categoryColors[group.category] ?? categoryColors["Frontend"];
          return (
            <motion.div
              key={group.category}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-slate-700"
            >
              {/* Category header */}
              <div className="mb-5 flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${colors.dot}`} />
                <h3 className="font-semibold text-slate-200">{group.category}</h3>
              </div>

              {/* Tags */}
              <motion.div
                variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                className="flex flex-wrap gap-2"
              >
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagVariants}
                    className={`rounded-lg border px-3 py-1 text-xs font-medium transition-colors duration-200 ${colors.border} ${colors.bg} ${colors.text} cursor-default`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              {/* Hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

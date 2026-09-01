import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillsGrid from "@/components/SkillsGrid";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactLinks from "@/components/ContactLinks";
import { hero, skillGroups, experiences, contactLinks } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Sticky navigation */}
      <Navbar />

      {/* Hero */}
      <Hero name={hero.name} title={hero.title} headline={hero.headline} />

      {/* Divider */}
      <div
        aria-hidden
        className="mx-auto max-w-5xl px-6"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
        }}
      />

      {/* Skills */}
      <SkillsGrid groups={skillGroups} />

      {/* Divider */}
      <div
        aria-hidden
        className="mx-auto max-w-5xl px-6"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
        }}
      />

      {/* Experience */}
      <ExperienceTimeline experiences={experiences} />

      {/* Divider */}
      <div
        aria-hidden
        className="mx-auto max-w-5xl px-6"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
        }}
      />

      {/* Contact */}
      <ContactLinks links={contactLinks} />

      {/* Footer */}
      <footer className="border-t border-slate-800/60 px-6 py-8 text-center text-sm text-slate-600">
        <p>
          Designed &amp; built by{" "}
          <span className="font-semibold text-indigo-400">Sriraj M</span> · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}

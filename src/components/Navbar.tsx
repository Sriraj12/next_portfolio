"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Code2, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  // Close menu on resize
  useEffect(() => {
    const onResize = () => setMenuOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md shadow-md shadow-slate-950/40"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#hero"
          id="nav-logo"
          className="flex items-center gap-2 text-sm font-bold tracking-wider text-white transition-opacity hover:opacity-80"
        >
          <Code2 className="h-5 w-5 text-indigo-400" />
          SRIRAJ<span className="text-indigo-400">.DEV</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={`nav-${link.label.toLowerCase()}`}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:bg-slate-800/60 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:srirajappu22@gmail.com"
            id="nav-hire"
            className="ml-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          id="nav-mobile-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white sm:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        key="mobile-menu"
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden border-t border-slate-800/60 bg-slate-950/95 backdrop-blur-md sm:hidden"
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={`nav-mobile-${link.label.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:srirajappu22@gmail.com"
            id="nav-mobile-hire"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-lg bg-indigo-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
          >
            Hire Me
          </a>
        </nav>
      </motion.div>
    </motion.header>
  );
}

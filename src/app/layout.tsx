import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// ── Production domain ──────────────────────────────────────────────────────────
const SITE_URL = "https://sriraj.is-a.dev";

export const metadata: Metadata = {
  // ── Base URL — resolves all relative paths in metadata ───────────────────────
  metadataBase: new URL(SITE_URL),

  // ── Core ──────────────────────────────────────────────────────────────────────
  title: "Sriraj M | Full Stack Developer",
  description:
    "Portfolio of Sriraj M — Full Stack Developer specialising in React, Next.js, Node.js, and scalable web architecture.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Sriraj M",
  ],
  authors: [{ name: "Sriraj M" }],

  // ── Canonical ─────────────────────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Open Graph ────────────────────────────────────────────────────────────────
  openGraph: {
    title: "Sriraj M | Full Stack Developer",
    description:
      "Building scalable, full-stack web applications with React, Next.js & Node.js — spanning front-end architecture to back-end APIs.",
    type: "website",
    url: SITE_URL,
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sriraj M — Full Stack Developer portfolio preview",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Sriraj M | Full Stack Developer",
    description:
      "Building scalable, full-stack web applications with React, Next.js & Node.js — spanning front-end architecture to back-end APIs.",
    images: [
      {
        url: "/og-image.png",
        alt: "Sriraj M — Full Stack Developer portfolio preview",
      },
    ],
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body
        className="min-h-screen font-[family-name:var(--font-inter)] antialiased"
        style={{ backgroundColor: "#020817" }}
      >
        {/* P1-4: Skip-to-main-content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

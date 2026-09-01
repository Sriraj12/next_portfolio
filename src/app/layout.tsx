import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
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
  openGraph: {
    title: "Sriraj M | Full Stack Developer",
    description:
      "Building scalable, full-stack web applications with React, Next.js & Node.js — spanning front-end architecture to back-end APIs.",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}

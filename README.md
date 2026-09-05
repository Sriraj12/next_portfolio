# Sriraj M — Developer Portfolio

Personal portfolio website for Sriraj M, Full Stack Developer.

**Live:** [sriraj.is-a.dev](https://sriraj.is-a.dev)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 13 |
| Icons | Lucide React |
| Email | Resend |
| Deployment | Vercel |

---

## Features

- Animated hero section with smooth entrance transitions
- Skills taxonomy with colour-coded category cards
- Work experience timeline with project detail cards and key-achievement badges
- Contact section — direct links (email, LinkedIn, phone) + contact form powered by Resend
- Accessible: skip navigation, ARIA landmarks, form error associations, reduced-motion support
- SEO: canonical URL, Open Graph, Twitter Card, `robots.txt`, `sitemap.xml`
- Fully responsive (320 px → 1440 px+)
- Dark mode design

---

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout, metadata (title, OG, Twitter, canonical)
    page.tsx            # Single-page composition
    globals.css         # Tailwind v4 base + custom CSS
    robots.ts           # robots.txt via Next.js Metadata API
    sitemap.ts          # sitemap.xml via Next.js Metadata API
    api/
      contact/
        route.ts        # Resend email handler (server-side only)
  components/
    Navbar.tsx          # Sticky, scroll-aware navbar with mobile menu
    Hero.tsx            # Animated hero section
    SkillsGrid.tsx      # Skill category cards
    ExperienceTimeline.tsx  # Work history timeline
    ContactLinks.tsx    # Contact cards + form
  lib/
    data.ts             # All portfolio content (single source of truth)
public/
  Sriraj_M_Resume.pdf   # Resume PDF
  og-image.png          # Open Graph / social preview image (1200×630)
```

---

## Local Development

**Prerequisites:** Node.js 20+, npm

```bash
# Install dependencies
npm install

# Copy environment variables template
# (see Environment Variables section below)
cp .env.local.example .env.local   # if example exists
# or create .env.local manually

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env.local` file in the project root. **Never commit this file.**

```env
# Resend — https://resend.com/api-keys
RESEND_API_KEY=re_...your_key_here...

# The email address messages will be sent TO (your inbox)
CONTACT_TO_EMAIL=your@email.com

# The "From" address shown to recipients
# Must be a domain verified in Resend, or use onboarding@resend.dev for testing
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

> **Note:** Without these variables the contact form returns a 503 and displays an error to the user. The rest of the site works without them.

### Vercel Production Setup

In [Vercel dashboard](https://vercel.com) → Project → **Settings** → **Environment Variables**, add the three variables above for the **Production** environment. Redeploy after adding them.

---

## Build

```bash
# Type-check + production build
npm run build

# Lint
npm run lint

# Start production server locally
npm run start
```

---

## Deployment

The project is deployed on **Vercel** via automatic Git integration.

- Every push to `main` triggers a production deployment
- Custom domain: `sriraj.is-a.dev` (CNAME → `cname.vercel-dns.com`)

---

## Updating Portfolio Content

All portfolio data lives in [`src/lib/data.ts`](src/lib/data.ts).  
Edit that single file to update hero text, skills, experience, or contact links — no other files need to change.

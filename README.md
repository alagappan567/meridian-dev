# Meridian Development Group — Website

Premium beachfront real estate showcase built with Next.js 16, GSAP, Framer Motion, and Lenis.

## Quick Start

```bash
cd meridian-dev
npm install
npm run dev
# → http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens (Tailwind v4), film grain, form styles
│   ├── layout.tsx           # Fonts (Playfair Display + Inter), metadata
│   └── page.tsx             # Page assembly + Lenis init
│
├── hooks/
│   ├── useImageSequence.ts  ★ Canvas frame sequence hook — swap your frames here
│   ├── useLenis.ts          # Smooth scroll + GSAP sync
│   └── useScrollReveal.ts   # Reusable scroll-triggered reveal
│
├── lib/
│   ├── constants.ts         # All site content (projects, stats, copy)
│   └── utils.ts             # frameSrc(), cn(), clamp(), mapRange()
│
├── components/
│   ├── layout/
│   │   └── Navigation.tsx   # Fixed nav + fullscreen slide-in menu
│   ├── ui/
│   │   ├── Preloader.tsx    # Frame-loading progress screen
│   │   ├── GrainOverlay.tsx # Film grain (CSS animation)
│   │   └── ScrollReveal.tsx # Scroll-triggered fade/rise wrapper
│   └── sections/
│       ├── HeroSection.tsx       # ★ Canvas hero with image sequence
│       ├── AboutSection.tsx      # Scroll-pinned manifesto word reveal
│       ├── ProjectsSection.tsx   # Horizontal scroll gallery + detail modal
│       ├── ProcessSection.tsx    # Pinned horizontal timeline
│       ├── StatsSection.tsx      # Count-up numbers
│       ├── TestimonialSection.tsx# Full-bleed quote
│       └── ContactSection.tsx    # Inquiry form + footer
│
public/
├── frames 1/               ★ YOUR 300 FRAMES (already present)
│   ├── ezgif-frame-001.jpg
│   └── … ezgif-frame-300.jpg
└── images/
    ├── projects/           # project-1.jpg … project-5.jpg
    ├── process/            # process-1.jpg … process-6.jpg
    └── testimonial.jpg     # Full-bleed quote background
```

## Swapping the Hero Frame Sequence

Your 300 frames are already in `public/frames 1/` named `ezgif-frame-001.jpg` → `ezgif-frame-300.jpg`.

If you ever swap to a different sequence:
1. Drop the new frames into `public/frames 1/` with the same naming
2. If the frame count changes, update `FRAME_COUNT = 300` in `src/components/sections/HeroSection.tsx`
3. If the naming pattern changes, update `frameSrc()` in `src/lib/utils.ts`

## Adding Project Images

Place images in `public/images/projects/` named `project-1.jpg` through `project-5.jpg`.
Process section images go in `public/images/process/` as `process-1.jpg` through `process-6.jpg`.

## Editing Site Content

All text, project data, stats, and testimonials live in one file: **`src/lib/constants.ts`**

- `PROJECTS` — project objects (name, location, year, features, images)
- `STATS` — the four count-up numbers
- `TESTIMONIAL` — the pull-quote and author
- `HERO_PHRASES` — kinetic text tied to scroll progress ranges (0–1)
- `SITE` — name, address, phone, email

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | Next.js 16 App Router |
| Styling | Tailwind CSS v4 |
| Scroll animations | GSAP + ScrollTrigger |
| Component animations | Framer Motion |
| Smooth scroll | Lenis |
| Canvas hero | Custom `useImageSequence` hook |

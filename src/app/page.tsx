"use client";

import { useState } from "react";
import { useLenis }            from "@/hooks/useLenis";
import { GrainOverlay }        from "@/components/ui/GrainOverlay";
import { Navigation }          from "@/components/layout/Navigation";
import { HeroSection }         from "@/components/sections/HeroSection";
import { TestimonialSection }  from "@/components/sections/TestimonialSection";
import { ScrollSection }       from "@/components/sections/ScrollSection";
import { AboutSection }        from "@/components/sections/AboutSection";
import { StatsSection }        from "@/components/sections/StatsSection";
import { ProjectsSection }     from "@/components/sections/ProjectsSection";
import { ProcessSection }      from "@/components/sections/ProcessSection";
import { ContactSection }      from "@/components/sections/ContactSection";

export default function Home() {
  useLenis();

  // Each pin must be created AFTER the previous pin's spacer is in DOM
  const [heroReady,        setHeroReady]        = useState(false);
  const [testimonialReady, setTestimonialReady] = useState(false);

  return (
    <>
      <GrainOverlay />
      <Navigation />
      <main>
        {/* ── PINNED 1 — Hero (frames 1 · 300 frames) ── */}
        <HeroSection onReady={() => setHeroReady(true)} />

        {/* ── PINNED 2 — Client Words (frames 2 · 114 frames) ── */}
        <TestimonialSection
          prevReady={heroReady}
          onReady={() => setTestimonialReady(true)}
        />

        {/* ── PINNED 3 — Our Work (frames · 180 frames) ── */}
        <ScrollSection prevReady={testimonialReady} />

        {/* ── Normal sections ── */}
        <AboutSection />
        <StatsSection />
        <ProjectsSection />
        <ProcessSection />
        <ContactSection />
      </main>
    </>
  );
}

"use client";

/**
 * useScrollReveal
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable GSAP scroll-triggered reveal. Attaches to any element ref and
 * animates it in when it enters the viewport.
 *
 * USAGE
 *   const ref = useScrollReveal<HTMLDivElement>();
 *   <div ref={ref}>...</div>
 *
 * OPTIONS
 *   y          — vertical translate start (default 60)
 *   opacity    — start opacity (default 0)
 *   duration   — animation duration in seconds (default 1)
 *   delay      — delay in seconds (default 0)
 *   start      — ScrollTrigger start string (default "top 85%")
 *   stagger    — if provided, staggers children instead of the parent
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  start?: string;
  stagger?: number;
  childSelector?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  options: RevealOptions = {}
): React.RefObject<T | null> {
  const {
    y = 60,
    opacity = 0,
    duration = 1.1,
    delay = 0,
    start = "top 85%",
    stagger,
    childSelector,
  } = options;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const targets = stagger && childSelector
      ? el.querySelectorAll(childSelector)
      : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity, willChange: "transform, opacity" },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [y, opacity, duration, delay, start, stagger, childSelector]);

  return ref;
}

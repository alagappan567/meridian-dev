"use client";

/**
 * ScrollReveal
 * A thin wrapper that applies a GSAP scroll-triggered fade/rise to its
 * children. Use this for one-off reveals; for batches use useScrollReveal.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
}

export function ScrollReveal({
  children,
  className,
  y = 50,
  delay = 0,
  duration = 1.1,
  start = "top 88%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [y, delay, duration, start]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

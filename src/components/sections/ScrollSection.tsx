"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useImageSequence } from "@/hooks/useImageSequence";
import { frameSrc2, clamp } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT       = 180;
const SCROLL_MULTIPLIER = 6;

const CHAPTERS = [
  { range: [0,    0.32] as [number, number], label: "01", title: "Site &\nFoundation",  sub: "Where the story begins" },
  { range: [0.33, 0.65] as [number, number], label: "02", title: "Structure\n& Form",   sub: "Engineering with purpose" },
  { range: [0.66, 1]    as [number, number], label: "03", title: "Finish &\nHandover",  sub: "Crafted to endure" },
];

interface Props {
  prevReady: boolean;
}

export function ScrollSection({ prevReady }: Props) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef  = useRef(0);
  const lastChapRef  = useRef(-1);
  const chapNumRef   = useRef<HTMLSpanElement>(null);
  const chapTitleRef = useRef<HTMLHeadingElement>(null);
  const chapSubRef   = useRef<HTMLParagraphElement>(null);
  const barRef       = useRef<HTMLDivElement>(null);

  const { isLoaded, drawFrame } = useImageSequence(canvasRef, FRAME_COUNT, frameSrc2);

  // size canvas
  const syncCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width  = window.innerWidth;
    c.height = window.innerHeight;
    drawFrame(Math.round(progressRef.current * (FRAME_COUNT - 1)));
  }, [drawFrame]);

  useEffect(() => {
    syncCanvas();
    window.addEventListener("resize", syncCanvas);
    return () => window.removeEventListener("resize", syncCanvas);
  }, [syncCanvas]);

  useEffect(() => {
    if (!prevReady || !isLoaded) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${window.innerHeight * SCROLL_MULTIPLIER}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate(self) {
          const p = self.progress;
          progressRef.current = p;

          const idx = clamp(Math.round(p * (FRAME_COUNT - 1)), 0, FRAME_COUNT - 1);
          drawFrame(idx);

          if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

          const ci = CHAPTERS.findIndex(ch => p >= ch.range[0] && p <= ch.range[1]);
          if (ci !== -1 && ci !== lastChapRef.current) {
            lastChapRef.current = ci;
            const ch = CHAPTERS[ci];
            if (chapNumRef.current) chapNumRef.current.textContent = ch.label;
            if (chapSubRef.current) chapSubRef.current.textContent = ch.sub;
            if (chapTitleRef.current) {
              const el = chapTitleRef.current;
              el.style.transition = "none";
              el.style.opacity    = "0";
              el.style.transform  = "translateY(14px)";
              el.innerHTML        = ch.title.replace("\n", "<br/>");
              requestAnimationFrame(() => {
                el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
                el.style.opacity    = "1";
                el.style.transform  = "translateY(0)";
              });
            }
          }
        },
      });

      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, [prevReady, isLoaded, drawFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-charcoal"
      style={{ height: "100vh" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" aria-hidden="true" />

      {/* vignettes */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to top, rgba(10,10,9,0.82) 0%, rgba(10,10,9,0.08) 40%, transparent 65%)"
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to right, rgba(10,10,9,0.45) 0%, transparent 55%)"
      }} />

      {/* section label */}
      <div className="absolute top-20 left-8 md:left-14">
        <p className="font-sans text-white/40 text-[9px] uppercase" style={{ letterSpacing: "0.28em" }}>
          Our Work
        </p>
      </div>

      {/* chapter counter */}
      <div className="absolute top-20 right-8 md:right-14 text-right">
        <span ref={chapNumRef} className="font-sans text-white/35 text-[11px] tabular-nums" style={{ letterSpacing: "0.18em" }}>01</span>
        <span className="font-sans text-white/15 text-[11px]"> / 03</span>
      </div>

      {/* animated chapter title */}
      <div className="absolute bottom-28 md:bottom-32 left-8 md:left-14">
        <p ref={chapSubRef} className="font-sans text-white/45 text-[10px] mb-3 uppercase" style={{ letterSpacing: "0.18em" }}>
          Where the story begins
        </p>
        <h2
          ref={chapTitleRef}
          className="font-serif text-white"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 5rem)", lineHeight: 1.1 }}
        >
          Site &amp;<br />Foundation
        </h2>
      </div>

      {/* glass stat cards */}
      <div className="absolute right-8 md:right-14 flex flex-col gap-2.5" style={{ top: "50%", transform: "translateY(-50%)" }}>
        {[
          { n: "180",  label: "Frames of\nprogress" },
          { n: "4.2M", label: "Sq ft\ndelivered" },
        ].map((s) => (
          <motion.div
            key={s.n}
            className="glass-light rounded-2xl px-5 py-4 min-w-[130px]"
            initial={{ opacity: 0, x: 20 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          >
            <p className="font-serif text-white text-[1.9rem] font-semibold leading-none">{s.n}</p>
            <div className="mt-2 h-px w-7" style={{ background: "rgba(255,255,255,0.18)" }} />
            <p className="font-sans text-white/50 text-[10px] mt-1.5 leading-snug whitespace-pre-line" style={{ letterSpacing: "0.05em" }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* bottom CTA */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.a
          href="#"
          className="glass-light flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-sans font-medium text-white text-[12px]"
          style={{ letterSpacing: "0.05em" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          Explore Our Work
          <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "rgba(255,255,255,0.92)", color: "#111110" }}>↗</span>
        </motion.a>
      </div>

      {/* Bottom ticker */}
      <div
        className="absolute left-0 right-0 overflow-hidden pointer-events-none"
        style={{ bottom: "1px", height: "38px", background: "rgba(0,0,0,0.45)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div
          className="flex items-center h-full"
          style={{ animation: "hero-ticker 32s linear infinite", width: "max-content" }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {[
                { text: "Free Consultation",      accent: true  },
                { text: "Beachfront Residences",   accent: false },
                { text: "27+ Years of Excellence", accent: false },
                { text: "Clifftop Villas",          accent: false },
                { text: "Book a Site Visit",        accent: true  },
                { text: "Urban Coastal Homes",      accent: false },
                { text: "312+ Homes Delivered",     accent: false },
                { text: "Bespoke Commissions",      accent: false },
                { text: "Investment Inquiry",        accent: true  },
                { text: "Headland Estates",          accent: false },
                { text: "4.2M Sq Ft Built",          accent: false },
                { text: "Waterfront Terraces",       accent: false },
              ].map((item, j) => (
                <span key={`${copy}-${j}`} className="flex items-center">
                  <span
                    className="font-sans whitespace-nowrap px-7 text-[10px] uppercase"
                    style={{
                      letterSpacing: "0.22em",
                      color: item.accent ? "#c9a96e" : "rgba(255,255,255,0.55)",
                      fontWeight: item.accent ? 500 : 400,
                    }}
                  >
                    {item.text}
                  </span>
                  <span style={{ color: "rgba(201,169,110,0.45)", fontSize: "6px", flexShrink: 0 }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div ref={barRef} className="h-full origin-left" style={{ background: "rgba(255,255,255,0.35)", transform: "scaleX(0)", transition: "none" }} />
      </div>
    </div>
  );
}

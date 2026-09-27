"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useImageSequence } from "@/hooks/useImageSequence";
import { Preloader } from "@/components/ui/Preloader";
import { clamp } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT       = 300;
const SCROLL_MULTIPLIER = 8;

const HERO_TAGLINES = [
  { text: "Where life is\nbuilt to be\nlived in.",  start: 0,    end: 0.24 },
  { text: "The coastline\nis our canvas.",           start: 0.27, end: 0.50 },
  { text: "Crafted with intent.\nBuilt to endure.", start: 0.53, end: 0.76 },
  { text: "Meridian.\nEst. 1998.",                  start: 0.79, end: 1    },
];

const STATS = [
  { value: "312+", label: "Homes\nDelivered" },
  { value: "27+",  label: "Years of\nExcellence" },
];

interface HeroProps {
  onReady?: () => void;
}

export function HeroSection({ onReady }: HeroProps) {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const frameNumRef   = useRef<HTMLSpanElement>(null);
  const progressRef   = useRef(0);

  const [preloaderDone, setPreloaderDone] = useState(false);
  const [activeTag,     setActiveTag]     = useState(0);
  const [isMobile,      setIsMobile]      = useState(false);
  const [isReduced,     setIsReduced]     = useState(false);

  const { loadProgress, isLoaded, drawFrame } = useImageSequence(canvasRef, FRAME_COUNT);

  // ── env ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setIsReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // ── canvas size ───────────────────────────────────────────────────────────
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

  // ── ScrollTrigger ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!preloaderDone || isReduced || isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end:   () => `+=${window.innerHeight * SCROLL_MULTIPLIER}`,
        pin:   true,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate(self) {
          const p = self.progress;
          progressRef.current = p;

          const idx = clamp(Math.round(p * (FRAME_COUNT - 1)), 0, FRAME_COUNT - 1);
          drawFrame(idx);

          if (frameNumRef.current) {
            frameNumRef.current.textContent = String(idx + 1).padStart(3, "0");
          }
          const bar = document.getElementById("hero-progress");
          if (bar) bar.style.transform = `scaleX(${p})`;

          const ti = HERO_TAGLINES.findIndex(t => p >= t.start && p <= t.end);
          if (ti !== -1) setActiveTag(ti);

        },
      });
    }, container);

    // Spacer is now in the DOM — signal ScrollSection it can pin safely
    ScrollTrigger.refresh();
    onReady?.();

    return () => ctx.revert();
  }, [preloaderDone, isReduced, isMobile, drawFrame, onReady]);

  // ── entrance ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!preloaderDone) return;
    gsap.fromTo(
      ".hu",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.08 }
    );
  }, [preloaderDone]);

  // ── mobile ────────────────────────────────────────────────────────────────
  if (isMobile || isReduced) {
    return (
      <section className="relative w-full h-screen overflow-hidden bg-charcoal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/frames%201/ezgif-frame-001.jpg" alt="Meridian" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(26,26,24,0.9) 0%,rgba(26,26,24,0.2) 60%,transparent 100%)" }} />
        <div className="absolute bottom-14 left-6 right-6">
          <p className="text-white/50 font-sans text-[9px] uppercase mb-3" style={{ letterSpacing: "0.26em" }}>Est. 1998</p>
          <h1 className="font-serif text-white text-5xl leading-tight">Where life is built<br /><em>to be lived in.</em></h1>
        </div>
      </section>
    );
  }

  // ── desktop ───────────────────────────────────────────────────────────────
  return (
    <>
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader progress={loadProgress} isComplete={isLoaded} onDone={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      <div
        ref={containerRef}
        id="hero"
        className="relative w-full overflow-hidden bg-charcoal"
        style={{ height: "100vh" }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full"
          role="img"
          aria-label="Meridian Development Group — cinematic sequence"
        />

        {/* Subtle vignette — lighter than before to let image breathe */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(to top, rgba(10,10,9,0.75) 0%, rgba(10,10,9,0.15) 40%, transparent 70%)"
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(to right, rgba(10,10,9,0.35) 0%, transparent 45%)"
        }} />


        {/* ────────────────────────────────────────────────────────────────── */}
        {/* TOP-LEFT small descriptor                                         */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div
          className="hu absolute top-20 left-8 md:left-14 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <p className="font-sans text-white/45 text-[10px] leading-relaxed max-w-[140px]" style={{ letterSpacing: "0.03em" }}>
            We design homes that<br />embrace the coastline<br />and the future.
          </p>
        </div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* TOP-RIGHT descriptor                                               */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div
          className="hu absolute top-20 right-8 md:right-14 text-right pointer-events-none"
          style={{ opacity: 0 }}
        >
          <p className="font-sans text-white/45 text-[10px] leading-relaxed max-w-[130px]" style={{ letterSpacing: "0.03em" }}>
            Designing the<br />life of the future.
          </p>
        </div>


        {/* ────────────────────────────────────────────────────────────────── */}
        {/* RIGHT: Floating glass stat cards                                  */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div
          className="hu absolute right-8 md:right-14 flex flex-col gap-3 pointer-events-none"
          style={{ opacity: 0, bottom: "calc(50% - 80px)" }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: "easeOut" }}
              className="glass-light rounded-2xl px-5 py-4 min-w-[140px]"
            >
              <p className="font-serif text-white text-[2rem] font-semibold leading-none">{s.value}</p>
              <div className="mt-2.5 h-px w-8" style={{ background: "rgba(255,255,255,0.20)" }} />
              <p className="font-sans text-white/55 text-[10px] mt-2 leading-snug whitespace-pre-line" style={{ letterSpacing: "0.05em" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* BOTTOM-LEFT: scroll-synced tagline                                */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div
          className="hu absolute bottom-24 md:bottom-28 left-8 md:left-14 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {HERO_TAGLINES[activeTag]?.text.split("\n").map((line, i) => (
                <p
                  key={i}
                  className="font-serif text-white"
                  style={{
                    fontSize: "clamp(1.6rem, 2.8vw, 3rem)",
                    lineHeight: 1.15,
                    fontStyle: i === 1 && activeTag === 0 ? "italic" : "normal",
                    opacity: i === 0 ? 1 : 0.82,
                  }}
                >
                  {line}
                </p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* BOTTOM-CENTER: oval CTA button                                    */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div
          className="hu absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-auto"
          style={{ opacity: 0 }}
        >
          <motion.a
            href="#"
            className="glass-light flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-sans font-medium text-white text-[12px]"
            style={{ letterSpacing: "0.05em" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Consultation
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
              style={{
                background: "rgba(255,255,255,0.92)",
                color: "#111110",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,1)",
              }}
            >
              ↗
            </span>
          </motion.a>
        </div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* BOTTOM-RIGHT: live frame counter                                  */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div
          className="hu absolute bottom-16 right-8 md:right-14 flex items-baseline gap-1 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <span
            ref={frameNumRef}
            className="font-sans text-white/60 text-xs tabular-nums"
            style={{ letterSpacing: "0.12em" }}
          >
            001
          </span>
          <span className="font-sans text-white/25 text-[9px]">/ {FRAME_COUNT}</span>
        </div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* Bottom ticker — looping AD strip                                  */}
        {/* ────────────────────────────────────────────────────────────────── */}
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

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* Bottom edge: thin progress bar                                    */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            id="hero-progress"
            className="h-full origin-left"
            style={{ background: "rgba(255,255,255,0.45)", transform: "scaleX(0)", transition: "none" }}
          />
        </div>

      </div>
    </>
  );
}

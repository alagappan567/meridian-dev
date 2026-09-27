"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImageSequence } from "@/hooks/useImageSequence";
import { frameSrc3, clamp } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT       = 114;
const SCROLL_MULTIPLIER = 5;

interface Props {
  prevReady: boolean;
  onReady?: () => void;
}

export function TestimonialSection({ prevReady, onReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const progressRef  = useRef(0);
  const barRef       = useRef<HTMLDivElement>(null);

  const { isLoaded, drawFrame } = useImageSequence(canvasRef, FRAME_COUNT, frameSrc3);

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
          drawFrame(clamp(Math.round(p * (FRAME_COUNT - 1)), 0, FRAME_COUNT - 1));
          if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
        },
      });
      ScrollTrigger.refresh();
      onReady?.();
    }, container);

    return () => ctx.revert();
  }, [prevReady, isLoaded, drawFrame, onReady]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-charcoal"
      style={{ height: "100vh" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
        aria-hidden="true"
      />

      {/* Vignettes */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(10,10,9,0.55) 0%, rgba(10,10,9,0.35) 40%, rgba(10,10,9,0.65) 100%)"
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,9,0.55) 100%)"
      }} />

      {/* Section label */}
      <div className="absolute top-20 left-8 md:left-14">
        <p className="font-sans text-white/35 text-[9px] uppercase" style={{ letterSpacing: "0.28em" }}>
          Client Words
        </p>
      </div>

      {/* Giant quote mark */}
      <span
        className="absolute left-8 md:left-14 top-32 font-serif text-white/[0.06] select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(8rem, 18vw, 22rem)", lineHeight: 0.8 }}
        aria-hidden
      >
        "
      </span>

      {/* Quote — always visible */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-20 text-center">
        <blockquote
          className="font-serif text-white max-w-4xl"
          style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", lineHeight: 1.35 }}
        >
          "Meridian didn't build us a house.{" "}
          <em className="text-white/60">
            They gave us a place the family will fight over for generations.
          </em>"
        </blockquote>

        <div className="mt-8 h-px w-12 bg-gold mx-auto" />

        <div className="mt-6">
          <p className="font-sans text-white text-[14px] font-medium">
            James & Catherine Whitmore
          </p>
          <p
            className="font-sans text-white/35 text-[11px] mt-1"
            style={{ letterSpacing: "0.08em" }}
          >
            Cape Meridian, Malibu — 2023
          </p>
        </div>
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

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          ref={barRef}
          className="h-full origin-left"
          style={{ background: "rgba(255,255,255,0.35)", transform: "scaleX(0)", transition: "none" }}
        />
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  { num: "01", title: "Land",       sub: "Site Selection",  body: "We identify parcels with irreplaceable natural attributes — the exact angle of morning light, the way a headland holds the wind." },
  { num: "02", title: "Foundation", sub: "Engineering",     body: "Below grade, everything is overbuilt. Concrete, piling, and structure designed to last centuries on demanding coastline." },
  { num: "03", title: "Structure",  sub: "Build",           body: "Our master-build team holds tolerances that luxury joinery demands. We bring the architect's vision off the page with obsessive precision." },
  { num: "04", title: "Facade",     sub: "Envelope",        body: "Each facade is tuned to its environment — thermal mass, weather resistance, and the quality of light that enters every room." },
  { num: "05", title: "Interiors",  sub: "Finish",          body: "We collaborate with the world's finest interior studios. Every surface is chosen for its ability to age beautifully." },
  { num: "06", title: "Handover",   sub: "Delivery",        body: "Our relationship doesn't end at settlement. We stand behind every Meridian home — for as long as it stands." },
];

export function ProcessSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative bg-black py-28 md:py-40 px-8 md:px-14 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-16 md:mb-20 max-w-xl">
          <motion.div
            className="flex items-center gap-3 mb-7"
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="w-6 h-px bg-gold" />
            <p className="font-sans text-gold text-[10px] uppercase" style={{ letterSpacing: "0.28em" }}>
              How We Build
            </p>
          </motion.div>

          <motion.h2
            className="font-serif text-white"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 5rem)", lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1 }}
          >
            Six stages.<br />
            <em style={{ color: "#c9a96e", opacity: 0.85 }}>One standard.</em>
          </motion.h2>
        </div>

        {/* ── Steps grid ──────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-l border-white/[0.14]">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              className="border-b border-r border-white/[0.14] p-8 md:p-10 group hover:bg-white/[0.04] transition-colors duration-300"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 + (i % 3) * 0.1 + Math.floor(i / 3) * 0.15 }}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-7">
                <span
                  className="font-sans text-gold text-[11px]"
                  style={{ letterSpacing: "0.24em" }}
                >
                  {s.num}
                </span>
                <span
                  className="font-sans text-white/55 text-[10px] uppercase"
                  style={{ letterSpacing: "0.16em" }}
                >
                  {s.sub}
                </span>
              </div>

              <h3 className="font-serif text-white text-2xl md:text-[1.75rem] mb-4 leading-tight">
                {s.title}
              </h3>

              <div className="w-8 h-px bg-gold mb-5 transition-all duration-300 group-hover:w-16" />

              <p className="font-sans text-white/65 text-[13px] leading-[1.85]">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PILLARS = [
  { num: "01", title: "Coastal Intelligence", body: "Every site we choose is selected for its irreplaceable relationship with water, light, and horizon." },
  { num: "02", title: "Obsessive Craft",      body: "We hold tolerances that luxury joinery demands. Nothing leaves our hands until it is right." },
  { num: "03", title: "Built to Endure",      body: "Our structures are overbuilt by design — made to outlast the century on demanding coastlines." },
];

export function AboutSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="relative bg-black overflow-hidden py-32 md:py-44 px-8 md:px-14">

      {/* Background watermark */}
      <span
        className="absolute right-0 top-0 font-serif text-white select-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 24rem)", opacity: 0.05, lineHeight: 1 }}
        aria-hidden
      >
        1998
      </span>

      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* ── Left column ───────────────────────────────────────────── */}
        <div>
          {/* Gold pill label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="w-6 h-px bg-gold" />
            <p className="font-sans text-gold text-[10px] uppercase" style={{ letterSpacing: "0.28em" }}>
              About Meridian
            </p>
          </motion.div>

          <motion.h2
            className="font-serif text-white"
            style={{ fontSize: "clamp(2.6rem, 5vw, 5.5rem)", lineHeight: 1.07 }}
            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          >
            Building lives<br />
            <em style={{ color: "#c9a96e", opacity: 0.85 }}>on the coast</em><br />
            since 1998.
          </motion.h2>

          <motion.div
            className="mt-9 h-px w-20 bg-gold"
            initial={{ scaleX: 0, originX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.24 }}
          />

          <motion.p
            className="font-sans text-white/80 text-[15px] leading-[1.85] mt-8 max-w-md"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.32 }}
          >
            For over two decades, Meridian Development Group has designed and delivered homes that don't merely occupy the coastline — they belong to it. We build where others hesitate, because we understand the forces at play.
          </motion.p>

          <motion.p
            className="font-sans text-white/55 text-[14px] leading-[1.85] mt-5 max-w-md"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.42 }}
          >
            Founded in Malibu, California, our practice spans the full arc — from raw land acquisition through bespoke design, structural build, and long-term stewardship.
          </motion.p>

          <motion.a
            href="#"
            className="inline-flex items-center gap-3 mt-10 font-sans text-[12px] text-gold border-b border-gold/30 pb-0.5"
            style={{ letterSpacing: "0.12em" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.52 }}
            whileHover={{ x: 6 }}
          >
            Our story ↗
          </motion.a>
        </div>

        {/* ── Right column — pillars ─────────────────────────────────── */}
        <div className="flex flex-col gap-0 md:pt-20">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              className="border-t border-white/[0.12] pt-7 pb-8 group"
              initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.22 + i * 0.13 }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-sans text-gold text-[10px]" style={{ letterSpacing: "0.26em" }}>{p.num}</p>
                <span className="w-4 h-px bg-white/20 group-hover:w-8 transition-all duration-300" />
              </div>
              <h3 className="font-serif text-white text-xl md:text-2xl mb-3">{p.title}</h3>
              <p className="font-sans text-white/65 text-[14px] leading-[1.8]">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

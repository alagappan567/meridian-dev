"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  index: string;    // e.g. "02"
  label: string;    // e.g. "Our Work"
  heading: string;  // e.g. "From ground to\ngrand."
  sub?: string;
}

export function SectionBreak({ index, label, heading, sub }: Props) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div
      ref={ref}
      className="relative w-full bg-charcoal flex flex-col justify-end px-8 md:px-14 pb-20 md:pb-28 overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* faint section index watermark */}
      <span
        className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 font-serif text-white select-none pointer-events-none"
        style={{ fontSize: "clamp(10rem, 22vw, 28rem)", opacity: 0.04, lineHeight: 1 }}
        aria-hidden
      >
        {index}
      </span>

      {/* top-left label */}
      <motion.p
        className="absolute top-10 left-8 md:left-14 font-sans text-white/30 text-[10px] uppercase"
        style={{ letterSpacing: "0.28em" }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        {index} — {label}
      </motion.p>

      {/* horizontal rule */}
      <motion.div
        className="w-full h-px mb-10 origin-left"
        style={{ background: "rgba(255,255,255,0.08)" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* main heading */}
      <motion.h2
        className="font-serif text-white"
        style={{ fontSize: "clamp(3rem, 7vw, 8rem)", lineHeight: 1.0 }}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
      >
        {heading.split("\n").map((line, i) => (
          <span key={i} className="block">
            {i % 2 === 1 ? <em className="text-white/45">{line}</em> : line}
          </span>
        ))}
      </motion.h2>

      {sub && (
        <motion.p
          className="font-sans text-white/35 text-[13px] mt-6 max-w-sm"
          style={{ letterSpacing: "0.04em" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {sub}
        </motion.p>
      )}

      {/* scroll hint */}
      <motion.div
        className="absolute bottom-10 right-8 md:right-14 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <span className="font-sans text-white/25 text-[10px] uppercase" style={{ letterSpacing: "0.2em" }}>Scroll</span>
        <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.2)" }} />
      </motion.div>
    </div>
  );
}

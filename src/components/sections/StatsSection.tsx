"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { value: 312,  suffix: "+",  label: "Homes Delivered",    decimals: 0 },
  { value: 27,   suffix: "+",  label: "Years of Excellence", decimals: 0 },
  { value: 4.2,  suffix: "M",  label: "Sq Ft Built",         decimals: 1 },
  { value: 98,   suffix: "%",  label: "Client Satisfaction", decimals: 0 },
];

function Counter({ target, suffix, decimals }: { target: number; suffix: string; decimals: number }) {
  const [val, setVal] = useState(0);
  const ref           = useRef<HTMLSpanElement>(null);
  const inView        = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start    = Date.now();
    const tick = () => {
      const t    = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(parseFloat((target * ease).toFixed(decimals)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? val.toFixed(decimals) : Math.round(val)}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative bg-black border-t border-b border-white/[0.12] py-24 md:py-32 px-8 md:px-14 overflow-hidden">

      {/* MDG watermark */}
      <span
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 font-serif text-white select-none pointer-events-none flex items-center"
        style={{ fontSize: "clamp(12rem, 28vw, 32rem)", opacity: 0.04, whiteSpace: "nowrap", lineHeight: 1 }}
        aria-hidden
      >
        MDG
      </span>

      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 relative z-10">
        {STATS.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center md:border-r border-white/[0.12] last:border-0 md:px-10 py-4"
          >
            <p
              className="font-serif text-white"
              style={{ fontSize: "clamp(3rem, 5.5vw, 6.5rem)", lineHeight: 1, letterSpacing: "-0.02em" }}
            >
              <Counter target={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <div className="w-6 h-px bg-gold my-4" />
            <p className="font-sans text-white/65 text-[11px] uppercase" style={{ letterSpacing: "0.2em" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

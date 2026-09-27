"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  { id: 1, name: "Cape Meridian",          location: "Malibu, California",       year: "2023", type: "Beachfront Residences", units: "24 Units"  },
  { id: 2, name: "Villa Solano",            location: "Santa Barbara, California", year: "2022", type: "Clifftop Villas",       units: "12 Villas" },
  { id: 3, name: "The Meridian Residences", location: "Manhattan Beach, CA",       year: "2021", type: "Urban Coastal",         units: "48 Units"  },
  { id: 4, name: "Pacific Point",           location: "Laguna Beach, California",  year: "2020", type: "Headland Estates",      units: "8 Estates" },
  { id: 5, name: "Azure Shores",            location: "Coronado, California",      year: "2019", type: "Waterfront Terrace",    units: "32 Units"  },
];

export function ProjectsSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative bg-black py-28 md:py-40 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-7"
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="w-6 h-px bg-gold" />
              <p className="font-sans text-gold text-[10px] uppercase" style={{ letterSpacing: "0.28em" }}>Portfolio</p>
            </motion.div>
            <motion.h2
              className="font-serif text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 5rem)", lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08 }}
            >
              Selected<br /><em style={{ color: "#c9a96e", opacity: 0.85 }}>works</em>
            </motion.h2>
          </div>
          <motion.a
            href="#"
            className="hidden md:flex items-center gap-2 font-sans text-[12px] text-white/65 hover:text-white transition-colors"
            style={{ letterSpacing: "0.08em" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            All projects ↗
          </motion.a>
        </div>

        {/* Bento card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {PROJECTS.map((p, i) => {
            const isFeatured = i === 0;
            const isTall     = i <= 1;
            const isHovered  = hovered === p.id;

            return (
              <motion.div
                key={p.id}
                className={`relative group cursor-pointer rounded-2xl ${isFeatured ? "md:col-span-2" : ""}`}
                style={{
                  background:   isHovered ? "rgba(201,169,110,0.05)" : "rgba(255,255,255,0.03)",
                  border:       isHovered ? "1px solid rgba(201,169,110,0.28)" : "1px solid rgba(255,255,255,0.08)",
                  minHeight:    isTall ? 380 : 260,
                  transition:   "background 0.4s ease, border-color 0.4s ease",
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.09 }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className={`p-8 ${isFeatured ? "md:p-12" : "md:p-9"} h-full flex flex-col`}>

                  {/* Top row — number + arrow */}
                  <div className="flex items-start justify-between">
                    <span
                      className="font-sans text-gold text-[10px]"
                      style={{ letterSpacing: "0.28em" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <motion.div
                      className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-white/60 text-xs"
                      animate={{ rotate: isHovered ? 45 : 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      ↗
                    </motion.div>
                  </div>

                  <div className="flex-1" />

                  {/* Bottom content */}
                  <div>
                    {/* Gold line — animates width on hover */}
                    <motion.div
                      className="h-px bg-gold mb-5 origin-left"
                      animate={{ width: isHovered ? (isFeatured ? 64 : 40) : (isFeatured ? 36 : 20) }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    />

                    <h3
                      className="font-serif text-white mb-2.5 transition-colors duration-300 group-hover:text-gold/90"
                      style={{
                        fontSize:   isFeatured ? "clamp(1.8rem, 3vw, 3rem)" : "clamp(1.15rem, 2vw, 1.7rem)",
                        lineHeight: 1.12,
                      }}
                    >
                      {p.name}
                    </h3>

                    <p className="font-sans text-white/38 text-[12px] mb-5" style={{ letterSpacing: "0.04em" }}>
                      {p.location}
                    </p>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="px-2.5 py-1 rounded-full font-sans text-[10px] border"
                        style={{
                          color:        "rgba(201,169,110,0.75)",
                          borderColor:  "rgba(201,169,110,0.22)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {p.type}
                      </span>
                      <span className="font-sans text-white/25 text-[11px]">{p.units}</span>
                      <span className="font-sans text-white/18 text-[11px] ml-auto">{p.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

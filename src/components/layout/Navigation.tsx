"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = ["Home", "About", "Portfolio", "Services", "Contact"];

const SOCIALS = [
  {
    label: "Facebook",
    icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
  },
  {
    label: "Instagram",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: "X",
    icon: (
      <path d="M4 4l16 16M4 20L20 4" />
    ),
  },
];

export function Navigation() {
  const [active, setActive] = useState("Home");

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      aria-label="Site header"
    >
      <div className="relative flex items-center justify-between px-5 md:px-8 pt-5 md:pt-6">

        {/* ── Left: Logo mark ── */}
        <a
          href="/"
          aria-label="Meridian Development Group"
          className="pointer-events-auto flex-shrink-0 z-10 group"
        >
          <div
            className="glass-dark w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105"
          >
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
              <path
                d="M1 15V1L9 10L17 1V15"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>

        {/* ── Centre: glass pill nav — truly centred ── */}
        <div
          className="glass-dark pointer-events-auto absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5 p-1.5 rounded-full"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className="relative px-4 py-[7px] rounded-full text-[12px] font-sans font-medium cursor-pointer transition-colors duration-200 whitespace-nowrap"
              style={{
                color: active === item ? "#111110" : "rgba(255,255,255,0.75)",
                letterSpacing: "0.025em",
              }}
            >
              {/* Sliding white active indicator */}
              {active === item && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.96)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,1)",
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative z-10">{item}</span>
            </button>
          ))}
        </div>

        {/* ── Right: socials + CTA ── */}
        <div className="pointer-events-auto flex items-center gap-2.5 z-10">

          {/* Social icon circles */}
          <div className="hidden md:flex items-center gap-2">
            {SOCIALS.map(({ label, icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="glass-dark w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.80)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icon}
                </svg>
              </a>
            ))}
          </div>

          {/* Consultation CTA */}
          <motion.a
            href="#"
            className="glass-white flex items-center gap-2.5 pl-5 pr-1.5 py-1.5 rounded-full text-[12px] font-sans font-semibold text-charcoal"
            style={{ letterSpacing: "0.03em" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            Consultation
            {/* Arrow badge */}
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
              style={{
                background: "#111110",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              ↗
            </span>
          </motion.a>

        </div>
      </div>
    </nav>
  );
}

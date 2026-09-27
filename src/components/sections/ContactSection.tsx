"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";

const INTERESTS = ["Beachfront Residences", "Clifftop Villas", "Urban Coastal", "Bespoke Commission", "Investment Inquiry"];

export function ContactSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const [selected, setSelected] = useState<string>("");
  const [sent,     setSent]     = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section ref={ref} className="relative bg-black py-28 md:py-40 px-8 md:px-14 overflow-hidden">

      {/* Background watermark */}
      <span
        className="absolute right-0 bottom-0 font-serif text-white select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(8rem, 18vw, 22rem)", opacity: 0.04, lineHeight: 1 }}
        aria-hidden
      >
        MDG
      </span>

      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 md:gap-28">

        {/* ── Left ─────────────────────────────────────────────────────── */}
        <div>
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="w-6 h-px bg-gold" />
            <p className="font-sans text-gold text-[10px] uppercase" style={{ letterSpacing: "0.28em" }}>
              Get in Touch
            </p>
          </motion.div>

          <motion.h2
            className="font-serif text-white"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 5rem)", lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1 }}
          >
            Begin your<br />
            <em style={{ color: "#c9a96e", opacity: 0.85 }}>Meridian</em><br />
            journey.
          </motion.h2>

          <motion.div
            className="mt-10 h-px w-16 bg-gold"
            initial={{ scaleX: 0, originX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
          />

          {/* Contact details */}
          <motion.div
            className="mt-10 flex flex-col gap-0"
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38 }}
          >
            {[
              { label: "Address", value: "12 Coastal Drive, Suite 800\nMalibu, CA 90265" },
              { label: "Phone",   value: "+1 (310) 555-0198" },
              { label: "Email",   value: "inquiries@meridiandev.com" },
            ].map((d) => (
              <div key={d.label} className="border-t border-white/[0.14] py-5">
                <p
                  className="font-sans text-gold text-[9px] mb-2 uppercase"
                  style={{ letterSpacing: "0.22em" }}
                >
                  {d.label}
                </p>
                <p className="font-sans text-white/90 text-[15px] leading-relaxed whitespace-pre-line">
                  {d.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right — form ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.22 }}
        >
          {sent ? (
            <div className="h-full flex flex-col justify-center">
              <p className="font-serif text-white text-3xl mb-3">Thank you.</p>
              <p className="font-sans text-white/65 text-[15px]">We'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7" suppressHydrationWarning>

              {/* Name + Email */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: "name",  label: "Full Name",     type: "text" },
                  { name: "email", label: "Email Address", type: "email" },
                ].map((f) => (
                  <div key={f.name} className="flex flex-col gap-2">
                    <label
                      className="font-sans text-white/60 text-[10px] uppercase"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      required
                      suppressHydrationWarning
                      className="bg-transparent border-b border-white/25 py-3 text-white font-sans text-[14px] outline-none focus:border-gold transition-colors placeholder-white/30"
                      placeholder={`Your ${f.label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>

              {/* Interest */}
              <div className="flex flex-col gap-3">
                <label
                  className="font-sans text-white/60 text-[10px] uppercase"
                  style={{ letterSpacing: "0.18em" }}
                >
                  Interest
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((v) => (
                    <button
                      key={v}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => setSelected(v)}
                      className="px-3.5 py-1.5 rounded-full font-sans text-[11px] transition-all duration-200"
                      style={{
                        background:   selected === v ? "rgba(201,169,110,0.18)" : "rgba(255,255,255,0.06)",
                        border:       selected === v ? "1px solid rgba(201,169,110,0.6)" : "1px solid rgba(255,255,255,0.22)",
                        color:        selected === v ? "#c9a96e" : "rgba(255,255,255,0.70)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  className="font-sans text-white/60 text-[10px] uppercase"
                  style={{ letterSpacing: "0.18em" }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  suppressHydrationWarning
                  className="bg-transparent border-b border-white/25 py-3 text-white font-sans text-[14px] outline-none focus:border-gold transition-colors placeholder-white/30 resize-none"
                  placeholder="Tell us about your vision..."
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  suppressHydrationWarning
                  className="flex items-center gap-3 pl-7 pr-2 py-2 rounded-full font-sans font-medium text-[#0a0a0a] text-[12px]"
                  style={{ background: "#ffffff", letterSpacing: "0.06em" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  Send Enquiry
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: "#0a0a0a" }}
                  >
                    ↗
                  </span>
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

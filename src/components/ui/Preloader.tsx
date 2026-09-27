"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  progress:   number;
  isComplete: boolean;
  onDone:     () => void;
}

export function Preloader({ progress, isComplete, onDone }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(".pl-text", { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.1 });
  }, []);

  useEffect(() => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
  }, [progress]);

  useEffect(() => {
    if (!isComplete) return;
    gsap.timeline({ onComplete: onDone })
      .to(barRef.current,  { scaleX: 1, duration: 0.2 })
      .to(rootRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "+=0.2");
  }, [isComplete, onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      style={{ background: "#000" }}
    >
      <div className="flex flex-col items-center gap-7">

        <h1
          className="pl-text font-serif text-white"
          style={{ fontSize: "clamp(2.8rem, 7vw, 7.5rem)", letterSpacing: "0.22em", opacity: 0 }}
        >
          MERIDIAN
        </h1>

        <div
          className="relative"
          style={{ width: "160px", height: "1px", background: "rgba(255,255,255,0.10)" }}
        >
          <div
            ref={barRef}
            className="absolute inset-0 origin-left"
            style={{
              background: "linear-gradient(to right, #a8854f, #c9a96e, #d4b882)",
              transform:  "scaleX(0)",
              transition: "transform 0.1s ease-out",
            }}
          />
        </div>

      </div>
    </div>
  );
}

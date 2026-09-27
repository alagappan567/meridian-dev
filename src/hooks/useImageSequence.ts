"use client";

/**
 * useImageSequence
 * ─────────────────────────────────────────────────────────────────────────────
 * Preloads all frames in parallel and provides a drawFrame(index) function
 * that renders the requested frame onto a canvas in cover-fit mode.
 *
 * HOW TO SWAP FRAMES
 * ───────────────────
 * 1. Drop your numbered JPEGs into  public/frames 1/
 * 2. They must be named  ezgif-frame-001.jpg … ezgif-frame-300.jpg
 *    (3-digit zero-padded, 1-based)
 * 3. If the naming changes, update frameSrc() in src/lib/utils.ts
 * 4. If the count changes, update FRAME_COUNT in HeroSection.tsx and
 *    the `total` default here.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { frameSrc } from "@/lib/utils";

export interface ImageSequenceState {
  /** 0–1 loading progress */
  loadProgress: number;
  /** true once every frame has successfully loaded */
  isLoaded: boolean;
  /** Render frame[index] on the canvas (cover-fit, only redraws on change) */
  drawFrame: (index: number) => void;
}

type SrcFn = (index: number) => string;

export function useImageSequence(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  total: number = 300,
  srcFn: SrcFn = frameSrc
): ImageSequenceState {
  const imagesRef   = useRef<HTMLImageElement[]>([]);
  const lastIdxRef  = useRef<number>(-1);
  const firstDrawn  = useRef(false);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded,     setIsLoaded]     = useState(false);

  /**
   * Cover-fit draw: renders img onto canvas, filling the canvas while
   * preserving the image's aspect ratio (same as CSS object-fit: cover).
   */
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const clamped = Math.max(0, Math.min(index, total - 1));

      // Skip identical consecutive frames (saves GPU work)
      if (clamped === lastIdxRef.current) return;

      const img = imagesRef.current[clamped];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      lastIdxRef.current = clamped;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover-fit: scale so image fills canvas without stretching
      const scale  = Math.max(cw / iw, ch / ih);
      const drawW  = iw * scale;
      const drawH  = ih * scale;
      const dx     = (cw - drawW) / 2;
      const dy     = (ch - drawH) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, drawW, drawH);
    },
    [canvasRef, total]
  );

  // ── Preload all frames in parallel ───────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(total);
    let loaded = 0;

    for (let i = 0; i < total; i++) {
      const img = new Image();
      // Use %20 to safely encode the space in "frames 1"
      img.src = srcFn(i);

      img.onload = () => {
        loaded++;
        setLoadProgress(loaded / total);

        // Draw frame 0 as soon as it loads so the canvas isn't blank
        if (i === 0 && !firstDrawn.current) {
          firstDrawn.current = true;
          // Force lastIdxRef to -1 so the draw guard lets this through
          lastIdxRef.current = -1;
          drawFrame(0);
        }

        if (loaded === total) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        // Count errors too so the preloader bar still completes
        loaded++;
        setLoadProgress(loaded / total);
        if (loaded === total) setIsLoaded(true);
      };

      images[i] = img;
    }

    imagesRef.current = images;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return { loadProgress, isLoaded, drawFrame };
}

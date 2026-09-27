/** Merge class names, filtering falsy values */
export function cn(...classes: (string | undefined | null | false | 0)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/** Pad a number with leading zeros to a given length */
export function zeroPad(n: number, width: number): string {
  return String(n).padStart(width, "0");
}

/**
 * Build the public src path for a frame in the image sequence.
 * Frames live in public/frames 1/ and are named ezgif-frame-001.jpg … ezgif-frame-300.jpg
 * index is 0-based (0 → frame 001, 299 → frame 300).
 */
export function frameSrc(index: number): string {
  // %20 encodes the space in "frames 1" — works in both browsers and Node Image()
  return `/frames%201/ezgif-frame-${zeroPad(index + 1, 3)}.jpg`;
}

/** Src builder for the second sequence — public/frames/ (no space), 180 frames */
export function frameSrc2(index: number): string {
  return `/frames/ezgif-frame-${zeroPad(index + 1, 3)}.jpg`;
}

/** Src builder for the third sequence — public/frames 2/ (space → %20), 114 frames */
export function frameSrc3(index: number): string {
  return `/frames%202/ezgif-frame-${zeroPad(index + 1, 3)}.jpg`;
}

/** Check if the user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Format a number with commas for display */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

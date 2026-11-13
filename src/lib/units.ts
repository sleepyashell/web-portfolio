/** Figma pixels on the 1920px canvas, scaled with the viewport via the `--u` CSS variable. */
export const u = (px: number) => `calc(${px} * var(--u))`;

/** Like `u`, but never smaller than `minPx` real pixels (keeps text readable on phones). */
export const uMin = (px: number, minPx: number) => `max(${minPx}px, ${u(px)})`;

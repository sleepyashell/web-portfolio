"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { u } from "@/lib/units";

export type FloatingIconProps = {
  src: string;
  /** Position of the icon's top-left corner on the 1920px Figma canvas (sm and up). */
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  /**
   * Phone placement in real pixels: horizontal offset of the icon's centre from the middle of the
   * screen, top offset from the hero top, and size. Keeps icons beside the photo on narrow screens.
   */
  mobile: { dx: number; top: number; size: number };
  /** Seconds offset so icons don't bob in sync. */
  delay?: number;
};

export function FloatingIcon({ src, x, y, width, height, rotate, mobile, delay = 0 }: FloatingIconProps) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-[var(--mx)] top-[var(--my)] h-[var(--ms)] w-[var(--ms)] sm:left-[var(--dx)] sm:top-[var(--dy)] sm:h-[var(--dh)] sm:w-[var(--dw)]"
      style={{
        ...({
          "--mx": `calc(50% + ${mobile.dx - mobile.size / 2}px)`,
          "--my": `${mobile.top}px`,
          "--ms": `${mobile.size}px`,
          "--dx": `calc(50% + ${u(x - 960)})`,
          "--dy": u(y),
          "--dw": u(width),
          "--dh": u(height),
        } as CSSProperties),
        rotate,
      }}
      animate={reduce ? undefined : { y: [0, -12, 0] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image src={src} alt="" fill sizes="220px" className="object-contain" />
    </motion.div>
  );
}

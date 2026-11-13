"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { u } from "@/lib/units";

export type FloatingIconProps = {
  src: string;
  /** Position of the icon's top-left corner on the 1920px Figma canvas. */
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  /** Seconds offset so icons don't bob in sync. */
  delay?: number;
};

export function FloatingIcon({ src, x, y, width, height, rotate, delay = 0 }: FloatingIconProps) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute hidden sm:block"
      style={{
        left: `calc(50% + ${u(x - 960)})`,
        top: u(y),
        width: u(width),
        height: u(height),
        rotate,
      }}
      animate={reduce ? undefined : { y: [0, -12, 0] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image src={src} alt="" fill sizes="220px" className="object-contain" />
    </motion.div>
  );
}

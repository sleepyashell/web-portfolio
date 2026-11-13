"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { KeyboardEvent } from "react";
import type { Project } from "@/data/types";
import { u, uMin } from "@/lib/units";
import { ProjectDetails } from "./ProjectDetails";
import type { WorksState } from "./useWorksState";

type Props = {
  project: Project;
  works: WorksState;
  reduceMotion: boolean;
};

function Arrow({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick(): void }) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
      disabled={disabled}
      onClick={onClick}
      // Circle drawn with a CSS border (the Figma SVG's hairline stroke got clipped at fractional sizes).
      className="grid shrink-0 place-items-center rounded-full border border-separator bg-paper transition-opacity disabled:opacity-30 md:disabled:invisible focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-blue md:absolute md:top-1/2 md:-translate-y-1/2"
      style={{
        width: uMin(100, 44),
        height: uMin(100, 44),
        ...(dir === "prev" ? { left: u(50) } : { right: u(50) }),
      }}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="size-full"
        style={{ rotate: dir === "prev" ? "90deg" : "-90deg" }}
      >
        {/* Arrow path from Figma "Frame 15" (pointing down; rotated per direction). */}
        <path
          d="M52.5 32C52.5 30.6192 51.3807 29.4999 50 29.4999C48.6193 29.4999 47.5 30.6192 47.5 31.9999L50 31.9999L52.5 32ZM50 31.9999L47.5 31.9999L47.4999 67.4286L49.9999 67.4286L52.4999 67.4286L52.5 32L50 31.9999ZM48.2322 69.1964C49.2085 70.1727 50.7914 70.1727 51.7677 69.1964L67.6776 53.2865C68.6539 52.3102 68.6539 50.7273 67.6776 49.751C66.7013 48.7747 65.1184 48.7747 64.1421 49.751L49.9999 63.8931L35.8578 49.7509C34.8815 48.7746 33.2986 48.7746 32.3223 49.7509C31.346 50.7272 31.346 52.3102 32.3223 53.2865L48.2322 69.1964Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

export function ProjectCarousel({ project, works, reduceMotion }: Props) {
  const { slide, slideCount, next, prev, goTo } = works;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const image = slide > 0 ? project.images[slide - 1] : null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${project.name} slides`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative outline-none focus-visible:ring-3 focus-visible:ring-brand-blue/40"
    >
      <div className="md:min-h-[min(calc(560*var(--u)),50svh)]">
          <motion.div
            key={`${project.id}-${slide}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slide + 1} of ${slideCount}`}
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            {image ? (
              <div className="mx-auto px-5 md:px-0" style={{ width: `max(${u(1105)}, min(100%, 640px))`, maxWidth: "100%", paddingTop: u(20) }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1105}
                  height={667}
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="mx-auto h-auto max-h-[50svh] w-full object-contain"
                />
              </div>
            ) : (
              <ProjectDetails project={project} />
            )}
          </motion.div>
      </div>

      <div
        className="flex items-center justify-center gap-4 md:block"
        style={{ paddingBlock: `${uMin(24, 16)} ${uMin(40, 20)}` }}
      >
        <Arrow dir="prev" disabled={slide === 0} onClick={prev} />
        <div className="flex justify-center" style={{ gap: uMin(10, 8) }}>
          {Array.from({ length: slideCount }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === slide ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full transition-colors ${i === slide ? "bg-folder-blue" : "bg-[#e5e5ea]"}`}
              style={{ width: uMin(30, 10), height: uMin(30, 10) }}
            />
          ))}
        </div>
        <Arrow dir="next" disabled={slide === slideCount - 1} onClick={next} />
      </div>
    </div>
  );
}

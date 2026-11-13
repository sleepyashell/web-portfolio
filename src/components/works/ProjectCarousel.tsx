"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { KeyboardEvent } from "react";
import { mockupSlides } from "@/data/slides";
import type { Project, ProjectImage } from "@/data/types";
import { u, uMin } from "@/lib/units";
import { ProjectDetails } from "./ProjectDetails";
import type { WorksState } from "./useWorksState";

type Props = {
  project: Project;
  /** All projects, used to size the stage to the tallest slide. */
  allProjects: Project[];
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

type MockupProps = {
  load: boolean;
  img: ProjectImage;
  width: number;
  height: number;
  sizes: string;
  className: string;
};

function Mockup({ load, img, width, height, sizes, className }: MockupProps) {
  if (!load) {
    return <span aria-hidden className={`block ${className}`} style={{ aspectRatio: `${width} / ${height}` }} />;
  }
  return <Image src={img.src} alt={img.alt} width={width} height={height} sizes={sizes} className={className} />;
}

export function ProjectCarousel({ project, allProjects, works, reduceMotion }: Props) {
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

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${project.name} slides`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative outline-none focus-visible:ring-3 focus-visible:ring-brand-blue/40"
    >
      {/* Every slide of every project is stacked in one grid cell, so the stage is always as tall as
          the tallest slide: switching slides or projects never moves the dots and arrows. */}
      <div className="grid grid-cols-[minmax(0,1fr)]">
        {allProjects.flatMap((p) =>
          [null, ...mockupSlides(p)].map((group, i) => {
            const active = p.id === project.id && i === slide;
            // Only the open project's mockups are fetched; the rest are same-sized boxes that just
            // hold the stage height (avoids downloading every mockup while the folder is closed).
            const load = works.isOpen && p.id === project.id;
            const key = `${p.id}-${i}`;
            const content = !group ? null : p.mockup === "laptop" ? (
              <div
                className="mx-auto self-center px-5 md:px-0"
                style={{ width: `max(${u(1105)}, min(100%, 640px))`, maxWidth: "100%" }}
              >
                <Mockup
                  load={load}
                  img={group[0]}
                  width={1400}
                  height={845}
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="mx-auto h-auto max-h-[50svh] w-full object-contain"
                />
              </div>
            ) : (
              // Three phones side by side; height-capped so the row never outgrows the stage.
              <div className="flex items-center justify-center px-5 md:px-0" style={{ gap: uMin(60, 10) }}>
                {group.map((img) => (
                  <Mockup
                    key={img.src}
                    load={load}
                    img={img}
                    width={420}
                    height={872}
                    sizes="(min-width: 768px) 16vw, 30vw"
                    className="h-auto w-[calc((100%-20px)/3)] object-contain md:h-[min(50svh,calc(560*var(--u)))] md:w-auto"
                  />
                ))}
              </div>
            );
            const body = content ?? <ProjectDetails project={p} />;
            const cell = { gridArea: "1 / 1" };
            return active ? (
              <motion.div
                key={key}
                role="group"
                aria-roledescription="slide"
                aria-label={`${slide + 1} of ${slideCount}`}
                className="flex flex-col justify-center"
                style={cell}
                initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
              >
                {body}
              </motion.div>
            ) : (
              <div key={key} aria-hidden inert className="invisible flex flex-col justify-center" style={cell}>
                {body}
              </div>
            );
          }),
        )}
      </div>

      <div
        className="flex items-center justify-center gap-4 md:block"
        style={{ paddingBlock: `${uMin(24, 16)} ${uMin(40, 20)}` }}
      >
        <Arrow dir="prev" disabled={slide === 0} onClick={prev} />
        <div className="flex justify-center" style={{ gap: uMin(10, 6) }}>
          {Array.from({ length: slideCount }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === slide ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${i === slide ? "bg-folder-blue" : "bg-[#e5e5ea]"}`}
              style={{ width: uMin(14, 8), height: uMin(14, 8) }}
            />
          ))}
        </div>
        <Arrow dir="next" disabled={slide === slideCount - 1} onClick={next} />
      </div>
    </div>
  );
}

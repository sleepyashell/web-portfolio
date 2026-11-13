"use client";

/* eslint-disable @next/next/no-img-element -- arrow icon is a small SVG */
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
      className="grid shrink-0 place-items-center rounded-full transition-opacity disabled:opacity-30 md:disabled:invisible focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-blue md:absolute"
      style={{
        width: uMin(100, 44),
        height: uMin(100, 44),
        top: u(364),
        ...(dir === "prev" ? { left: u(150) } : { right: u(50) }),
      }}
    >
      <img
        src="/images/works/arrow-circle.svg"
        alt=""
        aria-hidden
        className="size-full"
        style={{ rotate: dir === "prev" ? "90deg" : "-90deg" }}
      />
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
      <div className="md:min-h-[calc(898*var(--u))]">
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
              <div className="mx-auto px-5 md:px-0" style={{ width: `max(${u(1105)}, min(100%, 640px))`, paddingTop: u(115) }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1105}
                  height={667}
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
            ) : (
              <ProjectDetails project={project} />
            )}
          </motion.div>
      </div>

      <div
        className="flex items-center justify-center gap-4 md:block"
        style={{ paddingBlock: `${uMin(40, 20)} ${uMin(100, 24)}` }}
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

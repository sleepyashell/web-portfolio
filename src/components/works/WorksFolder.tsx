"use client";

/* eslint-disable @next/next/no-img-element -- folder shape and arrow are SVGs */
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { CSSProperties } from "react";
import type { Project } from "@/data/types";
import { u, uMin } from "@/lib/units";
import { ProjectCarousel } from "./ProjectCarousel";
import { ProjectTabs, panelId, tabId } from "./ProjectTabs";
import type { WorksState } from "./useWorksState";

type Props = {
  works: WorksState;
  projects: Project[];
  id?: string;
};

// Geometry from Figma frames "FOLDER CLOSED 3" / "FOLDER OPENED 1", relative to the folder top (y=1992).
// Figma tab band is 201px; compressed to 150 so the open folder fits in one window.
const PANEL_TOP = 150;
const PEEK = 100; // visible panel height while closed (panel top → flap top + overlap)
const FLAP_OVERLAP = 60;
// Figma flap is 1350px; shortened so the open folder fits in one window.
const FLAP_HEIGHT = 150;

export function WorksFolder({ works, projects, id = "works" }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const { isOpen, open, close, activeId, selectProject } = works;
  const project = projects.find((p) => p.id === activeId) ?? projects[0];
  const transition = reduceMotion ? "none" : "grid-template-rows 700ms cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-reduced-motion={reduceMotion ? "true" : "false"}
      className="relative mx-auto max-w-full scroll-mt-6 md:pt-[calc(150*var(--u))]"
      style={
        {
          // The folder scales with the viewport *width* (with side margins), independent of the
          // height-aware --u used by the hero, so it stays wide on short laptop screens.
          "--u": "calc(min(100vw - 2 * max(20px, 4vw), 1680px) / 1920)",
          width: u(1920),
        } as CSSProperties
      }
    >
      {/* Back of the folder: only the tab band is ever visible, so clip it just below the panel's top corners. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 hidden bg-no-repeat md:block"
        style={{
          height: u(PANEL_TOP + PEEK),
          backgroundImage: "url(/images/works/folder-back.svg)",
          backgroundSize: `100% ${u(1461 * (PANEL_TOP / 201))}`,
        }}
      />
      {/* Phones: plain blue back of the folder behind the paper's top edge, joined to the tab. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-9 h-16 rounded-tr-2xl bg-brand-blue md:hidden" />
      <h2
        id={`${id}-title`}
        // Phones: a simple blue tab above the paper (the SVG folder shape gets too thin there).
        // md+: centred in the SVG folder tab, which spans x 0–~620 and y 0–161 of the 1920×1461 SVG
        // (height scaled by PANEL_TOP / 201 = 150 / 201 → 120.15).
        className="relative inline-flex h-10 items-center rounded-t-2xl bg-brand-blue px-5 font-serif text-[20px] text-paper md:absolute md:left-0 md:top-0 md:h-[calc(120.15*var(--u))] md:w-[calc(620*var(--u))] md:justify-center md:rounded-none md:bg-transparent md:p-0 md:text-[length:max(14px,calc(70*var(--u)))]"
        style={{ lineHeight: 1, letterSpacing: "-0.05em" }}
      >
        / selected works
      </h2>

      {/* Panel: collapses to a peek while closed, grows to its content when open. */}
      <div className="relative mt-2.5 grid md:mt-0" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", transition }}>
        <div
          className="overflow-hidden rounded-t-2xl bg-paper shadow-[0_0_5px_0_rgb(0_0_0/0.25)] md:rounded-t-[calc(100*var(--u))]"
          style={{ minHeight: u(PEEK) }}
          aria-hidden={!isOpen}
          inert={!isOpen}
        >
          {/* Blank paper while closed (as in Figma); content fades in once the folder opens. */}
          <div
            style={{
              opacity: isOpen ? 1 : 0,
              transition: reduceMotion ? "none" : `opacity 300ms ease ${isOpen ? "250ms" : "0ms"}`,
            }}
          >
            <ProjectTabs projects={projects} activeId={project.id} onSelect={selectProject} />
            <div role="tabpanel" id={panelId(project.id)} aria-labelledby={tabId(project.id)}>
              <ProjectCarousel project={project} allProjects={projects} works={works} reduceMotion={reduceMotion} />
            </div>
          </div>
          <div aria-hidden style={{ height: u(FLAP_OVERLAP) }} />
        </div>
      </div>

      {/* Front flap of the folder. */}
      <div
        className="relative rounded-[calc(100*var(--u))] bg-folder-blue"
        style={{ marginTop: u(-FLAP_OVERLAP), height: u(FLAP_HEIGHT) }}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId(project.id)}
          aria-label={isOpen ? "Close selected works" : "Open selected works"}
          onClick={isOpen ? close : open}
          className="absolute left-1/2 grid -translate-x-1/2 place-items-center rounded-full bg-paper transition-transform hover:scale-105 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-paper"
          style={{ top: u(25), width: uMin(100, 44), height: uMin(100, 44) }}
        >
          <img
            src="/images/hero/arrow-down-circle.svg"
            alt=""
            aria-hidden
            className="size-full"
            style={{
              rotate: isOpen ? "180deg" : "0deg",
              transition: reduceMotion ? "none" : "rotate 300ms ease",
            }}
          />
        </button>
      </div>
    </section>
  );
}

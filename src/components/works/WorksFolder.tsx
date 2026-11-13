"use client";

/* eslint-disable @next/next/no-img-element -- folder shape and arrow are SVGs */
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
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
const PANEL_TOP = 201;
const PEEK = 180; // visible panel height while closed (panel top → flap top + overlap)
const FLAP_OVERLAP = 140;
const FLAP_HEIGHT = 1350;

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
      className="relative scroll-mt-4"
      style={{ paddingTop: u(PANEL_TOP) }}
    >
      <img
        src="/images/works/folder-back.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 w-full"
        style={{ height: u(1461) }}
      />
      <h2
        id={`${id}-title`}
        className="absolute font-serif text-paper"
        style={{ left: u(78), top: u(41), fontSize: uMin(80, 26), lineHeight: 0.87, letterSpacing: "-0.05em" }}
      >
        / selected works
      </h2>

      {/* Panel: collapses to a peek while closed, grows to its content when open. */}
      <div className="relative grid" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", transition }}>
        <div
          className="overflow-hidden rounded-t-[calc(100*var(--u))] bg-paper shadow-[0_0_5px_0_rgb(0_0_0/0.25)]"
          style={{ minHeight: u(PEEK) }}
          aria-hidden={!isOpen}
          inert={!isOpen}
        >
          <ProjectTabs projects={projects} activeId={project.id} onSelect={selectProject} />
          <div role="tabpanel" id={panelId(project.id)} aria-labelledby={tabId(project.id)}>
            <ProjectCarousel project={project} works={works} reduceMotion={reduceMotion} />
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
          style={{ top: u(100), width: uMin(150, 52), height: uMin(150, 52) }}
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

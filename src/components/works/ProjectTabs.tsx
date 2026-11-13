"use client";

/* eslint-disable @next/next/no-img-element -- 50px tab icons (SVG) */
import { useRef, type KeyboardEvent } from "react";
import type { Project } from "@/data/types";
import { uMin } from "@/lib/units";

type Props = {
  projects: Project[];
  activeId: string;
  onSelect(id: string): void;
};

export const tabId = (id: string) => `work-tab-${id}`;
export const panelId = (id: string) => `work-panel-${id}`;

export function ProjectTabs({ projects, activeId, onSelect }: Props) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const move = (e: KeyboardEvent, index: number) => {
    const last = projects.length - 1;
    const target =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (target === null) return;
    e.preventDefault();
    const id = projects[target].id;
    onSelect(id);
    refs.current[id]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Projects"
      className="flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 [scrollbar-width:none] md:justify-center md:overflow-visible [&::-webkit-scrollbar]:hidden"
      style={{ gap: uMin(30, 10), paddingBlock: uMin(30, 14) }}
    >
      {projects.map((p, i) => {
        const selected = p.id === activeId;
        return (
          <button
            key={p.id}
            ref={(el) => {
              refs.current[p.id] = el;
            }}
            id={tabId(p.id)}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={panelId(p.id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(p.id)}
            onKeyDown={(e) => move(e, i)}
            className={`inline-flex shrink-0 snap-start items-center whitespace-nowrap rounded-[var(--radius-pill)] border-2 transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
              selected ? "border-brand-blue bg-folder-blue text-paper" : "border-separator bg-paper hover:bg-chip"
            }`}
            style={{
              height: uMin(84, 40),
              gap: uMin(20, 8),
              padding: `0 ${uMin(40, 16)} 0 ${uMin(35, 12)}`,
              fontSize: uMin(34, 15),
              color: selected ? undefined : `var(--color-${p.accent})`,
            }}
          >
            <img
              src={selected && p.iconActive ? p.iconActive : p.icon}
              alt=""
              aria-hidden
              style={{
                width: uMin(42, 20),
                height: uMin(42, 20),
                filter: selected && !p.iconActive ? "brightness(0) invert(1)" : undefined,
              }}
            />
            {p.name}
          </button>
        );
      })}
    </div>
  );
}

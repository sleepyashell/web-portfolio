"use client";

import { useCallback, useMemo, useState } from "react";
import type { Project } from "@/data/types";

export type WorksState = {
  isOpen: boolean;
  open(): void;
  close(): void;
  activeId: string;
  /** Selecting a project always goes back to its first slide. */
  selectProject(id: string): void;
  slide: number;
  /** 1 details slide + one slide per image. */
  slideCount: number;
  next(): void;
  prev(): void;
  goTo(index: number): void;
};

export function useWorksState(projects: Project[], defaultId: string): WorksState {
  const [isOpen, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(defaultId);
  const [slide, setSlide] = useState(0);

  const slideCount = useMemo(() => {
    const p = projects.find((x) => x.id === activeId);
    return 1 + (p?.images.length ?? 0);
  }, [projects, activeId]);

  const selectProject = useCallback((id: string) => {
    setActiveId(id);
    setSlide(0);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < slideCount) setSlide(index);
    },
    [slideCount],
  );

  return {
    isOpen,
    open: useCallback(() => setOpen(true), []),
    close: useCallback(() => setOpen(false), []),
    activeId,
    selectProject,
    slide,
    slideCount,
    next: useCallback(() => setSlide((s) => Math.min(s + 1, slideCount - 1)), [slideCount]),
    prev: useCallback(() => setSlide((s) => Math.max(s - 1, 0)), []),
    goTo,
  };
}

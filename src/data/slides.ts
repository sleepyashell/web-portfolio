import type { Project, ProjectImage } from "./types";

/** Groups a project's mockups into carousel slides: one laptop per slide, or three phones per slide. */
export function mockupSlides(project: Project): ProjectImage[][] {
  const size = project.mockup === "phone" ? 3 : 1;
  const slides: ProjectImage[][] = [];
  for (let i = 0; i < project.images.length; i += size) slides.push(project.images.slice(i, i + size));
  return slides;
}

export type ProjectImage = { src: string; alt: string };

export type Project = {
  id: string;
  name: string;
  logo: string;
  /** Tab label color, a theme color name (e.g. "kembali"). */
  accent: string;
  context: string;
  role: string;
  summary: string;
  problem: string;
  process: string;
  solution: string[];
  images: ProjectImage[];
  liveUrl?: string;
};

/** Matches the colored dot per chip in Figma: blue, red, orange, green. */
export type SkillCategory = "design" | "tool" | "language" | "framework";

export type Skill = { name: string; category: SkillCategory };

export type Contact = { label: string; value: string; href: string };

export type Profile = {
  name: string;
  shortName: string;
  headline: [string, string];
  intro: string;
  about: string[];
  education: string;
  cvUrl: string;
};

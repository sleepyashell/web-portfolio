export type ProjectImage = { src: string; alt: string };

export type Project = {
  id: string;
  name: string;
  /** Large logo on the details slide. */
  logo: string;
  /** Small icon inside the project tab. */
  icon: string;
  /** Icon for the selected (blue) tab; defaults to `icon` tinted white. */
  iconActive?: string;
  /** Tab label color, a theme color name (e.g. "kembali"). */
  accent: string;
  /** Shown as a "Team Project" label above the context line. */
  team: boolean;
  context: string;
  role: string;
  summary: string;
  problem: string;
  process: string;
  solution: string[];
  /** "laptop": one mockup per slide. "phone": three mockups side by side per slide. */
  mockup: "laptop" | "phone";
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
  cvUrl: string;
};

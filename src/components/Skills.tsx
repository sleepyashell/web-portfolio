/* eslint-disable @next/next/no-img-element -- 70px category dots (SVG) */
import type { CSSProperties } from "react";
import { skills } from "@/data/content";
import { u, uMin } from "@/lib/units";

// Chip top-left positions inside the 1920×1300 "Frame 34" in Figma.
const layout: Record<string, [x: number, y: number]> = {
  React: [602, 100],
  Photoshop: [917, 100],
  JavaScript: [200, 200],
  "Design Systems": [1317, 200],
  "User Research": [732, 300],
  "UX Design": [307, 400],
  "After Effects": [1206, 400],
  Prototyping: [216, 600],
  Python: [1397, 600],
  "Next.js": [271, 800],
  Illustrator: [1311, 800],
  Figma: [631, 890],
  CSS: [983, 890],
  HTML: [151, 1000],
  "Product Design": [1371, 1000],
  "Usability Testing": [476, 1100],
  "React Native": [951, 1100],
};

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative px-4 lg:px-0"
      style={{ paddingBlock: uMin(100, 48) }}
    >
      <div className="relative lg:h-[calc(1300*var(--u))]">
        <h2
          id="skills-title"
          className="text-center font-serif lg:absolute lg:inset-x-0 lg:top-[calc(530*var(--u))]"
          style={{ fontSize: uMin(200, 56), lineHeight: 1.2, letterSpacing: "-0.05em" }}
        >
          / skills
        </h2>

        <ul className="mt-8 flex flex-wrap justify-center gap-3 lg:mt-0 lg:block">
          {skills.map((s) => {
            const [x, y] = layout[s.name] ?? [0, 0];
            return (
              <li
                key={s.name}
                data-category={s.category}
                className="inline-flex items-center whitespace-nowrap rounded-[var(--radius-pill)] border-white bg-chip shadow-[var(--shadow-pill)] lg:absolute lg:left-[calc(50%+var(--x))] lg:top-[var(--y)]"
                style={
                  {
                    "--x": u(x - 960),
                    "--y": u(y),
                    height: uMin(100, 40),
                    borderWidth: uMin(3, 2),
                    gap: uMin(20, 8),
                    padding: `0 ${uMin(35, 14)} 0 ${uMin(12, 5)}`,
                    fontSize: uMin(40, 15),
                    letterSpacing: "-0.05em",
                  } as CSSProperties
                }
              >
                <img
                  src={`/images/skills/${s.category}.svg`}
                  alt=""
                  aria-hidden
                  style={{ width: uMin(70, 26), height: uMin(70, 26) }}
                />
                {s.name}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

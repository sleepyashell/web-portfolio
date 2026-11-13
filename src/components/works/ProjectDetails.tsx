/* eslint-disable @next/next/no-img-element -- project logos are small SVGs */
import type { Project } from "@/data/types";
import { u, uMin } from "@/lib/units";

// Looser than the global -5% tracking so long paragraphs stay readable.
const body = { fontSize: uMin(32, 15), lineHeight: 1.45, letterSpacing: "-0.02em" };
const heading = "font-medium";
const headingStyle = { fontSize: uMin(40, 18), marginTop: uMin(44, 20), marginBottom: uMin(8, 4), letterSpacing: "-0.04em" };

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <div
      className="flex flex-col items-center gap-6 px-5 md:flex-row md:items-center md:px-0"
      style={{ paddingLeft: `max(20px, ${u(207)})`, gap: uMin(70, 20) }}
    >
      <img
        src={project.logo}
        alt={`${project.name} logo`}
        className="shrink-0 object-contain"
        style={{ width: uMin(400, 120), height: uMin(400, 120) }}
      />

      {/* Figma column is 1035px; trimmed to 1000 so text clears the next-arrow even with a scrollbar. */}
      <div className="w-full shrink-0 md:w-[calc(1000*var(--u))]" style={body}>
        <p className="text-ink/60" style={{ fontSize: uMin(24, 13) }}>
          <span>{project.context}</span>
          <span aria-hidden> · </span>
          <span>{project.role}</span>
        </p>
        <p style={{ marginTop: uMin(12, 6) }}>{project.summary}</p>

        <h3 className={heading} style={headingStyle}>
          Problem
        </h3>
        <p>{project.problem}</p>

        <h3 className={heading} style={headingStyle}>
          Process
        </h3>
        <p>{project.process}</p>

        <h3 className={heading} style={headingStyle}>
          Solution
        </h3>
        <ul className="list-disc" style={{ paddingLeft: "1.2em" }}>
          {project.solution.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block underline underline-offset-4"
          >
            Visit site
          </a>
        )}
      </div>
    </div>
  );
}

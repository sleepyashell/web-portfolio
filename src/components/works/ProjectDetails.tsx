/* eslint-disable @next/next/no-img-element -- project logos are small SVGs */
import type { Project } from "@/data/types";
import { u, uMin } from "@/lib/units";

const body = { fontSize: uMin(32, 15), lineHeight: 1.25 };
const heading = "font-medium";
const headingStyle = { fontSize: uMin(40, 18), marginTop: uMin(38, 16) };

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

      <div className="w-full md:w-auto" style={{ maxWidth: `max(${u(1035)}, 100%)`, width: "100%", ...body }}>
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

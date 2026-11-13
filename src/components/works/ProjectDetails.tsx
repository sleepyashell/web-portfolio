/* eslint-disable @next/next/no-img-element -- project logos are small SVGs */
import type { Project } from "@/data/types";
import { uMin } from "@/lib/units";

// Fixed, readable sizes for long copy; the three blocks sit side by side on wide screens so the
// open folder fits in one window.
const body = { fontSize: "clamp(14px, 0.95vw, 17px)", lineHeight: 1.45, letterSpacing: "-0.015em" };
const headingStyle = { fontSize: "clamp(17px, 1.25vw, 22px)", marginBottom: "0.35em", letterSpacing: "-0.04em" };

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-medium" style={headingStyle}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <div
      // Phones: 20px gutters. md+: no left padding (logo column centres itself), right padding clears the arrow.
      className="flex flex-col items-center px-5 py-2 md:flex-row md:items-stretch md:py-[calc(20*var(--u))] md:pl-0 md:pr-[max(20px,calc(200*var(--u)))]"
      style={{ gap: uMin(40, 20) }}
    >
      {/* Logo sits centred (both axes) in its own column, between the folder edge and the text. */}
      <div className="flex shrink-0 items-center justify-center md:w-[calc(560*var(--u))]">
        <img
          src={project.logo}
          alt={`${project.name} logo`}
          className="object-contain"
          style={{ width: uMin(300, 110), height: uMin(300, 110) }}
        />
      </div>

      <div className="w-full min-w-0 flex-1 self-center" style={body}>
        <p className="text-ink/60" style={{ fontSize: "clamp(12px, 0.8vw, 14px)" }}>
          {project.team && (
            <>
              <span>Team Project</span>
              <span aria-hidden> · </span>
            </>
          )}
          <span>{project.context}</span>
          <span aria-hidden> · </span>
          <span>{project.role}</span>
        </p>
        <p className="font-medium" style={{ marginTop: "0.4em", fontSize: "clamp(17px, 1.4vw, 24px)", lineHeight: 1.25, letterSpacing: "-0.03em" }}>
          {project.summary}
        </p>

        <div className="grid gap-6 lg:grid-cols-3" style={{ marginTop: uMin(40, 20), columnGap: uMin(48, 24) }}>
          <Block title="Problem">
            <p>{project.problem}</p>
          </Block>
          <Block title="Process">
            <p>{project.process}</p>
          </Block>
          <Block title="Solution">
            <ul className="list-disc space-y-1" style={{ paddingLeft: "1.1em" }}>
              {project.solution.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Block>
        </div>

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

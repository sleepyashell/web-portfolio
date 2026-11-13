import { profile } from "@/data/content";
import { u, uMin } from "@/lib/units";

// Figma "Frame 33": 900px tall, title at y=158, body at y=278, 1590px wide.
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative text-center"
      style={{
        marginTop: u(100),
        minHeight: u(900),
        paddingTop: uMin(158, 64),
        paddingBottom: uMin(120, 64),
        backgroundImage: "radial-gradient(circle, #d1d1d6 1.2px, transparent 1.6px)",
        backgroundSize: "22px 22px",
        maskImage: "linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
      }}
    >
      <h2
        id="about-title"
        className="font-serif"
        style={{ fontSize: uMin(80, 36), lineHeight: 0.87, letterSpacing: "-0.05em" }}
      >
        / about me
      </h2>
      <div
        className="mx-auto px-5 md:px-0"
        style={{
          marginTop: uMin(40, 24),
          maxWidth: `max(${u(1590)}, min(100%, 640px))`,
          fontSize: uMin(48, 17),
          lineHeight: 1.3,
          letterSpacing: "-0.04em",
        }}
      >
        {profile.about.map((p) => (
          <p key={p} style={{ marginTop: "1.1em" }} className="first:mt-0">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

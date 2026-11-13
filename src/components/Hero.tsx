"use client";
/* eslint-disable @next/next/no-img-element -- small decorative SVGs, next/image adds nothing here */

import Image from "next/image";
import { profile } from "@/data/content";
import { u, uMin } from "@/lib/units";
import { FloatingIcon, type FloatingIconProps } from "./FloatingIcon";

// Positions measured from Figma frame "FOLDER CLOSED 3" (node 24:1080).
const icons: FloatingIconProps[] = [
  { src: "/images/hero/icons/photoshop.webp", x: 163, y: 755, width: 111, height: 112, rotate: 0, delay: 0 },
  { src: "/images/hero/icons/github.webp", x: 292, y: 934, width: 182, height: 171, rotate: -13.6, delay: 1.2 },
  { src: "/images/hero/icons/after-effects.webp", x: 114, y: 1212, width: 142, height: 142, rotate: 4.3, delay: 2.4 },
  { src: "/images/hero/icons/instagram.webp", x: 1589, y: 736, width: 159, height: 167, rotate: -9.49, delay: 0.6 },
  { src: "/images/hero/icons/illustrator.webp", x: 1466, y: 1004, width: 98, height: 99, rotate: 16.1, delay: 1.8 },
  { src: "/images/hero/icons/figma.webp", x: 1603, y: 1166, width: 204, height: 194, rotate: -5.8, delay: 3 },
];

// Blue ring gradient from Figma, expressed relative to its 2082×1562 box.
const ringGradient =
  "radial-gradient(ellipse 160.6% 160.6% at 50% -34.82%, #fff 47.59%, #cbebff 53.24%, #98d7ff 58.89%, #64c3ff 64.54%, #4ab9ff 67.37%, #30afff 70.19%, #4ab9ff 71.87%, #64c3ff 73.56%, #98d7ff 76.92%, #cbebff 80.28%, #fff 83.64%)";

const pill =
  "inline-flex items-center rounded-[var(--radius-pill)] shadow-[var(--shadow-pill)] transition-transform hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-blue";

export function Hero({ onViewWork }: { onViewWork: () => void }) {
  const pillStyle = {
    height: uMin(100, 56),
    gap: uMin(20, 10),
    padding: `0 ${uMin(45, 22)} 0 ${uMin(13, 8)}`,
    fontSize: uMin(40, 18),
  };
  const iconSize = uMin(70, 40);

  return (
    <section aria-labelledby="hero-title" className="relative isolate flow-root text-center" style={{ minHeight: u(1900) }}>
      <div
        aria-hidden
        className="absolute left-1/2 -z-10 -translate-x-1/2"
        style={{
          top: u(-89),
          width: u(2082),
          height: u(1562),
          backgroundImage: ringGradient,
          filter: `blur(${u(52.35)})`,
        }}
      />

      {icons.map((icon) => (
        <FloatingIcon key={icon.src} {...icon} />
      ))}

      <p style={{ marginTop: uMin(200, 72), fontSize: uMin(120, 40), letterSpacing: "-0.05em", lineHeight: 1.2 }}>
        Hello, I’m {profile.shortName}
      </p>

      <div className="relative z-10 px-4">
        <h1
          id="hero-title"
          className="relative font-serif italic md:whitespace-nowrap"
          style={{ marginTop: u(34), fontSize: uMin(180, 48), lineHeight: 0.87, letterSpacing: "-0.05em" }}
        >
          {/* Decorative "&" sized in em so it scales with the headline (186×200 at 180px in Figma). */}
          <img
            aria-hidden
            alt=""
            src="/images/hero/ampersand.svg"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2"
            style={{ top: "0.317em", width: "1.033em", height: "1.111em" }}
          />
          <span className="block">{profile.headline[0]}</span>
          <span className="block">{profile.headline[1]}</span>
        </h1>
      </div>

      <div className="relative mx-auto" style={{ marginTop: u(-49), width: uMin(743, 280) }}>
        <div
          className="mx-auto aspect-[700/840] rotate-3 bg-paper shadow-[var(--shadow-polaroid)]"
          style={{ width: "94.2%" }}
        >
          <div className="relative mx-auto" style={{ top: "3.33%", width: "92%", height: "76.67%" }}>
            <Image
              src="/images/hero/photo.webp"
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 260px"
              className="object-cover object-[50%_38%]"
            />
          </div>
        </div>
      </div>

      <p
        className="mx-auto px-4 md:px-0"
        style={{
          marginTop: uMin(33, 24),
          maxWidth: `max(${u(1394)}, min(100%, 640px))`,
          fontSize: uMin(48, 18),
          letterSpacing: "-0.05em",
          lineHeight: 1.2,
        }}
      >
        {profile.intro}
      </p>

      <div
        className="flex flex-wrap items-center justify-center px-4"
        style={{ marginTop: uMin(80, 28), gap: uMin(50, 16), paddingBottom: uMin(60, 48) }}
      >
        <button
          type="button"
          onClick={onViewWork}
          className={`${pill} border-2 border-paper bg-brand-blue text-paper`}
          style={pillStyle}
        >
          <img aria-hidden alt="" src="/images/hero/arrow-down-circle.svg" style={{ width: iconSize, height: iconSize }} />
          View Work
        </button>
        <a
          href={profile.cvUrl}
          download
          className={`${pill} border-2 border-brand-blue bg-paper text-ink`}
          style={pillStyle}
        >
          <span
            aria-hidden
            className="grid place-items-center rounded-full bg-brand-blue"
            style={{ width: iconSize, height: iconSize }}
          >
            <img alt="" src="/images/hero/download.svg" style={{ width: "43%", height: "auto" }} />
          </span>
          Download CV
        </a>
      </div>
    </section>
  );
}

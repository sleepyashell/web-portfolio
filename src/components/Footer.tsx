import { contacts } from "@/data/content";
import { u, uMin } from "@/lib/units";

// Figma "Frame 9": black, 658px tall; title at (145,130), contacts row at y=294 with 70px gaps.
export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-ink text-paper"
      style={{
        minHeight: u(658),
        padding: `${uMin(130, 56)} max(20px, ${u(145)}) ${uMin(120, 56)}`,
      }}
    >
      <h2
        className="font-serif italic"
        style={{ fontSize: uMin(100, 44), lineHeight: 0.87, letterSpacing: "-0.05em" }}
      >
        Let’s Connect!
      </h2>

      <ul
        className="flex flex-col flex-wrap sm:flex-row"
        style={{ marginTop: uMin(77, 32), columnGap: uMin(70, 32), rowGap: uMin(24, 20) }}
      >
        {contacts.map((c) => {
          const external = !c.href.startsWith("mailto:");
          return (
            <li key={c.label}>
              <a
                href={c.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
              >
                <span className="block font-medium" style={{ fontSize: uMin(30, 18), letterSpacing: "-0.05em" }}>
                  {c.label}
                </span>
                <span
                  className="mt-1 block text-paper/80 underline-offset-4 group-hover:underline"
                  style={{ fontSize: uMin(24, 15), letterSpacing: "-0.05em" }}
                >
                  {c.value}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}

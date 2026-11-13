import { profile } from "@/data/content";
import { u, uMin } from "@/lib/units";

export function TopBar() {
  return (
    <header
      className="absolute inset-x-0 top-0 z-20 grid grid-cols-3 items-center"
      style={{ padding: `${uMin(50, 16)} ${uMin(50, 16)} 0`, fontSize: uMin(24, 13) }}
    >
      <span className="truncate">{profile.name}</span>
      <span className="text-center">Portfolio</span>
      <span className="text-right" style={{ letterSpacing: u(-1.2) }}>
        2026
      </span>
    </header>
  );
}

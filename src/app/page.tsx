"use client";

import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";

export default function Home() {
  const viewWork = () => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="relative overflow-x-clip">
      <TopBar />
      <Hero onViewWork={viewWork} />
    </main>
  );
}

"use client";

import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";
import { WorksFolder } from "@/components/works/WorksFolder";
import { useWorksState } from "@/components/works/useWorksState";
import { defaultProjectId, projects } from "@/data/content";

export default function Home() {
  const works = useWorksState(projects, defaultProjectId);

  const viewWork = () => {
    works.open();
    document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative overflow-x-clip">
      <TopBar />
      <Hero onViewWork={viewWork} />
      <WorksFolder works={works} projects={projects} />
    </main>
  );
}

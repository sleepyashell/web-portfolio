"use client";

import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
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
      <About />
      <Skills />
      <Footer />
    </main>
  );
}

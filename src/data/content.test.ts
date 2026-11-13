import { contacts, defaultProjectId, profile, projects, skills } from "./content";

describe("content", () => {
  it("lists projects in Figma tab order", () => {
    expect(projects.map((p) => p.id)).toEqual([
      "salingjaga",
      "kembali",
      "jagaborneo",
      "rintis-ai",
      "pahamind",
    ]);
  });

  it("defaults to an existing project", () => {
    expect(projects.some((p) => p.id === defaultProjectId)).toBe(true);
    expect(defaultProjectId).toBe("kembali");
  });

  it.each(projects.map((p) => [p.name, p] as const))("%s has complete content", (_, p) => {
    expect(p.context).not.toBe("");
    expect(p.role).not.toBe("");
    expect(p.summary).not.toBe("");
    expect(p.problem).not.toBe("");
    expect(p.process).not.toBe("");
    expect(p.solution.length).toBeGreaterThanOrEqual(3);
    expect(p.images.length).toBeGreaterThanOrEqual(1);
    p.images.forEach((img) => expect(img.alt).not.toBe(""));
  });

  it("has no live URLs until confirmed", () => {
    expect(projects.every((p) => p.liveUrl === undefined)).toBe(true);
  });

  it("has 17 skills", () => {
    expect(skills).toHaveLength(17);
  });

  it("has two headline lines and two about paragraphs", () => {
    expect(profile.headline).toEqual(["Product Designer", "Front-end Developer"]);
    expect(profile.about).toHaveLength(2);
  });

  it("uses mailto for email and https elsewhere", () => {
    contacts.forEach((c) =>
      expect(c.href).toMatch(c.label === "Email" ? /^mailto:/ : /^https:\/\//),
    );
  });
});

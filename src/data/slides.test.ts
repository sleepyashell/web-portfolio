import { projects } from "./content";
import { mockupSlides } from "./slides";

const byId = (id: string) => projects.find((p) => p.id === id)!;

describe("mockupSlides", () => {
  it("puts one laptop mockup per slide", () => {
    expect(mockupSlides(byId("jagaborneo")).map((s) => s.length)).toEqual([1, 1, 1]);
    expect(mockupSlides(byId("rintis-ai")).map((s) => s.length)).toEqual([1, 1]);
  });

  it("puts three phone mockups per slide, remainder on the last", () => {
    expect(mockupSlides(byId("salingjaga")).map((s) => s.length)).toEqual([3, 3, 3]);
    expect(mockupSlides(byId("kembali")).map((s) => s.length)).toEqual([3, 3, 2]);
    expect(mockupSlides(byId("pahamind")).map((s) => s.length)).toEqual([3, 3, 2]);
  });
});

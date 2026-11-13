import { render, screen, within } from "@testing-library/react";
import { About } from "./About";
import { Skills } from "./Skills";
import { profile, skills } from "@/data/content";

describe("About", () => {
  it("renders the heading, both paragraphs and education", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 2, name: "/ about me" })).toBeInTheDocument();
    profile.about.forEach((p) => expect(screen.getByText(p)).toBeInTheDocument());
    expect(screen.getByText(profile.education)).toBeInTheDocument();
  });
});

describe("Skills", () => {
  it("renders the heading and every skill as a list item", () => {
    render(<Skills />);
    expect(screen.getByRole("heading", { level: 2, name: "/ skills" })).toBeInTheDocument();
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items.map((li) => li.textContent)).toEqual(skills.map((s) => s.name));
  });

  it("marks each chip with its category", () => {
    render(<Skills />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    items.forEach((li, i) => expect(li).toHaveAttribute("data-category", skills[i].category));
    expect(new Set(items.map((li) => li.dataset.category)).size).toBe(4);
  });
});

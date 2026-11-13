import { render, screen, within } from "@testing-library/react";
import { Footer } from "./Footer";
import { contacts } from "@/data/content";

const escape = (s: string) => s.replace(/[.*+?^$()|[\]\\{}]/g, "\\$&");

describe("Footer", () => {
  it("renders the Let’s Connect heading", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { level: 2, name: "Let’s Connect!" })).toBeInTheDocument();
  });

  it("links every contact with its label and value", () => {
    render(<Footer />);
    contacts.forEach((c) => {
      const link = screen.getByRole("link", { name: new RegExp(escape(c.label) + ".*" + escape(c.value)) });
      expect(link).toHaveAttribute("href", c.href);
    });
  });

  it("opens external links in a new tab safely, but not mailto", () => {
    render(<Footer />);
    within(screen.getByRole("contentinfo"))
      .getAllByRole("link")
      .forEach((a) => {
        if (a.getAttribute("href")!.startsWith("mailto:")) {
          expect(a).not.toHaveAttribute("target");
        } else {
          expect(a).toHaveAttribute("target", "_blank");
          expect(a).toHaveAttribute("rel", "noopener noreferrer");
        }
      });
  });
});

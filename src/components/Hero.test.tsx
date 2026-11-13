import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hero } from "./Hero";
import { TopBar } from "./TopBar";
import { profile } from "@/data/content";

describe("Hero", () => {
  it("renders the greeting and both headline lines in the h1", () => {
    render(<Hero onViewWork={() => {}} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Product Designer");
    expect(h1).toHaveTextContent("Front-end Developer");
    expect(screen.getByText("Hello, I’m Umar")).toBeInTheDocument();
  });

  it("shows the portrait with descriptive alt text", () => {
    render(<Hero onViewWork={() => {}} />);
    expect(
      screen.getByRole("img", { name: "Portrait of Syuraih Umar Khotthob" }),
    ).toBeInTheDocument();
  });

  it("keeps the floating tool icons out of the accessibility tree", () => {
    render(<Hero onViewWork={() => {}} />);
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  it("calls onViewWork when View Work is clicked", async () => {
    const onViewWork = vi.fn();
    render(<Hero onViewWork={onViewWork} />);
    await userEvent.click(screen.getByRole("button", { name: "View Work" }));
    expect(onViewWork).toHaveBeenCalledOnce();
  });

  it("shows Download CV as a decorative, non-interactive pill", () => {
    render(<Hero onViewWork={() => {}} />);
    expect(screen.getByText("Download CV")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /download cv/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /download cv/i })).not.toBeInTheDocument();
  });

  it("shows the intro line", () => {
    render(<Hero onViewWork={() => {}} />);
    expect(screen.getByText(profile.intro)).toBeInTheDocument();
  });
});

describe("TopBar", () => {
  it("shows name, label and year", () => {
    render(<TopBar />);
    expect(screen.getByText("Syuraih Umar Khotthob")).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });
});

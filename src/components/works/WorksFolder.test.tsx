import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { projects } from "@/data/content";
import { WorksFolder } from "./WorksFolder";
import { useWorksState } from "./useWorksState";

function Harness() {
  const works = useWorksState(projects, "salingjaga");
  return <WorksFolder works={works} projects={projects} />;
}

function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduce && query.includes("reduce"),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("WorksFolder", () => {
  beforeEach(() => mockReducedMotion(false));

  it("starts closed with only the open button", () => {
    render(<Harness />);
    expect(screen.getByRole("button", { name: "Open selected works" })).toBeInTheDocument();
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("opens to five tabs with SalingJaga selected", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open selected works" }));
    const tabs = within(screen.getByRole("tablist")).getAllByRole("tab");
    expect(tabs.map((t) => t.textContent)).toEqual([
      "SalingJaga",
      "Kembali",
      "JagaBorneo",
      "Rintis AI",
      "Pahamind",
    ]);
    expect(screen.getByRole("tab", { name: "SalingJaga" })).toHaveAttribute("aria-selected", "true");
  });

  it("shows context, role and the three content headings on the first slide", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open selected works" }));
    const panel = within(screen.getByRole("tabpanel")).getByRole("group", { name: "1 of 4" });
    expect(within(panel).getByText(projects[0].context)).toBeInTheDocument();
    expect(panel).toHaveTextContent("Team Project");
    expect(within(panel).getByText(projects[0].role)).toBeInTheDocument();
    for (const h of ["Problem", "Process", "Solution"]) {
      expect(within(panel).getByRole("heading", { name: h })).toBeInTheDocument();
    }
  });

  it("moves between slides with arrow keys and disables prev on the first slide", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open selected works" }));
    expect(screen.getByRole("button", { name: "Previous slide" })).toBeDisabled();
    screen.getByRole("region", { name: /SalingJaga/ }).focus();
    await userEvent.keyboard("{ArrowRight}");
    for (const n of [1, 2, 3]) {
      expect(await screen.findByRole("img", { name: `SalingJaga screen ${n}` })).toBeInTheDocument();
    }
    expect(screen.getByRole("group", { name: "2 of 4" })).toBeInTheDocument();
  });

  it("switches tab with the keyboard and resets to the first slide", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open selected works" }));
    await userEvent.click(screen.getByRole("button", { name: "Next slide" }));
    screen.getByRole("tab", { name: "SalingJaga" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    const kembali = screen.getByRole("tab", { name: "Kembali" });
    expect(kembali).toHaveFocus();
    expect(kembali).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("button", { name: "Go to slide 1" })).toHaveAttribute("aria-current", "true");
  });

  it("closes and returns focus to the open button", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open selected works" }));
    await userEvent.click(screen.getByRole("button", { name: "Close selected works" }));
    const openBtn = screen.getByRole("button", { name: "Open selected works" });
    expect(openBtn).toHaveFocus();
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("skips animation when the user prefers reduced motion", () => {
    mockReducedMotion(true);
    const { container } = render(<Harness />);
    expect(container.querySelector("[data-reduced-motion]")).toHaveAttribute("data-reduced-motion", "true");
  });

  it("shows no Visit site link for projects without liveUrl", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open selected works" }));
    expect(screen.queryByRole("link", { name: /visit site/i })).not.toBeInTheDocument();
  });
});


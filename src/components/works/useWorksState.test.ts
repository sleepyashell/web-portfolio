import { act, renderHook } from "@testing-library/react";
import { projects } from "@/data/content";
import { useWorksState } from "./useWorksState";

const setup = () => renderHook(() => useWorksState(projects, "salingjaga"));

describe("useWorksState", () => {
  it("starts closed on the default project, first slide", () => {
    const { result } = setup();
    expect(result.current.isOpen).toBe(false);
    expect(result.current.activeId).toBe("salingjaga");
    expect(result.current.slide).toBe(0);
    expect(result.current.slideCount).toBe(4);
  });

  it("opens and closes", () => {
    const { result } = setup();
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it("clamps next and prev at the ends", () => {
    const { result } = setup();
    act(() => {
      for (let i = 0; i < 10; i++) result.current.next();
    });
    expect(result.current.slide).toBe(result.current.slideCount - 1);
    act(() => {
      for (let i = 0; i < 10; i++) result.current.prev();
    });
    expect(result.current.slide).toBe(0);
  });

  it("resets to the first slide when switching project", () => {
    const { result } = setup();
    act(() => result.current.next());
    act(() => result.current.selectProject("pahamind"));
    expect(result.current.activeId).toBe("pahamind");
    expect(result.current.slide).toBe(0);
  });

  it("jumps to a slide with goTo and ignores out-of-range values", () => {
    const { result } = setup();
    act(() => result.current.goTo(1));
    expect(result.current.slide).toBe(1);
    act(() => result.current.goTo(9));
    expect(result.current.slide).toBe(1);
  });
});

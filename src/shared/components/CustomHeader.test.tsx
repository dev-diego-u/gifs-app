import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader", () => {
  test("should render the title correctly", () => {
    render(<CustomHeader title="mundial" />);
    const title = screen.getByText("mundial");
    // console.log(title.innerHTML);
    expect(title.innerHTML).toBe("mundial");
  });

  test("should render the description when provided", () => {
    render(<CustomHeader title="mundial" description="buen dia" />);

    // screen.debug();
    expect(screen.getByText("buen dia")).toBeTruthy(); //tobetruthy significa que el elemento existe
  });

  test("should not render description when not provided", () => {
    const { container } = render(<CustomHeader title="hola" />);
    const divElement = container.querySelector(".content-center");
    const p = divElement?.querySelector("p");
    expect(p).toBeNull();
  });
});

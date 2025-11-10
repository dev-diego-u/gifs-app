import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { GifsApp } from "./GifsApp";

describe("GifsApp Component", () => {
  test("should render the GifsApp component correctly", () => {
    const { container } = render(<GifsApp />);
    // screen.debug();

    expect(container).toMatchSnapshot();
  });
});

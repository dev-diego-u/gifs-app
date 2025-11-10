import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

describe("MyCounterApp Component", () => {
  test("should render the MyCounterApp component correctly", () => {
    render(<MyCounterApp />);

    // screen.debug();

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      "Counter: 5"
    );

    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Reset" })).toBeDefined();
  });

  test("should increment the counter", () => {
    render(<MyCounterApp />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const addButton = screen.getByRole("button", { name: "+1" });

    fireEvent.click(addButton);
    // screen.debug();
    expect(h1.innerHTML).toContain("Counter: 6");
  });

  test("should decrement the counter", () => {
    render(<MyCounterApp />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const subtractButton = screen.getByRole("button", { name: "-1" });
    fireEvent.click(subtractButton);
    // screen.debug();
    expect(h1.innerHTML).toContain("Counter: 4");
  });

  test("should reset the counter", () => {
    render(<MyCounterApp />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const addButton = screen.getByRole("button", { name: "+1" });
    const resetButton = screen.getByRole("button", { name: "Reset" });
    fireEvent.click(addButton);
    fireEvent.click(resetButton);
    // screen.debug();
    expect(h1.innerHTML).toContain("Counter: 5");
  });
});

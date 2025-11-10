import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MyCounterApp } from "./MyCounterApp";
// import { useCounter } from "../hooks/useCounter";

const handleAdd = vi.fn();
const handleSubtract = vi.fn();
const handleReset = vi.fn();

vi.mock("../hooks/useCounter", () => {
  return {
    useCounter: () => ({
      counter: 200,
      handleAdd: handleAdd,
      handleSubtract: handleSubtract,
      handleReset: handleReset,
    }),
  };
});

describe("MyCounterApp Component", () => {
  test("should render the  component", () => {
    render(<MyCounterApp />);

    // screen.debug();

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      "Counter: 200"
    );

    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Reset" })).toBeDefined();
  });

  test("should call handleAdd when +1 button is clicked", () => {
    render(<MyCounterApp />);
    const addButton = screen.getByRole("button", { name: "+1" });

    fireEvent.click(addButton);
    expect(handleAdd).toHaveBeenCalled();
  });

  test("should call handleSubtract when -1 button is clicked", () => {
    render(<MyCounterApp />);
    const subtractButton = screen.getByRole("button", { name: "-1" });
    fireEvent.click(subtractButton);
    expect(handleSubtract).toHaveBeenCalled();
  });

  test("should call handleReset when Reset button is clicked", () => {
    render(<MyCounterApp />);
    const resetButton = screen.getByRole("button", { name: "Reset" });
    fireEvent.click(resetButton);
    expect(handleReset).toHaveBeenCalled();
  });
});

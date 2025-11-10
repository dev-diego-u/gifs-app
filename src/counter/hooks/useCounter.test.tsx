import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  test("should initialize counter with default value", () => {
    // inicializa con valor dado
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.counter).toBe(10);
  });

  test("should increment counter", () => {
    // suma 1 al contador
    const { result } = renderHook(() => useCounter(0));
    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(1);
  });

  test("should decrement counter", () => {
    // resta 1 al contador
    const { result } = renderHook(() => useCounter(0));
    act(() => {
      result.current.handleSubtract();
    });
    expect(result.current.counter).toBe(-1);
  });

  test("should reset counter", () => {
    // reinicia al valor inicial
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.handleReset();
    });
    expect(result.current.counter).toBe(5);
  });
});

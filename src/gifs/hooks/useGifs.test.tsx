import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import * as gifActions from "../actions/get-gifs-by-query.action";

describe("useGifs.tsx", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs()); //
    const { gifs, previousTerms, handleSearch, handleTermClick } =
      result.current;
    expect(gifs).toBeDefined();
    expect(previousTerms).toBeDefined();
    expect(handleSearch).toBeDefined();
    expect(handleTermClick).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs()); //

    await act(async () => {
      await result.current.handleSearch("vegeta");
    });

    // console.log(result.current.gifs);
    expect(result.current.gifs.length).toBe(30);
  });

  test("should return a list of gifs when handleTermClick is called", async () => {
    const { result } = renderHook(() => useGifs()); //
    await act(async () => {
      await result.current.handleTermClick("broly");
    });

    expect(result.current.gifs.length).toBe(30);
  });

  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClick("goku");
    });

    expect(result.current.gifs.length).toBe(30);

    vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
      new Error("This is my custom error")
    );

    await act(async () => {
      await result.current.handleTermClick("goku");
    });

    expect(result.current.gifs.length).toBe(30);
  });

  test("should return no more than 3 previous terms", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);
    await act(async () => {
      await result.current.handleSearch("goku");
      await result.current.handleSearch("vegeta");
      await result.current.handleSearch("broly");
      await result.current.handleSearch("freezer");
    });
    // console.log(result.current.previousTerms);
    expect(result.current.previousTerms.length).toBe(3);
    expect(result.current.previousTerms).toEqual([
      "freezer",
      "broly",
      "vegeta",
    ]);
  });

  test("should not add repeated previous terms", async () => {
    const { result } = renderHook(() => useGifs());

    // vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);
    await act(async () => {
      await result.current.handleSearch("goku");
      await result.current.handleSearch("goku");
    });
    // console.log(result.current.previousTerms);
    expect(result.current.previousTerms.length).toBe(1);
    expect(result.current.previousTerms).toEqual(["goku"]);
  });
  test("should store multiple queries in gifCache", async () => {
    const { result } = renderHook(() => useGifs());
    await act(async () => {
      await result.current.handleSearch("goku");
      await result.current.handleSearch("naruto");
      await result.current.handleSearch("luffy");
    });
    // Accede al cache y verifica
    expect(Object.keys(result.current.gifCache.current)).toEqual([
      "goku",
      "naruto",
      "luffy",
    ]);
  });
});

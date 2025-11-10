import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe("giphy.api", () => {
  test("should be configured correctly", () => {
    // console.log(giphyApi.defaults);
    const { api_key, lang } = giphyApi.defaults.params;
    expect(giphyApi.defaults.baseURL).toBe("https://api.giphy.com/v1/gifs");
    expect(api_key).toBeDefined();
    expect(lang).toBe("es");
  });
});

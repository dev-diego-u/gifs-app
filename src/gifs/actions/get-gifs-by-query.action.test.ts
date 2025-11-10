import { giphySearchResponseMock } from "./../../../tests/mock/giphy.response.data";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";
import { giphyApi } from "../api/giphy.api";
import AxiosMockAdapter from "axios-mock-adapter";

describe("Placeholder test file", () => {
  let axiosMock: AxiosMockAdapter;

  beforeEach(() => {
    axiosMock = new AxiosMockAdapter(giphyApi);
  });
  // test("should return a list of gifs", async () => {
  //   const gifs = await getGifsByQuery("cats");
  //   // console.log(gifs);

  //   const [firstGif] = gifs;
  //   expect(gifs.length).toBe(30);
  //   expect(firstGif).toEqual({
  //     id: expect.any(String),
  //     title: expect.any(String),
  //     url: expect.any(String),
  //     width: expect.any(Number),
  //     height: expect.any(Number),
  //   });
  // });

  test("should return a list of gifs ", async () => {
    axiosMock.onGet("/search").reply(200, giphySearchResponseMock);
    const gifs = await getGifsByQuery("dogs");
    // console.log(gifs);
    expect(gifs.length).toBe(30);
    gifs.forEach((gif) => {
      expect(gif).toEqual({
        id: expect.any(String),
        title: expect.any(String),
        url: expect.any(String),
        width: expect.any(Number),
        height: expect.any(Number),
      });
    });
  });

  test("should return an empty ", async () => {
    axiosMock.restore(); // desmonta cualquier mock previo
    const gifs = await getGifsByQuery("");
    expect(gifs.length).toBe(0);
  });

  test("should handle error when API fails", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {}); // mock de console.error
    axiosMock.onGet("/search").reply(400, { message: "Bad Request" }); //
    const gifs = await getGifsByQuery("error-test");
    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled(); // verifica que se llamó a console.error
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything()); // verifica que se llamó con algún mensaje de error
  });
});

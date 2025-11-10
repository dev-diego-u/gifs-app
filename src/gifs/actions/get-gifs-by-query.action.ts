import { GiphyResponse } from "../interfaces/giphy.response";
import { Gif } from "../interfaces/gif.interface";
import { giphyApi } from "../api/giphy.api";
let contador = 0;
export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  contador++;
  // console.log("Solicitud número:", contador);

  //ahorrar llamadas innecesarias a la API si la query está vacía
  if (query.trim().length === 0) {
    return [];
  }

  try {
    const response = await giphyApi<GiphyResponse>("/search", {
      params: {
        q: query,
        limit: 30,
      },
    });
    // return response.data.data;
    // console.log(response.data.data);

    return response.data.data.map((gif) => ({
      id: gif.id,
      title: gif.title,
      url: gif.images.original.url,
      width: parseInt(gif.images.original.width),
      height: parseInt(gif.images.original.height),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

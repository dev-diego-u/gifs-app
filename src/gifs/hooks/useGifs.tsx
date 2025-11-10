import { useRef, useState } from "react";
import { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

// Caché simple en memoria
// const gifCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  // términos buscados
  const [previousTerms, setpreviousTerms] = useState<string[]>([]);
  // lista de gifs
  const [gifs, setGifs] = useState<Gif[]>([]);

  const gifCache = useRef<Record<string, Gif[]>>({});

  // función para limitar el tamaño del caché
  function limitCacheSize(cache: Record<string, Gif[]>, max: number) {
    if (Object.keys(cache).length > max) {
      const oldestKey = Object.keys(cache)[0];
      delete cache[oldestKey];
    }
  }

  // buscar por término previo
  const handleTermClick = async (term: string) => {
    try {
      // console.log(gifCache);
      if (gifCache.current[term]) {
        setGifs(gifCache.current[term]);
        return;
      }
      const gifs = await getGifsByQuery(term);
      setGifs(gifs);
      gifCache.current[term] = gifs;
      limitCacheSize(gifCache.current, 100);
    } catch (error) {
      console.error("Error al buscar GIFs:", error);
      setGifs([]);
    }
  };

  // buscar por texto ingresado
  const handleSearch = async (query: string) => {
    query = query.trim().toLowerCase();
    if (query.length === 0) return;
    if (previousTerms.includes(query)) return;
    setpreviousTerms((prev) => {
      if (prev.includes(query)) return prev;
      return [query, ...prev].slice(0, 3);
    });
    try {
      if (gifCache.current[query]) {
        setGifs(gifCache.current[query]);
        return;
      }
      const gifs = await getGifsByQuery(query);
      setGifs(gifs);
      gifCache.current[query] = gifs;
      limitCacheSize(gifCache.current, 100);
      // console.log(gifCache);
    } catch (error) {
      console.error("Error al buscar GIFs:", error);
      setGifs([]);
    }
  };

  return {
    previousTerms,
    gifs,
    gifCache, // solo para pruebas
    handleTermClick,
    handleSearch,
  };
};

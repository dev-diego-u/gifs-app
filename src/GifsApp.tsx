// Datos mock
// import { mockGifs } from "./mock-data/gifs.mock";

// Componentes compartidos
import { CustomHeader } from "./shared/components/CustomHeader";
import SearchBar from "./shared/components/SearchBar";

// Componentes de gifs
import PreviousSearches from "./gifs/components/PreviousSearches";
import GifList from "./gifs/components/GifList";
import { useState } from "react";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  // Estado para almacenar los términos de búsquedas anteriores
  const [previousTerms, setpreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]); // ✅ Tipar como Gif[]

  /**
   * Maneja el click en un término de búsqueda previa
   * @param term - Término de búsqueda seleccionado
   */
  const handleTermClick = async (term: string) => {
    try {
      const gifs = await getGifsByQuery(term);
      setGifs(gifs);
    } catch (error) {
      console.error("Error al buscar GIFs:", error);
      setGifs([]);
    }
  };

  /**
   * Maneja la búsqueda desde la barra de búsqueda
   * @param query - Consulta de búsqueda ingresada por el usuario
   */
  const handleSearch = async (query: string) => {
    query = query.trim().toLowerCase();

    if (query.length === 0) return;

    // Solo agregar a términos previos si NO existe
    if (!previousTerms.includes(query)) {
      setpreviousTerms((prev) => [query, ...prev].slice(0, 3));
    }

    try {
      const gifs = await getGifsByQuery(query);
      setGifs(gifs);
    } catch (error) {
      console.error("Error al buscar GIFs:", error);
      setGifs([]);
    }
  };

  return (
    <>
      {/* Header principal de la aplicación */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto"
      />

      {/* Barra de búsqueda - permite buscar nuevos GIFs */}
      <SearchBar placeholder="Buscar gifs..." onQuery={handleSearch} />

      {/* Lista de búsquedas previas - permite repetir búsquedas */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClick={handleTermClick}
      />

      {/* Galería de GIFs - muestra los resultados */}
      <GifList mockGifs={gifs} />
    </>
  );
};

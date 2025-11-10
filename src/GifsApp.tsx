// Datos mock
// import { mockGifs } from "./mock-data/gifs.mock";

// Componentes compartidos
import { CustomHeader } from "./shared/components/CustomHeader";
import SearchBar from "./shared/components/SearchBar";

// Componentes de gifs
import PreviousSearches from "./gifs/components/PreviousSearches";
import GifList from "./gifs/components/GifList";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { gifs, previousTerms, handleSearch, handleTermClick } = useGifs();

  return (
    <>
      {/* header */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto"
      />

      {/* barra de búsqueda */}
      <SearchBar placeholder="Buscar gifs..." onQuery={handleSearch} />

      {/* búsquedas previas */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClick={handleTermClick}
      />

      {/* galería de gifs */}
      <GifList mockGifs={gifs} />
    </>
  );
};

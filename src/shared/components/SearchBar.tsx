import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
  placeholder?: string; // Placeholder del input
  onQuery: (query: string) => void; // Función que ejecuta la búsqueda
}

// Barra de búsqueda con debounce automático (700ms)
export default function SearchBar({ placeholder, onQuery }: Props) {
  const [query, setQuery] = useState("");

  // Debounce: busca automáticamente después de 700ms sin cambios
  useEffect(() => {
    console.log("ejecutando useefect");
    const timeoutId = setTimeout(() => {
      onQuery(query);
      // setQuery("");
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onQuery]); //le dice a useEffect que se ejecute cuando query o onQuery cambien

  // Búsqueda manual: ejecuta inmediatamente y limpia input
  const handleSearch = () => {
    onQuery(query);
    setQuery("");
  };

  // Maneja Enter para búsqueda manual
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder || "Buscar"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

// Barra de búsqueda con debounce automático (700ms) y búsqueda manual
export default function SearchBar({ placeholder, onQuery }: Props) {
  // Estado del texto de búsqueda
  const [query, setQuery] = useState("");

  // Contador para debugging (opcional)
  // const counterRef = useRef(0);

  // Efecto de debounce: ejecuta búsqueda automática después de 700ms
  useEffect(() => {
    // counterRef.current++;
    // console.log(`🔥 useEffect ejecutado #${counterRef.current} - ${query}`);

    const timeoutId = setTimeout(() => {
      onQuery(query);
    }, 700);

    // Cleanup: cancela timeout anterior
    return () => clearTimeout(timeoutId);
  }, [query, onQuery]);

  // Búsqueda manual: ejecuta inmediatamente y limpia input
  const handleSearch = () => {
    onQuery(query);
    setQuery("");
  };

  // Maneja tecla Enter para búsqueda manual
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

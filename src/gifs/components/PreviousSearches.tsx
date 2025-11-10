interface Props {
  searches: string[];
  onLabelClick?: (term: string) => void;
}

// Lista de búsquedas anteriores clickeables
export default function PreviousSearches({ searches, onLabelClick }: Props) {
  return (
    <div className="previous-searches">
      <h2>Búsquedas previas</h2>
      <ul className="previous-searches-list">
        {searches.map((term) => (
          <li
            onClick={() => onLabelClick?.(term)}
            key={term}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onLabelClick?.(term);
              }
            }}
          >
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
}

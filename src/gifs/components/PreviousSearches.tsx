interface Props {
  searches: string[];
  onLabelClick?: (term: string) => void;
}

export default function PreviousSearches({ searches, onLabelClick }: Props) {
  return (
    <div className="previous-searches">
      <h2>Busquedas previas</h2>
      <ul className="previous-searches-list">
        {/* <li>Gatos</li> */}
        {searches.map((term) => (
          <li onClick={() => onLabelClick?.(term)} key={term}>
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
}

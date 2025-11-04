import React from "react";
import { Gif } from "../../mock-data/gifs.mock";

interface Props {
  mockGifs: Gif[];
}

export default function GifList({ mockGifs }: Props) {
  return (
    <div className="gifs-container">
      {mockGifs.map((gif) => (
        <div key={gif.id} className="gif-card">
          <img src={gif.url} alt={gif.title} />
          <h3>{gif.title}</h3>
          <p>
            Tamaño: {gif.width} x {gif.height} (1.500 KB)
          </p>
        </div>
      ))}
    </div>
  );
}

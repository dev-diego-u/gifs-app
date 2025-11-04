import React from "react";

interface Props {
  title: string;
  description?: string;
}

export const CustomHeader = ({ title, description }: Props) => {
  return (
    <div className="content-center">
      <h1>{title}</h1>
      <p>{description ? description : "Encuentra los mejores gifs aquí"}</p>
    </div>
  );
};

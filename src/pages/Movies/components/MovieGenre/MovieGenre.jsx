import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import "./MovieGenre.style.css";

const MovieGenre = ({
  genreList,
  selectedGenreIds,
  setSelectedGenreIds
}) => {

  const handleGenreClick = (event) => {
    const genreId = event.target.value;
    if (!selectedGenreIds.includes(genreId)) {
      setSelectedGenreIds((prevState) => [...prevState, genreId]);
    } else {
      setSelectedGenreIds((prevState) =>
        prevState.filter((item) => item !== genreId)
      );
    }
  };

  return (
    <>
      {genreList.map((item, idx) => {
        return (
          <Button
            key={`${item}-${idx}`}
            className="badge"
            variant={
              selectedGenreIds.includes(item.id.toString())
                ? "primary"
                : "secondary"
            }
            onClick={handleGenreClick}
            value={item.id}
            name={item.name}
          >
            {item.name}
          </Button>
        );
      })}
    </>
  );
};

export default MovieGenre;

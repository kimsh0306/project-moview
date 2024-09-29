import React from "react";
import { Button } from "react-bootstrap";
import "./MovieGenre.style.css";

const MovieGenre = ({ originalData, setAppliedData, genreList }) => {
  const [selectedGenre, setSelectedGenre] = React.useState("");
  
  const handleGenreClick = (event) => {
    if (selectedGenre !== event.target.name) {
      setSelectedGenre(event.target.name);
      setAppliedData((prevState) => {
        return {
          ...prevState,
          results: originalData.results.filter((obj) =>
            obj.genre_ids.includes(Number(event.target.value))
          ),
        };
      });
    } else {
      setSelectedGenre("");
      setAppliedData(originalData);
    }
  };

  return (
    <>
      {genreList.map((item, idx) => {
        return (
          <Button
            key={`${item}-${idx}`}
            className="badge"
            variant={selectedGenre === item.name ? "primary" : "secondary"}
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

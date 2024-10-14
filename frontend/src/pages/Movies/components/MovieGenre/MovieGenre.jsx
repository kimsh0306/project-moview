import React from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import { useMovieGenreQuery } from "../../../../hooks/useMovieGenre";
import "./MovieGenre.style.css";

const MovieGenre = ({ selectedGenreIds, setSelectedGenreIds }) => {
  const {
    data: genreData,
    status,
    isLoading,
    isError,
    error,
  } = useMovieGenreQuery();

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

  if (isLoading) {
    console.log("Loading - genreData...");
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    console.log("Error: ", error.message);
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="movie-genre">
      {genreData.map((item, idx) => {
        return (
          <Button
            key={`${item}-${idx}`}
            variant={
              selectedGenreIds.includes(item.id.toString())
                ? "primary"
                : "outline-secondary"
            }
            onClick={handleGenreClick}
            value={item.id}
            name={item.name}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default MovieGenre;

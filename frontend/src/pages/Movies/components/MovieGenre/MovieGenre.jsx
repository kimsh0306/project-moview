import React from "react";
import { Alert, Button } from "react-bootstrap";
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
    return <h1>Loading...</h1>;
  }

  // if (status === 'success') {
  //   console.log("Success - genreData: ", genreData);
  // }

  if (isError) {
    console.log("Error: ", error.message);
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <>
      {genreData.map((item, idx) => {
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

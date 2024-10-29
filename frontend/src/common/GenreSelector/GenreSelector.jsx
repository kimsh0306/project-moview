import React from "react";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { Alert, Button, Spinner } from "react-bootstrap";
import "./GenreSelector.style.css";

const GenreSelector = ({ selectedGenreIds, setSelectedGenreIds }) => {
  const { data: genreData, isLoading, isError, error } = useMovieGenreQuery();

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
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (!genreData) return null;

  return (
    <div className="genres">
      {genreData.map((item, idx) => (
        <div className="wrapper" key={`${item.name}-${idx}`}>
          <Button
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
        </div>
      ))}
    </div>
  );
};

export default GenreSelector;

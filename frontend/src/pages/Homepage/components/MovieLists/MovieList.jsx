import React from "react";
import { Alert } from "react-bootstrap";
import { responsive } from "constants/responsive";
import LoadingModal from "common/LoadingModal/LoadingModal";
import MultiCarousel from "common/MultiCarousel/MultiCarousel";
import MovieCard from "common/MovieCard/MovieCard";

const MovieList = ({ title, moviesQuery }) => {
  const { data, isLoading, isError, error } = moviesQuery();

  if (isLoading) return <LoadingModal show={true} />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (!data) return <Alert variant="danger">No data available</Alert>;

  const MoviesCarousel = ({ movies }) => (
    <MultiCarousel
      items={movies}
      responsive={responsive}
      ItemComponent={MovieCard}
    />
  );

  return (
    <div className={`movie-list ${title}`}>
      <h5 className="mb-2">{title}</h5>
      <MoviesCarousel movies={data.results} />
    </div>
  );
};

export default MovieList;

import React from "react";
import { Alert, Spinner } from "react-bootstrap";
import { usePopularMoviesQuery } from "../../../../hooks/useMovieListsQuerys";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  };
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  };
  return (
    <MovieSlider
      title="인기 영화"
      movies={data.results}
      responsive={responsive}
    />
  );
};

export default PopularMovieSlide;

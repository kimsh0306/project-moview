import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/useMovieListsQuerys";
import { Alert, Spinner } from "react-bootstrap";
import { responsive } from "../../../../constants/responsive";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (!data) return <Alert variant="danger">No data available</Alert>;

  return (
    <MovieSlider
      title="인기 영화"
      movies={data.results}
      responsive={responsive}
    />
  );
};

export default PopularMovieSlide;

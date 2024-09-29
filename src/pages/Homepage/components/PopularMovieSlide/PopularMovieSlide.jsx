import React from "react";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import { usePopularMoviesQuery } from "../../../../hooks/useMovieListsQuerys";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <MovieSlider
      title="인기 영화"
      movies={data.results}
      responsive={responsive}
    />
  );
};

export default PopularMovieSlide;

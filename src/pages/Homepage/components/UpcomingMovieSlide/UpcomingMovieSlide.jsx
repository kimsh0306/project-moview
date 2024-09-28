import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useMovieListsQuerys";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <MovieSlider
      title="Upcoming Movies"
      movies={data.results}
      responsive={responsive}
    />
  );
};

export default UpcomingMovieSlide;

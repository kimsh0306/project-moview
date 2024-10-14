import React from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useUpcomingMoviesQuery } from "../../../../hooks/useMovieListsQuerys";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

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
      title="개봉 예정 영화"
      movies={data.results}
      responsive={responsive}
    />
  );
};

export default UpcomingMovieSlide;

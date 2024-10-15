import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useMovieListsQuerys";
import { Alert, Spinner } from "react-bootstrap";
import { responsive } from "../../../../constants/responsive";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

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
      title="최고 평점 영화"
      movies={data.results}
      responsive={responsive}
    />
  );
};

export default TopRatedMovieSlide;

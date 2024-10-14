import React from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useTopRatedMoviesQuery } from "../../../../hooks/useMovieListsQuerys";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();
  
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
      title="최고 평점 영화"
      movies={data.results}
      responsive={responsive}
    />
  );
};

export default TopRatedMovieSlide;

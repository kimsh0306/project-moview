import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useMovieListsQuerys";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <MovieSlider
      title="최고 평점 영화"
      movies={data.results}
      responsive={responsive}
    />
  );
};

export default TopRatedMovieSlide;

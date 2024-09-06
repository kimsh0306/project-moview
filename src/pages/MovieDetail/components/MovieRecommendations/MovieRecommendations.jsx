import React from "react";
import { useMovieRecommendationsQuery } from "../../../../hooks/useMovieDetail";
import { Alert } from "react-bootstrap";
import { responsive } from "../../../../constants/responsive";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const MovieRecommendations = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieRecommendationsQuery(id);

  console.log("dataRecommendations: ", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="Recommendations"
        movies={data.results}
        responsive={responsive}
        noPadding
      />
    </div>
  );
};

export default MovieRecommendations;

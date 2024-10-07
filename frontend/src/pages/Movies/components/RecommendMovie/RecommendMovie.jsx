import React from "react";
import { useRecommendMovieQuery } from "../../../../hooks/useMovieSearch";
import { Alert, Col } from "react-bootstrap";
import MovieCard from "../../../../common/MovieCard/MovieCard";

const RecommendMovie = ({page}) => {
  const { data, isLoading, isError, error } =
    useRecommendMovieQuery(page);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <>
      {data?.results?.map((movie, idx) => (
        <Col key={idx} xl={2} lg={3} md={4} sm={6} xs={6}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </>
  );
};

export default RecommendMovie;

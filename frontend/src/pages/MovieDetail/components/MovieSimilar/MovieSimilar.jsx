import React, { useEffect } from "react";
import { useMovieSimilar } from "../../../../hooks/useMovieDetail";
import { Alert, Spinner } from "react-bootstrap";
import { responsive } from "../../../../constants/responsive";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const MovieSimilar = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieSimilar(id);
  console.log("dataSimilar: ", data);

  useEffect(() => {
    if (!data) return;
  }, []);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <>
      <p className="mb-1 text-nowrap text-end"> 총 {data?.results?.length}건</p>
      {data.results.length > 0 && (
        <MovieSlider noTitle movies={data.results} responsive={responsive} />
      )}
    </>
  );
};

export default MovieSimilar;

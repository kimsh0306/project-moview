import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { MovieFilterContext } from "context/MovieFilterContext";
import { useDiscoverMovieQuery } from "hooks/movie/useMovieSearch";
import MovieFilterLayout from "layout/MovieFilterLayout/MovieFilterLayout";
import LoadingModal from "common/LoadingModal/LoadingModal";

const MoviesPageWrapper = () => {
  const { filterState } = useContext(MovieFilterContext);
  const { page, sortOption, genreIds } = filterState;

  const { data, isLoading, isError, error } = useDiscoverMovieQuery(
    page,
    sortOption,
    genreIds
  );

  if (isLoading) return <LoadingModal show={true} />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (!data) return;

  return (
    <MovieFilterLayout
      domain="movie-page"
      pageTitle="영화"
      data={data}
    />
  );
};

export default MoviesPageWrapper;

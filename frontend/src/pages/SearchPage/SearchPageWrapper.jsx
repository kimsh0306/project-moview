import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { MovieFilterContext } from "context/MovieFilterContext";
import { useSearchMovieQuery } from "hooks/useMovieSearch";
import MovieFilterLayout from "layout/MovieFilterLayout/MovieFilterLayout";
import LoadingModal from "common/LoadingModal/LoadingModal";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";

const SearchPageWrapper = () => {
  const { filterState } = useContext(MovieFilterContext);
  const { page, sortOption, genreIds } = filterState;

  const [query] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery(
    keyword,
    page,
    sortOption,
    genreIds
  );

  if (isLoading) return <LoadingModal show={true} />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (!data) return;

  return (
    <MovieFilterLayout
      domain="search-page"
      pageTitle="검색한 영화"
      data={data}
      noFilter={true}
    />
  );
};

export default SearchPageWrapper;

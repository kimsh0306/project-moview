import React from "react";
import { MovieFilterProvider } from "context/MovieFilterContext";
import SearchPageWrapper from "./SearchPageWrapper";

const MoviesSearchPage = () => {
  return (
    <MovieFilterProvider>
      <SearchPageWrapper/>
    </MovieFilterProvider>
  );
};

export default MoviesSearchPage;

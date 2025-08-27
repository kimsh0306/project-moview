import React from "react";
import { MovieFilterProvider } from "context/MovieFilterContext";
import MoviesPageWrapper from "./MoviesPageWrapper";

const MoviesPage = () => {
  return (
    <MovieFilterProvider>
      <MoviesPageWrapper/>
    </MovieFilterProvider>
  );
};

export default MoviesPage;

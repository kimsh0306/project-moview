import React from "react";
import { MovieFilterProvider } from "contexts/filter";
import SortSelector from "pages/MoviesPage/components/SortSelector/SortSelector";
import GenreSelector from "pages/MoviesPage/components/GenreSelector/GenreSelector";
import MoviesViewer from "pages/MoviesPage/components/MoviesViewer/MoviesViewer";
import CustomContainer from "common/CustomContainer/CustomContainer";
import ScrollToTop from "common/ScrollToTop/ScrollToTop";

const MoviesPage = () => {
  return (
    <MovieFilterProvider>
      <main className="movie-page">
        <CustomContainer>
          <SortSelector pageTitle="영화" />
          <GenreSelector />
          <MoviesViewer />
        </CustomContainer>
        <ScrollToTop />
      </main>
    </MovieFilterProvider>
  );
};

export default MoviesPage;

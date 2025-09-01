import React from "react";
import { Alert } from "react-bootstrap";
import { MovieFilterProvider } from "context/filter";
import { useMovieFilterState } from "hooks/filter";
import { useInfiniteMovies } from "hooks/movie/useInfiniteMovies";
import LoadingModal from "common/LoadingModal/LoadingModal";
import SortSelector from "pages/MoviesPage/components/SortSelector/SortSelector";
import GenreSelector from "pages/MoviesPage/components/GenreSelector/GenreSelector";
import MoviesViewer from "pages/MoviesPage/components/MoviesViewer/MoviesViewer";
import CustomContainer from "common/CustomContainer/CustomContainer";
import ScrollToTop from "common/ScrollToTop/ScrollToTop";

const FilterBlock = () => {
  return (
    <>
      <SortSelector pageTitle="영화" />
      <GenreSelector />
    </>
  );
};

const ContentBlock = () => {
  const { sortOption, genreIds } = useMovieFilterState(); // page 제거

  const { movies, loadMore, hasMore, isLoading, isError, error } =
    useInfiniteMovies(sortOption, genreIds);

  // 첫 로딩시에만 모달 표시
  if (isLoading && movies.length === 0) {
    return <LoadingModal show={true} />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <MoviesViewer
      movies={movies}
      loadMore={loadMore}
      hasMore={hasMore}
      isLoading={isLoading}
    />
  );
};

const MoviesPage = () => {
  console.log("🔥 MoviesPage 컴포넌트 리렌더링!");
  return (
    <MovieFilterProvider>
      <main className="movie-page">
        <CustomContainer>
          <FilterBlock />
          <ContentBlock />
        </CustomContainer>
        <ScrollToTop />
      </main>
    </MovieFilterProvider>
  );
};

export default MoviesPage;

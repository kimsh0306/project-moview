import React from "react";
import { Alert } from "react-bootstrap";
import { useDiscoverMovieQuery } from "hooks/useMovieSearch";
import { MovieFilterProvider } from "context/filter";
import { useMovieFilterState } from "hooks/filter";
import LoadingModal from "common/LoadingModal/LoadingModal";
import SortSelector from "pages/MoviesPage/components/SortSelector/SortSelector";
import GenreSelector from "pages/MoviesPage/components/GenreSelector/GenreSelector";
import MoviesViewer from "pages/MoviesPage/components/MoviesViewer/MoviesViewer";
import Paginator from "pages/MoviesPage/components/Paginator/Paginator";
import CustomContainer from "common/CustomContainer/CustomContainer";

const FilterBlock = () => {
  return (
    <>
      <SortSelector pageTitle="영화" />
      <GenreSelector />
    </>
  );
};

const ContentBlock = () => {
  const { sortOption, genreIds, page } = useMovieFilterState();

  const { data, isLoading, isError, error } = useDiscoverMovieQuery(
    page,
    sortOption,
    genreIds
  );

  if (isLoading) return <LoadingModal show={true} />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (!data) return;
  return (
    <>
      <MoviesViewer data={data} />
      <Paginator data={data} />
    </>
  );
};

const MoviesPage = () => {
  console.log('🔥 MoviesPage 컴포넌트 리렌더링!');
  return (
    <MovieFilterProvider>
      <main className="movie-page">
        <CustomContainer>
          <FilterBlock />
          <ContentBlock />
        </CustomContainer>
      </main>
    </MovieFilterProvider>
  );
};

export default MoviesPage;

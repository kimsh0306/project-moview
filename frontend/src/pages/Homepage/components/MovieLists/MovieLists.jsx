import React from "react";
import {
  usePopularMoviesQuery,
  useTopRatedMoviesQuery,
  useUpcomingMoviesQuery,
} from "pages/Homepage/hooks/useMovieLists";
import CustomContainer from "common/CustomContainer/CustomContainer";
import MovieList from "./MovieList";

const MovieLists = () => {
  return (
    <section className="movie-lists">
      <CustomContainer className="d-flex flex-column gap-4">
        <MovieList title="인기 영화" moviesQuery={usePopularMoviesQuery} />
        <MovieList title="최고 평점 영화" moviesQuery={useTopRatedMoviesQuery} />
        <MovieList title="개봉 예정 영화" moviesQuery={useUpcomingMoviesQuery} />
      </CustomContainer>
    </section>
  );
};

export default MovieLists;

import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/api";

// 공통 API 호출 함수
const fetchMovies = (endpoint) => {
  return api.get(endpoint).then((response) => response.data);
};

// 공통화된 Query Hook
const useMoviesQuery = (queryKey, endpoint) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchMovies(endpoint),
  });
};

// 세부 Query Hook (구체화)
const usePopularMoviesQuery = () =>
  useMoviesQuery("movie-popular", "/movie/popular?language=ko-KR");

const useTopRatedMoviesQuery = () =>
  useMoviesQuery("movie-top-rated", "/movie/top_rated?language=ko-KR");

const useUpcomingMoviesQuery = () =>
  useMoviesQuery("movie-upcoming", "/movie/upcoming?language=ko-KR");

export {
  usePopularMoviesQuery,
  useTopRatedMoviesQuery,
  useUpcomingMoviesQuery,
};

import { useQuery } from "@tanstack/react-query"
import api from "../../utils/api"

const fetchSearchMovie = (keyword, page) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}&language=ko-KR`)
    : api.get(`/trending/movie/week?&language=ko-KR`)
};

const fetchRecommendMovie = (page) => {
  return api.get(`/movie/now_playing?page=${page}&language=ko-KR`)
};

const fetchDiscoverMovie = (page, sortOption, genreIds) => {
  return api.get("/discover/movie", {
    params: {
      language: 'ko-KR',
      page: page,
      sort_by: sortOption,
      with_genres: genreIds
    }
  });
};

const useSearchMovieQuery = (keyword, page) => {
  return useQuery({
    queryKey: ['movie-search', keyword, page],
    queryFn: () => fetchSearchMovie(keyword, page),
    select: (result) => result.data,
  });
};

const useRecommendMovieQuery = (page) => {
  return useQuery({
    queryKey: ['movie-recommend', page],
    queryFn: () => fetchRecommendMovie(page),
    select: (result) => result.data,
  });
};

const useDiscoverMovieQuery = (page, sortOption, genreIds) => {
  return useQuery({
    queryKey: ['movie-discover', page, sortOption, genreIds],
    queryFn: () => fetchDiscoverMovie(page, sortOption, genreIds),
    select: (result) => result.data,
    staleTime: 0
    // staleTime: 1000 * 60 * 60 * 24, // 24시간
  });
};

export {
  useSearchMovieQuery,
  useRecommendMovieQuery,
  useDiscoverMovieQuery
};
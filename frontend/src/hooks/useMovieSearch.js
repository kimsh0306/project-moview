import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchSearchMovie = (keyword, page) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}&language=ko-KR`)
    : api.get(`/movie/now_playing?page=${page}&language=ko-KR`)
};

const fetchRecommendMovie = (page) => {
  return api.get(`/movie/now_playing?page=${page}&language=ko-KR`)
};

const fetchDiscoverMovie = (page, sort, genres) => {
  return api.get("/discover/movie", {
    params: {
      language: 'ko-KR',
      page: page,
      sort_by: sort,
      with_genres: genres
    }
  });
};

const useSearchMovieQuery = (keyword, page) => {
  return useQuery({
    queryKey: ['movie-search', { keyword, page }],
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

const useDiscoverMovieQuery = (page, sort, genres) => {
  return useQuery({
    queryKey: ['movie-discover', page, sort, genres],
    queryFn: () => fetchDiscoverMovie(page, sort, genres),
    select: (result) => result.data,
  });
};

export {
  useSearchMovieQuery,
  useRecommendMovieQuery,
  useDiscoverMovieQuery
};
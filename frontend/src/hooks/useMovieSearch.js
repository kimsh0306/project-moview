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

export {
  useSearchMovieQuery,
  useRecommendMovieQuery,
};
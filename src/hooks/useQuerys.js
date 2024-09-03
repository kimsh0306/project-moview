import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";


const fetchPopularMovies = () => {
  return api.get('/movie/popular?language=ko-KR')
};

const fetchTopRatedMovies = () => {
  return api.get('/movie/top_rated?language=ko-KR')
};

const fetchUpcomingMovies = () => {
  return api.get('/movie/upcoming?language=ko-KR')
};

const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-popular'],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
  });
};

const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-top-rated'],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  });
};

const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-upcoming'],
    queryFn: fetchUpcomingMovies,
    select: (result) => result.data,
  });
};

export { 
  usePopularMoviesQuery, 
  useTopRatedMoviesQuery,
  useUpcomingMoviesQuery,
};

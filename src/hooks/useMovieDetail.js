import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchMovieDetail = (id) => {
  return api.get(`/movie/${id}?language=ko-KR`)
};

const fetchMovieImages = (id) => {
  return api.get(`/movie/${id}/images`)
};

const fetchMovieReviews = (id) => {
  return api.get(`/movie/${id}/reviews`)
};

const fetchMovieRecommendations = (id) => {
  return api.get(`/movie/${id}/recommendations`)
};

const useMovieDetailQuery = (id) => {
  return useQuery({
    queryKey: ['movie-detail', id],
    queryFn: () => fetchMovieDetail(id),
    select: (result) => result.data,
  });
};

const useMovieImagesQuery = (id) => {
  return useQuery({
    queryKey: ['movie-detail-img', id],
    queryFn: () => fetchMovieImages(id),
    select: (result) => result.data,
  });
};

const useMovieReviewsQuery = (id) => {
  return useQuery({
    queryKey: ['movie-reviews', id],
    queryFn: () => fetchMovieReviews(id),
    select: (result) => result.data,
  });
};

const useMovieRecommendationsQuery = (id) => {
  return useQuery({
    queryKey: ['movie-recommendations', id],
    queryFn: () => fetchMovieRecommendations(id),
    select: (result) => result.data,
  });
};

export {
  useMovieDetailQuery,
  useMovieImagesQuery,
  useMovieReviewsQuery,
  useMovieRecommendationsQuery,
};
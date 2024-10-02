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

const fetchMovieVideos = (id) => {
  return api.get(`/movie/${id}/videos`)
};

const fetchMovieCredits = (id) => {
  return api.get(`/movie/${id}/credits`)
};
const fetchMovieSimilar = (id) => {
  return api.get(`/movie/${id}/similar`)
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

const useMovieVideosQuery = (id) => {
  return useQuery({
    queryKey: ['movie-videos', id],
    queryFn: () => fetchMovieVideos(id),
    select: (result) => result.data,
  });
};

const useMovieCreditsQuery = (id) => {
  return useQuery({
    queryKey: ['movie-credits', id],
    queryFn: () => fetchMovieCredits(id),
    select: (result) => result.data,
  });
};
const useMovieSimilar = (id) => {
  return useQuery({
    queryKey: ['movie-similar', id],
    queryFn: () => fetchMovieSimilar(id),
    select: (result) => result.data,
  });
};

export {
  useMovieDetailQuery,
  useMovieImagesQuery,
  useMovieReviewsQuery,
  useMovieRecommendationsQuery,
  useMovieVideosQuery,
  useMovieCreditsQuery,
  useMovieSimilar,
};
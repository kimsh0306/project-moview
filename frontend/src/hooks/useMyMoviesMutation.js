import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addMyMovie = async (movie) => {
  const url = `${process.env.REACT_APP_API_URL}/my_lists/movies`;
  const { data } = await axios.post(url, movie, {
    withCredentials: true,
  });
  return data;
};

const removeMyMovie = async (movieId) => {
  const url = `${process.env.REACT_APP_API_URL}/my_lists/movies/${movieId}`;
  const { data } = await axios.delete(url, {
    withCredentials: true,
  });
  return data;
};

export const useAddMyMovieMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({ 
    mutationFn: addMyMovie,
    onMutate: async (newMovie) => {
      // 기존 데이터 덮어쓰기 방지
      await queryClient.cancelQueries({ queryKey: ["my-movies"] });

      // 롤백을 위한 현재 데이터 스냅샷
      const previousMovies = queryClient.getQueryData(["my-movies"]);

      // UI 즉시 업데이트
      queryClient.setQueryData(["my-movies"], (old) => old ? [...old, newMovie] : [newMovie]);

      // 스냅샷 데이터를 context로 반환
      return { previousMovies };
    },
    onError: (err, newMovie, context) => {
      queryClient.setQueryData(["my-movies"], context.previousMovies);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["my-movies"] });
    },
  });
};

export const useRemoveMyMovieMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({ 
    mutationFn: removeMyMovie,
    onMutate: async (removedMovieId) => {
      await queryClient.cancelQueries({ queryKey: ["my-movies"] });
      const previousMovies = queryClient.getQueryData(["my-movies"]);
      queryClient.setQueryData(["my-movies"], (old) => old.filter(movie => movie.id !== removedMovieId));
      return { previousMovies };
    },
    onError: (err, removedMovieId, context) => {
      queryClient.setQueryData(["my-movies"], context.previousMovies);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["my-movies"] });
    },
  });
};

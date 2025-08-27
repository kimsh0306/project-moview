import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Add a movie to my list
const addMyMovie = async (movie) => {
  const url = `${process.env.REACT_APP_API_URL}/my_lists/movies`;
  const { data } = await axios.post(url, movie, {
    withCredentials: true,
  });
  return data;
};

// Remove a movie from my list
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
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["my-movies"] });

      // Snapshot the previous value
      const previousMovies = queryClient.getQueryData(["my-movies"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["my-movies"], (old) => old ? [...old, newMovie] : [newMovie]);

      // Return a context object with the snapshotted value
      return { previousMovies };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newMovie, context) => {
      queryClient.setQueryData(["my-movies"], context.previousMovies);
    },
    // Always refetch after error or success:
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

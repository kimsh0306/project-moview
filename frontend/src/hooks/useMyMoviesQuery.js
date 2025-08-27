import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMyMovies = async () => {
  const url = `${process.env.REACT_APP_API_URL}/my_lists/movies`;
  const { data } = await axios.get(url, {
    withCredentials: true,
  });
  return data;
};

export const useMyMoviesQuery = () => {
  return useQuery({
    queryKey: ["my-movies"],
    queryFn: fetchMyMovies,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

import { useQuery } from "@tanstack/react-query"
import api from "../utils/api";

const fetchMovieGenre = () => {
  return api.get('genre/movie/list?language=ko-KR');
};

export const useMovieGenreQuery = () => {
  return useQuery({
    queryKey: ['movie-genre'],
    queryFn: fetchMovieGenre,
    select:(result) => result.data.genres,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
    refetchOnWindowFocus: false, // 브라우저 창 또는 탭이 다시 포커스를 받을 때 리패치 방지
    refetchOnMount: false, // 마운트 시 리패치 방지
  });
};
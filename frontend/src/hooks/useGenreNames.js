import { useMemo } from "react";
import { useMovieGenreQuery } from "./useMovieGenre";

export const useGenreNames = (genreIds) => {
  // 전체 장르 데이터 가져오기
  const { data: allGenreData } = useMovieGenreQuery();

  // 장르 id로 장르 name을 찾아서 반환
  const genreNames = useMemo(() => {
    if (!allGenreData || !genreIds) return;

    return genreIds.map((id) => {
      const genreObj = allGenreData.find((genre) => genre.id === id);
      return genreObj ? genreObj.name : null;
    }).filter(Boolean); // 유효하지 않은 값(null)을 필터링
  }, [allGenreData, genreIds]);

  return genreNames;
};

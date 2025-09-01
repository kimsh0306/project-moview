import { useContext } from "react";
import { GenreContext, PageContext, SortContext } from "context/filter";


// 전체 상태가 필요한 경우를 위한 훅 (API 요청용)
export const useMovieFilterState = () => {
  const { sortOption } = useContext(SortContext);
  const { genreIds } = useContext(GenreContext);
  const { page } = useContext(PageContext);
  
  return { sortOption, genreIds, page };
};

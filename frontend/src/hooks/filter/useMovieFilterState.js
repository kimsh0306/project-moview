import { useContext, useEffect } from "react";
import { GenreContext, PageContext, SortContext } from "context/filter";

// 전체 상태가 필요한 경우를 위한 훅 (API 요청용)
export const useMovieFilterState = () => {
  const { sortOption } = useContext(SortContext);
  const { genreIds } = useContext(GenreContext);
  const { page, dispatch: pageDispatch } = useContext(PageContext);

  // 정렬이나 장르가 변경되면 페이지를 1로 리셋
  useEffect(() => {
    if (page !== 1) {
      pageDispatch({ type: "SET_PAGE", payload: { selectedPage: 1 } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption, genreIds, pageDispatch]); // page 의도적으로 제외

  return { sortOption, genreIds, page };
};

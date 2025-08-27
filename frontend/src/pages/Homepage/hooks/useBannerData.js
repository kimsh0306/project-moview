import { useMemo } from "react";
import { usePopularMoviesQuery } from "pages/Homepage/hooks/useMovieLists";

const MAX_BANNER_ITEMS = 3;

const useBannerData = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  
  // 지정한 순위 안에 해당하는 인기 영화 데이터 추출
  const bannerData = useMemo(() => {
    return Array.isArray(data?.results)
      ? data.results.slice(0, MAX_BANNER_ITEMS)
      : []
  }, [data]);

  return { bannerData, isLoading, isError, error };
};

export default useBannerData;
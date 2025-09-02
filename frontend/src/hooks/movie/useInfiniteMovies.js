import { useState, useCallback, useEffect } from 'react';
import { useDiscoverMovieQuery } from './useMovieSearch';

export const useInfiniteMovies = (sortOption, genreIds) => {
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 현재 페이지 데이터 가져오기
  const { data, isLoading, isError, error } = useDiscoverMovieQuery(
    currentPage,
    sortOption,
    genreIds
  );

  // 필터 변경시 초기화
  useEffect(() => {
    // console.log('필터 변경 - 무한 스크롤 초기화');
    setAllMovies([]);
    setCurrentPage(1);
    setHasMore(true);
  }, [sortOption, genreIds]);

  useEffect(() => {
    if (data?.results) {
      if (currentPage === 1) {
        // 첫 페이지면 교체
        setAllMovies(data.results);
      } else {
        // 중복 제거하면서 추가
        setAllMovies(prev => {
          const prevMovieIds = prev.map(movie => movie.id);
          const newMovies = data.results.filter(movie =>
            !prevMovieIds.includes(movie.id)
          );
          return [...prev, ...newMovies];
        });
      }

      setHasMore(currentPage < data.total_pages);
    }
  }, [data, currentPage]);

  // 다음 페이지 로드 함수
  const loadMore = useCallback(async () => {
    if (hasMore && !isLoading) {
      // console.log(`다음 페이지 로드: ${currentPage + 1}`);
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore, isLoading]);

  return {
    movies: allMovies,
    loadMore,
    hasMore,
    isLoading,
    isError,
    error,
    currentPage
  };
};

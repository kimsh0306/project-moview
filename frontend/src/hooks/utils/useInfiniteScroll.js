import { useState, useEffect, useCallback, useRef } from 'react';

// callback: 스크롤이 끝에 도달했을 때 호출할 함수
export const useInfiniteScroll = (callback, hasMore) => {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef();

  const lastElementRef = useCallback(node => {
    // 현재 데이터를 가져오는 중이면 아무것도 하지 않음
    if (isFetching) return;
    // 기존 Observer가 있으면 연결 해제 (메모리 누수 방지)
    if (observerRef.current) observerRef.current.disconnect();
    
    // 새로운 Intersection Observer 생성
    observerRef.current = new IntersectionObserver(entries => {
      // 요소가 화면에 보이고 + 더 가져올 데이터가 있으면
      if (entries[0].isIntersecting && hasMore) {
        // 무한 스크롤 트리거
        setIsFetching(true);
      }
    });
    
    // 새로운 마지막 요소를 관찰 시작
    if (node) observerRef.current.observe(node);
  }, [isFetching, hasMore]);

  useEffect(() => {
    if (!isFetching) return;
    
    callback().finally(() => {
      setIsFetching(false);
    });
  }, [isFetching, callback]);

  return { lastElementRef, isFetching };
};

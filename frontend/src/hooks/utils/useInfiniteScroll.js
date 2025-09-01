import { useState, useEffect, useCallback, useRef } from 'react';

export const useInfiniteScroll = (callback, hasMore) => {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef();

  const lastElementRef = useCallback(node => {
    if (isFetching) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('🔄 무한 스크롤 트리거');
        setIsFetching(true);
      }
    });
    
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

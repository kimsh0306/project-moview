import React, { memo } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import FlipCard from "common/FlipCard/FlipCard";
import { useInfiniteScroll } from "hooks/utils/useInfiniteScroll";

const MoviesViewer = ({ movies, loadMore, hasMore, isLoading }) => {
  console.log('🔥 MoviesViewer 컴포넌트 리렌더링!');
  
  const { lastElementRef, isFetching } = useInfiniteScroll(loadMore, hasMore);

  return (
    <section className="movie-viewer">
      <Row className="g-2">
        {movies.map((movie, index) => (
          <Col 
            key={`${movie.id}_${index}`} 
            xl={2} lg={3} md={4} sm={6} xs={6}
            ref={index === movies.length - 1 ? lastElementRef : null} // 마지막 요소에 ref 추가
          >
            <FlipCard movie={movie} />
          </Col>
        ))}
      </Row>
      
      {/* 로딩 스피너 */}
      {(isLoading || isFetching) && (
        <Row className="mt-4">
          <Col xs="12" className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      )}
      
      {/* 더 이상 데이터가 없을 때 */}
      {!hasMore && movies.length > 0 && (
        <Row className="mt-4">
          <Col xs="12" className="text-center">
            <p className="text-muted">모든 영화를 불러왔습니다.</p>
          </Col>
        </Row>
      )}
    </section>
  );
};

export default memo(MoviesViewer);

import React from "react";
import { useMovieFilterState } from "hooks/filter";
import { useInfiniteMovies } from "hooks/movie/useInfiniteMovies";
import { useInfiniteScroll } from "hooks/utils/useInfiniteScroll";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import FlipCard from "common/FlipCard/FlipCard";
import LoadingModal from "common/LoadingModal/LoadingModal";

const MoviesViewer = () => {
  console.log("🔥 MoviesViewer 컴포넌트 리렌더링!");

  const { sortOption, genreIds } = useMovieFilterState();
  const { movies, loadMore, hasMore, isLoading, isError, error } =
    useInfiniteMovies(sortOption, genreIds);
  const { lastElementRef, isFetching } = useInfiniteScroll(loadMore, hasMore);

  // 첫 로딩시에만 모달 표시
  if (isLoading && movies.length === 0) {
    return <LoadingModal show={true} />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <section className="movie-viewer">
      <Row className="g-2">
        {movies.map((movie, index) => (
          <Col
            key={`${movie.id}`}
            xl={2}
            lg={3}
            md={4}
            sm={6}
            xs={6}
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

export default MoviesViewer;

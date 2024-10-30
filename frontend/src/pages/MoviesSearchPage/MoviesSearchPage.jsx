import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useMovieSearch";
import { Alert, Col, Container, Row } from "react-bootstrap";
import LoadingModal from "../../common/LoadingModal/LoadingModal";
import MovieCard from "../../common/MovieCard/MovieCard";
import Paginator from "../../common/Paginator/Paginator";

const MoviesSearchPage = () => {
  const [page, setPage] = useState(1);
  const [query] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery(
    keyword,
    page
  );

  console.log("data:", data);

  if (isLoading) return <LoadingModal show={true} />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <Container fluid className="p-5">
      <Row className="mb-4">
        <Col xs={12} className="d-flex align-items-center">
          <h1>검색한 영화</h1>
        </Col>
      </Row>
      <Row className="g-2">
        {data && data.results.length > 0 ? (
          <>
            {data.results.map((movie, idx) => (
              <Col key={idx} xl={2} lg={3} md={4} sm={6} xs={6}>
                <MovieCard movie={movie} />
              </Col>
            ))}
            <Col xs={12}>
              <Paginator data={data} page={page} setPage={setPage} />
            </Col>
          </>
        ) : (
          <Col>
            <Alert show={true} variant="primary">
              <p className="m-0">
                입력하신 검색어와 일치하는 영화를 찾지 못했습니다.
              </p>
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default MoviesSearchPage;

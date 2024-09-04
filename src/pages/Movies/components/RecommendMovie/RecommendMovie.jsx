import React, { useEffect, useState } from "react";
import { useRecommendMovieQuery } from "../../../../hooks/useSearchMovie";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

const RecommendMovie = () => {
  const [recommendPage, setRecommendPage] = useState(1);
  const { data, isLoading, isError, error } = useRecommendMovieQuery(recommendPage);
  
  const handlePageClick = ({ selected }) => {
    console.log("selected:", selected);
    setRecommendPage(selected + 1);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <Row>
            찾으시는 영화가 없습니다. <br />
            다른 영화를 추천드려요.
          </Row>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie, idx) => (
              <Col key={idx} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={10}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={recommendPage - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default RecommendMovie;

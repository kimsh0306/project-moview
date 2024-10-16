import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import "./MyListPage.style.css";

const MyListPage = () => {
  const myMoviesState = useSelector((state) => state.myMovies?.movies);

  return (
    <div className="my-list">
      <Container fluid>
        <Row className="header">
          <div className="title">
            <h2>내가 찜한 영화</h2>
          </div>
        </Row>
        <Row className="contents">
          {myMoviesState.map((movie, idx) => (
            <Col key={idx} xl={2} lg={3} md={4} sm={6} xs={6}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MyListPage;

import React, { memo } from "react";
import { Row, Col } from "react-bootstrap";
import FlipCard from "common/FlipCard/FlipCard";

const MoviesViewer = ({ data }) => {
  return (
    <section className="movie-viewer">
      <Row className="g-2">
        {data?.results.map((movie) => (
          <Col key={movie.id} xl={2} lg={3} md={4} sm={6} xs={6}>
            <FlipCard movie={movie} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default memo(MoviesViewer);

import React, { memo } from "react";
import { Col } from "react-bootstrap";
import FlipCard from "common/FlipCard/FlipCard";
import SectionWrapper from "../SectionWrapper";

const MoviesViewer = ({ data }) => {
  return (
    <SectionWrapper
      sectionProps={{ className: "movie-viewer" }}
      rowProps={{ className: "g-2" }}
    >
      {data?.results.map((movie) => (
        <Col key={movie.id} xl={2} lg={3} md={4} sm={6} xs={6}>
          <FlipCard movie={movie} />
        </Col>
      ))}
    </SectionWrapper>
  );
};

export default memo(MoviesViewer);

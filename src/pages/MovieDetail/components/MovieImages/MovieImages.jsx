import React from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useMovieImagesQuery } from "../../../../hooks/useMovieDetail";
import "./MovieImages.style.css";

const MovieImages = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieImagesQuery(id);

  console.log("dataImg: ", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const imgUrl = `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.posters[2].file_path}`;

  return (
    <div>
      <Container>
        <Row>
          <Col xl={12} l={4} xs={6}>
            <img className="de-img" src={imgUrl} />
          </Col>
          <Col xl={12} l={4} xs={6}>
            <img className="de-img" src={imgUrl} />
          </Col>
          <Col xl={12} l={4} xs={6}>
            <img className="de-img" src={imgUrl} />
          </Col>
          <Col xl={12} l={4} xs={6}>
            <img className="de-img" src={imgUrl} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieImages;

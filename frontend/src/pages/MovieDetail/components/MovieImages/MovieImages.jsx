import React from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useMovieImagesQuery } from "../../../../hooks/useMovieDetail";
import "./MovieImages.style.css";

const MovieImages = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieImagesQuery(id);

  console.log("dataImg: ", data);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const imgUrl = `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.posters[2].file_path}`;

  return (
    <div>
      <Container style={{ margin: 0 }}>
        <Row>
          {data?.posters.map((item, idx) => {
            return (
              <Col xl={6} l={4} md={3} xs={6}>
                <img
                  className="de-img"
                  src={`https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.posters[idx].file_path}`}
                />
              </Col>
            );
          })}
          {/* <Col xl={6} l={4} md={3} xs={6}>
            <img className="de-img" src={imgUrl} />
          </Col>
          <Col xl={6} l={4} md={3} xs={6}>
            <img className="de-img" src={imgUrl} />
          </Col>
          <Col xl={6} l={4} md={3} xs={6}>
            <img className="de-img" src={imgUrl} />
          </Col>
          <Col xl={6} l={4} md={3} xs={6}>
            <img className="de-img" src={imgUrl} />
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default MovieImages;

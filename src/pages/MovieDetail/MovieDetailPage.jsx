import React from "react";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import MovieImages from "./components/MovieImages/MovieImages";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import "./MovieDetailPage.style.css";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import MovieRecommendations from "./components/MovieRecommendations/MovieRecommendations";
import { Box, Modal } from "@mui/material";
import MovieVideos from "./components/MovieVideos/MovieVideos";

const MovieDetailPage = () => {
  let { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading, isError, error } = useMovieDetailQuery(id);
  console.log("dataDetail: ", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  const mainImgUrl = `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.poster_path}`;
  return (
    <>
      <div className="detail-container">
        <Container className="no-padding">
          <Row className="row-spacing">
            <Col xl={8} xs={12}>
              <div>
                <div className="detail-img-area">
                  <div className="detail-img-box">
                    <img className="detail-img" src={mainImgUrl} />
                  </div>
                  <div className="paly-btn">
                    <Button variant="secondary" onClick={handleOpen}>
                      play
                    </Button>
                  </div>
                </div>
                <MovieInfo data={data} />
              </div>
            </Col>
            <Col xl={4} xs={12}>
              <>{/* <MovieImages id={id}/> */}</>
            </Col>
          </Row>
          <Row className="row-spacing">
            <Col xl={8} xs={12}>
              <div className="detail-review-area">
                <MovieReviews id={id} title={"Reviews"} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl={8} xs={12}>
              <MovieRecommendations id={id} />
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "black",
              border: "2px solid #000",
              borderRadius: "20px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <MovieVideos id={id} />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default MovieDetailPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { Alert, Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { Box, Modal } from "@mui/material";
import MovieImages from "./components/MovieImages/MovieImages";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import MovieVideos from "./components/MovieVideos/MovieVideos";
import MovieCredits from "./components/MovieCredits/MovieCredits";
import MovieSimilar from "./components/MovieSimilar/MovieSimilar";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  let { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading, isError, error } = useMovieDetailQuery(id);
  // console.log("dataDetail: ", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const mainImgUrl = `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.poster_path}`;

  return (
    <div className="detail-page">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${mainImgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <MovieInfo data={data} handleOpen={handleOpen} />
      </div>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <Tabs
              onSelect={() => window.dispatchEvent(new Event("resize"))}
              defaultActiveKey="credits"
              id="uncontrolled-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="credits" title="감독/배우">
                <MovieCredits id={id} />
              </Tab>
              <Tab eventKey="reviews" title="리뷰">
                <MovieReviews id={id} />
              </Tab>
              <Tab eventKey="similarMovies" title="유사한 영화">
                <MovieSimilar id={id} />
              </Tab>
            </Tabs>
          </Col>
          <Col xs={12}></Col>
        </Row>
      </Container>

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
    </div>
  );
};

export default MovieDetailPage;

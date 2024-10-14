import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import {
  Alert,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
  Spinner,
} from "react-bootstrap";
import MovieImages from "./components/MovieImages/MovieImages";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import MovieCredits from "./components/MovieCredits/MovieCredits";
import MovieSimilar from "./components/MovieSimilar/MovieSimilar";
import LoadingModal from "../../common/LoadingModal/LoadingModal";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  let { id } = useParams();
  const [activeTab, setActiveTab] = useState("credits");
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);

  useEffect(() => {
    data || setActiveTab("credits");
    data && console.log("dataDetail!!: ", data);
  }, [data]);

  if (isLoading) {
    console.log("Loading...");
    return <LoadingModal show={true} handleClose={() => {}} />;
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
        <MovieInfo data={data} id={id} />
      </div>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <Tabs
              onSelect={(eventKey) => setActiveTab(eventKey)}
              defaultActiveKey="credits"
              id="uncontrolled-tab-example"
              className="mb-3"
              justify
            >
              {/* 탭 변경 시 활성화된 탭만 렌더링 */}
              <Tab eventKey="credits" title="감독/배우">
                {activeTab === "credits" && <MovieCredits id={id} />}
              </Tab>
              <Tab eventKey="reviews" title="리뷰">
                {activeTab === "reviews" && <MovieReviews id={id} />}
              </Tab>
              <Tab eventKey="similarMovies" title="유사한 영화">
                {activeTab === "similarMovies" && <MovieSimilar id={id} />}
              </Tab>
            </Tabs>
          </Col>
          <Col xs={12}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetailPage;

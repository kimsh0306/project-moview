import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useMovieSearch";
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row, Button } from "react-bootstrap";
import { genreList } from "../../constants/genreList";
import RecommendMovie from "./components/RecommendMovie/RecommendMovie";
import MovieCard from "../../common/MovieCard/MovieCard";
import CustomPaginate from "./components/CustomPaginate/CustomPaginate";
import MovieGenre from "./components/MovieGenre/MovieGenre";
import CustomDropdown from "./components/CustomDropdown/CustomDropdown";
import "./MoviePage.style.css";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sort, setSort] = React.useState("");

  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery(
    keyword,
    page
  );
  // console.log("dataMovie: ", data);

  const [originalData, setOriginalData] = React.useState();
  const [appliedData, setAppliedData] = React.useState();

  const getSortData = (sortType) => {
    switch (sortType) {
      case "popularity":
        setAppliedData((prevState) => {
          return {
            ...prevState,
            results: [
              ...prevState.results.sort((a, b) => b.popularity - a.popularity),
            ],
          };
        });
        break;
      case "vote_count":
        setAppliedData((prevState) => {
          return {
            ...prevState,
            results: [
              ...prevState.results.sort((a, b) => b.vote_count - a.vote_count),
            ],
          };
        });
        break;
      case "vote_average":
        setAppliedData((prevState) => {
          return {
            ...prevState,
            results: [
              ...prevState.results.sort(
                (a, b) => b.vote_average - a.vote_average
              ),
            ],
          };
        });
        break;
      case "none":
        setAppliedData((prevState) => {
          return {
            ...prevState,
            results: [
              ...prevState.results.sort((a, b) => b.popularity - a.popularity),
            ],
          };
        });
        break;
    }
  };

  // useEffect(() => {
  //   console.log("appliedData: ", appliedData?.results);
  // }, [appliedData]);

  useEffect(() => {
    // console.log("::");
    if (sort !== "" && appliedData) {
      getSortData(sort);
    }
  }, [sort]);

  useEffect(() => {
    // console.log("data: ", data);
    if (data) {
      setAppliedData({ ...data });
      setOriginalData({ ...data });
      if (sort) {
        getSortData(sort);
      }
    }
  }, [data]);

  if (data?.results.length === 0) {
    return <RecommendMovie />;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="movie-page">
      <Container fluid>
        <Row className="movie-page__header">
          <div className="page-name">
            <h2>영화</h2>
            <div className="dropdown">
              <CustomDropdown sort={sort} setSort={setSort} />
            </div>
          </div>
          <div className="movie-page__genre">
            <Col xs={12}>
              <div className="genre">
                <MovieGenre
                  originalData={originalData}
                  setAppliedData={setAppliedData}
                  genreList={genreList}
                />
              </div>
            </Col>
          </div>
        </Row>
        <Row className="movie-page__contents">
          {appliedData?.results.length > 0 ? (
            <>
              {appliedData?.results?.map((movie, idx) => (
                <Col key={idx} xl={2} lg={3} md={4} sm={6} xs={6}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
              <CustomPaginate
                appliedData={appliedData}
                page={page}
                setPage={setPage}
              />
            </>
          ) : (
            <Alert show={true} variant="primary">
              <Alert.Heading>알림</Alert.Heading>
              <hr />
              <p className="m-0">
                선택하신 장르의 영화를 찾지 못했습니다. 다른 장르를 선택해주세요.
              </p>
            </Alert>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;

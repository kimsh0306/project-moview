import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useMovieSearch";
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { genreList } from "../../constants/genreList";
import RecommendMovie from "./components/RecommendMovie/RecommendMovie";
import MovieCard from "../../common/MovieCard/MovieCard";
import CustomSelect from "./components/CustomSelect/CustomSelect";
import CustomPaginate from "./components/CustomPaginate/CustomPaginate";
import MovieGenre from "./components/MovieGenre/MovieGenre";
import "./MoviePage.style.css";
import CustomDropdown from "./components/CustomDropdown/CustomDropdown";

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

  const [appliedData, setAppliedData] = React.useState();
  const [originalData, setOriginalData] = React.useState();

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

  useEffect(() => {
    // console.log("appliedData: ", appliedData);
  }, [appliedData]);

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
        <Row className="movie-page__box">
          <Col lg={4} xs={12}>
            <Row className="movie-page__options">
              <CustomDropdown sort={sort} setSort={setSort} />
              {/* <CustomSelect sort={sort} setSort={setSort} /> */}
              <MovieGenre
                originalData={originalData}
                setAppliedData={setAppliedData}
                genreList={genreList}
              />
            </Row>
          </Col>
          <Col lg={8} xs={12}>
            <Row className="movie-page__contents">
              {appliedData?.results?.map((movie, idx) => (
                <Col key={idx} lg={4} md={4} sm={6} xs={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
            <CustomPaginate
              appliedData={appliedData}
              page={page}
              setPage={setPage}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;

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
  const [sort, setSort] = React.useState("popularity");

  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery(
    keyword,
    page
  );
  // console.log("dataMovie: ", data);

  const [originalData, setOriginalData] = React.useState();
  const [appliedData, setAppliedData] = React.useState();

  const getSortData = (sortType, data) => {
    switch (sortType) {
      case "popularity":
        return {
          ...data,
          results: [...data.results.sort((a, b) => b.popularity - a.popularity)],
        };
      case "vote_count":
        return {
          ...data,
          results: [...data.results.sort((a, b) => b.vote_count - a.vote_count)],
        };
      case "vote_average":
        return {
          ...data,
          results: [
            ...data.results.sort((a, b) => b.vote_average - a.vote_average),
          ],
        };
      case "none":
        return {
          ...data,
          results: [...data.results.sort((a, b) => b.popularity - a.popularity)],
        };
      default:
        return data;
    }
  };

  useEffect(() => {
    if (data) {
      const sortedData = getSortData(sort, data); // 정렬된 데이터를 반환
      setAppliedData({ ...sortedData });
      setOriginalData({ ...data });
    }
  }, [data, sort]);
  
  useEffect(() => {
    if (appliedData) {
      const sortedData = getSortData(sort, appliedData); // 현재 sort 상태로 적용
      setAppliedData(sortedData);
    }
  }, [page]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // keyword 검색 결과가 없을 경우 
  if (data?.results?.length === 0) {
    return (
      <div className="movie-page">
        <Container fluid>
          <Row className="movie-page__contents">
            <Col xs={12}>
              <Alert show={true} variant="primary">
                <p className="m-0">
                  입력하신 검색어와 일치하는 영화를 찾지 못했습니다. 다른 영화를
                  추천드려요.
                </p>
              </Alert>
            </Col>
            <RecommendMovie page={page} />
          </Row>
        </Container>
      </div>
    );
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
          {/* 장르로 정렬했을 때 데이터가 없을 경우 */}
          {appliedData?.results?.length > 0 ? (
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
                선택하신 장르의 영화를 찾지 못했습니다. 다른 장르를
                선택해주세요.
              </p>
            </Alert>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;

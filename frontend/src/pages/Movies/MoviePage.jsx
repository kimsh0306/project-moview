import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useMovieSearch";
import _ from "lodash";
import { Alert, Col, Container, Row } from "react-bootstrap";
import RecommendMovie from "./components/RecommendMovie/RecommendMovie";
import CustomPaginate from "./components/CustomPaginate/CustomPaginate";
import MovieGenre from "./components/MovieGenre/MovieGenre";
import CustomDropdown from "./components/CustomDropdown/CustomDropdown";
import MovieCard from "../../common/MovieCard/MovieCard";
import LoadingModal from "../../common/LoadingModal/LoadingModal";
import "./MoviePage.style.css";

const MoviePage = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popularity");
  const [selectedGenreIds, setSelectedGenreIds] = React.useState([]);
  const [appliedData, setAppliedData] = React.useState();

  const [query] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, isPreviousData, isError, error } =
    useSearchMovieQuery(keyword, page);

  const getSortedData = (sortType, data) => {
    switch (sortType) {
      case "popularity":
        return {
          ...data,
          results: [
            ...data.results.sort((a, b) => b.popularity - a.popularity),
          ],
        };
      case "vote_count":
        return {
          ...data,
          results: [
            ...data.results.sort((a, b) => b.vote_count - a.vote_count),
          ],
        };
      case "vote_average":
        return {
          ...data,
          results: [
            ...data.results.sort((a, b) => b.vote_average - a.vote_average),
          ],
        };
      default:
        return data;
    }
  };

  const getSelectedGenreData = (data) => {
    let result = [];

    selectedGenreIds.forEach((item) => {
      const filteredResults = data?.results.filter((obj) =>
        obj.genre_ids.includes(Number(item))
      );

      filteredResults?.forEach((movie) => {
        // 이미 result에 포함되지 않은 경우에만 추가
        if (!result.some((res) => res.id === movie.id)) {
          result = [...result, movie];
        }
      });
    });

    return { ...data, results: result };
  };

  useEffect(() => {
    if (data) {
      // data를 받아오면 clone
      const cloneData = _.cloneDeep(data);
      // sort는 항상 먼저 진행 후, 장르가 선택돼 있다면 선별한 데이터 가져오기
      const filteredData =
        selectedGenreIds.length > 0
          ? getSelectedGenreData(cloneData)
          : cloneData;
      const sortedData = getSortedData(sort, filteredData);
      setAppliedData(sortedData);
    }
  }, [data, sort, selectedGenreIds, page]);

  useEffect(() => {
    // 페이지 이동 시 캐싱된 데이터만 사용 중일 때, 화면을 위로 스크롤
    if (!isPreviousData) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [page, isPreviousData]);

  if (isLoading) return <LoadingModal show={true} />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (!data) return <Alert variant="danger">No data available</Alert>;

  // keyword 검색 결과가 없을 경우
  if (data.results.length === 0) {
    return (
      <div className="movie-page">
        <Container fluid>
          <Row className="contents">
            <Col xs={12}>
              <Alert show={true}>
                <p className="m-0">
                  입력하신 검색어와 일치하는 영화를 찾지 못했습니다. 다른 영화를
                  추천드려요.
                </p>
              </Alert>
            </Col>
            <RecommendMovie />
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="movie-page">
      <Container fluid>
        <Row className="header">
          <div className="title">
            <h2>영화</h2>
            <CustomDropdown sort={sort} setSort={setSort} />
          </div>
          <Col xs={12}>
            <MovieGenre
              selectedGenreIds={selectedGenreIds}
              setSelectedGenreIds={setSelectedGenreIds}
            />
          </Col>
        </Row>
        <Row className="contents">
          {appliedData && appliedData.results.length > 0 ? (
            <>
              {appliedData.results.map((movie, idx) => (
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
            <>
              <Alert show={true} variant="primary">
                <p className="m-0">
                  선택하신 장르의 영화를 찾지 못했습니다. 다른 장르를
                  선택해주세요.
                </p>
              </Alert>
              <CustomPaginate
                appliedData={appliedData}
                page={page}
                setPage={setPage}
              />
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;

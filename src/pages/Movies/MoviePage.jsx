import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useMovieSearch";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import { Alert, Col, Container, Row } from "react-bootstrap";
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
  const [selectedGenreIds, setSelectedGenreIds] = React.useState([]);

  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery(
    keyword,
    page
  );
  // console.log("dataMovie: ", data);

  const [appliedData, setAppliedData] = React.useState();

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
                  data={data}
                  setAppliedData={setAppliedData}
                  genreList={genreList}
                  sort={sort}
                  getSortedData={getSortedData}
                  selectedGenreIds={selectedGenreIds}
                  setSelectedGenreIds={setSelectedGenreIds}
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
            <>
              <Alert show={true} variant="primary">
                <Alert.Heading>알림</Alert.Heading>
                <hr />
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

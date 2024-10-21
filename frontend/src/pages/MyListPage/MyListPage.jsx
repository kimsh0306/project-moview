import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import GenreSelector from "../../common/GenreSelector/GenreSelector";
import CustomDropdown from "../../common/CustomDropdown/CustomDropdown";

const sortTypeList = [
  { value: "popularity", name: "인기 순" },
  { value: "vote_average", name: "평점 순" },
  { value: "vote_count", name: "평점 참여 순" },
];

const MyListPage = () => {
  const [sort, setSort] = useState("popularity");
  const [selectedGenreIds, setSelectedGenreIds] = React.useState([]);
  const [appliedData, setAppliedData] = React.useState();

  const data = useSelector((state) => state.myMovies.movies);

  const getSortedData = (sortType, data) => {
    switch (sortType) {
      case "popularity":
        return [...data.sort((a, b) => b.popularity - a.popularity)];
      case "vote_count":
        return [...data.sort((a, b) => b.vote_count - a.vote_count)];
      case "vote_average":
        return [...data.sort((a, b) => b.vote_average - a.vote_average)];
      default:
        return data;
    }
  };

  const getSelectedGenreData = (data) => {
    let result = [];

    selectedGenreIds.forEach((item) => {
      const filteredResults = data.filter((obj) =>
        obj.genre_ids.includes(Number(item))
      );

      filteredResults.forEach((movie) => {
        // 이미 result에 포함되지 않은 경우에만 추가
        if (!result.some((res) => res.id === movie.id)) {
          result = [...result, movie];
        }
      });
    });

    return [...result];
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
  }, [data, sort, selectedGenreIds]);

  if (!data) return <Alert variant="danger">No data available</Alert>;

  return (
    <Container fluid className="p-5">
      <Row className="mb-4">
        <Col xs={12} className="d-flex align-items-center">
          <h1 className="m-0 me-4">내가 찜한 영화</h1>
          <CustomDropdown
            sort={sort}
            setSort={setSort}
            sortTypeList={sortTypeList}
          />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col xs={12}>
          <GenreSelector
            selectedGenreIds={selectedGenreIds}
            setSelectedGenreIds={setSelectedGenreIds}
          />
        </Col>
      </Row>
      <Row className="g-2">
        {appliedData && appliedData.length > 0 ? (
          <>
            {appliedData.map((movie, idx) => (
              <Col key={idx} xl={2} lg={3} md={4} sm={6} xs={6}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </>
        ) : (
          <Col>
            <Alert show={true} variant="primary">
              <p className="m-0">
                선택하신 장르의 영화를 찾지 못했습니다. 다른 장르를
                선택해주세요.
              </p>
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default MyListPage;

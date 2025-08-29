import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Alert, Col, Container, Row } from "react-bootstrap";
import GenreSelector from "common/GenreSelector/GenreSelector";
import CustomDropdown from "common/CustomDropdown/CustomDropdown";
import FlipCard from "common/FlipCard/FlipCard";
import { useMyMoviesQuery } from "hooks/useMyMoviesQuery";
import NoMoviesMessage from "./components/NoMoviesMessage";

const sortTypeList = [
  { value: "popularity", name: "인기 순" },
  { value: "vote_average", name: "평점 순" },
  { value: "vote_count", name: "평점 참여 순" },
];

const MyListPage = () => {
  const [sort, setSort] = useState("popularity");
  const [selectedGenreIds, setSelectedGenreIds] = React.useState([]);

  const { data, isLoading, isError, error } = useMyMoviesQuery();

  if (isLoading)
    return <Alert variant="info">데이터를 불러오는 중입니다...</Alert>;
  if (isError)
    return <Alert variant="danger">오류 발생: {error.message}</Alert>;
  if (!data) return <Alert variant="danger">데이터를 찾을 수 없습니다.</Alert>;

  return (
    <Container fluid className="p-5">
      <Row className="mb-4">
        <Col xs={12} className="d-flex align-items-center">
          <h1 className="m-0 me-4">내가 찜한 영화</h1>
          <CustomDropdown
            selectedItem={sort}
            setSelectedItem={setSort}
            itemData={sortTypeList}
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
        {data.length > 0 ? (
          <>
            {data.map((movie, idx) => (
              <Col key={idx} xl={2} lg={3} md={4} sm={6} xs={6}>
                <FlipCard movie={movie} />
              </Col>
            ))}
          </>
        ) : (
          <NoMoviesMessage
            appliedDataLength={data.length}
            selectedGenreIdsLength={selectedGenreIds.length}
          />
        )}
      </Row>
    </Container>
  );
};

export default MyListPage;

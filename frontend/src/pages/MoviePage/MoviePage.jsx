import React, { useEffect, useState } from "react";
import { useDiscoverMovieQuery } from "../../hooks/useMovieSearch";
import _ from "lodash";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import LoadingModal from "../../common/LoadingModal/LoadingModal";
import Paginator from "../../common/Paginator/Paginator";
import GenreSelector from "../../common/GenreSelector/GenreSelector";
import CustomDropdown from "../../common/CustomDropdown/CustomDropdown";

const sortTypeList = [
  { value: "popularity.desc", name: "인기 순" },
  { value: "vote_average.desc", name: "평점 순" },
  { value: "vote_count.desc", name: "평점 참여 순" },
  { value: "primary_release_date.desc", name: "개봉일 순" },
];

const MoviePage = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popularity.desc");
  const [genres, setGenres] = React.useState([]);

  const { data, isLoading, isError, error } = useDiscoverMovieQuery(
    page,
    sort,
    genres
  );

  console.log("data:", data);

  if (isLoading) return <LoadingModal show={true} />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <Container fluid className="p-5">
      <Row className="mb-4">
        <Col xs={12} className="d-flex align-items-center">
          <h1 className="m-0 me-4">영화</h1>
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
            selectedGenreIds={genres}
            setSelectedGenreIds={setGenres}
          />
        </Col>
      </Row>
      <Row className="g-2">
        {data && data.results.length > 0 ? (
          <>
            {data.results.map((movie, idx) => (
              <Col key={idx} xl={2} lg={3} md={4} sm={6} xs={6}>
                <MovieCard movie={movie} />
              </Col>
            ))}
            <Col xs={12}>
              <Paginator data={data} page={page} setPage={setPage} />
            </Col>
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

export default MoviePage;

import React, { useState } from "react";
import { useRecommendMovieQuery } from "../../../../hooks/useMovieSearch";
import { Alert, Col } from "react-bootstrap";
import LoadingModal from "../../../../common/LoadingModal/LoadingModal";
import MovieCard from "../../../../common/MovieCard/MovieCard";
import CustomPaginate from "../CustomPaginate/CustomPaginate";

const RecommendMovie = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useRecommendMovieQuery(page);

  if (isLoading) return <LoadingModal show={true} />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (!data) return <Alert variant="danger">No data available</Alert>;

  return (
    <>
      {data.results.map((movie, idx) => (
        <Col key={idx} xl={2} lg={3} md={4} sm={6} xs={6}>
          <MovieCard movie={movie} />
        </Col>
      ))}
      <CustomPaginate appliedData={data} page={page} setPage={setPage} />
    </>
  );
};

export default RecommendMovie;

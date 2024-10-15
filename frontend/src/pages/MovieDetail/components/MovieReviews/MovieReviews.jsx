import React from "react";
import { useMovieReviewsQuery } from "../../../../hooks/useMovieDetail";
import { Alert, Spinner } from "react-bootstrap";
import ReviewCard from "../../../../common/ReviewCard/ReviewCard";
import "./MovieReviews.style.css";

const MovieReviews = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieReviewsQuery(id);

  const sortedResult = data?.results?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (!data) return <Alert variant="danger">No data available</Alert>;

  return (
    <div className="reviews-box">
      <p className="mb-1 text-nowrap text-end"> 총 {sortedResult.length}건</p>
      {sortedResult.length > 0 &&
        sortedResult?.map((review, idx) => {
          return (
            <div
              key={`${review}-${idx}`}
              style={{ marginTop: idx === 0 ? "0" : "10px" }}
            >
              <ReviewCard review={review} />
            </div>
          );
        })}
    </div>
  );
};

export default MovieReviews;

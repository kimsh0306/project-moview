import React from "react";
import { useMovieReviewsQuery } from "../../../../hooks/useMovieDetail";
import { Alert } from "react-bootstrap";
import ReviewCard from "../../../../common/ReviewCard/ReviewCard";
import "./MovieReviews.style.css";

const MovieReviews = ({ id, title }) => {
  const { data, isLoading, isError, error } = useMovieReviewsQuery(id);
  console.log("dataReviews: ", data);

  let sortedResult = data?.results?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  console.log("sortedResult: ", sortedResult);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div className="reviews-box">
      <h3>{title}</h3>
      <div>
        {sortedResult?.map((review, idx) => {
          return (
            <div style={{ marginTop: idx === 0 ? "0" : "10px" }}>
              <ReviewCard review={review} key={idx} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieReviews;

import React from "react";
import { useMovieReviewsQuery } from "../../../../hooks/useMovieDetail";
import { Alert } from "react-bootstrap";
import ReviewCard from "../../../../common/ReviewCard/ReviewCard";



const MovieReviews = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieReviewsQuery(id);

  console.log("dataReviews: ", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <div>
        <ReviewCard reviewList={data.results}/>
      </div>
    </div>
  );
};

export default MovieReviews;

import React from "react";
import { useNavigate } from "react-router-dom";
import { usePopularMoviesQuery } from "../../../../hooks/useMovieListsQuerys";
import { Alert, Badge, Button } from "react-bootstrap";
import CustomButton from "../../../../common/CustomButton/CustomButton";
import "./Banner.style.css";

const Banner = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  // console.log("dataBanner: ", data);

  const handleBtnClick = () => navigate(`/movies/${data?.results[0].id}`);

  if (isLoading) {
    <h1>Loading...</h1>;
  }
  if (isError) {
    <Alert variant="danger">{error.message}</Alert>;
  }

  const imgUrl = `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path}`;
  return (
    <div className="banner">
      <div className="banner__img-area">
        <div className="banner__img-moving">
          <img className="banner__img" src={imgUrl} />
        </div>
      </div>
      <div className="banner__content-area">
        <Badge className="mb-1" bg="primary">
          TOP1
        </Badge>
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
        <Button
          className="mt-3 hover:text-white"
          variant="outline-primary"
          size="sm"
          onClick={handleBtnClick}
        >
          영화 상세 정보
        </Button>
      </div>
    </div>
  );
};

export default Banner;

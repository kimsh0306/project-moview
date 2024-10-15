import React from "react";
import { useNavigate } from "react-router-dom";
import { usePopularMoviesQuery } from "../../../../hooks/useMovieListsQuerys";
import { Alert, Badge, Button } from "react-bootstrap";
import LoadingModal from "../../../../common/LoadingModal/LoadingModal";
import "./Banner.style.css";

const Banner = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  const handleBtnClick = () => navigate(`/movies/${topMovie.id}`);
  
  if (isLoading) return <LoadingModal show={true} />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (!data) return <Alert variant="danger">No data available</Alert>;
  
  const topMovie = data.results[0];
  const imgUrl = `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${topMovie.poster_path}`;

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
        <h1>{topMovie.title}</h1>
        <p>{topMovie.overview}</p>
        <Button
          className="mt-3"
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

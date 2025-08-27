import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button } from "react-bootstrap";
import { truncateText } from "utils/textUtils";
import "./BannerMovie.css";

const BannerMovie = ({ item: movie, idx }) => {
  const imgUrl = `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.poster_path}`;

  const navigate = useNavigate();

  const handleBtnClick = () => navigate(`/movies/${movie.id}`);

  return (
    <div className="banner-movie">
      <div className="img-area">
        <div className="img-box">
          <img src={imgUrl} alt={`banner movie ${idx + 1}`}/>
        </div>
      </div>
      <div className="content-area">
        <div className="content-box">
          <Badge className="mb-1" bg="primary">
            TOP{idx + 1}
          </Badge>
          <h1 className="mb-2">{movie.title}</h1>
          <p className="overview mb-3">{truncateText(movie.overview, 100)}</p>
          <Button variant="outline-primary" size="sm" onClick={handleBtnClick}>
            영화 상세 정보
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerMovie;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button } from "react-bootstrap";
import "./BannerItems.style.css";

const BannerItems = ({ movie, idx }) => {
  const navigate = useNavigate();
  const imgUrl = `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.poster_path}`;

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };
  const handleBtnClick = () => navigate(`/movies/${movie.id}`);

  return (
    <div className="banner-items">
      <div className="img-area">
        <div className="img-box">
          <img className="img" src={imgUrl} />
        </div>
      </div>
      <div className="content-area">
        <div className="content-box">
          <Badge className="mb-1" bg="primary">
            TOP{idx+1}
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
}

export default BannerItems;

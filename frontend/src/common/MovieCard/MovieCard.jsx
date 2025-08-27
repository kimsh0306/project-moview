import React from "react";
import { useNavigate } from "react-router-dom";
import { useGenreNames } from "hooks/useGenreNames";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Badge } from "react-bootstrap";
import FavoriteMark from "common/FavoriteMark/FavoriteMark";
import "react-circular-progressbar/dist/styles.css";
import "./MovieCard.css";

const MovieCard = ({ item: movie }) => {
  const posterPath = `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`;

  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (e.currentTarget === e.target) {
      navigate(`/movies/${movie.id}`);
    }
  };

  // 장르 ids ==> 장르 names로 변환 후 ui 반환
  const Genre = ({ genreIds }) => {
    const genreNames = useGenreNames(genreIds);
    return (
      <div className="mb-3">
        {genreNames?.map((name) => (
          <Badge key={name} className="badge" bg="danger">
            {name}
          </Badge>
        ))}
      </div>
    );
  };

  const Adult = () => (
    <Badge className="adult-badge" bg="warning">
      {movie.adult ? "19" : "all"}
    </Badge>
  );

  const Favorite = () => (
    <div className="position-absolute bottom-0 mb-2 z-1">
      <FavoriteMark movie={movie} />
    </div>
  );

  const Average = () => (
    <div className="vote-avg" style={{ width: 80, height: 80 }}>
      <CircularProgressbar
        value={movie.vote_average * 10}
        text={`${Math.ceil(movie.vote_average * 10)}%`}
        strokeWidth={5}
        styles={buildStyles({
          textSize: "20px",
          pathColor: "white",
          textColor: "#fff",
          trailColor: "#999",
        })}
      />
    </div>
  );

  return (
    <div className="movie-card">
      <div className="img-item">
        <img src={posterPath} />
        <div className="hidden-contents" onClick={handleCardClick}>
          <h4 className="title mb-3">{movie.title}</h4>
          <Genre genreIds={movie.genre_ids} />
          <Adult />
          <Favorite />
          <Average />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

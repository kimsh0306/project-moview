import React from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { Badge } from "react-bootstrap";
import FavoriteMark from "../FavoriteMark/FavoriteMark";
import "react-circular-progressbar/dist/styles.css";
import "./FlipCard.style.css";

const FlipCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  const getGenreNames = (genreIdList) => {
    if (!genreData) return [];

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  const handleMovieCardClick = (e) => {
    if (e.currentTarget === e.target) {
      navigate(`/movies/${movie.id}`);
    }
  };

  return (
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
            alt="Movie Poster"
          />
        </div>
        <div class="flip-card-back">
          <img
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
            alt="Movie Poster"
          />
          <div class="back-content" onClick={handleMovieCardClick}>
            <h3 className="mb-2">{movie.title}</h3>
            <div className="mb-2">
              {getGenreNames(movie.genre_ids).map((item, idx) => (
                <Badge key={idx} className="badge_genre" bg="danger">
                  {item}
                </Badge>
              ))}
            </div>
            <Badge className="badge_adult" bg="warning">
              {movie.adult ? "19" : "all"}
            </Badge>
            <div className="favorite-mark">
              <FavoriteMark movie={movie} />
            </div>
            <div className="vote_avg">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

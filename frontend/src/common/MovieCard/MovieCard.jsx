import React from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { Badge } from "react-bootstrap";
import FavoriteMark from "../FavoriteMark/FavoriteMark";
import "react-circular-progressbar/dist/styles.css";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
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
    <div className="movie-card">
      <div className="img-item">
        <img
          src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
        />
        <div className="overlay" onClick={handleMovieCardClick}>
          <h1 className="mb-3">{movie.title}</h1>
          <div className="mb-3">
            {getGenreNames(movie.genre_ids).map((item, idx) => (
              <Badge key={idx} className="badge" bg="danger">
                {item}
              </Badge>
            ))}
          </div>
          <div>
            <Badge className="badge_adult" bg="warning">
              {movie.adult ? "19" : "all"}
            </Badge>
          </div>
          <div
            style={{
              position: "absolute",
              zIndex: 1,
              bottom: 10,
            }}
          >
            <FavoriteMark movie={movie} />
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

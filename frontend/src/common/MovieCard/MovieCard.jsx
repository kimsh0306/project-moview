import React from "react";
import { useNavigate } from "react-router-dom";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { Badge } from "react-bootstrap";
import CircularProgressComp from "./components/CircularProgressComp/CircularProgressComp";
import AdultBadge from "./components/AdultBadge/AdultBadge";
import FavoriteMark from "../FavoriteMark/FavoriteMark";
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
          <h1>{movie.title}</h1>
          {getGenreNames(movie.genre_ids).map((item, idx) => (
            <Badge key={idx} className="badge" bg="danger">
              {item}
            </Badge>
          ))}
          <div className="movie-info">
            <AdultBadge adult={movie.adult} />
            {/* 
          <div>투표평균: {movie.vote_average}</div>
          <div>인기도: {movie.popularity}</div>
          <div>투표수: {movie.vote_count}</div> 
          */}
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
          <div className="vote-avg">
            <CircularProgressComp
              value={movie.vote_average * 10}
              thickness={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

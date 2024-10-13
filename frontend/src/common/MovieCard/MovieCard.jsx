import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { Badge } from "react-bootstrap";
import CircularProgressComp from "./components/CircularProgressComp/CircularProgressComp";
import AdultBadge from "./components/AdultBadge/AdultBadge";
import FavoriteMark from "../FavoriteMark/FavoriteMark";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: genreData } = useMovieGenreQuery();

  useEffect(() => {
    // db에 저장/삭제
  }, [isFavorite]);

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData?.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movies/${movie.id}`)}
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`,
      }}
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((item, idx) => (
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
          <FavoriteMark isFavorite={isFavorite} setIsFavorite={setIsFavorite} />
        </div>
        <div className="vote-avg">
          <CircularProgressComp value={movie.vote_average * 10} thickness={2} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

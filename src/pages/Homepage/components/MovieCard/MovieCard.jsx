import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          "}",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        {movie?.genre_ids?.map((item, idx) => (
          <Badge
            key={idx}
            style={{
              marginLeft: idx == 0 ? "0px" : "3px",
            }}
            className="badge"
            bg="danger"
          >
            {item}
          </Badge>
        ))}
        <div className="movieInfo">
          <div>{movie.vote_average}</div>
          <div>{movie.popularity}</div>
          <div>{movie.adult ? "over18" : "under18"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

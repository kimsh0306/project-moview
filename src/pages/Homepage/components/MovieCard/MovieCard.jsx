import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";

import { green } from '@mui/material/colors';
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" sx={{ color: "white" }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const MovieCard = ({ movie, type }) => {
  return (
    <div
      className="movie-card"
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          "}",
      }}
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
          {/* <div>vote_average: {movie.vote_average}</div> */}
          {/* <div>popularity: {movie.popularity}</div> */}
          <div>{movie.adult ? "19" : "all"}</div>
          <div className="vote-avg">
            <CircularProgressWithLabel
              sx={{
                color: "white",
              }}
              value={movie.vote_average * 10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

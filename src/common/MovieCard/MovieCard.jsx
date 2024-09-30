import React from "react";
import { useNavigate } from "react-router-dom";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { Badge } from "react-bootstrap";
import { deepOrange, amber, grey } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./MovieCard.style.css";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          zIndex: "-1",
          borderRadius: "50%",
          border: "0.125rem solid",
          borderColor: grey[700],
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
        <Typography variant="caption" component="div" sx={{ color: grey[300] }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function AdultBadge({ adult }) {
  return (
    <div
      style={{
        width: "1.5rem",
        height: "1.5rem",
        backgroundColor: adult ? deepOrange[500] : amber[500],
        color: "black",
        fontWeight: "bold",
        borderRadius: "20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {adult ? "19" : "all"}
    </div>
  );
}

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { data: genreData } = useMovieGenreQuery();
  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData?.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  // console.log("movie: ", movie);

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movies/${movie.id}`)}
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          "}",
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
          {/* <div>투표평균: {movie.vote_average}</div>
          <div>인기도: {movie.popularity}</div>
          <div>투표수: {movie.vote_count}</div> */}
          <div className="vote-avg">
            <CircularProgressWithLabel
              sx={{
                color: grey[300],
              }}
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

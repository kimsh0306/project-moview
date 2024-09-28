import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";

import { deepOrange, amber, grey } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const getColor = () => {
  const shade = 300;
  return grey[shade];
};

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          zIndex: "-1",
          borderRadius: "50%",
          border: "2px solid",
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
        <Typography variant="caption" component="div" sx={{ color: getColor() }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
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

  const handleCardClick =()=>{
    navigate(`/movies/${movie.id}`)
  }

  const getAdultBadge = (adult) => {
    if(!adult) {
      return (
        <div style={{
          width:"24px",
          height:"24px",
          backgroundColor:amber[500],
          color:"black",
          fontWeight:"bold",
          borderRadius:"20%",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
        }}>
          all
        </div>
      )
    } else {
      return (
        <div style={{
          width:"24px",
          height:"24px",
          backgroundColor:deepOrange[500],
          color:"black",
          fontWeight:"bold",
          borderRadius:"20%",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
        }}>
          19
        </div>
      )
    }
  }

  return (
    <div
      className="movie-card"
      onClick={handleCardClick}
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
        <div className="movieInfo">
          {/* <div>vote_average: {movie.vote_average}</div> */}
          {/* <div>popularity: {movie.popularity}</div>
          <div>vote_count: {movie.vote_count}</div> */}
          <div>{getAdultBadge(movie.adult)}</div>
          <div className="vote-avg">
            <CircularProgressWithLabel
              sx={{
                color: getColor(),
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

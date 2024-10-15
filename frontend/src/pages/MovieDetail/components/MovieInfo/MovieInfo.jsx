import React, { memo, useState } from "react";
import { green, grey } from "@mui/material/colors";
import { Typography, Box, CircularProgress } from "@mui/material";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { IoPlayOutline, IoCloseCircleOutline } from "react-icons/io5";
import MovieVideos from "../MovieVideos/MovieVideos";
import FavoriteMark from "../../../../common/FavoriteMark/FavoriteMark";
import "./MovieInfo.style.css";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          zIndex: "-1",
          borderRadius: "50%",
          border: "4px solid",
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

const MovieInfo = memo(({ movie }) => {
  const [isVideo, setIsVideo] = useState(false);

  const posterImgUrl = `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`;

  const handleVideoOpen = () => setIsVideo(true);
  const handleVideoClose = () => setIsVideo(false);

  console.log("d:", movie);

  return (
    <div className="info-comp">
      {isVideo ? (
        <>
          <div
            className="position-absolute z-3 top-0 fs-4"
            onClick={handleVideoClose}
          >
            <IoCloseCircleOutline />
          </div>
          <MovieVideos id={movie.id} />
        </>
      ) : (
        <Row>
          {movie.poster_path !== null && (
            <Col xs={12} sm={4}>
              <img className="poster" src={posterImgUrl} alt="영화 포스터" />
            </Col>
          )}
          <Col xs={12} sm={8}>
            <h1 className="title">{movie.title}</h1>
            <div className="badge-genres">
              {movie.genres.map((item, idx) => {
                return (
                  <Badge key={idx} className="badge" bg="danger">
                    {item.name}
                  </Badge>
                );
              })}
            </div>
            <div className="info__contents">
              <dl>
                <div className="info__group">
                  <dt>등급</dt>
                  <dd>{movie.adult ? "19세 이상 관람가" : "전체"}</dd>
                </div>
                <div className="info__group">
                  <dt>인기도</dt>
                  <dd>{movie.popularity}</dd>
                </div>
                <div className="info__group">
                  <dt>투표수</dt>
                  <dd>{movie.vote_count}</dd>
                </div>
                <div className="info__group">
                  <dt>개봉일</dt>
                  <dd>{movie.release_date}</dd>
                </div>
                <div className="info__group">
                  <dt>러닝타임</dt>
                  <dd>{movie.runtime}분</dd>
                </div>
              </dl>

              <div className="info__etc">
                <div className="etc-group">
                  <strong>회원점수</strong>
                  <div className="vote-avr">
                    <CircularProgressWithLabel
                      sx={{
                        color: green[600],
                      }}
                      value={movie?.vote_average * 10}
                      thickness={4}
                    />
                  </div>
                </div>
                <div className="etc-group">
                  <strong>트레일러 재생</strong>
                  <Button
                    variant="outline-primary"
                    onClick={handleVideoOpen}
                    disabled={!movie.video}
                  >
                    <IoPlayOutline className="fs-4" />
                  </Button>
                </div>
                <div className="etc-group">
                  <strong>찜한 영화</strong>
                  <FavoriteMark movie={movie} fontSize="2rem" />
                </div>
              </div>
              <div className="info__overview">
                <h5>개요</h5>
                <p>{movie.overview}</p>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
});

export default MovieInfo;

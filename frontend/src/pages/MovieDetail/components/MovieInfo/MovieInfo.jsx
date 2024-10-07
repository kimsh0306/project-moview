import React, { memo, useState } from "react";
import { green, grey } from "@mui/material/colors";
import { Typography, Box, CircularProgress } from "@mui/material";
import { Badge, Button, Col, Row } from "react-bootstrap";

import "./MovieInfo.style.css";
import MovieVideos from "../MovieVideos/MovieVideos";

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

/*
  React.memo 적용
    부모 컴포넌트가 다시 렌더링되더라도 MovieInfo가 받는 props가 변경되지 않는 한, 
    MovieInfo 컴포넌트가 불필요하게 재렌더링되는 것을 방지
*/
const MovieInfo = memo(({ data, id }) => {
  const [isVideo, setIsVideo] = useState(false);
  const posterImgUrl = `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path}`;
  console.log("posterImgUrl", posterImgUrl);

  const handleVideoOpen = () => setIsVideo(true);
  const handleVideoClose = () => setIsVideo(false);

  return (
    <div className="info-comp">
      {isVideo ? (
        <>
          <div
            className="position-absolute z-3 top-0"
            onClick={handleVideoClose}
          >
            X
          </div>
          <MovieVideos id={id} />
        </>
      ) : (
        <Row>
          {data?.poster_path !== null && (
            <Col xs={12} sm={4}>
              <img className="poster" src={posterImgUrl} alt="영화 포스터" />
            </Col>
          )}
          <Col xs={12} sm={8}>
            <h1 className="title">{data?.title}</h1>
            <div className="badge-genres">
              {data.genres.map((item, idx) => {
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
                  <dd>{data?.adult ? "19세 이상 관람가" : "전체"}</dd>
                </div>
                <div className="info__group">
                  <dt>인기도</dt>
                  <dd>{data?.popularity}</dd>
                </div>
                <div className="info__group">
                  <dt>투표수</dt>
                  <dd>{data?.vote_count}</dd>
                </div>
                <div className="info__group">
                  <dt>개봉일</dt>
                  <dd>{data?.release_date}</dd>
                </div>
                <div className="info__group">
                  <dt>러닝타임</dt>
                  <dd>{data?.runtime}분</dd>
                </div>
              </dl>

              <div className="info__etc">
                <div className="etc-group">
                  <div>
                    <strong>회원점수</strong>
                  </div>
                  <div className="vote-avr">
                    <CircularProgressWithLabel
                      sx={{
                        color: green[600],
                      }}
                      value={data?.vote_average * 10}
                      thickness={4}
                    />
                  </div>
                </div>
                <div className="etc-group">
                  <div>
                    <strong>트레일러 재생</strong>
                  </div>
                  <Button variant="outline-primary" onClick={handleVideoOpen}>
                    play
                  </Button>
                </div>
              </div>
              <div className="info__overview">
                <h5>개요</h5>
                <p>{data?.overview}</p>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
});

export default MovieInfo;

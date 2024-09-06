import React from "react";
import "./MovieInfo.style.css";

import { deepOrange, amber, grey } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Badge, Col, Container, Row } from "react-bootstrap";

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
        <Typography
          variant="caption"
          component="div"
          sx={{ color: getColor() }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const MovieInfo = ({ data }) => {
  const posterImgUrl = `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path}`;

  return (
    <div className="detail-info-area">
      <div className="detail-info">
        <div className="info-title">
          <h3>{data?.title}</h3>
        </div>
        <div className="genre-badge">
          {data.genres.map((item, idx) => {
            return (
              <Badge key={idx} className="badge" bg="danger">
                {item.name}
              </Badge>
            );
          })}
        </div>
        <div className="info-item-area">
          {/* <div className="detail-poster-img-box">
            <img className="detail-poster-img" src={posterImgUrl} />
          </div> */}
          <div className="info-item-box">
            <div className="info-key">
              <h6>adult</h6>
              <h6>popularity</h6>
              <h6>vote_count</h6>
              <h6>relese_date</h6>
              <h6>runtime</h6>
            </div>
            <div className="info-val">
              <h6>{data?.adult ? "19" : "all"}</h6>
              <h6>{data?.popularity}</h6>
              <h6>{data?.vote_count}</h6>
              <h6>{data?.release_date}</h6>
              <h6>{data?.runtime}</h6>
            </div>
          </div>
        </div>
        {/* <div className="vote-avr-box">
          <CircularProgressWithLabel
            sx={{
              color: getColor(),
            }}
            value={data?.vote_average * 10}
            thickness={2}
          />
        </div> */}
        <Container className="info-item-container">
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
        </Container>
        <div className="info-overview">
          <p>{data?.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;

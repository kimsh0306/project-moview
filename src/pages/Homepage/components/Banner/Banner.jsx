import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";
import { InfoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


const Banner = () => {

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "none",
    border:"1px solid #999",
    '&:hover': {
      backgroundColor: "white",
      backgroundColor: "none",
      border:"1px solid white",
    },
  }));

  const navigate = useNavigate();
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("data: ", data);
  if (isLoading) {
    <h1>Loading...</h1>;
  }
  if (isError) {
    <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div className="banner">
      <div className="banner-img-box">
        <div
          className="banner-img"
          style={{
            backgroundImage:
              "url(" +
              `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path}` +
              ")",
          }}
        ></div>
      </div>
      <div className="text-white banner-text-area">
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>

        {/* <InfoOutlined className="movie-info" /> */}
        <ColorButton
          onClick={() => {navigate("/movies/:id")}}
          sx={{
            marginTop: "14px",
          }}
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<InfoOutlined />}
        >
          movie info
        </ColorButton>
      </div>
    </div>
  );
};

export default Banner;

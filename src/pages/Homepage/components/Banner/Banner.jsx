import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";
import { InfoOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";

const primary = red[500];

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("data: ", data);
  if (isLoading) {
    <h1>Loading...</h1>;
  }
  if (isError) {
    <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div className="banner-box">
      <div
        className="banner"
        style={{
          backgroundImage:
            "url(" +
            `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path}` +
            ")",
        }}
      ></div>
      <div className="text-white banner-text-area">
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>

        {/* <InfoOutlined className="movie-info" /> */}
        {/* <Button
          component="label"
          role={undefined}
          variant="outlined"
          size="small"
          tabIndex={-1}
          color="primary"
          startIcon={<InfoOutlined />}
        >
          movie info
        </Button> */}
      </div>
    </div>
  );
};

export default Banner;

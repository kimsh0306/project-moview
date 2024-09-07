import React from "react";
import YouTube from "react-youtube";
import { useMovieVideosQuery } from "../../../../hooks/useMovieDetail";
import { Alert } from "react-bootstrap";

const MovieVideos = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieVideosQuery(id);
  console.log("dataVideos: ", data);

  const opts = {
    width: "640",
    height: "390",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <YouTube
      videoId={data.results[0].key}
      opts={opts}
      onReady={(event) => {
        event.target.pauseVideo();
      }}
    />
  );
};

export default MovieVideos;

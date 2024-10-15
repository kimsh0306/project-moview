import React from "react";
import { useMovieVideosQuery } from "../../../../hooks/useMovieDetail";
import YouTube from "react-youtube";
import { Alert } from "react-bootstrap";
import LoadingModal from "../../../../common/LoadingModal/LoadingModal";
import "./MovieVideos.style.css";

const MovieVideos = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieVideosQuery(id);
  console.log("dataVideos: ", data);

  const opts = {
    playerVars: {
      autoplay: 1,
      mute: 1,
    },
  };

  if (isLoading) {
    console.log("Loading...");
    return <LoadingModal show={true} />;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div className="video-comp">
      <YouTube
        className="youtube"
        videoId={data?.results[0]?.key}
        opts={opts}
        iframeClassName="responsive-iframe" // iframe에 클래스 적용
      />
    </div>
  );
};

export default MovieVideos;

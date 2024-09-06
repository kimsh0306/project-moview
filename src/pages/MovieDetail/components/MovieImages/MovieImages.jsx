import React from "react";
import { Alert } from "react-bootstrap";
import { useMovieImagesQuery } from "../../../../hooks/useMovieDetail";


const MovieImages = ({id}) => {
  const { data, isLoading, isError, error } = useMovieImagesQuery(id);

  // console.log("dataImg: ", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const imgUrl = `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.posters[0].file_path}`;

  return (
    <div>
      <img className="img" src={imgUrl} />
    </div>
  )
}

export default MovieImages

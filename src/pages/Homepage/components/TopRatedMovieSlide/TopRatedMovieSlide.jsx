import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useQuerys";
import { Alert } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./TopRatedMovieSlide.style.css"

const responsive = {
  xl: {
    breakpoint: { max: 1700, min: 1400 },
    items: 6,
    // slidesToSlide: 6,
  },
  l: {
    breakpoint: { max: 1400, min: 1100 },
    items: 5,
    // slidesToSlide: 5,
  },
  m: {
    breakpoint: { max: 1100, min: 800 },
    items: 4,
    // slidesToSlide: 4,
  },
  s: {
    breakpoint: { max: 800, min: 464 },
    items: 3,
    // slidesToSlide: 3,
  },
  xs: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    // slidesToSlide: 1,
  }
};

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();
  console.log("data TopRated: ", data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div className="slide-box">
      <h3>Top Rated Movies</h3>
      <Carousel
        draggable={true}
        centerMode={false}
        responsive={responsive}
        infinite={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
      >
        {data.results.map((movie, idx)=>(
          <MovieCard movie={movie} key={idx}/>
        ))}
      </Carousel>
    </div>
  );
};

export default TopRatedMovieSlide;

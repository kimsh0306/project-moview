import React from "react";
import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard/MovieCard";
import "react-multi-carousel/lib/styles.css";
import "./MovieSlider.style.css";

const MovieSlider = ({ title, movies, responsive, noTitle = false }) => {
  return (
    <div className="slide-box">
      {noTitle || <h3>{title}</h3>}
      <div className="carousel-wrapper">
        <Carousel
          draggable={true}
          centerMode={false}
          responsive={responsive}
          infinite={false} // true일 때, 불필요한 렌더링 문제 발생
        >
          {movies.map((movie, idx) => (
            <MovieCard movie={movie} key={`${movie.id}-${idx}`} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MovieSlider;

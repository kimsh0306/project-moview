import React from "react";
import Carousel from "react-multi-carousel";
import FlipCard from "../FlipCard/FlipCard";
import "react-multi-carousel/lib/styles.css";
import "./MovieSlider.style.css";

const MovieSlider = ({ title, movies, responsive, noTitle = false }) => {
  return (
    <div className="slide-box">
      {noTitle || <h5 className="mb-2">{title}</h5>}
      <div className="carousel-wrapper">
        <Carousel
          draggable={true}
          centerMode={false}
          responsive={responsive}
          itemClass="p-1"
          infinite={false} // true일 때, 불필요한 렌더링 문제 발생
          className="custom-carousel"
        >
          {movies.map((movie, idx) => (
            <FlipCard movie={movie} key={`${movie.id}-${idx}`} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MovieSlider;

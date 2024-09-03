import React from 'react'
import "./MovieSlider.style.css"
import MovieCard from '../MovieCard/MovieCard'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";

const MovieSlider = ({title, movies, responsive}) => {
  return (
    <div className="slide-box">
      <h3>{title}</h3>
      <Carousel
        draggable={true}
        centerMode={false}
        responsive={responsive}
        infinite={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
      >
        {movies.map((movie, idx)=>(
          <MovieCard movie={movie} key={idx}/>
        ))}
      </Carousel>
    </div>
  )
}

export default MovieSlider

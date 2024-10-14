import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
import "./Homepage.style.css";
import { useSelector } from "react-redux";

const Homepage = () => {
  const myMovies = useSelector((state) => state.myMovies);
  console.log("myMovies: ", myMovies)
  return (
    <>
      <Banner />
      <div className="home__content">
        <PopularMovieSlide />
        <TopRatedMovieSlide />
        <UpcomingMovieSlide />
      </div>
    </>
  );
};

export default Homepage;

import React from "react";
import Banner from "./components/Banner/Banner";
import MovieLists from "./components/MovieLists/MovieLists";

const Homepage = () => {
  return (
    <main className="homepage">
      <Banner/>
      <MovieLists/>
    </main>
  );
};

export default Homepage;

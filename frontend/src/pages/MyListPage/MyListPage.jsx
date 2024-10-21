import React from "react";
import { useSelector } from "react-redux";
import MyListContainer from "./components/MyListContainer/MyListContainer";
import "./MyListPage.style.css";

const MyListPage = () => {
  const myMoviesState = useSelector((state) => state.myMovies.movies);

  return <MyListContainer data={myMoviesState} />;
};

export default MyListPage;

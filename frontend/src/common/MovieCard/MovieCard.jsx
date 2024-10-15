import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { Badge } from "react-bootstrap";
import CircularProgressComp from "./components/CircularProgressComp/CircularProgressComp";
import AdultBadge from "./components/AdultBadge/AdultBadge";
import FavoriteMark from "../FavoriteMark/FavoriteMark";
import CheckLoginModal from "../CheckLoginModal/CheckLoginModal";
import LoadingModal from "../LoadingModal/LoadingModal";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myMovies = useSelector((state) => state.myMovies);
  const [userData, setUserData] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const [showCheckLoginModal, setShowCheckLoginModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const { data: genreData } = useMovieGenreQuery();

  useEffect(() => {
    if (!movie) return;
    const userId = localStorage.getItem("userId");
    const userNum = localStorage.getItem("userNum");

    if (userId && userNum) {
      setUserData({ userId, userNum });
    }

    if (myMovies.some((myMovie) => myMovie.id === movie.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [movie, myMovies]);

  const handleFavoriteItem = (e) => {
    e.stopPropagation();
    if (!userData) {
      console.log("로그인이 필요한 서비스입니다.");
      setShowCheckLoginModal(true);
      return;
    }
    const payload = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      adult: movie.adult,
      vote_average: movie.vote_average,
      genre_ids: movie.genre_ids,
    };
    // db에 추가/삭제
    if (isFavorite) {
      setShowLoading(true);
      axios
        .delete(
          `https://project-moview-api.vercel.app/users/${userData.userNum}/my_movies/${movie.id}`
        )
        .then((res) => {
          console.log("my_movies 삭제 성공:", res.data);
          dispatch({ type: "DELETE_MY_MOVIE", payload: { myMovie: payload } });
          setIsFavorite(false);
        })
        .catch((error) => {
          const { message } = error.response.data;
          console.error(error);
          console.log("my_movies 삭제 실패:", message);
        })
        .finally(() => {
          setShowLoading(false);
        });
    } else {
      setShowLoading(true);
      axios
        .post(
          `https://project-moview-api.vercel.app/users/${userData.userNum}/my_movies`,
          payload
        )
        .then((res) => {
          console.log("my_movies 추가 성공:", res.data);
          dispatch({ type: "PUT_MY_MOVIE", payload: { myMovie: payload } });
          setIsFavorite(true);
        })
        .catch((error) => {
          const { message } = error.response.data;
          console.error(error);
          console.log("my_movies 추가 실패:", message);
        })
        .finally(() => {
          setShowLoading(false);
        });
    }
  };

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData?.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  return (
    <>
      <div
        className="movie-card"
        onClick={() => navigate(`/movies/${movie.id}`)}
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`,
        }}
      >
        <div className="overlay">
          <h1>{movie.title}</h1>
          {showGenre(movie.genre_ids).map((item, idx) => (
            <Badge key={idx} className="badge" bg="danger">
              {item}
            </Badge>
          ))}
          <div className="movie-info">
            <AdultBadge adult={movie.adult} />
            {/* 
          <div>투표평균: {movie.vote_average}</div>
          <div>인기도: {movie.popularity}</div>
          <div>투표수: {movie.vote_count}</div> 
          */}
          </div>
          <div
            style={{
              position: "absolute",
              zIndex: 1,
              bottom: 10,
            }}
          >
            <FavoriteMark
              isFavorite={isFavorite}
              handleFavoriteItem={handleFavoriteItem}
            />
          </div>
          <div className="vote-avg">
            <CircularProgressComp
              value={movie.vote_average * 10}
              thickness={2}
            />
          </div>
        </div>
      </div>
      <CheckLoginModal
        show={showCheckLoginModal}
        setShow={setShowCheckLoginModal}
      />
      <LoadingModal show={showLoading} />
    </>
  );
};

export default MovieCard;

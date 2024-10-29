import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs";
import AlertModal from "../AlertModal/AlertModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "./FavoriteMark.style.css";

const FavoriteMark = ({ movie, fontSize = "1.7rem" }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState();
  const [showAlertModal, setShowAlertModal] = useState();

  const userState = useSelector((state) => state.auth.user);
  const myMoviesState = useSelector((state) => state.myMovies.movies);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movie || !myMoviesState) return;

    if (myMoviesState.some((myMovie) => myMovie.id === movie.id)) {
      setIsFavorite(true);
    }
  }, [movie, myMoviesState]);

  const removeMyMovies = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/my_lists/movies/${movie.id}`;
      return await axios.delete(url, {
        withCredentials: true,
      });
    } catch (error) {
      throw new Error(`찜 삭제 요청이 실패했습니다. 제목: ${movie.title}`, {
        cause: error.response ? error.response.data.message : error,
      });
    }
  };

  const addMyMovies = async (moviePayload) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/my_lists/movies`;
      return await axios.post(url, moviePayload, {
        withCredentials: true,
      });
    } catch (error) {
      throw new Error(`찜 추가 요청이 실패했습니다. 제목: ${movie.title}`, {
        cause: error.response ? error.response.data.message : error,
      });
    }
  };

  const handleFavoriteMark = async (e) => {
    e.stopPropagation();

    if (!userState) {
      setShowConfirmModal("로그인이 필요한 서비스입니다. 로그인하시겠습니까?");
      return;
    }

    const prevIsFavorite = isFavorite;
    const moviePayload = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      adult: movie.adult,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      popularity: movie.popularity,
      genre_ids: movie.genre_ids,
    };

    // 낙관적 업데이트 적용
    try {
      if (isFavorite) {
        setIsFavorite(false);
        dispatch({
          type: "REMOVE_MY_MOVIES",
          payload: { movie: moviePayload },
        });
        const res = await removeMyMovies();
        console.log(`${res.data.message} 제목: ${movie.title}`);
      } else {
        setIsFavorite(true);
        dispatch({ type: "ADD_MY_MOVIES", payload: { movie: moviePayload } });
        const res = await addMyMovies(moviePayload);
        console.log(`${res.data.message} 제목: ${movie.title}`);
      }
    } catch (error) {
      setShowAlertModal(error.message);
      setIsFavorite(prevIsFavorite);
      console.error("에러 메시지:", error.message);
      if (error.cause) {
        console.error("원인:", error.cause);
      }
      dispatch({ type: "SET_MY_MOVIES", payload: myMoviesState });
    }
  };

  const handleConfirm = () => navigate("/login");
  const handleConfirmClose = () => setShowConfirmModal();
  const handleAlertClose = () => setShowAlertModal();

  return (
    <>
      {isFavorite ? (
        <OverlayTrigger
          overlay={<Tooltip className="favorite-mark">찜 제거</Tooltip>}
        >
          <div>
            <BsBookmarkDashFill
              className="favorite-selected"
              onClick={handleFavoriteMark}
              style={{ fontSize: fontSize }}
            />
          </div>
        </OverlayTrigger>
      ) : (
        <OverlayTrigger
          overlay={<Tooltip className="favorite-mark">찜 추가</Tooltip>}
        >
          <div>
            <BsBookmarkPlus
              className="favorite-unselected"
              onClick={handleFavoriteMark}
              style={{ fontSize: fontSize }}
            />
          </div>
        </OverlayTrigger>
      )}
      <ConfirmModal
        show={showConfirmModal}
        handleClose={handleConfirmClose}
        handleConfirm={handleConfirm}
      />
      <AlertModal show={showAlertModal} handleClose={handleAlertClose} />
    </>
  );
};

export default FavoriteMark;

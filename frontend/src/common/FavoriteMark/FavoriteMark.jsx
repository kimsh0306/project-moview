import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs";
import AlertModal from "../AlertModal/AlertModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { useMyMoviesQuery } from "../../hooks/useMyMoviesQuery";
import { useAddMyMovieMutation, useRemoveMyMovieMutation } from "../../hooks/useMyMoviesMutation";
import "./FavoriteMark.style.css";

const FavoriteMark = ({ movie, fontSize = "1.7rem" }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState();
  const [showAlertModal, setShowAlertModal] = useState();

  const userState = useSelector((state) => state.auth.user);
  const { data: myMovies } = useMyMoviesQuery();
  const addMovieMutation = useAddMyMovieMutation();
  const removeMovieMutation = useRemoveMyMovieMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!movie || !myMovies) return;

    setIsFavorite(myMovies.some((myMovie) => myMovie.id === movie.id));
  }, [movie, myMovies]);

  const handleFavoriteMark = (e) => {
    e.stopPropagation();

    if (!userState) {
      setShowConfirmModal("로그인이 필요한 서비스입니다. 로그인하시겠습니까?");
      return;
    }

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

    if (isFavorite) {
      removeMovieMutation.mutate(movie.id, {
        onError: (error) => {
          setShowAlertModal(error.message);
          console.error("Error removing movie:", error);
        },
      });
    } else {
      addMovieMutation.mutate(moviePayload, {
        onError: (error) => {
          setShowAlertModal(error.message);
          console.error("Error adding movie:", error);
        },
      });
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

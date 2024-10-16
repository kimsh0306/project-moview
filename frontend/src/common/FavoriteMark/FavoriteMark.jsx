import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs";
import CheckLoginModal from "../CheckLoginModal/CheckLoginModal";
import LoadingModal from "../LoadingModal/LoadingModal";

const FavoriteMark = ({ movie, fontSize = "1.7rem" }) => {
  const [isFavorite, setIsFavorite] = useState();
  const [showCheckLoginModal, setShowCheckLoginModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const userState = useSelector((state) => state.auth.user);
  const myMoviesState = useSelector((state) => state.myMovies.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!movie || !myMoviesState) return;

    if (myMoviesState.some((myMovie) => myMovie.id === movie.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [movie, myMoviesState]);

  const handleFavoriteMark = (e) => {
    e.stopPropagation();
    if (!userState) {
      console.log("로그인이 필요한 서비스입니다.");
      setShowCheckLoginModal(true);
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
    // db에 추가/제거
    if (isFavorite) {
      setShowLoading(true);
      axios
        .delete(
          `https://project-moview-api.vercel.app/users/${userState.userNum}/my_movies/${movie.id}`
        )
        .then((res) => {
          console.log("my_movies 제거 성공:", res.data);
          dispatch({
            type: "REMOVE_MY_MOVIES",
            payload: { movie: moviePayload },
          });
          setIsFavorite(false);
        })
        .catch((error) => {
          const { message } = error.response.data;
          console.error(error);
          message && error.response.data.message && console.error("my_movies 제거 실패:", message);
        })
        .finally(() => {
          setShowLoading(false);
        });
    } else {
      setShowLoading(true);
      axios
        .post(
          `https://project-moview-api.vercel.app/users/${userState.userNum}/my_movies`,
          moviePayload
        )
        .then((res) => {
          console.log("my_movies 추가 성공:", res.data);
          dispatch({ type: "ADD_MY_MOVIES", payload: { movie: moviePayload } });
          setIsFavorite(true);
        })
        .catch((error) => {
          const { message } = error.response.data;
          console.error(error);
          message && console.error("my_movies 추가 실패:", message);
        })
        .finally(() => {
          setShowLoading(false);
        });
    }
  };

  return (
    <>
      {isFavorite ? (
        <OverlayTrigger overlay={<Tooltip>찜 제거</Tooltip>}>
          <div>
            <BsBookmarkDashFill
              className="favorite-selected"
              onClick={handleFavoriteMark}
              style={{ fontSize: fontSize }}
            />
          </div>
        </OverlayTrigger>
      ) : (
        <OverlayTrigger overlay={<Tooltip>찜 추가</Tooltip>}>
          <div>
            <BsBookmarkPlus
              className="favorite-unselected"
              onClick={handleFavoriteMark}
              style={{ fontSize: fontSize }}
            />
          </div>
        </OverlayTrigger>
      )}
      <CheckLoginModal
        show={showCheckLoginModal}
        setShow={setShowCheckLoginModal}
      />
      <LoadingModal show={showLoading} />
    </>
  );
};

export default FavoriteMark;

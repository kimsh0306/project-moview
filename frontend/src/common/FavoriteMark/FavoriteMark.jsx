import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs";
import CheckLoginModal from "../CheckLoginModal/CheckLoginModal";
import AlertModal from "../AlertModal/AlertModal";

const FavoriteMark = ({ movie, fontSize = "1.7rem" }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCheckLoginModal, setShowCheckLoginModal] = useState(false);
  const [alertContent, setAlertContent] = useState();

  const userState = useSelector((state) => state.auth.user);
  const myMoviesState = useSelector((state) => state.myMovies.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!movie || !myMoviesState) return;

    if (myMoviesState.some((myMovie) => myMovie.id === movie.id)) {
      setIsFavorite(true);
    }
  }, [movie, myMoviesState]);

  const removeMyMovies = async () => {
    try {
      const url = `https://project-moview-api.vercel.app/users/${userState.userNum}/my_movies/${movie.id}`;
      return await axios.delete(url);
    } catch (error) {
      throw new Error(`찜 삭제 요청이 실패했습니다. 제목: ${movie.title}`, {
        cause: error,
      });
    }
  };

  const addMyMovies = async (moviePayload) => {
    try {
      const url = `https://project-moview-api.vercel.app/users/${userState.userNum}/my_movies`;
      return await axios.post(url, moviePayload);
    } catch (error) {
      throw new Error(`찜 추가 요청이 실패했습니다. 제목: ${movie.title}`, {
        cause: error,
      });
    }
  };

  const handleFavoriteMark = async (e) => {
    e.stopPropagation();

    if (!userState) {
      console.log("로그인이 필요한 서비스입니다.");
      setShowCheckLoginModal(true);
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
      setAlertContent(error.message);
      setIsFavorite(prevIsFavorite);
      console.error("에러 메시지:", error.message);
      if (error.cause) {
        console.error("원인:", error.cause);
      }
      dispatch({ type: "SET_MY_MOVIES", payload: myMoviesState });
    }
  };

  const handleAlertClose = (e) => {
    setAlertContent();
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
      <AlertModal show={alertContent} handleClose={handleAlertClose} />
    </>
  );
};

export default FavoriteMark;

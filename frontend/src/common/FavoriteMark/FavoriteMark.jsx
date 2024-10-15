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
  const myMovies = useSelector((state) => state.myMovies);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!movie) return;

    if (myMovies.some((myMovie) => myMovie.id === movie.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [movie, myMovies]);

  const handleFavoriteMark = (e) => {
    const userId = localStorage.getItem("userId");
    const userNum = localStorage.getItem("userNum");

    e.stopPropagation();
    if (!userId || !userNum) {
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
          `https://project-moview-api.vercel.app/users/${userNum}/my_movies/${movie.id}`
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
          `https://project-moview-api.vercel.app/users/${userNum}/my_movies`,
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

  return (
    <>
      {isFavorite ? (
        <OverlayTrigger overlay={<Tooltip>찜목록에서 제거</Tooltip>}>
          <div>
            <BsBookmarkDashFill
              className="favorite-selected"
              onClick={handleFavoriteMark}
              style={{ fontSize: fontSize }}
            />
          </div>
        </OverlayTrigger>
      ) : (
        <OverlayTrigger overlay={<Tooltip>찜목록에 추가</Tooltip>}>
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
